import "./style.css";

const timelineStart = "2010-01";
const timelineEnd = "2026-09";

// `end` is an exclusive month boundary used to size bars. Display labels preserve
// the published transition month (or year when no reliable month is public).
const people = [
  {
    name: "Sam Altman",
    association: "OpenAI co-founder",
    roles: [{ company: "OpenAI", start: "2015-12", end: timelineEnd }],
  },
  {
    name: "Elon Musk",
    association: "OpenAI co-founder",
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
        start: timelineStart,
        startLabel: "Oct 2008",
        end: timelineEnd,
        lane: 1,
      },
      {
        company: "xAI",
        start: "2023-03",
        end: "2026-02",
        endLabel: "Feb 2026",
        lane: 2,
      },
      {
        company: "SpaceX",
        start: "2026-02",
        end: timelineEnd,
        lane: 2,
      },
    ],
  },
  {
    name: "Greg Brockman",
    association: "OpenAI co-founder",
    roles: [{ company: "OpenAI", start: "2015-12", end: timelineEnd }],
  },
  {
    name: "Ilya Sutskever",
    association: "OpenAI co-founder",
    roles: [
      {
        company: "U of T ML",
        label: "U of T · PhD",
        position: "PhD",
        start: timelineStart,
        startLabel: "2007",
        end: "2013-06",
        endLabel: "2013",
        lane: 1,
      },
      {
        company: "DNNresearch",
        start: "2012-11",
        end: "2013-03",
        endLabel: "Mar 2013",
      },
      {
        company: "Google Brain",
        start: "2013-03",
        end: "2015-12",
        endLabel: "Nov 2015",
      },
      {
        company: "OpenAI",
        start: "2015-12",
        end: "2024-06",
        endLabel: "May 2024",
      },
      {
        company: "SSI",
        start: "2024-06",
        end: timelineEnd,
      },
    ],
  },
  {
    name: "Andrej Karpathy",
    association: "OpenAI co-founder",
    roles: [
      {
        company: "Stanford AI Lab",
        label: "Stanford · PhD",
        position: "PhD",
        start: "2011-09",
        end: "2015-12",
        endLabel: "2015",
        lane: 0,
      },
      {
        company: "OpenAI",
        start: "2015-12",
        end: "2017-07",
        endLabel: "Jun 2017",
        lane: 0,
      },
      {
        company: "Tesla",
        start: "2017-07",
        startLabel: "Jun 2017",
        end: "2022-08",
        endLabel: "Jul 2022",
        lane: 0,
      },
      {
        company: "OpenAI",
        start: "2023-02",
        end: "2024-03",
        endLabel: "Feb 2024",
        lane: 0,
      },
      {
        company: "Eureka Labs",
        start: "2024-07",
        end: "2026-05",
        endLabel: "May 2026",
        lane: 0,
      },
      {
        company: "Anthropic",
        label: "Anth",
        start: "2026-05",
        end: timelineEnd,
        lane: 0,
      },
    ],
  },
  {
    name: "Durk Kingma",
    association: "OpenAI co-founder",
    roles: [
      {
        company: "University of Amsterdam",
        label: "UvA · PhD",
        position: "PhD",
        start: "2013-01",
        startLabel: "2013",
        end: "2017-07",
        endLabel: "2017",
        lane: 1,
      },
      {
        company: "OpenAI",
        start: "2015-12",
        end: "2018-07",
        endLabel: "2018",
        lane: 0,
      },
      {
        company: "Google Brain",
        start: "2018-07",
        end: "2023-04",
        lane: 0,
      },
      {
        company: "Google DeepMind",
        start: "2023-04",
        end: "2024-10",
        endLabel: "Oct 2024",
        lane: 0,
      },
      {
        company: "Anthropic",
        start: "2024-10",
        end: timelineEnd,
        lane: 0,
      },
    ],
  },
  {
    name: "John Schulman",
    association: "OpenAI co-founder",
    roles: [
      {
        company: "UC Berkeley",
        label: "Berkeley · PhD",
        position: "PhD",
        start: "2011-09",
        end: "2016-06",
        endLabel: "2016",
        lane: 1,
      },
      {
        company: "OpenAI",
        start: "2015-12",
        end: "2024-08",
        endLabel: "Aug 2024",
        lane: 0,
      },
      {
        company: "Anthropic",
        label: "Anth",
        start: "2024-08",
        end: "2025-02",
        endLabel: "Feb 2025",
        lane: 0,
      },
      {
        company: "Thinking Machines Lab",
        start: "2025-02",
        end: timelineEnd,
        lane: 0,
      },
    ],
  },
  {
    name: "Wojciech Zaremba",
    association: "OpenAI co-founder",
    roles: [
      {
        company: "NYU CILVR",
        label: "NYU · PhD",
        position: "PhD",
        start: "2013-09",
        end: "2016-06",
        endLabel: "2016",
        lane: 1,
      },
      {
        company: "Google Brain",
        label: "GB · intern",
        position: "Research internship",
        start: "2013-06",
        startLabel: "2013",
        end: "2014-06",
        endLabel: "2014",
        lane: 2,
      },
      {
        company: "Meta FAIR",
        label: "FAIR · intern",
        position: "Research internship",
        start: "2014-06",
        startLabel: "2014",
        end: "2015-06",
        endLabel: "2015",
        lane: 2,
      },
      {
        company: "OpenAI",
        start: "2015-12",
        end: timelineEnd,
        lane: 0,
      },
    ],
  },
  {
    name: "Yann LeCun",
    association: "Meta FAIR co-founder",
    roles: [
      {
        company: "NYU CILVR",
        label: "NYU · faculty",
        position: "Faculty",
        start: timelineStart,
        startLabel: "2003",
        end: timelineEnd,
        lane: 1,
      },
      {
        company: "Meta FAIR",
        label: "FAIR",
        start: "2013-12",
        end: "2026-01",
        endLabel: "Dec 2025",
        lane: 0,
      },
      {
        company: "AMI Labs",
        start: "2026-01",
        end: timelineEnd,
        lane: 0,
      },
    ],
  },
  {
    name: "Rob Fergus",
    association: "Meta FAIR co-founder",
    roles: [
      {
        company: "NYU CILVR",
        label: "NYU · faculty",
        position: "Faculty",
        start: timelineStart,
        startLabel: "2007",
        end: timelineEnd,
        lane: 1,
      },
      {
        company: "Meta FAIR",
        label: "FAIR",
        start: "2013-12",
        end: "2020-06",
        endLabel: "Jun 2020",
        lane: 0,
      },
      {
        company: "DeepMind",
        label: "DM",
        start: "2020-06",
        end: "2023-04",
        lane: 0,
      },
      {
        company: "Google DeepMind",
        label: "GDM",
        start: "2023-04",
        end: "2025-05",
        endLabel: "May 2025",
        lane: 0,
      },
      {
        company: "Meta FAIR",
        label: "FAIR",
        start: "2025-05",
        end: timelineEnd,
        lane: 0,
      },
    ],
  },
  {
    name: "Ashish Vaswani",
    association: "Google Brain · Transformer co-author",
    roles: [
      {
        company: "USC ISI",
        label: "USC ISI · PhD",
        position: "PhD",
        start: timelineStart,
        startLabel: "2004",
        end: "2014-06",
        endLabel: "2014",
      },
      {
        company: "Google Brain",
        start: "2016-07",
        end: "2021-11",
        endLabel: "Oct 2021",
      },
      {
        company: "Adept",
        start: "2021-11",
        end: "2022-11",
        endLabel: "Nov 2022",
      },
      {
        company: "Essential AI",
        start: "2023-01",
        end: "2026-06",
        endLabel: "Jun 2026",
      },
      { company: "NVIDIA", start: "2026-06", end: timelineEnd },
    ],
  },
  {
    name: "Noam Shazeer",
    association: "Google Brain · Transformer co-author",
    roles: [
      {
        company: "Google Research",
        start: timelineStart,
        startLabel: "2000",
        end: "2012-01",
        endLabel: "2012",
      },
      {
        company: "Google Brain",
        start: "2012-01",
        startLabel: "2012",
        end: "2021-11",
        endLabel: "Oct 2021",
      },
      {
        company: "Character.AI",
        start: "2021-11",
        end: "2024-08",
        endLabel: "Aug 2024",
      },
      {
        company: "Google DeepMind",
        start: "2024-08",
        end: "2026-06",
        endLabel: "Jun 2026",
      },
      {
        company: "OpenAI",
        label: "OAI",
        start: "2026-06",
        end: timelineEnd,
      },
    ],
  },
  {
    name: "Niki Parmar",
    association: "Google Brain · Transformer co-author",
    roles: [
      {
        company: "Google Brain",
        start: "2015-06",
        end: "2021-11",
        endLabel: "Nov 2021",
      },
      {
        company: "Adept",
        start: "2021-11",
        end: "2022-11",
        endLabel: "Nov 2022",
      },
      {
        company: "Essential AI",
        start: "2023-01",
        end: "2024-10",
        endLabel: "Sep 2024",
      },
      { company: "Anthropic", start: "2024-12", end: timelineEnd },
    ],
  },
  {
    name: "Jakob Uszkoreit",
    association: "Google Brain · Transformer co-author",
    roles: [
      {
        company: "Google Research",
        start: timelineStart,
        startLabel: "2008",
        end: "2012-01",
        endLabel: "2012",
      },
      {
        company: "Google Brain",
        start: "2012-01",
        startLabel: "2012",
        end: "2021-01",
        endLabel: "2021",
      },
      {
        company: "Inceptive",
        start: "2021-01",
        startLabel: "2021",
        end: timelineEnd,
      },
    ],
  },
  {
    name: "Llion Jones",
    association: "Google Brain · Transformer co-author",
    roles: [
      {
        company: "Google Brain",
        start: "2015-06",
        end: "2023-04",
      },
      {
        company: "Google DeepMind",
        label: "GDM",
        start: "2023-04",
        end: "2023-08",
        endLabel: "Aug 2023",
      },
      { company: "Sakana AI", start: "2023-08", end: timelineEnd },
    ],
  },
  {
    name: "Aidan Gomez",
    association: "Google Brain · Transformer co-author",
    roles: [
      {
        company: "Google Brain",
        label: "GB",
        start: "2017-06",
        end: "2017-09",
        endLabel: "2017",
      },
      { company: "Cohere", start: "2019-01", end: timelineEnd },
    ],
  },
  {
    name: "Łukasz Kaiser",
    association: "Google Brain · Transformer co-author",
    roles: [
      {
        company: "Google Brain",
        start: "2013-10",
        end: "2021-04",
        endLabel: "2021",
      },
      { company: "OpenAI", start: "2021-04", end: timelineEnd },
    ],
  },
  {
    name: "Illia Polosukhin",
    association: "Google Brain · Transformer co-author",
    roles: [
      {
        company: "Google Research",
        start: "2014-01",
        end: "2017-09",
        endLabel: "2017",
      },
      { company: "NEAR", start: "2017-09", end: timelineEnd },
    ],
  },
  {
    name: "Demis Hassabis",
    association: "DeepMind co-founder",
    roles: [
      {
        company: "DeepMind",
        start: "2010-09",
        end: "2023-04",
      },
      { company: "Google DeepMind", start: "2023-04", end: timelineEnd },
    ],
  },
  {
    name: "Shane Legg",
    association: "DeepMind co-founder",
    roles: [
      {
        company: "DeepMind",
        start: "2010-09",
        end: "2023-04",
      },
      { company: "Google DeepMind", start: "2023-04", end: timelineEnd },
    ],
  },
  {
    name: "Mustafa Suleyman",
    association: "DeepMind co-founder",
    roles: [
      {
        company: "DeepMind",
        start: "2010-09",
        end: "2019-12",
        endLabel: "Dec 2019",
      },
      {
        company: "Google",
        start: "2019-12",
        end: "2022-01",
        endLabel: "Jan 2022",
      },
      {
        company: "Inflection AI",
        start: "2022-03",
        end: "2024-03",
        endLabel: "Mar 2024",
      },
      { company: "Microsoft AI", start: "2024-03", end: timelineEnd },
    ],
  },
  {
    name: "Dario Amodei",
    association: "Anthropic co-founder",
    roles: [
      {
        company: "Baidu AI Lab",
        start: "2014-11",
        end: "2015-11",
        endLabel: "Oct 2015",
      },
      {
        company: "Google Brain",
        start: "2015-11",
        startLabel: "Nov 2015",
        end: "2016-08",
        endLabel: "Aug 2016",
      },
      {
        company: "OpenAI",
        start: "2016-08",
        end: "2021-01",
        endLabel: "Dec 2020",
      },
      { company: "Anthropic", start: "2021-01", end: timelineEnd },
    ],
  },
  {
    name: "Daniela Amodei",
    association: "Anthropic co-founder",
    roles: [
      {
        company: "OpenAI",
        start: "2018-10",
        end: "2021-01",
        endLabel: "Dec 2020",
      },
      { company: "Anthropic", start: "2021-01", end: timelineEnd },
    ],
  },
  {
    name: "Jack Clark",
    association: "Anthropic co-founder",
    roles: [
      {
        company: "OpenAI",
        start: "2016-09",
        end: "2021-01",
        endLabel: "Dec 2020",
      },
      { company: "Anthropic", start: "2021-01", end: timelineEnd },
    ],
  },
  {
    name: "Jared Kaplan",
    association: "Anthropic co-founder",
    roles: [
      {
        company: "OpenAI",
        start: "2019-01",
        end: "2021-01",
        endLabel: "Dec 2020",
      },
      { company: "Anthropic", start: "2021-01", end: timelineEnd },
    ],
  },
  {
    name: "Sam McCandlish",
    association: "Anthropic co-founder",
    roles: [
      {
        company: "OpenAI",
        start: "2018-05",
        end: "2021-01",
        endLabel: "Dec 2020",
      },
      { company: "Anthropic", start: "2021-01", end: timelineEnd },
    ],
  },
  {
    name: "Tom Brown",
    association: "Anthropic co-founder",
    roles: [
      {
        company: "OpenAI",
        start: "2016-05",
        end: "2017-06",
        endLabel: "May 2017",
      },
      {
        company: "Google Brain",
        start: "2017-08",
        end: "2018-12",
        endLabel: "Nov 2018",
      },
      {
        company: "OpenAI",
        start: "2018-12",
        end: "2021-01",
        endLabel: "Dec 2020",
      },
      { company: "Anthropic", start: "2021-01", end: timelineEnd },
    ],
  },
  {
    name: "Chris Olah",
    association: "Anthropic co-founder",
    roles: [
      {
        company: "Google Brain",
        start: "2016-01",
        startLabel: "2016",
        end: "2018-10",
        endLabel: "Sep 2018",
      },
      {
        company: "OpenAI",
        start: "2018-10",
        end: "2021-01",
        endLabel: "Dec 2020",
      },
      { company: "Anthropic", start: "2021-01", end: timelineEnd },
    ],
  },
  {
    name: "Ben Mann",
    association: "Anthropic co-founder",
    roles: [
      {
        company: "OpenAI",
        start: "2018-01",
        end: "2021-01",
        endLabel: "Dec 2020",
      },
      { company: "Anthropic", start: "2021-01", end: timelineEnd },
    ],
  },
  {
    name: "Mira Murati",
    association: "Thinking Machines Lab founding team",
    roles: [
      {
        company: "Leap Motion",
        start: "2016-01",
        startLabel: "2016",
        end: "2018-06",
        endLabel: "2018",
      },
      {
        company: "OpenAI",
        start: "2018-06",
        end: "2024-10",
        endLabel: "Sep 2024",
      },
      {
        company: "Thinking Machines Lab",
        start: "2025-02",
        end: timelineEnd,
      },
    ],
  },
  {
    name: "Barret Zoph",
    association: "Thinking Machines Lab founding team",
    roles: [
      {
        company: "Google Brain",
        start: "2016-01",
        startLabel: "2016",
        end: "2022-09",
        endLabel: "Aug 2022",
      },
      {
        company: "OpenAI",
        start: "2022-09",
        end: "2024-10",
        endLabel: "Sep 2024",
      },
      {
        company: "Thinking Machines Lab",
        label: "TML",
        start: "2025-02",
        end: "2026-01",
        endLabel: "Jan 2026",
      },
      {
        company: "OpenAI",
        label: "OAI",
        start: "2026-01",
        end: "2026-08",
        endLabel: "Aug 2026",
      },
      {
        company: "Google DeepMind",
        label: "GDM",
        start: "2026-08",
        end: timelineEnd,
      },
    ],
  },
  {
    name: "Luke Metz",
    association: "Thinking Machines Lab founding team",
    roles: [
      {
        company: "Google Brain",
        start: "2017-06",
        end: "2022-09",
        endLabel: "Aug 2022",
      },
      {
        company: "OpenAI",
        start: "2022-09",
        end: "2024-10",
        endLabel: "Oct 2024",
      },
      {
        company: "Thinking Machines Lab",
        label: "TML",
        start: "2025-02",
        end: "2026-01",
        endLabel: "Jan 2026",
      },
      {
        company: "OpenAI",
        label: "OAI",
        start: "2026-01",
        end: "2026-08",
        endLabel: "Aug 2026",
      },
      {
        company: "Meta Superintelligence Labs",
        label: "MSL",
        start: "2026-08",
        end: timelineEnd,
      },
    ],
  },
  {
    name: "Lilian Weng",
    association: "Thinking Machines Lab founding team",
    roles: [
      {
        company: "OpenAI",
        start: "2018-01",
        startLabel: "2018",
        end: "2024-12",
        endLabel: "Nov 2024",
      },
      {
        company: "Thinking Machines Lab",
        label: "TML",
        start: "2025-02",
        end: "2026-07",
        endLabel: "Jul 2026",
      },
      {
        company: "OpenAI",
        label: "OAI",
        start: "2026-07",
        end: timelineEnd,
      },
    ],
  },
  {
    name: "Andrew Tulloch",
    association: "Thinking Machines Lab founding team",
    roles: [
      {
        company: "Meta FAIR",
        start: "2012-01",
        startLabel: "2012",
        end: "2023-10",
        endLabel: "2023",
      },
      {
        company: "OpenAI",
        label: "OAI",
        start: "2023-10",
        end: "2025-01",
        endLabel: "2024",
      },
      {
        company: "Thinking Machines Lab",
        label: "TML",
        start: "2025-01",
        end: "2025-10",
        endLabel: "Oct 2025",
      },
      {
        company: "Meta Superintelligence Labs",
        label: "MSL",
        start: "2025-10",
        end: timelineEnd,
      },
    ],
  },
  {
    name: "Alexandr Wang",
    association: "Meta Superintelligence Labs leadership",
    roles: [
      {
        company: "Scale AI",
        start: "2016-06",
        startLabel: "2016",
        end: "2025-06",
        endLabel: "Jun 2025",
      },
      {
        company: "Meta Superintelligence Labs",
        start: "2025-06",
        end: timelineEnd,
      },
    ],
  },
  {
    name: "Shengjia Zhao",
    association: "Meta Superintelligence Labs leadership",
    roles: [
      {
        company: "OpenAI",
        start: "2017-01",
        startLabel: "2017",
        end: "2025-06",
        endLabel: "Jun 2025",
      },
      {
        company: "Meta Superintelligence Labs",
        start: "2025-06",
        end: timelineEnd,
      },
    ],
  },
  {
    name: "Arthur Mensch",
    association: "Mistral co-founder",
    roles: [
      {
        company: "Google DeepMind",
        start: "2020-01",
        startLabel: "2020",
        end: "2023-04",
        endLabel: "Apr 2023",
      },
      { company: "Mistral", start: "2023-04", end: timelineEnd },
    ],
  },
  {
    name: "Guillaume Lample",
    association: "Mistral co-founder",
    roles: [
      {
        company: "Meta FAIR",
        start: "2016-01",
        startLabel: "2016",
        end: "2023-04",
        endLabel: "Apr 2023",
      },
      { company: "Mistral", start: "2023-04", end: timelineEnd },
    ],
  },
  {
    name: "Timothée Lacroix",
    association: "Mistral co-founder",
    roles: [
      {
        company: "Meta FAIR",
        start: "2017-01",
        startLabel: "2017",
        end: "2023-04",
        endLabel: "Apr 2023",
      },
      { company: "Mistral", start: "2023-04", end: timelineEnd },
    ],
  },
  {
    name: "Daniel Gross",
    association: "SSI co-founder",
    roles: [
      {
        company: "Cue",
        start: timelineStart,
        startLabel: "2010",
        end: "2013-10",
        endLabel: "Oct 2013",
      },
      {
        company: "Apple AI",
        start: "2013-10",
        end: "2017-01",
        endLabel: "Jan 2017",
      },
      {
        company: "SSI",
        start: "2024-06",
        end: "2025-07",
        endLabel: "Jun 2025",
      },
      {
        company: "Meta Superintelligence Labs",
        label: "MSL",
        start: "2025-07",
        end: timelineEnd,
      },
    ],
  },
  {
    name: "Daniel Levy",
    association: "SSI co-founder",
    roles: [
      {
        company: "OpenAI",
        start: "2022-03",
        end: "2024-06",
        endLabel: "Jun 2024",
      },
      { company: "SSI", start: "2024-06", end: timelineEnd },
    ],
  },
  {
    name: "Igor Babuschkin",
    association: "xAI founding team",
    roles: [
      {
        company: "DeepMind",
        start: "2017-01",
        startLabel: "2017",
        end: "2020-11",
        endLabel: "Nov 2020",
      },
      {
        company: "OpenAI",
        start: "2020-11",
        end: "2022-04",
        endLabel: "Mar 2022",
      },
      {
        company: "DeepMind",
        label: "DM",
        start: "2022-04",
        end: "2023-03",
        endLabel: "Feb 2023",
      },
      {
        company: "xAI",
        start: "2023-03",
        end: "2025-09",
        endLabel: "Aug 2025",
      },
      {
        company: "River AI",
        start: "2026-04",
        startLabel: "Apr 2026",
        end: timelineEnd,
      },
    ],
  },
  {
    name: "Manuel Kroiss",
    association: "xAI founding team",
    roles: [
      {
        company: "DeepMind",
        start: "2019-01",
        startLabel: "by 2019",
        end: "2023-03",
        endLabel: "Feb 2023",
      },
      {
        company: "xAI",
        start: "2023-03",
        end: "2026-04",
        endLabel: "Mar 2026",
      },
    ],
  },
  {
    name: "Yuhuai (Tony) Wu",
    association: "xAI founding team",
    roles: [
      {
        company: "Google Research",
        label: "Google",
        start: "2019-01",
        startLabel: "2019",
        end: "2023-03",
        endLabel: "Feb 2023",
      },
      {
        company: "xAI",
        start: "2023-03",
        end: "2026-03",
        endLabel: "Feb 2026",
      },
    ],
  },
  {
    name: "Christian Szegedy",
    association: "xAI founding team",
    roles: [
      {
        company: "Google Research",
        label: "Google",
        start: timelineStart,
        startLabel: "2010",
        end: "2023-03",
        endLabel: "Feb 2023",
      },
      {
        company: "xAI",
        start: "2023-03",
        end: "2025-03",
        endLabel: "Feb 2025",
      },
      {
        company: "Morph Labs",
        label: "Morph",
        start: "2025-06",
        end: "2025-09",
        endLabel: "Aug 2025",
      },
      {
        company: "Math Inc",
        start: "2025-09",
        end: timelineEnd,
      },
    ],
  },
  {
    name: "Jimmy Ba",
    association: "xAI founding team",
    roles: [
      {
        company: "U of T ML",
        label: "U of T · faculty",
        position: "Faculty",
        start: "2018-07",
        startLabel: "2018",
        end: timelineEnd,
        lane: 1,
      },
      {
        company: "xAI",
        start: "2023-03",
        end: "2026-03",
        endLabel: "Feb 2026",
        lane: 0,
      },
    ],
  },
  {
    name: "Toby Pohlen",
    association: "xAI founding team",
    roles: [
      {
        company: "DeepMind",
        start: "2017-01",
        startLabel: "2017",
        end: "2023-04",
        endLabel: "Apr 2023",
      },
      {
        company: "Google DeepMind",
        label: "GDM",
        start: "2023-04",
        end: "2023-06",
        endLabel: "Jun 2023",
      },
      {
        company: "xAI",
        start: "2023-06",
        end: "2026-03",
        endLabel: "Feb 2026",
      },
    ],
  },
  {
    name: "Ross Nordeen",
    association: "xAI founding team",
    roles: [
      {
        company: "Tesla",
        start: "2019-07",
        startLabel: "2019",
        end: "2023-03",
        endLabel: "Feb 2023",
      },
      {
        company: "xAI",
        start: "2023-03",
        end: "2026-04",
        endLabel: "Mar 2026",
      },
    ],
  },
  {
    name: "Kyle Kosic",
    association: "xAI founding team",
    roles: [
      {
        company: "OpenAI",
        start: "2021-01",
        startLabel: "2021",
        end: "2023-05",
        endLabel: "Apr 2023",
      },
      {
        company: "xAI",
        start: "2023-05",
        end: "2024-07",
        endLabel: "Jun 2024",
      },
      {
        company: "OpenAI",
        start: "2024-07",
        end: "2026-01",
        endLabel: "2026",
      },
      {
        company: "Project Prometheus",
        label: "Prometheus",
        start: "2026-01",
        startLabel: "2026",
        end: timelineEnd,
      },
    ],
  },
  {
    name: "Greg Yang",
    association: "xAI founding team",
    roles: [
      {
        company: "Microsoft Research",
        label: "MSR",
        start: "2018-01",
        startLabel: "2018",
        end: "2023-03",
        endLabel: "Feb 2023",
      },
      {
        company: "xAI",
        start: "2023-03",
        end: "2026-02",
        endLabel: "Jan 2026",
      },
    ],
  },
  {
    name: "Guodong Zhang",
    association: "xAI founding team",
    roles: [
      {
        company: "DeepMind",
        start: "2022-08",
        end: "2023-03",
        endLabel: "Feb 2023",
      },
      {
        company: "xAI",
        start: "2023-03",
        end: "2026-04",
        endLabel: "Mar 2026",
      },
    ],
  },
  {
    name: "Zihang Dai",
    association: "xAI founding team",
    roles: [
      {
        company: "Google Brain",
        start: "2020-06",
        startLabel: "2020",
        end: "2023-03",
        endLabel: "Feb 2023",
      },
      {
        company: "xAI",
        start: "2023-03",
        end: "2026-04",
        endLabel: "Mar 2026",
      },
    ],
  },
];

