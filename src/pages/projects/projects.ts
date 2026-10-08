export interface Project {
  name: string;
  description: string;
  demoLink?: string;
  repositoryUrl?: string;
  tags: string[];
  featured?: boolean;
  outcome?: string;
}

// Keep project content local so the portfolio build does not depend on GitHub.
const projectDetails: Project[] = [
  {
    name: "Track Trips",
    description: "A travel journal and trip planner for documenting journeys with photos and setting a date for the next trip.",
    demoLink: "https://track-trip-dashboard-with-xata-next.vercel.app/",
    repositoryUrl: "https://github.com/Terieyenike/track-trip-dashboard-with-xata-next",
    tags: ["Next.js", "Xata", "Travel"],
    featured: true,
  },
  {
    name: "Waitlist App",
    description: "A Next.js launch waitlist that securely captures and saves user email addresses in a Xata database.",
    demoLink: "https://waitlist-app-vert.vercel.app/",
    repositoryUrl: "https://github.com/Terieyenike/xata-with-nextjs",
    tags: ["Next.js", "Xata", "Hackathon"],
    featured: true,
    outcome: "Winner of Xata’s hackathon, built in September 2023.",
  },
  {
    name: "Smart Shopping List",
    description: "A smart shopping list app that helps users figure out what they need before they shop.",
    repositoryUrl: "https://github.com/the-collab-lab/tcl-49-smart-shopping-list",
    tags: ["Web app", "Product development", "Distributed teamwork"],
    featured: true,
    outcome: "Shipped with React and Firebase as part of The Collab Lab’s distributed, remote agile team.",
  },
  {
    name: "File Organizer",
    description: "A Python command-line tool that organizes files into folders by extension.",
    demoLink: "https://pypi.org/project/py-file-organizer/",
    repositoryUrl: "https://github.com/Terieyenike/py-file-organizer",
    tags: ["Python", "CLI", "Automation"],
    featured: true,
    outcome: "Packaged and published on PyPI.",
  },
  {
    name: "SQL Notes",
    description: "Practical notes covering SQL setup, database creation, and common workflows.",
    repositoryUrl: "https://github.com/Terieyenike/SQL-notes",
    tags: ["SQL", "PostgreSQL", "Learning"],
  },
  {
    name: "Teri's Portfolio",
    description: "An open-source personal portfolio built to share projects, writing, and resources.",
    repositoryUrl: "https://github.com/Terieyenike/v2",
    tags: ["Astro", "TypeScript", "Open Source"],
  },
];

export async function getProjects(): Promise<Project[]> {
  return projectDetails;
}
