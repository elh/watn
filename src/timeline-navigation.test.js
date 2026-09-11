import { describe, expect, test } from "bun:test";
import { zoomAt } from "./timeline-navigation.js";

const desktop = {
  zoom: 2,
  nextZoom: 5,
  scrollLeft: 730,
  anchor: 415,
  baseWidth: 896,
  visibleWidth: 800,
};

describe("timeline zoom", () => {
  test("the date beneath the cursor stays fixed through zooming in and out", () => {
    for (const nextZoom of [1.5, 3, 8, 24]) {
      const next = zoomAt({ ...desktop, nextZoom });
      const originalDate =
        (desktop.scrollLeft + desktop.anchor) /
        (desktop.baseWidth * desktop.zoom);
      const resultingDate =
        (next.scrollLeft + desktop.anchor) / (desktop.baseWidth * next.zoom);
      expect(resultingDate).toBeCloseTo(originalDate, 10);
      expect(
        zoomAt({ ...desktop, ...next, nextZoom: desktop.zoom }).scrollLeft,
      ).toBeCloseTo(desktop.scrollLeft, 10);
    }
  });

  test("a moving pinch midpoint pans while preserving the date between the fingers", () => {
    const nextAnchor = 550;
    const next = zoomAt({ ...desktop, nextAnchor });
    expect((next.scrollLeft + nextAnchor) / next.zoom).toBeCloseTo(
      (desktop.scrollLeft + desktop.anchor) / desktop.zoom,
      10,
    );
  });

  test("zoom limits and both ends of the timeline clamp without empty space", () => {
    expect(zoomAt({ ...desktop, nextZoom: 100 }).zoom).toBe(24);
    expect(zoomAt({ ...desktop, nextZoom: 0.01 }).zoom).toBe(1);
    expect(zoomAt({ ...desktop, scrollLeft: 0, nextZoom: 1 }).scrollLeft).toBe(
      0,
    );
    expect(
      zoomAt({ ...desktop, scrollLeft: 5000, nextZoom: 1 }).scrollLeft,
    ).toBe(96);
    expect(zoomAt({ ...desktop, nextAnchor: 9000 }).scrollLeft).toBe(0);
  });

  test("mobile has no pinned gutter and still anchors the same date", () => {
    const mobile = {
      zoom: 1,
      nextZoom: 3,
      baseWidth: 1080,
      visibleWidth: 358,
      scrollLeft: 610,
      anchor: 170,
    };
    const next = zoomAt(mobile);
    expect((next.scrollLeft + mobile.anchor) / next.zoom).toBe(780);
  });
});
