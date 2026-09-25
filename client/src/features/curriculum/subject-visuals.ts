import { v3AssetPaths } from "@/design-system/assets/asset-paths";
import type { SubjectTone } from "@/design-system/components";

export type CurriculumSubjectVisual = Readonly<{
  tone: SubjectTone;
  illustrationSrc: string;
}>;

/**
 * Visual mapping for every stable Subject identity currently present in the
 * Curriculum graph. Subject visibility is still driven by verified Units, not
 * by artwork availability.
 */
export const curriculumSubjectVisuals: Readonly<
  Record<string, CurriculumSubjectVisual>
> = {
  رياضيات: {
    tone: "math",
    illustrationSrc: v3AssetPaths.subjects.math,
  },
  فيزياء: {
    tone: "physics",
    illustrationSrc: v3AssetPaths.subjects.physics,
  },
  كيمياء: {
    tone: "chemistry",
    illustrationSrc: v3AssetPaths.subjects.chemistry,
  },
  أحياء: {
    tone: "biology",
    illustrationSrc: v3AssetPaths.subjects.biology,
  },
  "لغة إنجليزية": {
    tone: "english",
    illustrationSrc: v3AssetPaths.subjects.english,
  },
  "نحو وصرف": {
    tone: "arabic",
    illustrationSrc: v3AssetPaths.subjects.arabic,
  },
  "أدب ونصوص وبلاغة": {
    tone: "arabic",
    illustrationSrc: v3AssetPaths.subjects.arabic,
  },
  قراءة: {
    tone: "arabic",
    illustrationSrc: v3AssetPaths.subjects.arabic,
  },
  "قرآن كريم": {
    tone: "islamic",
    illustrationSrc: v3AssetPaths.subjects.islamic,
  },
  "حديث وتهذيب": {
    tone: "islamic",
    illustrationSrc: v3AssetPaths.subjects.islamic,
  },
  إيمان: {
    tone: "islamic",
    illustrationSrc: v3AssetPaths.subjects.islamic,
  },
  فقه: {
    tone: "islamic",
    illustrationSrc: v3AssetPaths.subjects.islamic,
  },
  "سيرة نبوية": {
    tone: "islamic",
    illustrationSrc: v3AssetPaths.subjects.islamic,
  },
};
