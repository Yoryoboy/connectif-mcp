import { describe, expect, it, vi } from "vitest";
import { ConnectifClient, ConnectifError } from "../src/transport.js";
import { OPERATION_COUNT, TOOL_NAMES } from "../src/tools.js";

const response = (
  status: number,
  body: unknown,
  headers: Record<string, string> = {},
) =>
  new Response(body === undefined ? null : JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...headers },
  });

describe("Connectif registry", () => {
  it("exposes exactly the approved 12 tools and 45 operations", () => {
    expect(TOOL_NAMES).toEqual([
      "connectif_contacts",
      "connectif_purchases",
      "connectif_products",
      "connectif_exports",
      "connectif_imports",
      "connectif_coupon_sets",
      "connectif_workflows",
      "connectif_store",
      "connectif_contact_fields",
      "connectif_custom_events",
      "connectif_custom_integrations",
      "connectif_custom_event_types",
    ]);
    expect(TOOL_NAMES).toHaveLength(12);
    expect(OPERATION_COUNT).toBe(45);
  });
});

describe("Connectif transport", () => {
  it("encodes paths, preserves query names, JSON body, auth, and response metadata", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(response(200, { ok: true }, { etag: "abc" }));
    const client = new ConnectifClient({
      apiKey: "id:secret",
      baseUrl: "https://example.test",
      fetch: fetchMock,
    });
    const result = await client.request({
      method: "POST",
      path: "/custom-events/alias/{alias}",
      pathParams: { alias: "order/placed" },
      query: { createContact: false },
      body: { _email: "a@example.test" },
    });
    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toBe(
      "https://example.test/custom-events/alias/order%2Fplaced?createContact=false",
    );
    expect((init.headers as Record<string, string>).Authorization).toBe(
      "apiKey id:secret",
    );
    expect(init.body).toBe(JSON.stringify({ _email: "a@example.test" }));
    expect(result).toEqual({
      status: 200,
      headers: { "content-type": "application/json", etag: "abc" },
      body: { ok: true },
    });
  });

  it("creates a multipart import with the official form field names", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(response(201, { id: "import-1" }));
    const client = new ConnectifClient({
      apiKey: "k",
      baseUrl: "https://example.test",
      fetch: fetchMock,
    });
    await client.request({
      method: "POST",
      path: "/imports/",
      form: {
        type: "contacts",
        overrideExisting: true,
        updateOnlyEmptyFields: false,
        delimiter: ",",
        file: {
          filename: "contacts.csv",
          content: Buffer.from("_email\na@example.test\n").toString("base64"),
        },
      },
    });
    const init = fetchMock.mock.calls[0][1];
    expect(init.body).toBeInstanceOf(FormData);
    const form = init.body as FormData;
    expect(form.get("type")).toBe("contacts");
    expect(form.get("overrideExisting")).toBe("true");
    expect((form.get("file") as File).name).toBe("contacts.csv");
  });

  it("handles 204 without attempting JSON parsing", async () => {
    const client = new ConnectifClient({
      apiKey: "k",
      fetch: vi.fn().mockResolvedValue(new Response(null, { status: 204 })),
    });
    expect(
      await client.request({
        method: "DELETE",
        path: "/products/{id}",
        pathParams: { id: "p-1" },
      }),
    ).toMatchObject({ status: 204, body: "" });
  });

  it("retains upstream status, headers, and error body", async () => {
    const client = new ConnectifClient({
      apiKey: "k",
      fetch: vi
        .fn()
        .mockResolvedValue(
          response(422, { code: "validation" }, { "retry-after": "2" }),
        ),
    });
    await expect(
      client.request({ method: "POST", path: "/contact-fields/", body: {} }),
    ).rejects.toEqual(
      expect.objectContaining({
        status: 422,
        headers: { "content-type": "application/json", "retry-after": "2" },
        body: { code: "validation" },
      } satisfies Partial<ConnectifError>),
    );
  });
});
