import { describe, expect, it } from "vitest";
import { curriculumGraph } from "@/data/curriculum";
import { curriculumSubjectVisuals } from "./subject-visuals";

describe("Curriculum subject visuals", () => {
  it("covers every stable Subject identity in the current Curriculum graph", () => {
    const missing = curriculumGraph.subjects
      .map((subject) => subject.id)
      .filter((subjectId) => !curriculumSubjectVisuals[subjectId]);

    expect(missing).toEqual([]);
  });

  it("uses the Arabic visual family for all current Arabic-language subjects", () => {
    for (const subjectId of [
      "نحو وصرف",
      "أدب ونصوص وبلاغة",
      "قراءة",
    ]) {
      expect(curriculumSubjectVisuals[subjectId]?.tone).toBe("arabic");
    }
  });

  it("uses the Islamic visual family for all current Islamic subjects", () => {
    for (const subjectId of [
      "قرآن كريم",
      "حديث وتهذيب",
      "إيمان",
      "فقه",
      "سيرة نبوية",
    ]) {
      expect(curriculumSubjectVisuals[subjectId]?.tone).toBe("islamic");
    }
  });
});
