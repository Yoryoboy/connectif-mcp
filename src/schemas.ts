import { z } from "zod";

const optional = <T extends z.ZodTypeAny>(schema: T) => schema.optional();
const isoDateTime = z.string().datetime({ offset: true });
const uri = z.string().url();
const loose = z.record(z.unknown());

const contactBase = {
  _name: optional(z.string()),
  _surname: optional(z.string()),
  _points: optional(z.number().int()),
  _emailStatus: optional(z.enum(["active", "bounced", "paused", "banned"])),
  _newsletterSubscriptionStatus: optional(
    z.enum(["subscribed", "unsubscribed", "none"]),
  ),
  _birthdate: optional(isoDateTime),
  _mobilePhone: optional(z.string()),
  _mobilePhoneStatus: optional(z.enum(["active", "bounced", "paused"])),
  _smsSubscriptionStatus: optional(
    z.enum(["subscribed", "unsubscribed", "none"]),
  ),
};
export const contactPatchByEmail = z
  .object({ ...contactBase, _externalId: optional(z.string()) })
  .passthrough();
export const contactPatchByExternalId = z
  .object({ ...contactBase, _email: optional(z.string().email()) })
  .passthrough();

const productBasketItem = z.object({
  productId: z.string(),
  price: z.number(),
  quantity: z.number().int(),
  name: z.string(),
  description: optional(z.string()),
  productDetailUrl: uri,
  imageUrl: optional(uri),
  thumbnailUrl: optional(uri),
  unitPrice: z.number(),
  unitPriceOriginal: optional(z.number()),
  unitPriceWithoutVAT: optional(z.number()),
  discountedAmount: optional(z.number()),
  discountedPercentage: optional(z.number()),
  categories: optional(z.array(z.string())),
  tags: optional(z.array(z.string())),
  brand: optional(z.string()),
  rating: optional(z.number()),
  ratingCount: optional(z.number().int()),
  reviewCount: optional(z.number().int()),
  publishedAt: optional(isoDateTime),
  customField1: optional(z.string()),
  customField2: optional(z.string()),
  customField3: optional(z.string()),
});
export const purchaseCreation = z
  .object({
    purchaseId: z.string(),
    contactEmail: optional(z.string().email()),
    contactExternalId: optional(z.string()),
    purchaseDate: isoDateTime,
    cartId: z.string(),
    paymentMethod: optional(z.string()),
    totalQuantity: z.number().int(),
    totalPrice: z.number(),
    products: z.array(productBasketItem),
    sourceType: optional(
      z.enum([
        "marketplace",
        "digital-store",
        "point-of-sale",
        "third-party",
        "other",
      ]),
    ),
    sourceName: optional(z.string()),
  })
  .passthrough();

export const productCreation = z
  .object({
    name: z.string(),
    description: optional(z.string()),
    productDetailUrl: z.string(),
    imageUrl: optional(z.string()),
    thumbnailUrl: optional(z.string()),
    unitPrice: z.number(),
    unitPriceOriginal: optional(z.number()),
    unitPriceWithoutVAT: optional(z.number()),
    discountedAmount: optional(z.number()),
    discountedPercentage: optional(z.number()),
    categories: optional(z.array(z.string())),
    tags: optional(z.array(z.string())),
    brand: optional(z.string()),
    rating: optional(z.number()),
    ratingCount: optional(z.number().int()),
    reviewCount: optional(z.number().int()),
    publishedAt: optional(isoDateTime),
    customField1: optional(z.string()),
    customField2: optional(z.string()),
    customField3: optional(z.string()),
    availability: optional(z.enum(["instock", "outofstock"])),
    priority: optional(z.number().int()),
    relatedExternalProductIds: optional(z.array(z.string())),
    isBlacklisted: optional(z.boolean()),
    inStockUnits: optional(z.number().int()),
  })
  .passthrough();

const exportFilters = z
  .object({
    segmentId: optional(z.string()),
    fromDate: optional(isoDateTime),
    toDate: optional(isoDateTime),
    activityTypes: optional(
      z.array(
        z.enum([
          "contact-created",
          "email-sent",
          "email-sent-alert",
          "email-unsubscribed",
          "email-opened",
          "email-link-clicked",
          "email-bounce",
          "web-content-opened",
          "web-link-clicked",
          "web-form-submitted",
          "purchase",
          "contact-identified",
          "login",
          "register",
          "search",
          "newsletter-subscribe",
          "product-searched",
          "cart-abandoned",
          "cart-product-added",
          "cart-product-removed",
          "push-notification-opened",
          "push-notification-link-clicked",
          "push-notification-subscribed",
          "push-notification-unsubscribed",
          "push-notification-migrate-subscription",
          "push-notification-error",
          "contact-entered-segment",
          "contact-exited-segment",
          "contact-merged",
          "sms-sent",
          "sms-sent-alert",
          "sms-bounce",
          "sms-unsubscribed",
          "facebook-contact-sent",
          "coupon-assigned",
          "product-visited",
          "web-page-visited",
          "contact-added-to-gads-audience",
          "contact-removed-from-gads-audience",
          "shared-data-received",
        ]),
      ),
    ),
  })
  .passthrough();
