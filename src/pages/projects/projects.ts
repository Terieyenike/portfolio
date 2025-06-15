import { getRepositoryDetails } from "../../utils";

export interface Project {
  name: string;
  demoLink: string;
  tags?: string[];
  description?: string;
  postLink?: string;
  demoLinkRel?: string;
  [key: string]: any;
}

// Cache variable
let _projects: Project[] | null = null;

export async function getProjects(): Promise<Project[]> {
  if (_projects) return _projects;

  _projects = [
    {
      ...(await getRepositoryDetails("Terieyenike/py-file-organizer")),
      name: "File Organizer",
      description:
        "A Python CLI tool to organize files into folders by type (extensions).",
      demoLink: "https://pypi.org/project/py-file-organizer/",
      tags: ["Python", "CLI"],
    },
    {
      name: "SQL notes",
      description: "SQL notes - setup, creating databases, and many more",
      demoLink: "https://github.com/Terieyenike/SQL-notes",
      tags: ["Database", "PostgreSQL"],
    },
    {
      ...(await getRepositoryDetails("Terieyenike/track-trip-dashboard-with-xata-next")),
      name: "Track Trips",
      description:
        "Keep track of all your adventures, never forget the amazing memories",
      demoLink: "https://track-trip-dashboard-with-xata-next.vercel.app/",
      tags: ["Saas"],
    },
    {
      ...(await getRepositoryDetails("Terieyenike/v2")),
      name: "Teri's Portfolio",
      description:
        "An open source personal portfolio site for the community to use freely",
      demoLink: "https://github.com/Terieyenike/v2",
      tags: ["React", "Portfolio"],
    },
  ];

  return _projects;
}
