import { describe, expect, it } from "vitest";
import { POST } from "@/app/api/mcp/route";

function rpc(body: unknown) {
  return POST(new Request("http://localhost/api/mcp", { method: "POST", body: JSON.stringify(body) }));
}

describe("MCP route", () => {
  it("echoes the JSON-RPC request id and lists the real tools", async () => {
    const body = await (await rpc({ jsonrpc: "2.0", id: 7, method: "tools/list" })).json();
    expect(body.id).toBe(7);
    expect(body.result.tools.map((t: { name: string }) => t.name)).toEqual(["list_mentions", "get_mention"]);
  });

  it("list_mentions searches the sample clippings", async () => {
    const all = await (await rpc({ jsonrpc: "2.0", id: 1, method: "tools/call", params: { name: "list_mentions" } })).json();
    expect(all.result.mentions.map((m: { id: string }) => m.id)).toEqual(["1", "2"]);
    const hit = await (await rpc({ jsonrpc: "2.0", id: 2, method: "tools/call", params: { name: "list_mentions", arguments: { query: "maker" } } })).json();
    expect(hit.result.mentions.map((m: { id: string }) => m.id)).toEqual(["2"]);
  });

  it("get_mention returns one clipping and errors on an unknown id", async () => {
    const ok = await (await rpc({ jsonrpc: "2.0", id: 3, method: "tools/call", params: { name: "get_mention", arguments: { id: "1" } } })).json();
    expect(ok.result.mention.title).toBe("Local tech blog");
    const res = await rpc({ jsonrpc: "2.0", id: 4, method: "tools/call", params: { name: "get_mention", arguments: { id: "x" } } });
    const body = await res.json();
    expect(res.status).toBe(400);
    expect(body.error.code).toBe(-32602);
    expect(body.id).toBe(4);
  });

  it("rejects an unknown tool, an unknown method and a malformed body", async () => {
    expect((await (await rpc({ jsonrpc: "2.0", id: 6, method: "tools/call", params: { name: "get_data" } })).json()).error.code).toBe(-32602);
    expect((await (await rpc({ jsonrpc: "2.0", id: 8, method: "nope" })).json()).error.code).toBe(-32601);
    const bad = await POST(new Request("http://localhost/api/mcp", { method: "POST", body: "{" }));
    expect((await bad.json()).error.code).toBe(-32700);
  });
});
