import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("home page", () => {
  it("renders the sample clippings, their count and the browser-local notice", () => {
    const html = renderToString(<Home />);
    expect(html).toContain("Keep the proof");
    expect(html).toContain("Local tech blog");
    expect(html).toContain("Independent maker roundup");
    expect(html).toContain("2 LOCAL CLIPS");
    expect(html).toContain("<b>02</b>");
    expect(html).toContain("No upload, CMS, public feed, or newsroom sync is attached.");
  });
});
