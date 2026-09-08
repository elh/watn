import { describe, expect, test } from "bun:test";
import { people } from "./data.js";
import {
  cohorts,
  emptyFilters,
  matchesFilters,
  readFilters,
  siteUrl,
  viewHeading,
  viewMetadata,
  viewUrl,
} from "./views.js";

describe("shareable views", () => {
  test("every legacy cohort link resolves to its group and survives canonicalization", () => {
    for (const cohort of cohorts) {
      const legacy = new URL(siteUrl);
      legacy.searchParams.set("cohort", cohort.legacy);
      const state = readFilters(legacy);
      expect(state.cohort).toBe(cohort.id);
      const canonical = viewUrl(legacy.href, state);
      expect(canonical.pathname).toBe(`/watn/cohorts/${cohort.id}/`);
      expect(canonical.search).toBe("");
      expect(readFilters(canonical)).toEqual(state);
      expect(viewUrl(canonical.href, state).href).toBe(canonical.href);
      for (const alias of cohort.aliases) {
        legacy.searchParams.set("cohort", alias);
        expect(readFilters(legacy)).toEqual(state);
      }
    }
  });

  test("combined filters survive direct loading and clearing the cohort", () => {
    const state = {
      org: "OpenAI",
      current: "Anthropic",
      cohort: "openai-founding-team",
    };
    const url = viewUrl(`${siteUrl}?utm_source=friend`, state);
    expect(readFilters(url)).toEqual(state);
    expect(url.searchParams.get("utm_source")).toBe("friend");
    const cleared = viewUrl(url.href, { ...state, cohort: "" });
    expect(cleared.pathname).toBe("/watn/");
    expect(readFilters(cleared)).toEqual({ ...state, cohort: "" });
  });

  test("local and index.html roots normalize without duplicating the route", () => {
    const state = { ...emptyFilters, cohort: "openai-founding-team" };
    for (const base of [
      "http://localhost:5173/",
      "http://localhost:5173/index.html",
      siteUrl,
    ]) {
      const canonical = viewUrl(base, state);
      expect(viewUrl(canonical.href, state).href).toBe(canonical.href);
      expect(readFilters(canonical)).toEqual(state);
    }
    const indexUrl = new URL(
      `${siteUrl}cohorts/openai-founding-team/index.html`,
    );
    expect(readFilters(indexUrl)).toEqual(state);
    expect(viewUrl(indexUrl.href, state).href).toBe(
      `${siteUrl}cohorts/openai-founding-team/`,
    );
  });

  test("invalid values and duplicate parameters normalize predictably", () => {
    const url = new URL(
      `${siteUrl}?org=OpenAI&org=Tesla&current=xAI&cohort=missing`,
    );
    const state = readFilters(url);
    expect(state).toEqual({ org: "OpenAI", current: "", cohort: "" });
    expect(viewUrl(url.href, state).search).toBe("?org=OpenAI");
  });

  test("all dataset cohorts have a group label and their own metadata", () => {
    expect(new Set(people.map((person) => person.cohort))).toEqual(
      new Set(cohorts.map(({ id }) => id)),
    );
    for (const { id, label } of cohorts) {
      const metadata = viewMetadata({ ...emptyFilters, cohort: id });
      expect(metadata.title).toBe(`${label} — Where are they now?`);
      expect(metadata.url).toBe(`${siteUrl}cohorts/${id}/`);
      expect(metadata.image).toBe(`${siteUrl}og/${id}.png`);
    }
  });
});

describe("filter meaning and headings", () => {
  test("organization, current organization, and cohort intersect", () => {
    const state = {
      org: "OpenAI",
      current: "Anthropic",
      cohort: "openai-founding-team",
    };
    expect(
      people
        .filter((person) => matchesFilters(person, state))
        .map(({ name }) => name),
    ).toEqual(["Andrej Karpathy", "Durk Kingma"]);
    expect(
      people.filter((person) =>
        matchesFilters(person, { ...state, current: "Cohere" }),
      ),
    ).toHaveLength(0);
  });

  test("headings distinguish past and present roles, current roles, and cohorts", () => {
    expect(viewHeading(emptyFilters)).toBe(
      "A timeline of AI leaders’ careers.",
    );
    expect(viewHeading({ ...emptyFilters, org: "OpenAI" })).toBe(
      "Have ever been at OpenAI",
    );
    expect(viewHeading({ ...emptyFilters, current: "Anthropic" })).toBe(
      "Currently at Anthropic",
    );
    expect(
      viewHeading({
        ...emptyFilters,
        cohort: "openai-founding-team",
        current: "Anthropic",
      }),
    ).toBe("OpenAI co-founders · Currently at Anthropic");
    expect(
      viewHeading({ ...emptyFilters, org: "OpenAI", current: "Anthropic" }),
    ).toBe("Have ever been at OpenAI · Currently at Anthropic");
    expect(
      viewHeading({
        ...emptyFilters,
        org: "Google Brain",
        cohort: "openai-founding-team",
      }),
    ).toBe("OpenAI co-founders · Have ever been at Google Brain");
    expect(
      viewHeading({
        cohort: "openai-founding-team",
        org: "Google Brain",
        current: "Anthropic",
      }),
    ).toBe(
      "OpenAI co-founders · Have ever been at Google Brain · Currently at Anthropic",
    );
    expect(viewHeading({ org: "OpenAI", current: "OpenAI", cohort: "" })).toBe(
      "Currently at OpenAI",
    );
  });
});
