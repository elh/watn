import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import { previewSvg } from "./social-preview.js";
import {
  cohorts,
  cohortPath,
  emptyFilters,
  escapeHtml,
  siteName,
  siteUrl,
  viewMetadata,
} from "../src/views.js";

const output = new URL("../dist/", import.meta.url);
const template = await readFile(new URL("index.html", output), "utf8");

function metadataMarkup(filters) {
  const metadata = viewMetadata(filters);
  const tags = [
    ["name", "description", metadata.description],
    ["property", "og:type", "website"],
    ["property", "og:site_name", siteName],
    ["property", "og:title", metadata.title],
    ["property", "og:description", metadata.description],
    ["property", "og:url", metadata.url],
    ["property", "og:image", metadata.image],
    ["property", "og:image:width", "1200"],
    ["property", "og:image:height", "630"],
    ["property", "og:image:type", "image/png"],
    ["property", "og:image:alt", metadata.imageAlt],
    ["name", "twitter:card", "summary_large_image"],
    ["name", "twitter:title", metadata.title],
    ["name", "twitter:description", metadata.description],
    ["name", "twitter:image", metadata.image],
    ["name", "twitter:image:alt", metadata.imageAlt],
  ];
  return `<!-- metadata:start -->\n    <title>${escapeHtml(metadata.title)}</title>\n    <link rel="canonical" href="${escapeHtml(metadata.url)}" />\n    ${tags.map(([attribute, name, content]) => `<meta ${attribute}="${name}" content="${escapeHtml(content)}" />`).join("\n    ")}\n    <!-- metadata:end -->`;
}

await mkdir(new URL("og/", output), { recursive: true });
for (const cohort of [null, ...cohorts]) {
  const filters = { ...emptyFilters, cohort: cohort?.id ?? "" };
  const directory = new URL(cohortPath(filters.cohort), output);
  await mkdir(directory, { recursive: true });
  let html = template.replace(
    /<!-- metadata:start -->[\s\S]*?<!-- metadata:end -->/,
    metadataMarkup(filters),
  );
  if (cohort)
    html = html.replace(/(src|href)="\.\/assets\//g, '$1="../../assets/');
  await writeFile(new URL("index.html", directory), html);
  if (!cohort) continue;
  const image = new Resvg(previewSvg(filters), {
    font: { loadSystemFonts: true, defaultFontFamily: "sans-serif" },
  })
    .render()
    .asPng();
  await writeFile(new URL(`og/${cohort.id}.png`, output), image);
}

// Include discoverable canonical cohort pages without requiring a client-side click.
const locations = [
  siteUrl,
  ...cohorts.map(({ id }) => new URL(cohortPath(id), siteUrl).href),
];
await writeFile(
  new URL("sitemap.xml", output),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${locations.map((url) => `<url><loc>${escapeHtml(url)}</loc></url>`).join("")}</urlset>\n`,
);
console.log(
  `Generated ${cohorts.length + 1} share pages and ${cohorts.length} PNG previews in ${fileURLToPath(output)}`,
);
