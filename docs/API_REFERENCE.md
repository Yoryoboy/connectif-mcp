# Connectif API Reference

This reference preserves the API-development notes relevant to this MCP. The complete operation catalog is maintained in [`../ENDPOINTS.md`](../ENDPOINTS.md). The official sources are the [Connectif API documentation](https://api-docs.connectif.cloud/), [OpenAPI document](https://api-docs.connectif.cloud/swagger.json), and the linked operation pages.

## Authentication

Every API call requires an API key. Connectif API keys consist of a key ID and key secret separated by `:`. Send the value in the authorization header:

```http
Authorization: apiKey {yourApiKey}
```

The API base URL is `https://api.connectif.cloud`, and Connectif only allows HTTPS requests. API keys are created and scoped from the API keys section of a Connectif account. The MCP reads the key from `CONNECTIF_API_KEY` and sends the header without changing its value.

## Rate limit

The limit is account-wide, so requests made with any API key belonging to the same account count toward the same limit. The documented limit is currently **10 requests per second**. When the limit is reached, Connectif returns `429 Too Many Requests`.

Standard response headers:

```http
RateLimit-Policy: 10;w=1
RateLimit-Limit: 10
RateLimit-Remaining: 9
RateLimit-Reset: 1
```

`RateLimit-Reset` is the number of seconds until the rate-limit window resets. When the limit is reached, Connectif also sends:

```http
Retry-After: 1
```

`Retry-After` indicates how many seconds to wait before a follow-up request. Connectif also documents these legacy headers:

```http
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 9
X-RateLimit-Reset: 1580919168
```

The legacy `X-RateLimit-Reset` value is a Unix timestamp for the reset time. This MCP preserves response headers but does not retry or otherwise handle rate limits.

## Errors and custom codes

Standard API errors use the HTTP status and may include a JSON error body. Custom error codes are returned with `400 Bad Request`; an example shape is:

```json
{
  "status": 400,
  "title": "Bad Request",
  "detail": "...",
  "code": "E0103"
}
```

Documented custom codes include:

| Code    | Area                | Meaning                                                              |
| ------- | ------------------- | -------------------------------------------------------------------- |
| `E0101` | Purchases           | The referenced contact does not exist.                               |
| `E0102` | Purchases           | One or more purchase products do not exist.                          |
| `E0103` | Purchases           | A purchase product URL uses a non-authorized domain.                 |
| `E0201` | Products            | A product URL uses a non-authorized domain.                          |
| `E0301` | Exports             | The limit of 5 queued exports has been reached.                      |
| `E0401` | Imports             | The limit of 10 queued imports has been reached.                     |
| `E0501` | Custom events       | The contact does not exist when `createContact` is false or omitted. |
| `E0601` | Contact fields      | The custom field limit has been reached.                             |
| `E0602` | Contact fields      | The contact field cannot be deleted because it is in use.            |
| `E0603` | Contact fields      | Creation failed due to concurrent modification.                      |
| `E0604` | Contact fields      | Built-in contact fields cannot be deleted.                           |
| `E0605` | Contact fields      | A contact field with the provided ID already exists.                 |
| `E0701` | Custom integrations | The maximum of 300 integrations per account has been reached.        |
| `E0702` | Custom integrations | The integration image URI could not be downloaded.                   |
| `E0703` | Custom integrations | The image URI does not contain a valid image.                        |
| `E0704` | Custom integrations | The image type is not jpeg, png, or gif.                             |
| `E0705` | Custom integrations | The image is smaller than 230x130 pixels.                            |
| `E0706` | Custom integrations | The image exceeds 10 MB.                                             |
| `E0801` | Custom event types  | A custom event type with this name already exists.                   |
| `E0802` | Custom event types  | A custom event type with this alias already exists.                  |
| `E0803` | Custom event types  | The maximum of 100 event types per integration has been reached.     |

The MCP preserves the upstream status, headers, and parsed or raw response body in its error result.

## Resources and operation coverage

The wrapper groups the currently published, non-deprecated operations into 12 MCP tools:

- Contacts
- Purchases
- Products
- Exports
- Imports
- Coupon sets
- Workflows
- Store
- Contact fields
- Custom events
- Custom integrations
- Custom event types

Together these tools expose 45 operations. See [`../ENDPOINTS.md`](../ENDPOINTS.md) for each method, path, parameters, response statuses, custom codes, and official detail link. Deprecated Connectif routes are intentionally excluded.

## Request and response notes

- GET requests use path and query parameters; PATCH and POST requests use the JSON body defined by the official schema unless the endpoint specifies another content type.
- Import creation uses `multipart/form-data` with the official fields `type`, `overrideExisting`, `updateOnlyEmptyFields`, `delimiter`, optional `couponSetId`, and `file`.
- The MCP tool boundary represents an import file as `{ "filename", "content", "contentType" }`, where `content` is base64. The transport converts it to the multipart file part named `file`.
- Query arrays are sent as repeated query parameters.
- A successful response is represented as `{ "status", "headers", "body" }`. A `204` response has an empty body.
- The server preserves non-JSON upstream bodies rather than forcing them into a JSON shape.
- Request timeout defaults to 10,000 milliseconds and can be changed with `CONNECTIF_TIMEOUT_MS`.

## Official sources

- [Introduction](https://api-docs.connectif.cloud/connectif-api/guides/introduction)
- [Authentication](https://api-docs.connectif.cloud/connectif-api/guides/authentication)
- [Rate limit](https://api-docs.connectif.cloud/connectif-api/guides/rate-limit)
- [Custom error codes](https://api-docs.connectif.cloud/connectif-api/guides/custom-error-codes)
- [OpenAPI specification](https://api-docs.connectif.cloud/swagger.json)

Reference checked against the official documentation and [`../ENDPOINTS.md`](../ENDPOINTS.md) on 2026-08-14.
