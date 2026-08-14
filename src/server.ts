import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ConnectifClient } from "./transport.js";
import { registerTools } from "./tools.js";

export function createServer(
  options: {
    apiKey?: string;
    baseUrl?: string;
    timeoutMs?: number;
    fetch?: typeof fetch;
  } = {},
) {
  const client = new ConnectifClient({
    apiKey: options.apiKey ?? process.env.CONNECTIF_API_KEY ?? "",
    baseUrl: options.baseUrl ?? process.env.CONNECTIF_BASE_URL,
    timeoutMs:
      options.timeoutMs ?? Number(process.env.CONNECTIF_TIMEOUT_MS ?? 10000),
    fetch: options.fetch,
  });
  const server = new McpServer({ name: "connectif-mcp", version: "0.1.0" });
  registerTools(server, client);
  return server;
}

export async function run(): Promise<void> {
  await createServer().connect(new StdioServerTransport());
}
