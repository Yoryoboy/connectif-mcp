# connectif-mcp

`connectif-mcp` is a minimal [Model Context Protocol](https://modelcontextprotocol.io/) server that exposes the official Connectif HTTP API to MCP clients over **stdio**. It is a thin wrapper: requests use Connectif's official routes and parameter names, and upstream responses are returned without business transformations.

The project is public-repository ready, but npm publication is intentionally deferred. The package remains `private: true` to prevent accidental publication.

## Requirements

- Node.js 20 or newer
- A Connectif API key with the scopes required by the operations you use
- An MCP client that supports stdio servers

## Local setup

```bash
npm install
npm run build
CONNECTIF_API_KEY='key-id:key-secret' npm start
```

The server reads these environment variables:

| Variable               | Required | Default                       | Description                                               |
| ---------------------- | -------- | ----------------------------- | --------------------------------------------------------- |
| `CONNECTIF_API_KEY`    | Yes      | None                          | Sent as `Authorization: apiKey {value}`.                  |
| `CONNECTIF_BASE_URL`   | No       | `https://api.connectif.cloud` | API origin; useful for mocked or compatible environments. |
| `CONNECTIF_TIMEOUT_MS` | No       | `10000`                       | Request abort timeout in milliseconds.                    |

### MCP client configuration

The standard `mcpServers` shape can launch the locally built server. Replace the placeholder with the absolute path to this checkout:

```json
{
  "mcpServers": {
    "connectif": {
      "command": "node",
      "args": ["/absolute/path/to/connectif-mcp/dist/main.js"],
      "env": {
        "CONNECTIF_API_KEY": "key-id:key-secret"
      }
    }
  }
}
```

Keep credentials in the client's environment configuration or another secret store. Never commit a real API key.

The following is a **future example only**. It is unavailable until this package is published to npm and must not be treated as a currently working configuration:

```json
{
  "mcpServers": {
    "connectif": {
      "command": "npx",
      "args": ["-y", "connectif-mcp"],
      "env": {
        "CONNECTIF_API_KEY": "key-id:key-secret"
      }
    }
  }
}
```

## Tools and actions

The server registers exactly 12 domain tools and 45 non-deprecated Connectif operations. Each tool takes an `action` property that selects the official operation; route parameters, query parameters, JSON bodies, and multipart fields remain in their corresponding locations.

| Tool                            | API area            |
| ------------------------------- | ------------------- |
| `connectif_contacts`            | Contacts            |
| `connectif_purchases`           | Purchases           |
| `connectif_products`            | Products            |
| `connectif_exports`             | Exports             |
| `connectif_imports`             | Imports             |
| `connectif_coupon_sets`         | Coupon sets         |
| `connectif_workflows`           | Workflows           |
| `connectif_store`               | Store               |
| `connectif_contact_fields`      | Contact fields      |
| `connectif_custom_events`       | Custom events       |
| `connectif_custom_integrations` | Custom integrations |
| `connectif_custom_event_types`  | Custom event types  |

Example:

```json
{
  "action": "getContactByEmail",
  "email": "person@example.com"
}
```

For imports, the `file` tool value contains a filename and base64 content, and the server converts it to the official multipart file part. See [`ENDPOINTS.md`](ENDPOINTS.md) for the complete operation catalog and [`docs/API_REFERENCE.md`](docs/API_REFERENCE.md) for Connectif API behavior.

## Security and fidelity

- API keys are read from the environment and are not logged or included in tool arguments by the server.
- Paths are encoded, fixed routes are selected from the operation registry, and arbitrary route overrides are not accepted.
- Successful results preserve the upstream HTTP status, headers, and body. HTTP errors preserve the same upstream metadata in an MCP error result.
- The wrapper does not add retries, rate-limit handling, response projection, business middleware, or other policy beyond the request timeout.
- Never put API keys in source control, URLs, tool arguments, or logs. Use [`.env.example`](.env.example) as a variable reference only.

## Development

```bash
npm run format:check
npm run typecheck
npm test
npm run build
npm pack --dry-run
```

Tests use mocked HTTP and do not require credentials or network access.

## Status

Usable locally as a thin Connectif MCP wrapper. The repository and npm metadata are prepared for future publication, but no Git repository has been initialized, no GitHub resources have been created, and npm publication is not available yet.

## License

MIT. See [`LICENSE`](LICENSE).
