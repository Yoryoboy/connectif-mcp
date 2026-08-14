import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ConnectifClient, type RequestSpec } from "./transport.js";
import * as schemas from "./schemas.js";

type Input = Record<string, unknown>;
type Operation = {
  action: string;
  method: string;
  path: string;
  pathKeys?: string[];
  queryKeys?: string[];
  body?: boolean;
  form?: boolean;
};
const operations: Record<string, Operation[]> = {
  connectif_contacts: [
    ["getContactByEmail", "GET", "/contacts/email/{email}", ["email"]],
    [
      "patchContactByEmail",
      "PATCH",
      "/contacts/email/{email}",
      ["email"],
      [],
      true,
    ],
    ["deleteContactByEmail", "DELETE", "/contacts/email/{email}", ["email"]],
    [
      "getContactByExternalId",
      "GET",
      "/contacts/external-id/{externalId}",
      ["externalId"],
    ],
    [
      "patchContactByExternalId",
      "PATCH",
      "/contacts/external-id/{externalId}",
      ["externalId"],
      [],
      true,
    ],
    [
      "deleteContactByExternalId",
      "DELETE",
      "/contacts/external-id/{externalId}",
      ["externalId"],
    ],
  ].map(toOperation),
  connectif_purchases: [
    ["getPurchaseByPurchaseId", "GET", "/purchases/purchase-id/{id}", ["id"]],
    [
      "deletePurchaseByExternalId",
      "DELETE",
      "/purchases/purchase-id/{id}",
      ["id"],
    ],
    ["getPurchase", "GET", "/purchases/{id}", ["id"]],
    ["deletePurchaseByInternalId", "DELETE", "/purchases/{id}", ["id"]],
    ["postPurchase", "POST", "/purchases/", [], ["triggerPurchaseEvent"], true],
  ].map(toOperation),
  connectif_products: [
    ["getProductByProductId", "GET", "/products/product-id/{id}", ["id"]],
    [
      "patchsertProduct",
      "PATCH",
      "/products/product-id/{id}",
      ["id"],
      [],
      true,
    ],
    ["deleteProductByProductId", "DELETE", "/products/product-id/{id}", ["id"]],
    ["getProductById", "GET", "/products/{id}", ["id"]],
    ["deleteProductById", "DELETE", "/products/{id}", ["id"]],
  ].map(toOperation),
  connectif_exports: [
    ["getExport", "GET", "/exports/{id}", ["id"]],
    ["deleteExport", "DELETE", "/exports/{id}", ["id"]],
    ["listExport", "GET", "/exports/", [], ["page", "pageSize"]],
    ["createExport", "POST", "/exports/", [], [], true],
    [
      "createDataExplorerExport",
      "POST",
      "/exports/type/data-explorer",
      [],
      [],
      true,
    ],
  ].map(toOperation),
  connectif_imports: [
    ["getImport", "GET", "/imports/{id}", ["id"]],
    ["deleteImport", "DELETE", "/imports/{id}", ["id"]],
    ["listImport", "GET", "/imports/", [], ["page", "pageSize"]],
    ["createImport", "POST", "/imports/", [], [], false, true],
  ].map(toOperation),
  connectif_coupon_sets: [
    ["getCouponSet", "GET", "/coupon-sets/{id}", ["id"]],
    [
      "listCouponSets",
      "GET",
      "/coupon-sets/",
      [],
      ["page", "pageSize", "search"],
    ],
  ].map(toOperation),
  connectif_workflows: [
    ["getWorkflow", "GET", "/workflows/{id}", ["id"]],
    [
      "listWorkflows",
      "GET",
      "/workflows/",
      [],
      ["page", "pageSize", "status", "id"],
    ],
  ].map(toOperation),
  connectif_store: [["getStore", "GET", "/store/"]].map(toOperation),
  connectif_contact_fields: [
    ["listContactFields", "GET", "/contact-fields/", [], ["custom"]],
    ["createContactField", "POST", "/contact-fields/", [], [], true],
    ["getContactField", "GET", "/contact-fields/{id}", ["id"]],
    ["deleteContactField", "DELETE", "/contact-fields/{id}", ["id"]],
  ].map(toOperation),
  connectif_custom_events: [
    [
      "createCustomEventByAlias",
      "POST",
      "/custom-events/alias/{alias}",
      ["alias"],
      ["createContact"],
      true,
    ],
    [
      "createCustomEventById",
      "POST",
      "/custom-events/id/{id}",
      ["id"],
      ["createContact"],
      true,
    ],
  ].map(toOperation),
  connectif_custom_integrations: [
    [
      "listCustomIntegrations",
      "GET",
      "/custom-integrations/",
      [],
      ["page", "pageSize"],
    ],
    ["createCustomIntegration", "POST", "/custom-integrations/", [], [], true],
    ["getCustomIntegration", "GET", "/custom-integrations/{id}", ["id"]],
    [
      "patchCustomIntegration",
      "PATCH",
      "/custom-integrations/{id}",
      ["id"],
      [],
      true,
    ],
    ["deleteCustomIntegration", "DELETE", "/custom-integrations/{id}", ["id"]],
  ].map(toOperation),
  connectif_custom_event_types: [
    [
      "listCustomEventTypes",
      "GET",
      "/custom-integrations/{id}/custom-event-types/",
      ["id"],
      ["page", "pageSize"],
    ],
    [
      "createCustomEventType",
      "POST",
      "/custom-integrations/{id}/custom-event-types/",
      ["id"],
      [],
      true,
    ],
    [
      "getCustomEventType",
      "GET",
      "/custom-integrations/{id}/custom-event-types/{eventTypeId}",
      ["id", "eventTypeId"],
    ],
    [
      "deleteCustomEventType",
      "DELETE",
      "/custom-integrations/{id}/custom-event-types/{eventTypeId}",
      ["id", "eventTypeId"],
    ],
  ].map(toOperation),
};
function toOperation(value: readonly unknown[]): Operation {
  const [action, method, path, pathKeys, queryKeys, body, form] = value as [
    string,
    string,
    string,
    string[]?,
    string[]?,
    boolean?,
    boolean?,
  ];
  return { action, method, path, pathKeys, queryKeys, body, form };
}

