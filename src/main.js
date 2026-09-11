import "./style.css";
import { setupTimelineNavigation } from "./timeline-navigation.js";
import { monthNumber, readTimeRange, timeRangeUrl } from "./timeline-range.js";
import { people, companyColors, timelineStart, timelineEnd } from "./data.js";
import {
  cohorts,
  cohortById,
  emptyFilters,
  escapeHtml,
  matchesFilters,
  readFilters,
  siteName,
  updatedAt,
  updatedLabel,
  viewHeading,
  viewMetadata,
  viewUrl,
} from "./views.js";

function formatMonth(date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}-01T00:00:00Z`));
}

const startMonth = monthNumber(timelineStart);
const totalMonths = monthNumber(timelineEnd) - startMonth;
const yearTicks = Array.from(
  {
    length:
      Number(timelineEnd.slice(0, 4)) - Number(timelineStart.slice(0, 4)) + 1,
  },
  (_, index) => {
    const year = Number(timelineStart.slice(0, 4)) + index;
    return {
      year,
      offset: ((monthNumber(`${year}-01`) - startMonth) / totalMonths) * 100,
    };
  },
);

function tickMarkup(labels = false) {
  return yearTicks
    .map(
      ({ year, offset }) =>
        `<span class="year-tick${labels ? " year-label" : ""}" style="left: ${offset}%">${labels ? year : ""}</span>`,
    )
    .join("");
}

const monthTicks = Array.from({ length: totalMonths }, (_, index) => {
  const month = (startMonth + index) % 12;
  if (month === 0) return "";
  const label = new Intl.DateTimeFormat("en", {
    month: "short",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(2000, month, 1)));
  const year = String(Math.floor((startMonth + index) / 12)).slice(-2);
  return `<span class="month-label${month % 3 === 0 ? " quarter-label" : ""}" style="left: ${(index / totalMonths) * 100}%">${label} ’${year}</span>`;
}).join("");

function roleDescription(role) {
  const dates = `${role.startLabel ?? formatMonth(role.start)} – ${role.end === timelineEnd ? "present" : (role.endLabel ?? formatMonth(role.end))}`;
  return [role.company, role.position, dates].filter(Boolean).join(" · ");
}

function roleMarkup(role, personIndex) {
  const start = monthNumber(role.start) - startMonth;
  const span = monthNumber(role.end) - monthNumber(role.start);
  return `
    <button type="button"
      class="role${span <= 7 ? " role-compact" : ""}"
      style="--start: ${(start / totalMonths) * 100}%; --span: ${(span / totalMonths) * 100}%; --lane: ${role.lane ?? 0}; --color: ${companyColors[role.company]}"
      data-person="${personIndex}"
      data-company="${escapeHtml(role.company)}" data-current="${role.end === timelineEnd}"
      aria-label="${escapeHtml(roleDescription(role))}" title="${escapeHtml(roleDescription(role))}" aria-pressed="false"
    ><span class="role-label">${escapeHtml(role.label ?? role.company)}</span></button>`;
}

function personMarkup(person, personIndex) {
  const lanes = Math.max(...person.roles.map((role) => role.lane ?? 0)) + 1;
  return `
    <div class="person-row" style="--lanes: ${lanes}">
      <div class="person-name">
        <span class="person-name-primary">${escapeHtml(person.name)}</span>
        <button class="person-association" type="button" data-cohort="${person.cohort}" aria-pressed="false" title="Filter by ${escapeHtml(cohortById.get(person.cohort).label)}">${escapeHtml(cohortById.get(person.cohort).label)}</button>
      </div>
      <div class="track">${tickMarkup()}${person.roles.map((role) => roleMarkup(role, personIndex)).join("")}</div>
    </div>`;
}

const organizationCounts = new Map();
const currentOrganizationCounts = new Map();
const cohortCounts = new Map();
people.forEach((person) => {
  const organizations = new Set(person.roles.map((role) => role.company));
  const currentOrganizations = new Set(
    person.roles
      .filter((role) => role.end === timelineEnd)
      .map((role) => role.company),
  );
  for (const organization of organizations)
    organizationCounts.set(
      organization,
      (organizationCounts.get(organization) ?? 0) + 1,
    );
  for (const organization of currentOrganizations)
    currentOrganizationCounts.set(
      organization,
      (currentOrganizationCounts.get(organization) ?? 0) + 1,
    );
  cohortCounts.set(person.cohort, (cohortCounts.get(person.cohort) ?? 0) + 1);
});
const sortedOptions = (counts) =>
  [...counts]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([value, count]) => ({ value, label: value, count }));
const controls = [
  {
    key: "cohort",
    id: "cohort-filter",
    label: "Cohort",
    all: "All cohorts",
    options: cohorts.map(({ id, label }) => ({
      value: id,
      label,
      count: cohortCounts.get(id) ?? 0,
    })),
  },
  {
    key: "org",
    id: "organization-filter",
    label: "Organization · any time",
    all: "All organizations",
    options: sortedOptions(organizationCounts),
  },
  {
    key: "current",
    id: "current-organization-filter",
    label: "Current organization",
    all: "All current organizations",
    options: sortedOptions(currentOrganizationCounts),
  },
];

const linkIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="m10 13 4-4m-6 6-1 1a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0m0 4 1-1a4 4 0 0 1 6 6l-5 5a4 4 0 0 1-6 0" transform="translate(2 1)"/></svg>`;
const chevronIcon = `<svg class="filter-icon filter-chevron" viewBox="0 0 14 14" aria-hidden="true" focusable="false"><path d="m3 5 4 4 4-4"/></svg>`;
const clearIcon = `<svg class="filter-icon" viewBox="0 0 14 14" aria-hidden="true" focusable="false"><path d="m4 4 6 6m0-6-6 6"/></svg>`;

