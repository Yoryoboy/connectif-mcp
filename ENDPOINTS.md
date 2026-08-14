# Connectif API Endpoint Catalog

This is the complete catalog of the 45 operations currently present in the official OpenAPI document without a `deprecated` flag. Every operation uses the base URL `https://api.connectif.cloud` and the API-key authentication described in [`README.md`](README.md), unless the official source is updated.

## Contacts

| Method   | Path                                 | Parameters / body                                         | Responses                                                     | Official detail                                                                                                                 |
| -------- | ------------------------------------ | --------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/contacts/email/{email}`            | Path: `email`                                             | `200`, `400`, `401`, `403`, `404`, `429`                      | [Get contact by email](https://api-docs.connectif.cloud/connectif-api/reference/contacts/get-contact-by-email)                  |
| `PATCH`  | `/contacts/email/{email}`            | Path: `email`; JSON body: `ContactPatchByEmail`           | `200`, `201`, `400`, `401`, `403`, `409`, `415`, `422`, `429` | [Patch contact by email](https://api-docs.connectif.cloud/connectif-api/reference/contacts/patch-contact-by-email)              |
| `DELETE` | `/contacts/email/{email}`            | Path: `email`                                             | `204`, `400`, `401`, `403`, `429`                             | [Delete contact by email](https://api-docs.connectif.cloud/connectif-api/reference/contacts/delete-contact-by-email)            |
| `GET`    | `/contacts/external-id/{externalId}` | Path: `externalId`                                        | `200`, `400`, `401`, `403`, `404`, `429`                      | [Get contact by externalId](https://api-docs.connectif.cloud/connectif-api/reference/contacts/get-contact-by-external-id)       |
| `PATCH`  | `/contacts/external-id/{externalId}` | Path: `externalId`; JSON body: `ContactPatchByExternalId` | `200`, `201`, `400`, `401`, `403`, `409`, `415`, `422`, `429` | [Patch contact by externalId](https://api-docs.connectif.cloud/connectif-api/reference/contacts/patch-contact-by-external-id)   |
| `DELETE` | `/contacts/external-id/{externalId}` | Path: `externalId`                                        | `204`, `400`, `401`, `403`, `429`                             | [Delete contact by externalId](https://api-docs.connectif.cloud/connectif-api/reference/contacts/delete-contact-by-external-id) |

## Purchases

| Method   | Path                          | Parameters / body                                                                      | Responses                                                                                | Official detail                                                                                                                          |
| -------- | ----------------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/purchases/purchase-id/{id}` | Path: store purchase `id`                                                              | `200`, `401`, `403`, `404`, `429`                                                        | [Get purchase by store identifier](https://api-docs.connectif.cloud/connectif-api/reference/purchases/get-purchase-by-purchase-id)       |
| `DELETE` | `/purchases/purchase-id/{id}` | Path: store purchase `id`                                                              | `204`, `401`, `403`, `429`                                                               | [Delete purchase by store identifier](https://api-docs.connectif.cloud/connectif-api/reference/purchases/delete-purchase-by-external-id) |
| `GET`    | `/purchases/{id}`             | Path: Connectif purchase `id`                                                          | `200`, `400`, `401`, `403`, `404`, `429`                                                 | [Get purchase by ID](https://api-docs.connectif.cloud/connectif-api/reference/purchases/get-purchase)                                    |
| `DELETE` | `/purchases/{id}`             | Path: Connectif purchase `id`                                                          | `204`, `400`, `401`, `403`, `429`                                                        | [Delete purchase by ID](https://api-docs.connectif.cloud/connectif-api/reference/purchases/delete-purchase-by-internal-id)               |
| `POST`   | `/purchases/`                 | Query: `triggerPurchaseEvent` (boolean, default `true`); JSON body: `PurchaseCreation` | `201`, `400`, `401`, `403`, `409`, `415`, `422`, `429`; custom `E0101`, `E0102`, `E0103` | [Create purchase](https://api-docs.connectif.cloud/connectif-api/reference/purchases/post-purchase)                                      |

## Products

| Method   | Path                        | Parameters / body                                      | Responses                                                              | Official detail                                                                                                                      |
| -------- | --------------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `GET`    | `/products/product-id/{id}` | Path: store product `id`                               | `200`, `401`, `403`, `404`, `429`                                      | [Get product by store identifier](https://api-docs.connectif.cloud/connectif-api/reference/products/get-product-by-product-id)       |
| `PATCH`  | `/products/product-id/{id}` | Path: store product `id`; JSON body: `ProductCreation` | `200`, `201`, `400`, `401`, `403`, `415`, `422`, `429`; custom `E0201` | [Patch or create product](https://api-docs.connectif.cloud/connectif-api/reference/products/patchsert-product)                       |
| `DELETE` | `/products/product-id/{id}` | Path: store product `id`                               | `204`, `401`, `403`, `429`                                             | [Delete product by store identifier](https://api-docs.connectif.cloud/connectif-api/reference/products/delete-product-by-product-id) |
| `GET`    | `/products/{id}`            | Path: Connectif product `id`                           | `200`, `400`, `401`, `403`, `404`, `429`                               | [Get product by ID](https://api-docs.connectif.cloud/connectif-api/reference/products/get-product-by-id)                             |
| `DELETE` | `/products/{id}`            | Path: Connectif product `id`                           | `204`, `400`, `401`, `403`, `429`                                      | [Delete product by ID](https://api-docs.connectif.cloud/connectif-api/reference/products/delete-product-by-id)                       |

## Exports

| Method   | Path                          | Parameters / body                                               | Responses                                                       | Official detail                                                                                                             |
| -------- | ----------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/exports/{id}`               | Path: export `id`                                               | `200`, `400`, `401`, `403`, `404`, `429`                        | [Get export](https://api-docs.connectif.cloud/connectif-api/reference/exports/get-export)                                   |
| `DELETE` | `/exports/{id}`               | Path: export `id`                                               | `204`, `400`, `401`, `403`, `429`                               | [Delete export](https://api-docs.connectif.cloud/connectif-api/reference/exports/delete-export)                             |
| `GET`    | `/exports/`                   | Query: `page` (min 1, default 1), `pageSize` (1-50, default 10) | `200`, `400`, `401`, `403`, `429`                               | [List exports](https://api-docs.connectif.cloud/connectif-api/reference/exports/list-export)                                |
| `POST`   | `/exports/`                   | JSON body: `ExportCreation`                                     | `201`, `400`, `401`, `403`, `415`, `422`, `429`; custom `E0301` | [Create export](https://api-docs.connectif.cloud/connectif-api/reference/exports/create-export)                             |
| `POST`   | `/exports/type/data-explorer` | JSON body: `DataExplorerExportCreation`                         | `201`, `400`, `401`, `403`, `415`, `422`, `429`; custom `E0301` | [Create Data Explorer export](https://api-docs.connectif.cloud/connectif-api/reference/exports/create-data-explorer-export) |

## Imports

| Method   | Path            | Parameters / body                                                                                                                                                          | Responses                                                              | Official detail                                                                                 |
| -------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `GET`    | `/imports/{id}` | Path: import `id`                                                                                                                                                          | `200`, `400`, `401`, `403`, `404`, `429`                               | [Get import](https://api-docs.connectif.cloud/connectif-api/reference/imports/get-import)       |
| `DELETE` | `/imports/{id}` | Path: import `id`                                                                                                                                                          | `204`, `400`, `401`, `403`, `429`                                      | [Delete import](https://api-docs.connectif.cloud/connectif-api/reference/imports/delete-import) |
| `GET`    | `/imports/`     | Query: `page` (min 1, default 1), `pageSize` (1-50, default 10)                                                                                                            | `200`, `400`, `401`, `403`, `429`                                      | [List imports](https://api-docs.connectif.cloud/connectif-api/reference/imports/list-import)    |
| `POST`   | `/imports/`     | `multipart/form-data`: `type` (required; `contacts`, `products`, or `coupons`), `file` (required), `overrideExisting`, `updateOnlyEmptyFields`, `delimiter`, `couponSetId` | `201`, `400`, `401`, `403`, `413`, `415`, `422`, `429`; custom `E0401` | [Create import](https://api-docs.connectif.cloud/connectif-api/reference/imports/create-import) |

## Coupon Sets

| Method | Path                | Parameters / body                                                         | Responses                                | Official detail                                                                                           |
| ------ | ------------------- | ------------------------------------------------------------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `GET`  | `/coupon-sets/{id}` | Path: coupon set `id`                                                     | `200`, `400`, `401`, `403`, `404`, `429` | [Get coupon set](https://api-docs.connectif.cloud/connectif-api/reference/coupon-sets/get-coupon-set)     |
| `GET`  | `/coupon-sets/`     | Query: `page` (min 1, default 1), `pageSize` (1-50, default 10), `search` | `200`, `400`, `401`, `403`, `429`        | [List coupon sets](https://api-docs.connectif.cloud/connectif-api/reference/coupon-sets/list-coupon-sets) |

## Workflows

| Method | Path              | Parameters / body                                                               | Responses                                | Official detail                                                                                     |
| ------ | ----------------- | ------------------------------------------------------------------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `GET`  | `/workflows/{id}` | Path: workflow `id`                                                             | `200`, `400`, `401`, `403`, `404`, `429` | [Get workflow](https://api-docs.connectif.cloud/connectif-api/reference/workflows/get-workflow)     |
| `GET`  | `/workflows/`     | Query: `page` (min 1, default 1), `pageSize` (1-50, default 10), `status`, `id` | `200`, `400`, `401`, `403`, `429`        | [List workflows](https://api-docs.connectif.cloud/connectif-api/reference/workflows/list-workflows) |

## Store

| Method | Path      | Parameters / body | Responses                  | Official detail                                                                       |
| ------ | --------- | ----------------- | -------------------------- | ------------------------------------------------------------------------------------- |
| `GET`  | `/store/` | None              | `200`, `401`, `403`, `429` | [Get store](https://api-docs.connectif.cloud/connectif-api/reference/store/get-store) |

## Contact Fields

| Method   | Path                   | Parameters / body               | Responses                                       | Official detail                                                                                                      |
| -------- | ---------------------- | ------------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/contact-fields/`     | Query: `custom`                 | `200`, `400`, `401`, `403`, `429`               | [List contact fields](https://api-docs.connectif.cloud/connectif-api/reference/contact-fields/list-contact-fields)   |
| `POST`   | `/contact-fields/`     | JSON body: `ContactFieldCreate` | `201`, `400`, `401`, `403`, `409`, `422`, `429` | [Create contact field](https://api-docs.connectif.cloud/connectif-api/reference/contact-fields/create-contact-field) |
| `GET`    | `/contact-fields/{id}` | Path: contact field `id`        | `200`, `401`, `403`, `404`, `429`               | [Get contact field](https://api-docs.connectif.cloud/connectif-api/reference/contact-fields/get-contact-field)       |
| `DELETE` | `/contact-fields/{id}` | Path: contact field `id`        | `204`, `400`, `401`, `403`, `409`, `429`        | [Delete contact field](https://api-docs.connectif.cloud/connectif-api/reference/contact-fields/delete-contact-field) |

## Custom Events

| Method | Path                           | Parameters / body                                                             | Responses                                                              | Official detail                                                                                                              |
| ------ | ------------------------------ | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/custom-events/alias/{alias}` | Path: `alias`; query: `createContact`; JSON body: `CreateCustomEvent`         | `201`, `400`, `401`, `403`, `404`, `413`, `422`, `429`; custom `E0501` | [Create event by alias](https://api-docs.connectif.cloud/connectif-api/reference/custom-events/create-custom-event-by-alias) |
| `POST` | `/custom-events/id/{id}`       | Path: event type `id`; query: `createContact`; JSON body: `CreateCustomEvent` | `201`, `400`, `401`, `403`, `404`, `413`, `422`, `429`; custom `E0501` | [Create event by ID](https://api-docs.connectif.cloud/connectif-api/reference/custom-events/create-custom-event-by-id)       |

## Custom Integrations

| Method   | Path                        | Parameters / body                                               | Responses                                       | Official detail                                                                                                              |
| -------- | --------------------------- | --------------------------------------------------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/custom-integrations/`     | Query: `page` (min 1, default 1), `pageSize` (1-50, default 10) | `200`, `400`, `401`, `403`, `429`               | [List integrations](https://api-docs.connectif.cloud/connectif-api/reference/custom-integrations/list-custom-integrations)   |
| `POST`   | `/custom-integrations/`     | JSON body: `CustomIntegrationCreation`                          | `201`, `400`, `401`, `403`, `422`, `429`        | [Create integration](https://api-docs.connectif.cloud/connectif-api/reference/custom-integrations/create-custom-integration) |
| `GET`    | `/custom-integrations/{id}` | Path: integration `id`                                          | `200`, `400`, `401`, `403`, `404`, `429`        | [Get integration](https://api-docs.connectif.cloud/connectif-api/reference/custom-integrations/get-custom-integration)       |
| `PATCH`  | `/custom-integrations/{id}` | Path: integration `id`; JSON body: `CustomIntegrationUpdate`    | `200`, `400`, `401`, `403`, `404`, `422`, `429` | [Patch integration](https://api-docs.connectif.cloud/connectif-api/reference/custom-integrations/patch-custom-integration)   |
| `DELETE` | `/custom-integrations/{id}` | Path: integration `id`                                          | `204`, `400`, `401`, `403`, `404`, `409`, `429` | [Delete integration](https://api-docs.connectif.cloud/connectif-api/reference/custom-integrations/delete-custom-integration) |

## Custom Event Types

| Method   | Path                                                         | Parameters / body                                                                       | Responses                                              | Official detail                                                                                                           |
| -------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/custom-integrations/{id}/custom-event-types/`              | Path: integration `id`; query: `page` (min 1, default 1), `pageSize` (1-50, default 10) | `200`, `400`, `401`, `403`, `404`, `429`               | [List event types](https://api-docs.connectif.cloud/connectif-api/reference/custom-event-types/list-custom-event-types)   |
| `POST`   | `/custom-integrations/{id}/custom-event-types/`              | Path: integration `id`; JSON body: `CustomEventTypeCreation`                            | `201`, `400`, `401`, `403`, `404`, `409`, `422`, `429` | [Create event type](https://api-docs.connectif.cloud/connectif-api/reference/custom-event-types/create-custom-event-type) |
| `GET`    | `/custom-integrations/{id}/custom-event-types/{eventTypeId}` | Path: `eventTypeId` (under integration `id`)                                            | `200`, `400`, `401`, `403`, `404`, `429`               | [Get event type](https://api-docs.connectif.cloud/connectif-api/reference/custom-event-types/get-custom-event-type)       |
| `DELETE` | `/custom-integrations/{id}/custom-event-types/{eventTypeId}` | Path: `eventTypeId` (under integration `id`)                                            | `204`, `400`, `401`, `403`, `404`, `409`, `429`        | [Delete event type](https://api-docs.connectif.cloud/connectif-api/reference/custom-event-types/delete-custom-event-type) |

## Payload Schemas

The operation table names the request schemas exactly as published. The official OpenAPI document is the authoritative source for their properties, required fields, types, and nested definitions:

- `ContactPatchByEmail`, `ContactPatchByExternalId`
- `PurchaseCreation`
- `ProductCreation`
- `ExportCreation`, `DataExplorerExportCreation`
- `ContactFieldCreate`
- `CreateCustomEvent`
- `CustomIntegrationCreation`, `CustomIntegrationUpdate`
- `CustomEventTypeCreation`

OpenAPI source: [swagger.json](https://api-docs.connectif.cloud/swagger.json).

**Consulted:** 2026-08-14.
