import { appRouteHash } from "@/app/routing";

export type HomeActionId =
  | "curriculum"
  | "practice"
  | "prompts"
  | "resources"
  | "simulation";

export const homeActionHref: Record<HomeActionId, string> = {
  curriculum: appRouteHash.curriculum,
  practice: appRouteHash.curriculum,
  prompts: appRouteHash.prompts,
  resources: appRouteHash.resources,
  simulation: appRouteHash["exam-pilot"],
};

/**
 * Stage 4 contract:
 * Training without an active Practice context falls back to Curriculum.
 * Home has no Practice session context, so its Training entry is intentionally
 * routed to the Curriculum selection flow.
 */
export const homeTrainingFallback = "curriculum" as const;