document.querySelector("#app").innerHTML = `
  <header class="page-header">
    <div class="heading-row">
      <h1>${siteName}</h1>
      <button class="copy-link" id="copy-link" type="button">${linkIcon}<span>Copy link</span></button>
    </div>
    <p class="view-heading" id="view-heading" hidden></p>
    <div class="page-meta">
      <p class="view-summary"><span id="result-count" role="status" aria-live="polite" aria-atomic="true"></span><span class="meta-separator" aria-hidden="true">·</span><time datetime="${updatedAt}">Updated ${updatedLabel}</time></p>
    </div>
    <span id="share-status" class="sr-only" role="status"></span>
    <div class="copy-fallback" id="copy-fallback" hidden>
      <label for="share-url">Copy this link</label><input id="share-url" type="text" readonly><button type="button" class="text-button" id="close-copy-fallback">Done</button>
    </div>
  </header>
  <div class="filter-toolbar">
    <div class="filters">
      ${controls
        .map(
          ({ key, id, label, all, options }) => `
        <div class="filter-control" data-filter="${key}">
          <label for="${id}">${label}</label>
          <div class="filter-input">
            <select id="${id}"><option value="">${all}</option>${options.map(({ value, label: optionLabel, count }) => `<option value="${escapeHtml(value)}">${escapeHtml(optionLabel)} (${count})</option>`).join("")}</select>
            ${chevronIcon}
            <button class="clear-filter" type="button" aria-label="Clear ${key === "org" ? "organization" : key === "current" ? "current organization" : "cohort"} filter" disabled>${clearIcon}</button>
          </div>
        </div>`,
        )
        .join("")}
    </div>
    <button class="text-button reset-filters" type="button" id="reset-filters" hidden>Clear all</button>
  </div>
  <div class="timeline-tools">
    <button class="text-button reset-zoom" type="button" id="reset-zoom" hidden>Reset zoom</button>
    <button class="text-button jump-latest" type="button" id="jump-latest">Latest roles <span aria-hidden="true">→</span></button>
  </div>
  <span class="sr-only" id="timeline-keyboard-help">With the timeline focused, press + or - to zoom, 0 to reset, and arrow keys to scroll.</span>
  <div class="timeline-scroll" role="region" aria-label="AI leaders’ career timeline" aria-describedby="timeline-keyboard-help" tabindex="0">
    <div class="timeline">
      <div class="timeline-header"><div class="header-gutter"></div><div class="years">${tickMarkup(true)}${monthTicks}</div></div>
      ${people.map(personMarkup).join("")}
    </div>
  </div>
  <div class="empty-state" id="empty-state" hidden>
    <p>No people match these filters.</p>
    <p class="empty-description">Try clearing a filter to broaden this view.</p>
    <button class="text-button" type="button" id="empty-reset">Reset filters</button>
  </div>

`;

