import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import {
  people,
  companyColors,
  timelineStart,
  timelineEnd,
} from "../src/data.js";
import {
  cohorts,
  cohortById,
  cohortPath,
  emptyFilters,
  escapeHtml,
  matchesFilters,
  siteName,
  siteUrl,
  updatedLabel,
  viewHeading,
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

const monthNumber = (date) => {
  const [year, month] = date.split("-").map(Number);
  return year * 12 + month - 1;
};
const firstMonth = monthNumber(timelineStart);
const months = monthNumber(timelineEnd) - firstMonth;

function previewSvg(filters) {
  const matching = people.filter((person) => matchesFilters(person, filters));
  const sample = matching.slice(0, 6);
  const x = 272;
  const chartWidth = 880;
  const chartTop = 216;
  // Match the desktop timeline's 50px rows, 22px lanes, and 19px bars.
  // Include the row's top border in its height and bar offset.
  let chartBottom = chartTop;
  const rows = sample.map((person) => {
    const lanes = Math.max(...person.roles.map((role) => role.lane ?? 0)) + 1;
    const height = 51 + (lanes - 1) * 22;
    const top = chartBottom;
    chartBottom += height;
    return { person, top, height };
  });
  const years = Array.from(
    {
      length:
        Number(timelineEnd.slice(0, 4)) - Number(timelineStart.slice(0, 4)) + 1,
    },
    (_, index) => Number(timelineStart.slice(0, 4)) + index,
  );
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="#101112"/>
    <g font-family="sans-serif">
      <text x="48" y="73" font-size="44" font-weight="600" fill="#f2f2ef">${escapeHtml(siteName)}</text>
      <text x="48" y="119" font-size="27" fill="#d6dde2">${escapeHtml(viewHeading(filters))}</text>
      <text x="48" y="151" font-size="16" fill="#a0abb4">${matching.length} people tracked · Updated ${updatedLabel}</text>
      ${years
        .map((year) => {
          const left =
            x +
            ((monthNumber(`${year}-01`) - firstMonth) / months) * chartWidth;
          return `<text x="${left + 7}" y="201" font-size="11" fill="#969fa6">${year}</text><path d="M${left} ${chartTop}V${chartBottom}" stroke="#212427"/>`;
        })
        .join("")}
      <path d="M${x} ${chartTop - 28}V${chartBottom}" stroke="#2a2e32"/>
      ${rows
        .map(({ person, top, height }, personIndex) => {
          const nameClip = `name-${personIndex}`;
          return `<path d="M48 ${top}H1152" stroke="#272b2e"/>
          <clipPath id="${nameClip}"><rect x="48" y="${top}" width="206" height="${height}"/></clipPath>
          <g clip-path="url(#${nameClip})">
            <text x="48" y="${top + height / 2 - 3}" font-size="14" font-weight="500" fill="#e4e9ec">${escapeHtml(person.name)}</text>
            <text x="48" y="${top + height / 2 + 14}" font-size="11" fill="${filters.cohort ? "#d8dee2" : "#969fa6"}">${escapeHtml(cohortById.get(person.cohort).label)}</text>
          </g>
          ${person.roles
            .map((role, roleIndex) => {
              const start = Math.max(0, monthNumber(role.start) - firstMonth);
              const end = Math.min(months, monthNumber(role.end) - firstMonth);
              const left = x + (start / months) * chartWidth;
              const width = Math.max(0, ((end - start) / months) * chartWidth);
              const y = top + 19 + (role.lane ?? 0) * 22;
              const compact =
                monthNumber(role.end) - monthNumber(role.start) <= 7;
              const id = `clip-${personIndex}-${roleIndex}`;
              return `<clipPath id="${id}"><rect x="${left}" y="${y}" width="${width}" height="19" rx="2"/></clipPath><rect x="${left}" y="${y}" width="${width}" height="19" rx="2" fill="${companyColors[role.company]}"/><text x="${left + (compact ? 2 : 6)}" y="${y + 13}" font-size="${compact ? 10 : 11}" font-weight="500" fill="#fff" clip-path="url(#${id})">${escapeHtml(role.label ?? role.company)}</text>`;
            })
            .join("")}`;
        })
        .join("")}
      <path d="M48 ${chartBottom}H1152" stroke="#272b2e"/>
      <text x="48" y="603" font-size="14" fill="#a0abb4">${matching.length > sample.length ? `+ ${matching.length - sample.length} more people · ` : ""}Explore the full timeline</text>
      <text x="1152" y="603" text-anchor="end" font-size="14" fill="#a0abb4">${escapeHtml(siteUrl.replace("https://", ""))}</text>
    </g>
  </svg>`;
  return svg;
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
