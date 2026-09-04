import { useEffect } from "react";
import {
  arabicMathPlainText,
  localizeArabicText,
  renderArabicMathML,
} from "@/exams/arabic-math";
import "@/arabic-math.css";

const MATH_SELECTOR = 'span[title][aria-label]';

export default function ArabicExamTypography() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-arabic-exam]");
    if (!root) return;

    let queued = false;
    const enhance = () => {
      queued = false;
      enhanceMath(root);
      polishExamCopy(root);
      localizeVisibleText(root);
    };
    const queueEnhance = () => {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(enhance);
    };

    enhance();
    const observer = new MutationObserver(queueEnhance);
    observer.observe(root, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["title", "aria-label"] });

    return () => observer.disconnect();
  }, []);

  return null;
}

function enhanceMath(root: HTMLElement): void {
  const spans = root.querySelectorAll<HTMLElement>(MATH_SELECTOR);
  for (let index = 0; index < spans.length; index += 1) {
    const span = spans[index];
    const hasRenderedMath = span.querySelector("math") !== null;
    const storedSource = span.dataset.arabicMathSource;
    if (hasRenderedMath && storedSource) continue;

    const candidate = span.getAttribute("title") ?? span.getAttribute("aria-label") ?? span.textContent ?? "";
    const source = storedSource && candidate === arabicMathPlainText(storedSource) ? storedSource : candidate;
    if (!looksLikeLegacyMathSpan(span, source)) continue;

    const display = span.classList.contains("block") ? "block" : "inline";
    const label = arabicMathPlainText(source);
    span.innerHTML = renderArabicMathML(source, display);
    span.dir = "rtl";
    span.lang = "ar";
    span.setAttribute("aria-label", label);
    span.setAttribute("title", label);
    span.dataset.arabicMathSource = source;
    span.classList.remove("font-mono", "bg-white", "px-2", "rounded-lg");
    span.classList.add("arabic-math-wrap", display === "block" ? "arabic-math-block" : "arabic-math-inline");
  }
}

function looksLikeLegacyMathSpan(span: HTMLElement, source: string): boolean {
  if (span.classList.contains("font-mono")) return true;
  if (span.dataset.arabicMathSource) return true;
  return /[=+\-*/^∫√Σ∞≤≥≠→]|\b(?:lim|sin|cos|tan|cot|sec|csc|ln|log|f|x|y)\b/.test(source);
}

function polishExamCopy(root: HTMLElement): void {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  let current = walker.nextNode();
  while (current) {
    if (current instanceof Text && current.data.includes("الزمن الرسمي للمحاكاة")) nodes.push(current);
    current = walker.nextNode();
  }

  for (const node of nodes) {
    node.data = node.data.replace("الزمن الرسمي للمحاكاة", "مدة المؤقت داخل الموقع");
  }
}

function localizeVisibleText(root: HTMLElement): void {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  let current = walker.nextNode();
  while (current) {
    if (current instanceof Text && shouldLocalize(current)) nodes.push(current);
    current = walker.nextNode();
  }

  for (let index = 0; index < nodes.length; index += 1) {
    const node = nodes[index];
    const localized = localizeArabicText(node.data);
    if (localized !== node.data) node.data = localized;
  }
}

function shouldLocalize(node: Text): boolean {
  const parent = node.parentElement;
  if (!parent) return false;
  if (parent.closest("math")) return false;
  if (parent.closest("script, style, code, pre")) return false;
  return /[0-9,]/.test(node.data);
}
