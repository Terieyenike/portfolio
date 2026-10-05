export interface ResumeEntry {
  title: string;
  organization: string;
  dates: string;
  details: string[];
}

// Add your actual work and education history here before sharing the résumé.
// Keep achievements specific: mention the problem, your contribution, and a
// measurable result whenever you can.
export const experience: ResumeEntry[] = [];
export const education: ResumeEntry[] = [];

// Example entry to copy and edit:
// {
//   title: "[Your role]",
//   organization: "[Organization]",
//   dates: "[Month YYYY – Month YYYY]",
//   details: ["[What you delivered and the measurable result]"]
// }

export const focusAreas = [
  "Software engineering",
  "DevOps and cloud workflows",
  "Developer tools",
  "PostgreSQL",
  "Technical writing and developer education",
];