export const exportCreation = z
  .object({
    exportType: z.enum(["contacts", "activities"]),
    delimiter: z.enum([",", ";"]),
    dateFormat: z.enum(["ISO", "L", "LL", "LLL"]),
    filters: optional(exportFilters),
    version: optional(z.enum(["v1", "v2", "v3", "v4", "v5", "v6"])),
  })
  .passthrough();
export const dataExplorerExportCreation = z
  .object({
    delimiter: z.enum([",", ";"]),
    filters: optional(
      z
        .object({
          reportId: z.string(),
          fromDate: z.string().date(),
          toDate: z.string().date(),
        })
        .passthrough(),
    ),
  })
  .passthrough();

const fieldOption = z.object({ id: z.string(), label: z.string() });
export const contactFieldCreate = z
  .object({
    id: z.string(),
    name: z.string(),
    type: z.enum([
      "text",
      "integer",
      "decimal",
      "boolean",
      "date",
      "radio",
      "checkbox",
      "phone",
      "email",
    ]),
    required: z.boolean(),
    defaultValue: optional(z.unknown()),
    maxLength: optional(z.number()),
    defaultCountryCode: optional(z.string()),
    minDate: optional(z.string()),
    maxDate: optional(z.string()),
    minValue: optional(z.number()),
    maxValue: optional(z.number()),
    options: optional(z.array(fieldOption)),
  })
  .passthrough();
export const createCustomEvent = loose;

const colors = [
  "#F44336",
  "#B71C1C",
  "#E91E63",
  "#DF0067",
  "#880E4F",
  "#9C27B0",
  "#4A148C",
  "#673AB7",
  "#6200EA",
  "#3F51B5",
  "#1A237E",
  "#2196F3",
  "#0D47A1",
  "#03A9F4",
  "#01579B",
  "#00BCD4",
  "#006064",
  "#009688",
  "#004D40",
  "#4CAF50",
  "#1B5E20",
  "#8BC34A",
  "#33691E",
  "#CDDC39",
  "#827717",
  "#FBC02D",
  "#F57F17",
  "#FFC107",
  "#FF6F00",
  "#FF9800",
  "#E65100",
  "#FF5722",
  "#BF360C",
  "#795548",
  "#3E2723",
  "#9E9E9E",
  "#212121",
  "#90A4AE",
  "#263238",
] as const;
export const customIntegrationCreation = z
  .object({
    name: z.string(),
    description: optional(z.string()),
    color: z.enum(colors),
    imageUri: optional(z.string()),
    eventsEnabled: z.boolean(),
  })
  .passthrough();
export const customIntegrationUpdate = customIntegrationCreation.partial();
const eventFieldOption = z.object({ id: z.string(), label: z.string() });
const eventField = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum([
    "text",
    "email",
    "decimal",
    "integer",
    "date",
    "phone",
    "boolean",
    "checkbox",
    "radio",
  ]),
  isPrimaryKey: optional(z.boolean()),
  required: z.boolean(),
  jsonPointerPath: optional(z.string()),
  defaultCountryCode: optional(z.string()),
  options: optional(z.array(eventFieldOption)),
});
const webhookHeader = z.object({ name: z.string(), value: z.string() });
export const customEventTypeCreation = z
  .object({
    name: z.string(),
    icon: z.string(),
    category: z.enum(["send", "receive"]),
    fields: z.array(eventField),
    webhookUrl: optional(z.string()),
    webhookHeaders: optional(z.array(webhookHeader)),
    alias: optional(z.string()),
    receiveType: optional(z.enum(["webhook", "api", "web/mobile-app"])),
  })
  .passthrough();

const id = z.object({ id: z.string() });
const page = {
  page: optional(z.number().int().min(1)),
  pageSize: optional(z.number().int().min(1).max(50)),
};
const json = <T extends z.ZodTypeAny>(body: T) => ({ body });
const action = <T extends z.ZodRawShape>(shape: T, name: string) =>
  z.object({ action: z.literal(name), ...shape });

