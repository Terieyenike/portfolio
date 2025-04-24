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

// Define a function to get all projects with repository details
export async function getProjects(): Promise<Project[]> {
  const trackTripDetails = await getRepositoryDetails(
    "Terieyenike/track-trip-dashboard-with-xata-next"
  );
  
  const portfolioDetails = await getRepositoryDetails("Terieyenike/v2");
  
  return [
    {
      name: "SQL notes",
      description: "SQL notes - setup, creating databases, and many more",
      demoLink: "https://github.com/Terieyenike/SQL-notes",
      tags: ["Database", "PostgreSQL"],
    },
    {
      ...trackTripDetails,
      name: "Track Trips",
      description:
        "Keep track of all your adventures, never forget the amazing memories",
      demoLink: "https://track-trip-dashboard-with-xata-next.vercel.app/",
      tags: ["Saas"],
    },
    {
      ...portfolioDetails,
      name: "Teri's Portfolio",
      description:
        "An open source personal portfolio site for the community to use freely",
      demoLink: "https://github.com/Terieyenike/v2",
      tags: ["React", "Portfolio"],
    },
  ];
}

// For backward compatibility, export an empty array as the default projects
export const projects: Project[] = [];