const companyColors = {
  Adept: "#806de0",
  "AMI Labs": "#b65d84",
  Anthropic: "#c86742",
  "Apple AI": "#777c84",
  "Baidu AI Lab": "#3976c5",
  "Character.AI": "#5f9064",
  Cohere: "#5067c6",
  Cue: "#8b6b45",
  DeepMind: "#4788e8",
  DNNresearch: "#6d7784",
  "Eureka Labs": "#bd7a16",
  "Essential AI": "#319181",
  Google: "#4f8df0",
  "Google Brain": "#4f8df0",
  "Google DeepMind": "#4788e8",
  "Google Research": "#4f8df0",
  Inceptive: "#b75382",
  "Inflection AI": "#8773c4",
  "Leap Motion": "#2d9587",
  "Meta FAIR": "#2876d2",
  "Meta Superintelligence Labs": "#316fd1",
  "Microsoft AI": "#4290c3",
  "Microsoft Research": "#4290c3",
  Mistral: "#d46b3e",
  "Math Inc": "#a16440",
  "Morph Labs": "#5977b9",
  NEAR: "#24a08e",
  NVIDIA: "#69a441",
  "NYU CILVR": "#7555a5",
  OpenAI: "#33383a",
  "Project Prometheus": "#b45349",
  "River AI": "#2f8e84",
  "Sakana AI": "#2c7cba",
  "Scale AI": "#397f89",
  SpaceX: "#3d6c93",
  "Stanford AI Lab": "#9a433f",
  SSI: "#8665cb",
  Tesla: "#db3942",
  "Thinking Machines Lab": "#c44d70",
  "U of T ML": "#397bbb",
  "UC Berkeley": "#a2782e",
  "University of Amsterdam": "#b05a3c",
  "USC ISI": "#9b3f45",
  xAI: "#5f686e",
};

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

  organizations.forEach((organization) => {
    organizationCounts.set(
      organization,
      (organizationCounts.get(organization) ?? 0) + 1,
    );
  });

  currentOrganizations.forEach((organization) => {
    currentOrganizationCounts.set(
      organization,
      (currentOrganizationCounts.get(organization) ?? 0) + 1,
    );
  });

  cohortCounts.set(
    person.association,
    (cohortCounts.get(person.association) ?? 0) + 1,
  );
});

