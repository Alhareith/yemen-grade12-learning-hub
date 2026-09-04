import { describe, expect, it } from "vitest";
import { pilotCalculusExam } from "@/data/exams/pilotExam";
import type { RichContent } from "@shared/exams/question-model";
import {
  arabicMathPlainText,
  collectArabicMathDiagnostics,
  renderArabicMathML,
  toArabicDigits,
} from "./arabic-math";

function mathSources(content: RichContent | undefined): string[] {
  if (!content) return [];
  return content
    .filter((segment): segment is Extract<RichContent[number], { type: "math" }> => segment.type === "math")
    .map((segment) => segment.latex);
}

function allPilotMathSources(): string[] {
  const output: string[] = [];
  for (let questionIndex = 0; questionIndex < pilotCalculusExam.questions.length; questionIndex += 1) {
    const question = pilotCalculusExam.questions[questionIndex];
    output.push(...mathSources(question.stem));
    for (let optionIndex = 0; optionIndex < question.options.length; optionIndex += 1) {
      output.push(...mathSources(question.options[optionIndex].content));
    }
    if (question.explanation) output.push(...mathSources(question.explanation.content));
  }
  return output;
}

describe("Arabic mathematical typography", () => {
  it("uses Arabic-Indic digits and Yemeni-style variable/function names", () => {
    expect(toArabicDigits("2026")).toBe("٢٠٢٦");
    expect(arabicMathPlainText("f(x)=x^2+1")).toContain("د(س)=س^٢+١");
    expect(arabicMathPlainText("sin(x)+cos(x)")).toContain("جا(س)+جتا(س)");
    expect(arabicMathPlainText("ln(x)+C")).toContain("لو(س)+ث");
    expect(arabicMathPlainText("e^(3x)")).toContain("هـ^(٣س)");
  });

  it("renders semantic MathML for fractions, powers, roots, limits and integrals", () => {
    expect(renderArabicMathML("(x^2-4)/(x-2)")).toContain("<mfrac>");
    expect(renderArabicMathML("x^2")).toContain("<msup>");
    expect(renderArabicMathML("√(x+4)")).toContain("<msqrt>");
    expect(renderArabicMathML("lim_{x→0} sin(x)/x = 1")).toContain("<munder>");
    expect(renderArabicMathML("∫_0^2 3 dx")).toContain("<msubsup>");
    expect(renderArabicMathML("∫_0^2 3 dx")).toContain("دس");
  });

  it("sets RTL MathML explicitly rather than relying on the surrounding paragraph", () => {
    const markup = renderArabicMathML("f(x)=x^2+1");
    expect(markup).toContain('dir="rtl"');
    expect(markup).toContain('display="inline"');
    expect(markup).toContain("س");
    expect(markup).not.toContain(">x<");
  });

  it("parses every mathematical segment in the 50-question pilot without leftovers", () => {
    const failures = allPilotMathSources()
      .map((source) => ({ source, diagnostics: collectArabicMathDiagnostics(source) }))
      .filter((entry) => entry.diagnostics.length > 0);

    expect(failures, JSON.stringify(failures, null, 2)).toEqual([]);
  });
});
