import { describe, expect, it } from "vitest";
import {
  buildArabicOutputPolicy,
  buildStrictMathArabicRule,
} from "@shared/prompts/arabic-output-policy";

describe("Arabic output policy", () => {
  it("forces Yemeni-style Arabic notation for mathematics", () => {
    const rule = buildStrictMathArabicRule();

    expect(rule).toContain("x→س");
    expect(rule).toContain("f(x)→د(س)");
    expect(rule).toContain("sin→جا");
    expect(rule).toContain("cos→جتا");
    expect(rule).toContain("lim→نها");
    expect(rule).toContain("dx→دس");
    expect(rule).toContain("لا تستخدم x أو y أو f(x)");
    expect(rule).toContain("فحصًا صامتًا");
  });

  it("keeps the strict math rule inside every generated mathematics policy", () => {
    const policy = buildArabicOutputPolicy("رياضيات");
    expect(policy).toContain("قاعدة الرياضيات صارمة");
    expect(policy).toContain("الأرقام العربية ٠١٢٣٤٥٦٧٨٩");
    expect(policy).toContain("المقابل العربي المناسب");
  });

  it("does not incorrectly Arabize standard chemistry formulas", () => {
    const policy = buildArabicOutputPolicy("كيمياء");
    expect(policy).toContain("H₂O");
    expect(policy).toContain("NaCl");
  });
});
