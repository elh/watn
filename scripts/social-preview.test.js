import { describe, expect, test } from "bun:test";
import { people, timelineEnd } from "../src/data.js";
import { cohorts, emptyFilters } from "../src/views.js";
import { previewWindows } from "./preview-windows.js";
import { previewSvg } from "./social-preview.js";

describe("cohort social previews", () => {
  test("each cohort has a window beginning before its founding or collaboration", () => {
    expect(Object.keys(previewWindows).sort()).toEqual(
      cohorts.map(({ id }) => id).sort(),
    );
    for (const window of Object.values(previewWindows)) {
      expect(window.start < window.cohortStart).toBe(true);
      expect(window.cohortStart < timelineEnd).toBe(true);
      expect(window.reason.length).toBeGreaterThan(0);
    }
  });

  test("every card keeps its visible roles inside the plot and the latest roles at the right edge", () => {
    for (const { id } of cohorts) {
      const svg = previewSvg({ ...emptyFilters, cohort: id });
      expect(svg).not.toMatch(/NaN|undefined|Infinity/);
      expect(svg).toContain(`${previewWindows[id].start.slice(0, 4)}–present`);
      const bars = [
        ...svg.matchAll(
          /<rect class="role" x="([\d.]+)" y="([\d.]+)" width="([\d.]+)"/g,
        ),
      ];
      expect(bars.length).toBeGreaterThan(0);
      for (const [, x, y, width] of bars) {
        expect(Number(x)).toBeGreaterThanOrEqual(272);
        expect(Number(width)).toBeGreaterThan(0);
        expect(Number(x) + Number(width)).toBeLessThanOrEqual(1152.001);
        expect(Number(y) + 19).toBeLessThan(580);
      }
      expect(
        bars.some(
          ([, x, , width]) =>
            Math.abs(Number(x) + Number(width) - 1152) < 0.001,
        ),
      ).toBe(true);
    }
  });

  test("TML retains the 2022 Google Brain moves and its founding roles", () => {
    const svg = previewSvg({
      ...emptyFilters,
      cohort: "thinking-machines-founding-team",
    });
    expect(svg).toContain("2022–present");
    expect(svg).toContain("Google Brain");
    expect(svg).toContain("Thinking Machines Lab");
    expect(svg).not.toContain("Leap Motion");
    const members = people.filter(
      (person) => person.cohort === "thinking-machines-founding-team",
    );
    for (const member of members) expect(svg).toContain(member.name);
  });

  test("fully out-of-window jobs are excluded and older ongoing jobs have continuation marks", () => {
    const ssi = previewSvg({ ...emptyFilters, cohort: "ssi-founding-team" });
    expect(ssi).not.toContain("Apple AI");
    expect(ssi).not.toContain(">Cue<");
    expect(ssi).toContain("OpenAI");
    const mistral = previewSvg({
      ...emptyFilters,
      cohort: "mistral-founding-team",
    });
    expect(mistral.match(/l-3 3\.5 3 3\.5/g)).toHaveLength(3);
  });
});
