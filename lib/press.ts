// Press clipping data and pure logic, shared by the page and the MCP route. Clippings stay in the browser.

export const STATUSES = ["Published", "Pitch", "Archive"] as const;
export type PressStatus = (typeof STATUSES)[number];
export type PressItem = { id: string; title: string; body: string; status: PressStatus; createdAt: number };
export type Draft = { title: string; body: string; status: PressStatus };

export const STORAGE_KEY = "press-v1";

export const SEED: PressItem[] = [
  { id: "1", title: "Local tech blog", body: "Featured interview", status: "Published", createdAt: 0 },
  { id: "2", title: "Independent maker roundup", body: "Product note / pending", status: "Pitch", createdAt: 0 },
];

export function isStatus(value: unknown): value is PressStatus {
  return typeof value === "string" && (STATUSES as readonly string[]).includes(value);
}

function isItem(value: unknown): value is PressItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "string" &&
    typeof item.title === "string" &&
    typeof item.body === "string" &&
    isStatus(item.status) &&
    typeof item.createdAt === "number"
  );
}

// Stored data is untrusted: anything that is not an array of well-formed clippings is ignored (null).
export function parseItems(raw: string | null): PressItem[] | null {
  if (raw === null) return null;
  try {
    const data: unknown = JSON.parse(raw);
    return Array.isArray(data) ? data.filter(isItem) : null;
  } catch {
    return null;
  }
}

export function searchItems(items: PressItem[], query: string): PressItem[] {
  const needle = query.trim().toLowerCase();
  return items.filter((item) => `${item.title} ${item.body} ${item.status}`.toLowerCase().includes(needle));
}

export function addItem(items: PressItem[], draft: Draft, id: string, now: number): PressItem[] {
  const title = draft.title.trim();
  if (!title) return items;
  return [{ id, title, body: draft.body.trim() || "No detail added", status: draft.status, createdAt: now }, ...items];
}

export function removeItem(items: PressItem[], id: string): PressItem[] {
  return items.filter((item) => item.id !== id);
}

export function clipCount(count: number): string {
  return `${count} LOCAL ${count === 1 ? "CLIP" : "CLIPS"}`;
}
