import { describe, expect, it } from "vitest";
import {
  buildArabicOutputPolicy,
  buildResponseDepthRule,
  buildStrictMathArabicRule,
} from "@shared/prompts/arabic-output-policy";

describe("Arabic output policy", () => {
  it("forces Yemeni-style Arabic notation for mathematics", () => {
    const rule = buildStrictMathArabicRule();

    expect(rule).toContain("x→س");
    expect(rule).toContain("i→ت");
    expect(rule).toContain("f(x)→د(س)");
    expect(rule).toContain("sin→جا");
    expect(rule).toContain("cos→جتا");
    expect(rule).toContain("lim→نها");
    expect(rule).toContain("dx→دس");
    expect(rule).toContain("لا تستخدم x أو y أو f(x)");
    expect(rule).toContain("ولا تستخدم z أو i");
    expect(rule).toContain("فحصًا صامتًا");
  });

  it("keeps the strict math rule and school-book layout inside every mathematics policy", () => {
    const policy = buildArabicOutputPolicy("رياضيات");
    expect(policy).toContain("قاعدة الرياضيات صارمة");
    expect(policy).toContain("الأرقام العربية ٠١٢٣٤٥٦٧٨٩");
    expect(policy).toContain("تنسيق العرض مثل الكتاب المدرسي");
    expect(policy).toContain("المعطيات، المطلوب، القاعدة أو القانون، التطبيق والحل، النتيجة النهائية");
    expect(policy).toContain("Unicode عربيًا واضحًا");
  });

  it("offers four depth choices only for large tasks and answers small tasks directly", () => {
    const rule = buildResponseDepthRule();

    expect(rule).toContain("إذا كان المطلوب صغيرًا أو مباشرًا");
    expect(rule).toContain("لا تعرض أي خيارات، وأجب مباشرة");
    expect(rule).toContain("إذا كان المطلوب كبيرًا");
    expect(rule).toContain("اختر طريقة الشرح التي تناسبك");
    expect(rule).toContain("١. مرة واحدة");
    expect(rule).toContain("٢. خطوة بخطوة بعمق أكبر");
    expect(rule).toContain("٣. خطوات قليلة مكتملة ومتدرجة");
    expect(rule).toContain("٤. شرح مركز ثم مثال");
    expect(rule).toContain("انتظر «تابع»");
  });

  it("gives the new depth policy priority over older one-response instructions", () => {
    const policy = buildArabicOutputPolicy("رياضيات");
    expect(policy).toContain("مقدمة على أي تعليمات عامة سابقة");
    expect(policy).toContain("خاصة أي عبارة تطلب إكمال كل شيء في رد واحد");
  });

  it("does not incorrectly Arabize standard chemistry formulas", () => {
    const policy = buildArabicOutputPolicy("كيمياء");
    expect(policy).toContain("H₂O");
    expect(policy).toContain("NaCl");
  });
});
