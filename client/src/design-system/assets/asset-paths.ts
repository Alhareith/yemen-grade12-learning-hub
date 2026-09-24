import simulation from "./simulation/exam.webp";
import prompts from "./actions/prompts.webp";
import practice from "./actions/practice.webp";
import curriculum from "./actions/curriculum.webp";

export const v3AssetPaths = {
  simulation,
  actions: {
    prompts,
    practice,
    curriculum,
  },
} as const;

/**
 * The complete Stage 3D subject/brand asset package remains the source of truth.
 * The validation harness materializes only the assets it renders in this stage.
 */
export const v3PendingVisualAssets = [
  "brand/daleel-third-symbol.webp",
  "subjects/math.webp",
  "subjects/physics.webp",
  "subjects/chemistry.webp",
  "subjects/biology.webp",
  "subjects/arabic.webp",
  "subjects/english.webp",
  "subjects/islamic.webp",
  "subjects/social.webp",
] as const;