const organizations = [...organizationCounts].sort(([a], [b]) =>
  a.localeCompare(b),
);
const currentOrganizations = [...currentOrganizationCounts].sort(([a], [b]) =>
  a.localeCompare(b),
);
const cohorts = [...cohortCounts].sort(([a], [b]) => a.localeCompare(b));

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
const firstTickYear = Number(timelineStart.slice(0, 4));
const lastYear = Number(timelineEnd.slice(0, 4));
const yearTicks = Array.from(
  { length: lastYear - firstTickYear + 1 },
  (_, index) => {
    const year = firstTickYear + index;
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
  const description = [role.company, role.position, dates]
    .filter(Boolean)
    .join(" · ");

  return `
    <span
      class="role${span <= 7 ? " role-compact" : ""}"
      style="--start: ${(start / totalMonths) * 100}%; --span: ${(span / totalMonths) * 100}%; --lane: ${role.lane ?? 0}; --color: ${companyColors[role.company]}"
      data-company="${role.company}"
      data-current="${isCurrent}"
      title="${description}"
      aria-label="${description}"
      aria-pressed="false"
      role="button"
      tabindex="0"
    >${role.label ?? role.company}</span>
  `;
}

function personMarkup(person) {
  const lanes = Math.max(...person.roles.map((role) => role.lane ?? 0)) + 1;

  return `
    <div class="person-row" style="--lanes: ${lanes}">
      <div class="person-name">
        <span class="person-name-primary">${person.name}</span>
        <button class="person-association" type="button" data-cohort="${person.association}" aria-pressed="false">${person.association}</button>
      </div>
      <div class="track">
        ${tickMarkup()}
        ${person.roles.map(roleMarkup).join("")}
      </div>
    </div>
  `;
}

document.querySelector("#app").innerHTML = `
  <header class="page-header">
    <h1>Where are they now?</h1>
    <div class="page-meta">
      <time class="updated" datetime="2026-08-28">Updated August 28th, 2026</time>
      <a href="https://github.com/elh/watn">GitHub</a>
    </div>
  </header>
  <div class="filters">
    <div class="filter-control">
      <label for="organization-filter">Organization</label>
      <div class="filter-input">
        <select id="organization-filter">
          <option value="">All organizations (${people.length})</option>
          ${organizations
            .map(
              ([organization, count]) =>
                `<option value="${organization}">${organization} (${count})</option>`,
            )
            .join("")}
        </select>
        <button class="clear-filter" id="clear-organization-filter" type="button" aria-label="Clear organization filter" title="Clear organization filter" disabled>×</button>
      </div>
    </div>
    <div class="filter-control">
      <label for="current-organization-filter">Current organization</label>
      <div class="filter-input">
        <select id="current-organization-filter">
          <option value="">All current organizations (${people.length})</option>
          ${currentOrganizations
            .map(
              ([organization, count]) =>
                `<option value="${organization}">${organization} (${count})</option>`,
            )
            .join("")}
        </select>
        <button class="clear-filter" id="clear-current-organization-filter" type="button" aria-label="Clear current organization filter" title="Clear current organization filter" disabled>×</button>
      </div>
    </div>
    <div class="filter-control">
      <label for="cohort-filter">Cohort</label>
      <div class="filter-input">
        <select id="cohort-filter">
          <option value="">All cohorts (${people.length})</option>
          ${cohorts
            .map(
              ([cohort, count]) =>
                `<option value="${cohort}">${cohort} (${count})</option>`,
            )
            .join("")}
        </select>
        <button class="clear-filter" id="clear-cohort-filter" type="button" aria-label="Clear cohort filter" title="Clear cohort filter" disabled>×</button>
      </div>
    </div>
  </div>
  <div class="timeline-scroll" role="region" aria-label="AI researcher institutional association timeline" tabindex="0">
    <div class="timeline">
      <div class="timeline-header">
        <div class="header-gutter"></div>
        <div class="years">${tickMarkup(true)}</div>
      </div>
      ${people.map(personMarkup).join("")}
    </div>
  </div>
`;

const timeline = document.querySelector(".timeline");
const organizationFilter = document.querySelector("#organization-filter");
const currentOrganizationFilter = document.querySelector(
  "#current-organization-filter",
);
const cohortFilter = document.querySelector("#cohort-filter");
const clearOrganizationFilter = document.querySelector(
  "#clear-organization-filter",
);
const clearCurrentOrganizationFilter = document.querySelector(
  "#clear-current-organization-filter",
);
const clearCohortFilter = document.querySelector("#clear-cohort-filter");
const roleElements = [...timeline.querySelectorAll(".role")];
const personRows = [...timeline.querySelectorAll(".person-row")];
const cohortElements = [...timeline.querySelectorAll(".person-association")];
const filterQueryParams = [
  ["org", organizationFilter],
  ["current", currentOrganizationFilter],
  ["cohort", cohortFilter],
];

function highlightCompany(company) {
  timeline.classList.add("is-filtering");

  roleElements.forEach((role) => {
    role.classList.toggle("is-org-highlight", role.dataset.company === company);
  });

  personRows.forEach((row) => {
    const hasCompany = [...row.querySelectorAll(".role")].some(
      (role) => role.dataset.company === company,
    );
    row.classList.toggle("is-org-match", hasCompany);
  });
}

function highlightCohort(cohort) {
  timeline.classList.add("is-filtering");

  personRows.forEach((row) => {
    const matchesCohort =
      row.querySelector(".person-association").dataset.cohort === cohort;
    row.classList.toggle("is-org-match", matchesCohort);

    row.querySelectorAll(".role").forEach((role) => {
      role.classList.toggle("is-org-highlight", matchesCohort);
    });
  });
}

function clearCompanyHighlight() {
  timeline.classList.remove("is-filtering");
  roleElements.forEach((role) => role.classList.remove("is-org-highlight"));
  personRows.forEach((row) => row.classList.remove("is-org-match"));
}

function syncFiltersToUrl({ replace = false } = {}) {
  const url = new URL(window.location.href);

  filterQueryParams.forEach(([parameter, filter]) => {
    if (filter.value === "") {
      url.searchParams.delete(parameter);
    } else {
      url.searchParams.set(parameter, filter.value);
    }
  });

  if (url.href === window.location.href) return;

  window.history[replace ? "replaceState" : "pushState"](
    null,
    "",
    url,
  );
}

function restoreFiltersFromUrl() {
  const url = new URL(window.location.href);
  let shouldNormalizeUrl = false;

  filterQueryParams.forEach(([parameter, filter]) => {
    const values = url.searchParams.getAll(parameter);
    const value = values[0] ?? "";
    const isValid = [...filter.options].some(
      (option) => option.value === value,
    );

    filter.value = isValid ? value : "";
    shouldNormalizeUrl ||= values.length > 1 || (value !== "" && !isValid);
    shouldNormalizeUrl ||= values.length === 1 && value === "";
  });

  return shouldNormalizeUrl;
}

function applyFilters({ syncUrl = true, replaceUrl = false } = {}) {
  const organization = organizationFilter.value;
  const currentOrganization = currentOrganizationFilter.value;
  const cohort = cohortFilter.value;
  clearCompanyHighlight();

  clearOrganizationFilter.disabled = organization === "";
  clearCurrentOrganizationFilter.disabled = currentOrganization === "";
  clearCohortFilter.disabled = cohort === "";

  personRows.forEach((row, index) => {
    const roles = people[index].roles;
    const matchesOrganization =
      organization === "" ||
      roles.some((role) => role.company === organization);
    const matchesCurrentOrganization =
      currentOrganization === "" ||
      roles.some(
        (role) =>
          role.company === currentOrganization && role.end === timelineEnd,
      );
    const matchesCohort = cohort === "" || people[index].association === cohort;

    row.hidden =
      !matchesOrganization || !matchesCurrentOrganization || !matchesCohort;
  });

  roleElements.forEach((role) => {
    const activeFilter =
      role.dataset.current === "true" ? currentOrganization : organization;
    role.setAttribute(
      "aria-pressed",
      String(activeFilter !== "" && role.dataset.company === activeFilter),
    );
  });

  cohortElements.forEach((element) => {
    element.setAttribute(
      "aria-pressed",
      String(cohort !== "" && element.dataset.cohort === cohort),
    );
  });

  if (syncUrl) syncFiltersToUrl({ replace: replaceUrl });
}

function toggleRoleFilter(role) {
  const isCurrent = role.dataset.current === "true";
  const filter = isCurrent
    ? currentOrganizationFilter
    : organizationFilter;
  const otherFilter = isCurrent
    ? organizationFilter
    : currentOrganizationFilter;
  const nextValue = filter.value === role.dataset.company ? "" : role.dataset.company;

  filter.value = nextValue;
  if (nextValue !== "") {
    otherFilter.value = "";
    cohortFilter.value = "";
  }
  applyFilters();
}

function toggleCohortFilter(cohort) {
  const nextValue = cohortFilter.value === cohort ? "" : cohort;

  cohortFilter.value = nextValue;
  if (nextValue !== "") {
    organizationFilter.value = "";
    currentOrganizationFilter.value = "";
  }
  applyFilters();
}

organizationFilter.addEventListener("change", applyFilters);
currentOrganizationFilter.addEventListener("change", applyFilters);
cohortFilter.addEventListener("change", applyFilters);
clearOrganizationFilter.addEventListener("click", () => {
  organizationFilter.value = "";
  applyFilters();
});
clearCurrentOrganizationFilter.addEventListener("click", () => {
  currentOrganizationFilter.value = "";
  applyFilters();
});
clearCohortFilter.addEventListener("click", () => {
  cohortFilter.value = "";
  applyFilters();
});

window.addEventListener("popstate", () => {
  const shouldNormalizeUrl = restoreFiltersFromUrl();
  applyFilters({ syncUrl: false });
  if (shouldNormalizeUrl) syncFiltersToUrl({ replace: true });
});

cohortElements.forEach((element) => {
  element.addEventListener("pointerenter", () =>
    highlightCohort(element.dataset.cohort),
  );
  element.addEventListener("pointerleave", () => {
    if (document.activeElement !== element) clearCompanyHighlight();
  });
  element.addEventListener("focus", () =>
    highlightCohort(element.dataset.cohort),
  );
  element.addEventListener("blur", clearCompanyHighlight);
  element.addEventListener("click", () =>
    toggleCohortFilter(element.dataset.cohort),
  );
});

roleElements.forEach((role) => {
  role.addEventListener("pointerenter", () =>
    highlightCompany(role.dataset.company),
  );
  role.addEventListener("pointerleave", () => {
    if (document.activeElement !== role) clearCompanyHighlight();
  });
  role.addEventListener("focus", () => highlightCompany(role.dataset.company));
  role.addEventListener("blur", clearCompanyHighlight);
  role.addEventListener("click", () => toggleRoleFilter(role));
  role.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    toggleRoleFilter(role);
  });
});

const shouldNormalizeUrl = restoreFiltersFromUrl();
applyFilters({ syncUrl: false });
if (shouldNormalizeUrl) syncFiltersToUrl({ replace: true });
