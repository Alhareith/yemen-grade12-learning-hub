import { afterEach, describe, expect, it } from "vitest";
import {
  cancelCurriculumReturnAfterPractice,
  consumeCurriculumReturnAfterPractice,
  prepareCurriculumReturnAfterPractice,
} from "./curriculum-return-state";

const context = {
  subjectId: "رياضيات",
  unitId: "math-calculus",
  lessonId: "math-calculus:CHAIN-RULE",
  skillId: "DER-CHAIN",
};

afterEach(() => {
  cancelCurriculumReturnAfterPractice();
});

describe("Curriculum Practice return state", () => {
  it("restores the prepared Curriculum context once", () => {
    prepareCurriculumReturnAfterPractice(context);

    expect(consumeCurriculumReturnAfterPractice()).toEqual(context);
    expect(consumeCurriculumReturnAfterPractice()).toBeNull();
  });

  it("can cancel a pending return when Practice exits elsewhere", () => {
    prepareCurriculumReturnAfterPractice(context);
    cancelCurriculumReturnAfterPractice();

    expect(consumeCurriculumReturnAfterPractice()).toBeNull();
  });

  it("copies prepared context instead of retaining a mutable reference", () => {
    const mutable = { ...context };
    prepareCurriculumReturnAfterPractice(mutable);
    mutable.lessonId = "changed";

    expect(consumeCurriculumReturnAfterPractice()?.lessonId).toBe(
      "math-calculus:CHAIN-RULE",
    );
  });
});
