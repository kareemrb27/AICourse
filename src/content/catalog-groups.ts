// The three groups the course library is organised into. Small on purpose: the
// client-side course browser and the server pages both import it.
export const catalogGroups = [
  { id: "start", title: "Start here", description: "Get comfortable with AI, then build your coding foundations." },
  { id: "build", title: "Build your skills", description: "Turn the fundamentals into useful, tested AI applications." },
  { id: "design", title: "Design & specialize", description: "Explore agent systems, production engineering, and your final capstone." },
] as const;

export type CatalogGroupId = (typeof catalogGroups)[number]["id"];