const controlElements = controls.map((control) => {
  const container = document.querySelector(`[data-filter="${control.key}"]`);
  return {
    ...control,
    container,
    select: container.querySelector("select"),
    clear: container.querySelector(".clear-filter"),
  };
});
const timeline = document.querySelector(".timeline");
const timelineScroll = document.querySelector(".timeline-scroll");
const roleElements = [...document.querySelectorAll(".role")];
const personRows = [...document.querySelectorAll(".person-row")];
const cohortElements = [...document.querySelectorAll(".person-association")];
const heading = document.querySelector("#view-heading");
const resultCount = document.querySelector("#result-count");
const resetButton = document.querySelector("#reset-filters");
const emptyState = document.querySelector("#empty-state");
const copyButton = document.querySelector("#copy-link");
const shareStatus = document.querySelector("#share-status");
const copyFallback = document.querySelector("#copy-fallback");
const jumpLatest = document.querySelector("#jump-latest");
const timelineTools = document.querySelector(".timeline-tools");
const resetZoom = document.querySelector("#reset-zoom");
const yearLabels = [...document.querySelectorAll(".year-label")];
let filters = readFilters(new URL(window.location.href));
let visibleRange = readTimeRange(new URL(window.location.href));
let rangeUrlTimer;
let copyTimer;
let shareRevision = 0;

function clearHighlight() {
  timeline.classList.remove("is-highlighting");
  roleElements.forEach((role) => role.classList.remove("is-highlight"));
}

function highlightRoles(predicate) {
  timeline.classList.add("is-highlighting");
  roleElements.forEach((role) =>
    role.classList.toggle("is-highlight", predicate(role)),
  );
}

function syncUrl(replace = false) {
  clearTimeout(rangeUrlTimer);
  const url = timeRangeUrl(
    viewUrl(window.location.href, filters),
    visibleRange,
  );
  if (url.href !== window.location.href)
    window.history[replace ? "replaceState" : "pushState"](null, "", url);
}

function updateMetadata() {
  const metadata = viewMetadata(filters);
  document.title = metadata.title;
  for (const [selector, content] of [
    ['meta[name="description"]', metadata.description],
    ['meta[property="og:title"]', metadata.title],
    ['meta[property="og:description"]', metadata.description],
    ['meta[property="og:url"]', metadata.url],
    ['meta[property="og:image"]', metadata.image],
    ['meta[property="og:image:alt"]', metadata.imageAlt],
    ['meta[name="twitter:title"]', metadata.title],
    ['meta[name="twitter:description"]', metadata.description],
    ['meta[name="twitter:image"]', metadata.image],
    ['meta[name="twitter:image:alt"]', metadata.imageAlt],
  ])
    document.querySelector(selector)?.setAttribute("content", content);
  document
    .querySelector('link[rel="canonical"]')
    ?.setAttribute("href", metadata.url);
}

function updateLatestButton() {
  const scrollable =
    timelineScroll.scrollWidth > timelineScroll.clientWidth + 2;
  jumpLatest.hidden = !scrollable || timelineScroll.hidden;
  timelineTools.hidden =
    timelineScroll.hidden || (jumpLatest.hidden && resetZoom.hidden);
  const atEnd =
    timelineScroll.scrollLeft + timelineScroll.clientWidth >=
    timelineScroll.scrollWidth - 2;
  jumpLatest.disabled = atEnd;
}

function applyFilters({ replace = false } = {}) {
  clearHighlight();
  shareRevision += 1;
  clearTimeout(copyTimer);
  copyButton.querySelector("span").textContent = "Copy link";
  shareStatus.textContent = "";
  copyFallback.hidden = true;
  for (const { key, container, select, clear, options } of controlElements) {
    select.value = filters[key];
    container.classList.toggle("is-active", Boolean(filters[key]));
    clear.disabled = !filters[key];
    // Counts describe what each option would show alongside the other filters.
    options.forEach(({ value, label }, index) => {
      const candidate = { ...filters, [key]: value };
      const count = people.filter((person) =>
        matchesFilters(person, candidate),
      ).length;
      select.options[index + 1].textContent = `${label} (${count})`;
    });
  }
  let count = 0;
  personRows.forEach((row, index) => {
    row.hidden = !matchesFilters(people[index], filters);
    if (!row.hidden) count += 1;
  });
  roleElements.forEach((role) => {
    const key = role.dataset.current === "true" ? "current" : "org";
    const selected = role.dataset.company === filters[key];
    role.classList.toggle("is-selected", selected);
    role.setAttribute("aria-pressed", String(selected));
  });
  cohortElements.forEach((element) =>
    element.setAttribute(
      "aria-pressed",
      String(element.dataset.cohort === filters.cohort),
    ),
  );
  const activeCount = Object.values(filters).filter(Boolean).length;
  heading.textContent = activeCount > 0 ? viewHeading(filters) : "";
  heading.hidden = activeCount === 0;
  heading.classList.toggle("is-filtered", activeCount > 0);
  resultCount.textContent = activeCount
    ? `${count} of ${people.length} people tracked`
    : `${count} ${count === 1 ? "person" : "people"} tracked`;
  resetButton.hidden = activeCount === 0;
  emptyState.hidden = count !== 0;
  timelineScroll.hidden = count === 0;
  syncUrl(replace);
  updateMetadata();
  updateLatestButton();
}

