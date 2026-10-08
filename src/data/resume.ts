export interface ResumeEntry {
  title: string;
  organization: string;
  dates: string;
  details: string[];
}

export const experience: ResumeEntry[] = [
  {
    title: "Developer Advocate (Technical Writer)",
    organization: "Hackmamba",
    dates: "Feb 2021 – Oct 2024",
    details: [
      "Created tutorials, blog posts, and documentation about React, Vue, Nuxt, Next.js, and other frontend technologies.",
      "Supported developer engagement through Discord and community initiatives, coordinating content and engineering priorities.",
      "Helped run hackathons with more than 300 participants, including reviewing and judging submissions.",
    ],
  },
  {
    title: "Software Engineer",
    organization: "The Collab Lab",
    dates: "Oct 2022 – Dec 2022",
    details: [
      "Shipped a production smart shopping list app with React and Firebase as part of a distributed, remote agile team.",
      "Used GitHub collaboration practices including code reviews and asynchronous workflows.",
    ],
  },
  {
    title: "Technical Author",
    organization: "ContentLab",
    dates: "Jan 2022 – Nov 2022",
    details: [
      "Partnered with marketing and engineering teams to align developer-focused content with product strategy.",
      "Produced technical content to project briefs and deadlines.",
    ],
  },
  {
    title: "Full-stack Developer",
    organization: "Utiva",
    dates: "Mar 2021 – Sep 2021",
    details: [
      "Resolved LMS backend and PostgreSQL performance issues for a platform serving more than 500 students.",
    ],
  },
];

export const education: ResumeEntry[] = [
  {
    title: "Software Engineering",
    organization: "Zero to Mastery Academy",
    dates: "2020",
    details: [],
  },
];

export const focusAreas = [
  "Software engineering",
  "JavaScript, React, and Next.js",
  "Node.js and Express",
  "PostgreSQL",
  "Developer relations and education",
  "Technical writing and documentation",
  "Developer community and engagement",
];
