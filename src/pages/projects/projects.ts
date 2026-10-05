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
    name: "File Organizer",
    description: "A Python command-line tool that organizes files into folders by extension.",
    demoLink: "https://pypi.org/project/py-file-organizer/",
    repositoryUrl: "https://github.com/Terieyenike/py-file-organizer",
    tags: ["Python", "CLI", "Automation"],
    featured: true,
    outcome: "Packaged and published on PyPI.",
  },
  {
    name: "Track Trips",
    description: "A trip dashboard for keeping travel plans and memories in one place.",
    demoLink: "https://track-trip-dashboard-with-xata-next.vercel.app/",
    repositoryUrl: "https://github.com/Terieyenike/track-trip-dashboard-with-xata-next",
    tags: ["Next.js", "Xata", "Travel"],
    featured: true,
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
