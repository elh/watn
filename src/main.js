import "./style.css";

const timelineStart = "2015-12";
const timelineEnd = "2026-09";

// `end` is an exclusive month boundary used to size bars. Display labels preserve
// the published transition month (or year when no reliable month is public).
const people = [
  {
    name: "Sam Altman",
    roles: [
      {
        company: "OpenAI",
        start: "2015-12",
        end: timelineEnd,
        lane: 0,
      },
      {
        company: "Y Combinator",
        start: "2015-12",
        startLabel: "Feb 2014",
        end: "2019-04",
        endLabel: "Mar 2019",
        lane: 1,
      },
    ],
  },
  {
    name: "Elon Musk",
    roles: [
      {
        company: "OpenAI",
        start: "2015-12",
        end: "2018-03",
        endLabel: "Feb 2018",
        lane: 0,
      },
      {
        company: "Tesla",
        start: "2015-12",
        startLabel: "Oct 2008",
        end: timelineEnd,
        lane: 1,
      },
      {
        company: "SpaceX",
        start: "2015-12",
        startLabel: "May 2002",
        end: timelineEnd,
        lane: 2,
      },
      {
        company: "xAI",
        start: "2023-03",
        end: "2026-02",
        endLabel: "Feb 2026",
        lane: 3,
      },
      {
        company: "SpaceXAI",
        start: "2026-02",
        end: timelineEnd,
        lane: 3,
      },
    ],
  },
  {
    name: "Greg Brockman",
    roles: [{ company: "OpenAI", start: "2015-12", end: timelineEnd }],
  },
  {
    name: "Ilya Sutskever",
    roles: [
      {
        company: "OpenAI",
        start: "2015-12",
        end: "2024-06",
        endLabel: "May 2024",
      },
      {
        company: "Safe Superintelligence",
        start: "2024-06",
        end: timelineEnd,
      },
    ],
  },
  {
    name: "Trevor Blackwell",
    roles: [
      {
        company: "OpenAI",
        start: "2015-12",
        end: "2017-06",
        endLabel: "May 2017",
        lane: 0,
      },
      {
        company: "Y Combinator",
        start: "2015-12",
        startLabel: "2005",
        end: "2020-01",
        endLabel: "2019",
        lane: 1,
      },
      {
        company: "Umbrella Research",
        start: "2015-12",
        startLabel: "2011",
        end: timelineEnd,
        lane: 2,
      },
    ],
  },
  {
    name: "Vicki Cheung",
    roles: [
      {
        company: "OpenAI",
        start: "2015-12",
        end: "2018-01",
        endLabel: "Dec 2017",
      },
      {
        company: "Lyft",
        start: "2018-02",
        end: "2020-11",
        endLabel: "Oct 2020",
      },
      { company: "Gantry", start: "2020-11", end: timelineEnd },
    ],
  },
  {
    name: "Andrej Karpathy",
    roles: [
      {
        company: "OpenAI",
        start: "2015-12",
        end: "2017-07",
        endLabel: "Jun 2017",
      },
      {
        company: "Tesla",
        start: "2017-07",
        startLabel: "Jun 2017",
        end: "2022-08",
        endLabel: "Jul 2022",
      },
      {
        company: "Independent",
        label: "Ind.",
        start: "2022-08",
        end: "2023-02",
        endLabel: "Feb 2023",
      },
      {
        company: "OpenAI",
        start: "2023-02",
        end: "2024-03",
        endLabel: "Feb 2024",
      },
      {
        company: "Independent",
        label: "Ind.",
        start: "2024-03",
        end: "2024-07",
        endLabel: "Jul 2024",
      },
      {
        company: "Eureka Labs",
        start: "2024-07",
        end: "2026-05",
        endLabel: "May 2026",
      },
      {
        company: "Anthropic",
        label: "Anth",
        start: "2026-05",
        end: timelineEnd,
      },
    ],
  },
  {
    name: "Durk Kingma",
    roles: [
      {
        company: "OpenAI",
        start: "2015-12",
        end: "2018-07",
        endLabel: "2018",
      },
      {
        company: "Google DeepMind",
        start: "2018-07",
        end: "2024-10",
        endLabel: "Oct 2024",
      },
      { company: "Anthropic", start: "2024-10", end: timelineEnd },
    ],
  },
  {
    name: "John Schulman",
    roles: [
      {
        company: "OpenAI",
        start: "2015-12",
        end: "2024-08",
        endLabel: "Aug 2024",
      },
      {
        company: "Anthropic",
        label: "Anth",
        start: "2024-08",
        end: "2025-02",
        endLabel: "Feb 2025",
      },
      {
        company: "Thinking Machines Lab",
        start: "2025-02",
        end: timelineEnd,
      },
    ],
  },
  {
    name: "Pamela Vagata",
    roles: [
      {
        company: "OpenAI",
        start: "2015-12",
        end: "2017-01",
        endLabel: "2016",
        lane: 0,
      },
      {
        company: "Meta",
        start: "2015-12",
        startLabel: "Oct 2014",
        end: "2017-01",
        endLabel: "Dec 2016",
        lane: 1,
      },
      {
        company: "Stripe",
        start: "2016-01",
        end: "2020-01",
        endLabel: "2019",
        lane: 2,
      },
      {
        company: "Independent",
        start: "2020-01",
        end: "2022-03",
        endLabel: "Mar 2022",
        lane: 0,
      },
      {
        company: "Pebblebed",
        start: "2022-03",
        end: timelineEnd,
        lane: 0,
      },
    ],
  },
  {
    name: "Wojciech Zaremba",
    roles: [{ company: "OpenAI", start: "2015-12", end: timelineEnd }],
  },
];

