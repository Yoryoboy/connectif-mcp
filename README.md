# @yoryoboy/connectif-mcp

`@yoryoboy/connectif-mcp` is a minimal [Model Context Protocol](https://modelcontextprotocol.io/) server that exposes the official Connectif HTTP API to MCP clients over **stdio**. It is a thin wrapper: requests use Connectif's official routes and parameter names, and upstream responses are returned without business transformations.

## Quick start

1. Create a Connectif API key with the scopes required by the operations you use.
2. Add this server to your MCP client's standard `mcpServers` configuration:

```json
{
  "mcpServers": {
    "connectif": {
      "command": "npx",
      "args": ["-y", "@yoryoboy/connectif-mcp"],
      "env": {
        "CONNECTIF_API_KEY": "key-id:key-secret"
      }
    }
  }
}
```

3. Restart the MCP client. It will download and run `@yoryoboy/connectif-mcp@0.1.0` when needed.

Keep credentials in the client's environment configuration or another secret store. Never commit a real API key.

## Requirements

- Node.js 20 or newer
- A Connectif API key with the scopes required by the operations you use
- An MCP client that supports stdio servers

## Installation

Install the package directly when you want it in a project:

```bash
npm install @yoryoboy/connectif-mcp
pnpm add @yoryoboy/connectif-mcp
```

For MCP clients that support a command and arguments, the `npx` configuration above is the simplest setup. You can also run the installed executable with `connectif-mcp`.

## Configuration

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
pnpm pack --dry-run
```

Tests use mocked HTTP and do not require credentials or network access.

## License

MIT. See [`LICENSE`](LICENSE).