function resetFilters() {
  filters = { ...emptyFilters };
  applyFilters();
  controlElements[0].select.focus();
}

for (const { key, select, clear } of controlElements) {
  select.addEventListener("change", () => {
    filters[key] = select.value;
    applyFilters();
  });
  clear.addEventListener("click", () => {
    filters[key] = "";
    applyFilters();
    select.focus();
  });
}
resetButton.addEventListener("click", resetFilters);
document.querySelector("#empty-reset").addEventListener("click", resetFilters);
window.addEventListener("popstate", () => {
  filters = readFilters(new URL(window.location.href));
  visibleRange = readTimeRange(new URL(window.location.href));
  navigation.setRange(visibleRange);
  applyFilters({ replace: true });
});

for (const element of cohortElements) {
  const highlightCohort = () =>
    highlightRoles(
      (role) =>
        people[Number(role.dataset.person)].cohort === element.dataset.cohort,
    );
  element.addEventListener("pointerenter", (event) => {
    if (event.pointerType !== "touch") highlightCohort();
  });
  element.addEventListener("pointerleave", clearHighlight);
  element.addEventListener("blur", clearHighlight);
  element.addEventListener("focus", highlightCohort);
  element.addEventListener("click", () => {
    filters = { ...emptyFilters, cohort: element.dataset.cohort };
    applyFilters();
  });
}
for (const role of roleElements) {
  const highlightCompany = () =>
    highlightRoles(
      (candidate) => candidate.dataset.company === role.dataset.company,
    );
  role.addEventListener("pointerenter", (event) => {
    if (event.pointerType !== "touch") highlightCompany();
  });
  role.addEventListener("pointerleave", clearHighlight);
  role.addEventListener("focus", highlightCompany);
  role.addEventListener("blur", clearHighlight);
  role.addEventListener("click", () => {
    const key = role.dataset.current === "true" ? "current" : "org";
    filters = { ...emptyFilters, [key]: role.dataset.company };
    applyFilters();
  });
}
timelineScroll.addEventListener("scroll", updateLatestButton, {
  passive: true,
});
const navigation = setupTimelineNavigation({
  viewport: timelineScroll,
  timeline,
  onPanStart: clearHighlight,
  initialRange: visibleRange,
  totalMonths,
  onChange: ({ trackWidth, range }) => {
    if (range !== visibleRange) {
      shareRevision += 1;
      clearTimeout(copyTimer);
      copyButton.querySelector("span").textContent = "Copy link";
      shareStatus.textContent = "";
      copyFallback.hidden = true;
    }
    visibleRange = range;
    resetZoom.hidden = !range;
    const monthWidth = trackWidth / totalMonths;
    const yearStep = Math.max(1, Math.ceil(40 / (monthWidth * 12)));
    yearLabels.forEach((label, index) => {
      label.hidden = index % yearStep !== 0;
    });
    timeline.dataset.detail =
      monthWidth >= 56 ? "months" : monthWidth >= 18 ? "quarters" : "years";
    updateLatestButton();
    clearTimeout(rangeUrlTimer);
    rangeUrlTimer = setTimeout(() => syncUrl(true), 200);
  },
});
resetZoom.addEventListener("click", () => {
  navigation.reset();
  timelineScroll.focus({ preventScroll: true });
});
jumpLatest.addEventListener("click", () => {
  timelineScroll.scrollTo({
    left: timelineScroll.scrollWidth,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "instant"
      : "smooth",
  });
});

copyButton.addEventListener("click", async () => {
  visibleRange = navigation.getRange();
  syncUrl(true);
  const url = window.location.href;
  const revision = shareRevision;
  try {
    await navigator.clipboard.writeText(url);
    if (revision !== shareRevision) return;
    copyButton.querySelector("span").textContent = "Copied";
    shareStatus.textContent = "Link copied";
    copyTimer = setTimeout(() => {
      copyButton.querySelector("span").textContent = "Copy link";
    }, 2000);
  } catch {
    if (revision !== shareRevision) return;
    copyFallback.hidden = false;
    const input = document.querySelector("#share-url");
    input.value = url;
    input.focus();
    input.select();
    shareStatus.textContent = "Select and copy the link below.";
  }
});
document.querySelector("#close-copy-fallback").addEventListener("click", () => {
  copyFallback.hidden = true;
  copyButton.focus();
});

applyFilters({ replace: true });
