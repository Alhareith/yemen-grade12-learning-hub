export type AppRoute =
  | "home"
  | "curriculum"
  | "prompts"
  | "resources"
  | "practice"
  | "exam-pilot"
  | "design-system-preview"
  | "design-system-primitives";

export type StaticAppRoute = Exclude<AppRoute, "practice">;

export const appRouteHash: Record<StaticAppRoute, string> = {
  home: "",
  curriculum: "#curriculum",
  prompts: "#prompts",
  resources: "#resources",
  "exam-pilot": "#exam-pilot",
  "design-system-preview": "#design-system-preview",
  "design-system-primitives": "#design-system-primitives",
};

export function parseAppHash(hash: string): AppRoute {
  if (hash === appRouteHash["design-system-primitives"]) return "design-system-primitives";
  if (hash === appRouteHash["design-system-preview"]) return "design-system-preview";
  if (hash === appRouteHash["exam-pilot"]) return "exam-pilot";
  if (hash.startsWith("#practice/")) return "practice";
  if (hash === appRouteHash.curriculum) return "curriculum";
  if (hash === appRouteHash.prompts) return "prompts";
  if (hash === appRouteHash.resources) return "resources";
  return "home";
}

export function readPracticeSkillIdFromHash(hash: string): string {
  if (!hash.startsWith("#practice/")) return "";

  try {
    return decodeURIComponent(hash.slice("#practice/".length));
  } catch {
    return "";
  }
}

export function buildPracticeHash(skillId: string): string {
  return `#practice/${encodeURIComponent(skillId)}`;
}
