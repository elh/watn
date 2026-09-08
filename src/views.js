import { people, timelineEnd } from "./data.js";

export const siteName = "Where are they now?";
export const siteUrl = "https://elh.github.io/watn/";
export const updatedAt = "2026-08-28";
export const updatedLabel = "August 28, 2026";

export const cohorts = [
  [
    "anthropic-founding-team",
    "Anthropic co-founders",
    "Anthropic co-founder",
    "Anthropic founding team",
  ],
  [
    "deepmind-founding-team",
    "DeepMind co-founders",
    "DeepMind co-founder",
    "DeepMind founding team",
  ],
  [
    "meta-fair-founding-team",
    "Meta FAIR co-founders",
    "Meta FAIR co-founder",
    "Meta FAIR founding team",
  ],
  [
    "meta-superintelligence-leadership-team",
    "Meta Superintelligence Labs leadership",
    "Meta Superintelligence Labs leadership",
    "Meta Superintelligence Labs leadership team",
  ],
  [
    "mistral-founding-team",
    "Mistral co-founders",
    "Mistral co-founder",
    "Mistral founding team",
  ],
  [
    "openai-founding-team",
    "OpenAI co-founders",
    "OpenAI co-founder",
    "OpenAI founding team",
  ],
  [
    "ssi-founding-team",
    "SSI co-founders",
    "SSI co-founder",
    "SSI founding team",
  ],
  [
    "thinking-machines-founding-team",
    "Thinking Machines Lab founding team",
    "Thinking Machines Lab founding team",
  ],
  [
    "transformer-research-team",
    "Transformer paper authors",
    "Google Brain · Transformer co-author",
    "Transformer research team",
  ],
  ["xai-founding-team", "xAI founding team", "xAI founding team"],
].map(([id, label, legacy, ...aliases]) => ({ id, label, legacy, aliases }));

export const emptyFilters = { org: "", current: "", cohort: "" };
export const cohortById = new Map(cohorts.map((cohort) => [cohort.id, cohort]));

export function matchesFilters(person, filters) {
  return (
    (!filters.cohort || person.cohort === filters.cohort) &&
    (!filters.org ||
      person.roles.some((role) => role.company === filters.org)) &&
    (!filters.current ||
      person.roles.some(
        (role) => role.company === filters.current && role.end === timelineEnd,
      ))
  );
}

export function viewHeading(filters) {
  const cohortLabel = cohortById.get(filters.cohort)?.label;
  const parts = cohortLabel ? [cohortLabel] : [];
  if (filters.org && filters.org !== filters.current) {
    parts.push(`Have ever been at ${filters.org}`);
  }
  if (filters.current) parts.push(`Currently at ${filters.current}`);
  return parts.join(" · ") || "A timeline of AI leaders’ careers.";
}

export function cohortPath(cohort) {
  return cohortById.has(cohort) ? `cohorts/${cohort}/` : "";
}

const organizations = new Set(
  people.flatMap((person) => person.roles.map((role) => role.company)),
);
const currentOrganizations = new Set(
  people.flatMap((person) =>
    person.roles
      .filter((role) => role.end === timelineEnd)
      .map((role) => role.company),
  ),
);

export function readFilters(url) {
  const pathCohort = url.pathname.match(
    /\/cohorts\/([^/]+)(?:\/(?:index\.html)?)?$/,
  )?.[1];
  const cohortValue = url.searchParams.get("cohort") ?? pathCohort ?? "";
  const cohort =
    cohorts.find(({ id, label, legacy, aliases }) =>
      [id, label, legacy, ...aliases].includes(cohortValue),
    )?.id ?? "";
  const org = url.searchParams.get("org") ?? "";
  const current = url.searchParams.get("current") ?? "";
  return {
    org: organizations.has(org) ? org : "",
    current: currentOrganizations.has(current) ? current : "",
    cohort,
  };
}

// Derive the app root on both a project Pages URL and a local preview server.
export function viewUrl(href, filters) {
  const url = new URL(href);
  const base = url.pathname
    .replace(/index\.html$/, "")
    .replace(/cohorts\/[^/]+\/?$/, "");
  url.pathname = `${base.endsWith("/") ? base : `${base}/`}${cohortPath(filters.cohort)}`;
  for (const parameter of ["org", "current", "cohort"])
    url.searchParams.delete(parameter);
  for (const parameter of ["org", "current"]) {
    if (filters[parameter]) url.searchParams.set(parameter, filters[parameter]);
  }
  return url;
}

export function viewMetadata(filters = emptyFilters) {
  const filtered = Object.values(filters).some(Boolean);
  const imageCohort = filters.cohort || "thinking-machines-founding-team";
  const count = people.filter((person) =>
    matchesFilters(person, filters),
  ).length;
  return {
    title: filtered ? `${viewHeading(filters)} — ${siteName}` : siteName,
    description: `${filtered ? `${viewHeading(filters)}. ` : "Explore AI leaders’ career timelines. "}${count} ${count === 1 ? "person" : "people"} tracked across AI labs, companies, and universities. Updated ${updatedLabel}.`,
    url: new URL(cohortPath(filters.cohort), siteUrl).href,
    image: new URL(`og/${imageCohort}.png`, siteUrl).href,
    imageAlt: `Career timeline preview: ${cohortById.get(imageCohort).label}`,
  };
}

export function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character],
  );
}
