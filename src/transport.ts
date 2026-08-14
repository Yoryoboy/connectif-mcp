export type RequestSpec = {
  method: string;
  path: string;
  pathParams?: Record<string, string>;
  query?: Record<string, unknown>;
  body?: unknown;
  form?: Record<string, unknown>;
};
export type TransportResult = {
  status: number;
  headers: Record<string, string>;
  body: unknown;
};
export type FetchLike = (
  input: string | URL,
  init?: RequestInit,
) => Promise<Response>;

export class ConnectifError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly headers: Record<string, string> = {},
    public readonly body?: unknown,
  ) {
    super(message);
  }
}

export class ConnectifClient {
  constructor(
    private readonly options: {
      apiKey: string;
      baseUrl?: string;
      timeoutMs?: number;
      fetch?: FetchLike;
    },
  ) {
    if (!options.apiKey.trim()) throw new Error("CONNECTIF_API_KEY_REQUIRED");
    this.options.baseUrl ??= "https://api.connectif.cloud";
    this.options.timeoutMs ??= 10_000;
    if (!Number.isInteger(this.options.timeoutMs) || this.options.timeoutMs < 1)
      throw new Error("CONNECTIF_TIMEOUT_INVALID");
  }

  async request(spec: RequestSpec): Promise<TransportResult> {
    let path = spec.path;
    for (const [key, value] of Object.entries(spec.pathParams ?? {}))
      path = path.replace(`{${key}}`, encodeURIComponent(value));
    const url = new URL(path, `${this.options.baseUrl!.replace(/\/$/, "/")}`);
    for (const [key, value] of Object.entries(spec.query ?? {})) {
      if (value === undefined) continue;
      for (const item of Array.isArray(value) ? value : [value])
        url.searchParams.append(key, String(item));
    }
    const headers: Record<string, string> = {
      Authorization: `apiKey ${this.options.apiKey}`,
      Accept: "application/json",
    };
    let body: BodyInit | undefined;
    if (spec.form) {
      const form = new FormData();
      for (const [key, value] of Object.entries(spec.form)) {
        if (value === undefined) continue;
        if (key === "file") {
          const file = value as {
            filename: string;
            content: string;
            contentType?: string;
          };
          form.append(
            "file",
            new Blob([Buffer.from(file.content, "base64")], {
              type: file.contentType ?? "text/csv",
            }),
            file.filename,
          );
        } else
          form.append(
            key,
            typeof value === "boolean" ? String(value) : String(value),
          );
      }
      body = form;
    } else if (spec.body !== undefined) {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(spec.body);
    }
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.options.timeoutMs);
    try {
      const response = await (this.options.fetch ?? fetch)(url, {
        method: spec.method,
        headers,
        body,
        signal: controller.signal,
      });
      const responseHeaders = Object.fromEntries(response.headers.entries());
      const text = response.status === 204 ? "" : await response.text();
      let parsed: unknown = text;
      if (text) {
        try {
          parsed = JSON.parse(text);
        } catch {
          /* preserve non-JSON upstream bodies */
        }
      }
      if (!response.ok)
        throw new ConnectifError(
          `Connectif API returned HTTP ${response.status}`,
          response.status,
          responseHeaders,
          parsed,
        );
      return {
        status: response.status,
        headers: responseHeaders,
        body: parsed,
      };
    } catch (error) {
      if (error instanceof ConnectifError) throw error;
      if (error instanceof DOMException && error.name === "AbortError")
        throw new ConnectifError("Connectif request timed out");
      throw error;
    } finally {
      clearTimeout(timer);
    }
  }
}
