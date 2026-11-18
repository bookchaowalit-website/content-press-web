import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import nextConfig from "../next.config";

describe("home page on the App shell", () => {
  const html = renderToString(<Home />);

  it("renders the example mentions with status pills and the honest local-only note", () => {
    expect(html).toContain('class="as"');
    expect(html).toContain("Local tech blog");
    expect(html).toContain("Independent maker roundup");
    expect(html).toMatch(/data-tone="green"[^>]*>Published</);
    expect(html).toMatch(/data-tone="amber"[^>]*>Pitch</);
    expect(html).toContain("Saved in this browser only");
    expect(html).toContain("examples of the format, not real coverage");
    expect(html).not.toContain("1 Jan 1970");
    expect(html).not.toMatch(/SEARCH · ADD · KEEP|LOCAL CLIPS/);
    expect(html).toContain('href="https://bookchaowalit.com/"');
  });

  it("shows the lists with counts and All mentions as current", () => {
    expect(html).toMatch(/aria-current="true"[^>]*><span>All mentions<\/span><span class="as-count">2<\/span>/);
    expect(html).toMatch(/Archive<\/span><span class="as-count">0<\/span>/);
  });
});

describe("site files", () => {
  it("uses the site's own domain and sends /more-projects to the main site", async () => {
    expect(sitemap()[0].url).toBe("https://press.bookchaowalit.com/");
    expect(robots().sitemap).toBe("https://press.bookchaowalit.com/sitemap.xml");
    expect(await nextConfig.redirects!()).toContainEqual({ source: "/more-projects", destination: "https://bookchaowalit.com/", permanent: true });
  });
});