export const contactsSchema = z.discriminatedUnion("action", [
  action({ email: z.string().email() }, "getContactByEmail"),
  action(
    { email: z.string().email(), ...json(contactPatchByEmail) },
    "patchContactByEmail",
  ),
  action({ email: z.string().email() }, "deleteContactByEmail"),
  action({ externalId: z.string() }, "getContactByExternalId"),
  action(
    { externalId: z.string(), ...json(contactPatchByExternalId) },
    "patchContactByExternalId",
  ),
  action({ externalId: z.string() }, "deleteContactByExternalId"),
]);
export const purchasesSchema = z.discriminatedUnion("action", [
  action({ id: z.string() }, "getPurchaseByPurchaseId"),
  action({ id: z.string() }, "deletePurchaseByExternalId"),
  action({ id: z.string() }, "getPurchase"),
  action({ id: z.string() }, "deletePurchaseByInternalId"),
  action(
    { triggerPurchaseEvent: optional(z.boolean()), ...json(purchaseCreation) },
    "postPurchase",
  ),
]);
export const productsSchema = z.discriminatedUnion("action", [
  action({ id: z.string() }, "getProductByProductId"),
  action({ id: z.string(), ...json(productCreation) }, "patchsertProduct"),
  action({ id: z.string() }, "deleteProductByProductId"),
  action({ id: z.string() }, "getProductById"),
  action({ id: z.string() }, "deleteProductById"),
]);
export const exportsSchema = z.discriminatedUnion("action", [
  action({ id: z.string() }, "getExport"),
  action({ id: z.string() }, "deleteExport"),
  action(page, "listExport"),
  action(json(exportCreation), "createExport"),
  action(json(dataExplorerExportCreation), "createDataExplorerExport"),
]);
const importFile = z.object({
  filename: z.string(),
  content: z.string(),
  contentType: optional(z.string()),
});
export const importsSchema = z.discriminatedUnion("action", [
  action({ id: z.string() }, "getImport"),
  action({ id: z.string() }, "deleteImport"),
  action(page, "listImport"),
  action(
    {
      type: z.enum(["contacts", "products", "coupons"]),
      overrideExisting: z.boolean(),
      updateOnlyEmptyFields: z.boolean(),
      delimiter: z.enum([",", ";"]),
      couponSetId: optional(z.string()),
      file: importFile,
    },
    "createImport",
  ),
]);
export const couponSetsSchema = z.discriminatedUnion("action", [
  action({ id: z.string() }, "getCouponSet"),
  action({ ...page, search: optional(z.string()) }, "listCouponSets"),
]);
export const workflowsSchema = z.discriminatedUnion("action", [
  action({ id: z.string() }, "getWorkflow"),
  action(
    {
      ...page,
      status: optional(z.array(z.string())),
      id: optional(z.array(z.string())),
    },
    "listWorkflows",
  ),
]);
export const storeSchema = z.discriminatedUnion("action", [
  action({}, "getStore"),
]);
export const contactFieldsSchema = z.discriminatedUnion("action", [
  action({ custom: optional(z.boolean()) }, "listContactFields"),
  action(json(contactFieldCreate), "createContactField"),
  action({ id: z.string() }, "getContactField"),
  action({ id: z.string() }, "deleteContactField"),
]);
export const customEventsSchema = z.discriminatedUnion("action", [
  action(
    {
      alias: z.string(),
      createContact: optional(z.boolean()),
      ...json(createCustomEvent),
    },
    "createCustomEventByAlias",
  ),
  action(
    {
      id: z.string(),
      createContact: optional(z.boolean()),
      ...json(createCustomEvent),
    },
    "createCustomEventById",
  ),
]);
export const customIntegrationsSchema = z.discriminatedUnion("action", [
  action(page, "listCustomIntegrations"),
  action(json(customIntegrationCreation), "createCustomIntegration"),
  action({ id: z.string() }, "getCustomIntegration"),
  action(
    { id: z.string(), ...json(customIntegrationUpdate) },
    "patchCustomIntegration",
  ),
  action({ id: z.string() }, "deleteCustomIntegration"),
]);
export const customEventTypesSchema = z.discriminatedUnion("action", [
  action({ id: z.string(), ...page }, "listCustomEventTypes"),
  action(
    { id: z.string(), ...json(customEventTypeCreation) },
    "createCustomEventType",
  ),
  action({ id: z.string(), eventTypeId: z.string() }, "getCustomEventType"),
  action({ id: z.string(), eventTypeId: z.string() }, "deleteCustomEventType"),
]);

export type DomainSchema = typeof contactsSchema;
