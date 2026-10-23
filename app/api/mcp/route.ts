import { NextResponse } from "next/server";
import { SEED, searchItems } from "@/lib/press";

// Stateless JSON-RPC MCP endpoint over the sample clippings the index starts with. Clippings added in a browser stay
// in that browser's localStorage, so this route never sees them.

type RpcRequest = { id?: number | string | null; method?: string; params?: { name?: string; arguments?: Record<string, unknown> } };

const TOOLS = [
  {
    name: "list_mentions",
    description: "List the sample press mentions, optionally searched by title, detail or status",
    inputSchema: { type: "object", properties: { query: { type: "string" } } },
  },
  {
    name: "get_mention",
    description: "Get one sample press mention by id",
    inputSchema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] },
  },
];

class RpcError extends Error {
  constructor(readonly code: number, message: string) {
    super(message);
  }
}

function callTool(name: string | undefined, args: Record<string, unknown> = {}) {
  switch (name) {
    case "list_mentions":
      return { mentions: searchItems(SEED, typeof args.query === "string" ? args.query : "") };
    case "get_mention": {
      const mention = SEED.find((item) => item.id === args.id);
      if (!mention) throw new RpcError(-32602, `No mention with id ${String(args.id)}`);
      return { mention };
    }
    default:
      throw new RpcError(-32602, `Unknown tool: ${String(name)}`);
  }
}

export async function POST(request: Request) {
  let id: RpcRequest["id"] = null;
  try {
    const body = (await request.json()) as RpcRequest;
    id = body.id ?? null;
    let result: unknown;
    switch (body.method) {
      case "initialize":
        result = {
          protocolVersion: "2024-11-05",
          capabilities: { tools: {} },
          serverInfo: { name: "Press Room", version: "1.0.0" },
        };
        break;
      case "tools/list":
        result = { tools: TOOLS };
        break;
      case "tools/call":
        result = callTool(body.params?.name, body.params?.arguments);
        break;
      default:
        throw new RpcError(-32601, `Unknown method: ${String(body.method)}`);
    }
    return NextResponse.json({ jsonrpc: "2.0", id, result });
  } catch (error) {
    const code = error instanceof RpcError ? error.code : -32700;
    const message = error instanceof RpcError ? error.message : "Parse error";
    return NextResponse.json({ jsonrpc: "2.0", id, error: { code, message } }, { status: 400 });
  }
}
