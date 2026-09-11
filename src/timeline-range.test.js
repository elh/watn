import { describe, expect, test } from "bun:test";
import { timelineStart, timelineEnd } from "./data.js";
import { monthNumber, readTimeRange, timeRangeUrl } from "./timeline-range.js";
import { emptyFilters, viewUrl } from "./views.js";

const base = "https://elh.github.io/watn/";
const read = (query) => readTimeRange(new URL(`?${query}`, base));
const monthCount = monthNumber(timelineEnd) - monthNumber(timelineStart);
const fraction = (date) =>
  (monthNumber(date) - monthNumber(timelineStart)) / monthCount;

describe("time range permalinks", () => {
  test("a starting year includes January through the latest data", () => {
    expect(read("from=2023")).toEqual({ start: fraction("2023-01"), end: 1 });
    expect(read("from=2023&to=latest")).toEqual(read("from=2023"));
    expect(timeRangeUrl(base, read("from=2023&to=latest")).search).toBe(
      "?from=2023",
    );
  });

  test("fixed ranges include the complete ending year or month", () => {
    expect(read("from=2020&to=2024")).toEqual({
      start: fraction("2020-01"),
      end: fraction("2025-01"),
    });
    expect(read("from=2024-06&to=2024-09")).toEqual({
      start: fraction("2024-06"),
      end: fraction("2024-10"),
    });
    expect(read("from=2024&to=2024")).not.toBeNull();
    expect(read("from=2024-06&to=2024-06")).not.toBeNull();
    expect(read("to=2024")).toEqual({ start: 0, end: fraction("2025-01") });
  });

  test("missing, malformed, empty, and inverted ranges fall back safely", () => {
    for (const query of [
      "",
      "from=",
      "from=oops",
      "from=2024-00",
      "from=2024-13",
      "from=2024-1",
      "from=2024-01-01",
      "from=2024&to=nope",
      "from=2025&to=2024",
      "from=9999",
      "to=2000",
    ])
      expect(read(query)).toBeNull();
  });

  test("dates outside the data bounds are clipped to available history", () => {
    expect(read("from=1900&to=9999")).toEqual({ start: 0, end: 1 });
    // An explicit full range must stay explicit: mobile's default view is scrollable.
    expect(timeRangeUrl(base, { start: 0, end: 1 }).search).toBe(
      `?from=${timelineStart.slice(0, 4)}`,
    );
  });

  test("range links compose with cohort routes, employer filters, and unrelated params", () => {
    const filters = {
      ...emptyFilters,
      cohort: "thinking-machines-founding-team",
      current: "OpenAI",
    };
    const range = read("from=2023");
    const url = timeRangeUrl(
      viewUrl(`${base}?utm_source=friend&from=2021&to=2022`, filters),
      range,
    );
    expect(url.pathname).toBe("/watn/cohorts/thinking-machines-founding-team/");
    expect(url.searchParams.get("current")).toBe("OpenAI");
    expect(url.searchParams.get("utm_source")).toBe("friend");
    expect(readTimeRange(url)).toEqual(range);
    expect(readTimeRange(viewUrl(url, emptyFilters))).toEqual(range);
    expect(timeRangeUrl(url, null).search).toBe(
      "?utm_source=friend&current=OpenAI",
    );
  });

  test("copy links round out partial months and tolerate subpixel boundary drift", () => {
    const url = timeRangeUrl(base, {
      start: fraction("2023-01") - 0.005 / monthCount,
      end: 1,
    });
    expect(url.search).toBe("?from=2023");
    const partial = timeRangeUrl(base, {
      start: fraction("2024-04") + 0.4 / monthCount,
      end: fraction("2024-09") + 0.3 / monthCount,
    });
    expect(partial.search).toBe("?from=2024-04&to=2024-09");
  });

  test("month and year links round trip without changing their date boundaries", () => {
    for (const query of [
      "from=2023",
      "from=2020&to=2024",
      "from=2024-06&to=2024-09",
      "from=2026-09",
      "from=2010",
    ])
      expect(readTimeRange(timeRangeUrl(base, read(query)))).toEqual(
        read(query),
      );
  });
});
