import simulation from "./simulation/exam.webp";
import prompts from "./actions/prompts.webp";
import practice from "./actions/practice.webp";
import curriculum from "./actions/curriculum.webp";
import brand from "./brand/daleel-third-symbol.webp";
import math from "./subjects/math.webp";
import physics from "./subjects/physics.webp";
import chemistry from "./subjects/chemistry.webp";
import biology from "./subjects/biology.webp";
import arabic from "./subjects/arabic.webp";
import english from "./subjects/english.webp";
import islamic from "./subjects/islamic.webp";
import social from "./subjects/social.webp";

export const v3AssetPaths = {
  brand,
  simulation,
  actions: { prompts, practice, curriculum },
  subjects: { math, physics, chemistry, biology, arabic, english, islamic, social },
} as const;
