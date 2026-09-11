import { timelineStart, timelineEnd } from "./data.js";

export function monthNumber(date) {
  const [year, month] = date.split("-").map(Number);
  return year * 12 + (month ?? 1) - 1;
}

const firstMonth = monthNumber(timelineStart);
const lastMonth = monthNumber(timelineEnd);
const months = lastMonth - firstMonth;

function parseBoundary(value, end = false) {
  if (!/^\d{4}(?:-(?:0[1-9]|1[0-2]))?$/.test(value ?? "")) return null;
  return monthNumber(value) + (end ? (value.length === 4 ? 12 : 1) : 0);
}

// End dates include the named year/month; the timeline itself uses exclusive ends.
export function readTimeRange(url) {
  const from = url.searchParams.get("from");
  const to = url.searchParams.get("to");
  if (from === null && to === null) return null;
  const start = from === null ? firstMonth : parseBoundary(from);
  const end =
    to === null || to === "latest" ? lastMonth : parseBoundary(to, true);
  if (start === null || end === null) return null;
  const clippedStart = Math.max(firstMonth, start);
  const clippedEnd = Math.min(lastMonth, end);
  if (clippedStart >= clippedEnd) return null;
  return {
    start: (clippedStart - firstMonth) / months,
    end: (clippedEnd - firstMonth) / months,
  };
}

function formatBoundary(month, end = false) {
  const year = Math.floor(month / 12);
  const number = (month % 12) + 1;
  if (number === (end ? 12 : 1)) return String(year);
  return `${year}-${String(number).padStart(2, "0")}`;
}

export function timeRangeUrl(href, range) {
  const url = new URL(href);
  url.searchParams.delete("from");
  url.searchParams.delete("to");
  if (!range) return url;
  // Include partially visible months. Tolerate subpixel scroll rounding at a boundary.
  const start = Math.max(0, Math.floor(range.start * months + 0.02));
  const end = Math.min(months, Math.ceil(range.end * months - 0.02));
  if (end <= start) return url;
  url.searchParams.set("from", formatBoundary(firstMonth + start));
  if (end < months)
    url.searchParams.set("to", formatBoundary(firstMonth + end - 1, true));
  return url;
}
