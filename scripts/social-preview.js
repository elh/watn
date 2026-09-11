import { people, companyColors, timelineEnd } from "../src/data.js";
import {
  escapeHtml,
  matchesFilters,
  siteName,
  siteUrl,
  updatedLabel,
  viewHeading,
} from "../src/views.js";
import { previewWindows } from "./preview-windows.js";

const monthNumber = (date) => {
  const [year, month] = date.split("-").map(Number);
  return year * 12 + month - 1;
};
export function previewSvg(filters) {
  const window = previewWindows[filters.cohort];
  if (!window) throw new Error(`Missing preview window: ${filters.cohort}`);
  const firstMonth = monthNumber(window.start);
  const months = monthNumber(timelineEnd) - firstMonth;
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
        Number(timelineEnd.slice(0, 4)) - Number(window.start.slice(0, 4)) + 1,
    },
    (_, index) => Number(window.start.slice(0, 4)) + index,
  );
  const quarterTicks =
    chartWidth / months >= 14
      ? Array.from({ length: months }, (_, month) => month)
          .filter((month) => month % 3 === 0 && month % 12 !== 0)
          .map((month) => {
            const left = x + (month / months) * chartWidth;
            const label = ["Jan", "Apr", "Jul", "Oct"][(month % 12) / 3];
            return `<text x="${left + 7}" y="201" font-size="10" fill="#737d85">${label}</text><path d="M${left} ${chartTop}V${chartBottom}" stroke="#191d20"/>`;
          })
          .join("")
      : "";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="#101112"/>
    <g font-family="sans-serif">
      <text x="48" y="73" font-size="44" font-weight="600" fill="#f2f2ef">${escapeHtml(siteName)}</text>
      <text x="48" y="119" font-size="27" fill="#d6dde2">${escapeHtml(viewHeading(filters))}</text>
      <text x="48" y="151" font-size="16" fill="#a0abb4">${matching.length} people tracked · ${window.start.slice(0, 4)}–present · Updated ${updatedLabel}</text>
      ${quarterTicks}
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
          const currentOrganizations = [
            ...new Set(
              person.roles
                .filter((role) => role.end === timelineEnd)
                .map((role) => role.company),
            ),
          ];
          const currentLabel = currentOrganizations.length
            ? `Now · ${currentOrganizations.join(" · ")}`
            : "No current role reported";
          return `<path d="M48 ${top}H1152" stroke="#272b2e"/>
          <clipPath id="${nameClip}"><rect x="48" y="${top}" width="206" height="${height}"/></clipPath>
          <g clip-path="url(#${nameClip})">
            <text x="48" y="${top + height / 2 - 3}" font-size="14" font-weight="500" fill="#e4e9ec">${escapeHtml(person.name)}</text>
            <text x="48" y="${top + height / 2 + 14}" font-size="11" fill="#a0abb4">${escapeHtml(currentLabel)}</text>
          </g>
          ${person.roles
            .map((role, roleIndex) => {
              const start = Math.max(0, monthNumber(role.start) - firstMonth);
              const end = Math.min(months, monthNumber(role.end) - firstMonth);
              if (end <= start) return "";
              const left = x + (start / months) * chartWidth;
              const width = ((end - start) / months) * chartWidth;
              const y = top + 19 + (role.lane ?? 0) * 22;
              const continues = monthNumber(role.start) < firstMonth;
              const compact = width < 48;
              const padding = continues ? 12 : compact ? 2 : 6;
              const label =
                width - padding > role.company.length * 6.5
                  ? role.company
                  : (role.label ?? role.company);
              const id = `clip-${personIndex}-${roleIndex}`;
              return `<clipPath id="${id}"><rect x="${left}" y="${y}" width="${width}" height="19" rx="2"/></clipPath><g clip-path="url(#${id})"><rect class="role" x="${left}" y="${y}" width="${width}" height="19" rx="2" fill="${companyColors[role.company]}"/>${continues ? `<path d="M${left + 7} ${y + 6}l-3 3.5 3 3.5" fill="none" stroke="#ffffffa8"/>` : ""}<text x="${left + padding}" y="${y + 13}" font-size="${compact ? 10 : 11}" font-weight="500" fill="#fff">${escapeHtml(label)}</text></g>`;
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