export const TOOL_NAMES = Object.keys(operations);
export const OPERATION_COUNT = Object.values(operations).reduce(
  (sum, values) => sum + values.length,
  0,
);
const schemasByTool = {
  connectif_contacts: schemas.contactsSchema,
  connectif_purchases: schemas.purchasesSchema,
  connectif_products: schemas.productsSchema,
  connectif_exports: schemas.exportsSchema,
  connectif_imports: schemas.importsSchema,
  connectif_coupon_sets: schemas.couponSetsSchema,
  connectif_workflows: schemas.workflowsSchema,
  connectif_store: schemas.storeSchema,
  connectif_contact_fields: schemas.contactFieldsSchema,
  connectif_custom_events: schemas.customEventsSchema,
  connectif_custom_integrations: schemas.customIntegrationsSchema,
  connectif_custom_event_types: schemas.customEventTypesSchema,
} as const;

export function registerTools(
  server: McpServer,
  client: ConnectifClient,
): void {
  for (const name of TOOL_NAMES as Array<keyof typeof schemasByTool>)
    server.registerTool(
      name,
      {
        description: `Direct Connectif API operations for ${name.replace("connectif_", "")}. Use action to select an official operation.`,
        inputSchema: schemasByTool[name],
      },
      async (input: unknown) => {
        const value = input as Input;
        const operation = operations[name].find(
          (item) => item.action === value.action,
        );
        if (!operation)
          return {
            content: [
              {
                type: "text" as const,
                text: JSON.stringify({ error: "Unknown action" }),
              },
            ],
            isError: true,
          };
        const pathParams = Object.fromEntries(
          (operation.pathKeys ?? []).map((key) => [key, String(value[key])]),
        );
        const query = Object.fromEntries(
          (operation.queryKeys ?? []).map((key) => [key, value[key]]),
        );
        const spec: RequestSpec = {
          method: operation.method,
          path: operation.path,
          pathParams,
          query,
        };
        if (operation.form)
          spec.form = Object.fromEntries(
            [
              "type",
              "overrideExisting",
              "updateOnlyEmptyFields",
              "delimiter",
              "couponSetId",
              "file",
            ].map((key) => [key, value[key]]),
          );
        else if (operation.body) spec.body = value.body;
        try {
          return {
            content: [
              {
                type: "text" as const,
                text: JSON.stringify(await client.request(spec)),
              },
            ],
          };
        } catch (error) {
          const e = error as {
            message?: string;
            status?: number;
            headers?: unknown;
            body?: unknown;
          };
          return {
            content: [
              {
                type: "text" as const,
                text: JSON.stringify({
                  error: e.message ?? String(error),
                  status: e.status,
                  headers: e.headers,
                  body: e.body,
                }),
              },
            ],
            isError: true,
          };
        }
      },
    );
}
