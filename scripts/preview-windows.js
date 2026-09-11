// Editorial windows for the static social cards. All run through timelineEnd.
// cohortStart records the founding/collaboration milestone each card must include.
export const previewWindows = {
  "anthropic-founding-team": {
    start: "2016-01",
    cohortStart: "2021-01",
    reason:
      "Show the founders converging at OpenAI, including the Google Brain connections, before Anthropic.",
  },
  "deepmind-founding-team": {
    start: "2009-01",
    cohortStart: "2010-09",
    reason:
      "Give the 2010 founding a short lead-in and retain the full shared DeepMind history.",
  },
  "meta-fair-founding-team": {
    start: "2012-01",
    cohortStart: "2013-12",
    reason:
      "Show their ongoing NYU work before FAIR, then the later lab moves.",
  },
  "meta-superintelligence-leadership-team": {
    start: "2024-01",
    cohortStart: "2025-06",
    reason:
      "A focused lead-in shows Scale and OpenAI before the two join Meta in 2025.",
  },
  "mistral-founding-team": {
    start: "2021-01",
    cohortStart: "2023-04",
    reason:
      "Two years of the founders' Google and Meta backgrounds before Mistral.",
  },
  "openai-founding-team": {
    start: "2012-01",
    cohortStart: "2015-12",
    reason:
      "Retain Ilya's DNNresearch and Google Brain path before the OpenAI founding.",
  },
  "ssi-founding-team": {
    start: "2022-01",
    cohortStart: "2024-06",
    reason:
      "Include Daniel Levy's OpenAI stint before SSI and Daniel Gross's later Meta move.",
  },
  "thinking-machines-founding-team": {
    start: "2022-01",
    cohortStart: "2025-01",
    reason:
      "Catch Zoph and Metz moving from Google Brain to OpenAI, then Tulloch joining from FAIR, before TML.",
  },
  "transformer-research-team": {
    start: "2012-01",
    cohortStart: "2017-06",
    reason:
      "Show the team's Google Brain history leading up to the 2017 paper and their later companies.",
  },
  "xai-founding-team": {
    start: "2021-01",
    cohortStart: "2023-03",
    reason:
      "Show the researchers' prior labs and Babuschkin's return to DeepMind before xAI.",
  },
};
