import { describe, expect, it } from "vitest";
import {
  appRouteHash,
  buildPracticeHash,
  parseAppHash,
  readPracticeSkillIdFromHash,
} from "./routing";

describe("V3 application hash routing", () => {
  it("maps canonical static hashes to typed routes", () => {
    expect(parseAppHash("")).toBe("home");
    expect(parseAppHash(appRouteHash.home)).toBe("home");
    expect(parseAppHash(appRouteHash.curriculum)).toBe("curriculum");
    expect(parseAppHash(appRouteHash.prompts)).toBe("prompts");
    expect(parseAppHash(appRouteHash.resources)).toBe("resources");
    expect(parseAppHash(appRouteHash["exam-pilot"])).toBe("exam-pilot");
    expect(parseAppHash(appRouteHash["design-system-preview"])).toBe("design-system-preview");
    expect(parseAppHash(appRouteHash["design-system-primitives"])).toBe("design-system-primitives");
  });

  it("preserves current safe fallback behavior for unsupported hashes", () => {
    expect(parseAppHash("#")).toBe("home");
    expect(parseAppHash("#unknown")).toBe("home");
    expect(parseAppHash("#curriculum/extra")).toBe("home");
  });

  it("recognizes practice routes without changing current empty-skill behavior", () => {
    expect(parseAppHash("#practice/CPLX-NUMBER-USE")).toBe("practice");
    expect(parseAppHash("#practice/")).toBe("practice");
    expect(readPracticeSkillIdFromHash("#practice/")).toBe("");
  });

  it("encodes and decodes practice skill ids deterministically", () => {
    const skillId = "skill / عربي + %";
    const hash = buildPracticeHash(skillId);

    expect(hash).toBe("#practice/skill%20%2F%20%D8%B9%D8%B1%D8%A8%D9%8A%20%2B%20%25");
    expect(parseAppHash(hash)).toBe("practice");
    expect(readPracticeSkillIdFromHash(hash)).toBe(skillId);
  });

  it("keeps malformed practice encoding non-throwing", () => {
    const malformed = "#practice/%E0%A4%A";

    expect(parseAppHash(malformed)).toBe("practice");
    expect(readPracticeSkillIdFromHash(malformed)).toBe("");
  });

  it("returns an empty practice id for non-practice hashes", () => {
    expect(readPracticeSkillIdFromHash(appRouteHash.curriculum)).toBe("");
    expect(readPracticeSkillIdFromHash(appRouteHash.home)).toBe("");
  });
});