const companyColors = {
  Anthropic: "#c15f3c",
  "Eureka Labs": "#b66a00",
  Gantry: "#2563a6",
  "Google DeepMind": "#3978d0",
  Independent: "#858b91",
  Lyft: "#d000a8",
  Meta: "#0866d9",
  OpenAI: "#111111",
  Pebblebed: "#557a27",
  "Safe Superintelligence": "#6f4ab7",
  SpaceX: "#254d73",
  SpaceXAI: "#254d73",
  Stripe: "#635bdf",
  Tesla: "#d3262f",
  "Thinking Machines Lab": "#bd3e62",
  "Umbrella Research": "#536574",
  "Y Combinator": "#e65224",
  xAI: "#3f454b",
};

function monthNumber(date) {
  const [year, month] = date.split("-").map(Number);
  return year * 12 + month - 1;
}

function formatMonth(date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}-01T00:00:00Z`));
}

const startMonth = monthNumber(timelineStart);
const totalMonths = monthNumber(timelineEnd) - startMonth;
const firstFullYear = Number(timelineStart.slice(0, 4)) + 1;
const lastYear = Number(timelineEnd.slice(0, 4));
const yearTicks = Array.from(
  { length: lastYear - firstFullYear + 1 },
  (_, index) => {
    const year = firstFullYear + index;
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

function roleMarkup(role) {
  const start = monthNumber(role.start) - startMonth;
  const span = monthNumber(role.end) - monthNumber(role.start);
  const isCurrent = role.end === timelineEnd;
  const dates = `${role.startLabel ?? formatMonth(role.start)} – ${isCurrent ? "present" : (role.endLabel ?? formatMonth(role.end))}`;

  return `
    <span
      class="role${span <= 7 ? " role-compact" : ""}"
      style="--start: ${(start / totalMonths) * 100}%; --span: ${(span / totalMonths) * 100}%; --lane: ${role.lane ?? 0}; --color: ${companyColors[role.company]}"
      title="${role.company} · ${dates}"
      aria-label="${role.company}, ${dates}"
    >${role.label ?? role.company}</span>
  `;
}

function personMarkup(person) {
  const lanes = Math.max(...person.roles.map((role) => role.lane ?? 0)) + 1;

  return `
    <div class="person-row" style="--lanes: ${lanes}">
      <div class="person-name">${person.name}</div>
      <div class="track">
        ${tickMarkup()}
        ${person.roles.map(roleMarkup).join("")}
      </div>
    </div>
  `;
}

document.querySelector("#app").innerHTML = `
  <h1>Where are they now?</h1>
  <div class="timeline-scroll" role="region" aria-label="OpenAI founders company association timeline" tabindex="0">
    <div class="timeline">
      <div class="timeline-header">
        <div class="header-gutter"></div>
        <div class="years">${tickMarkup(true)}</div>
      </div>
      ${people.map(personMarkup).join("")}
    </div>
  </div>
`;
