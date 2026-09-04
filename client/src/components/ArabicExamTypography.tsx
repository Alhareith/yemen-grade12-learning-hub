import { useEffect } from "react";
import {
  arabicMathPlainText,
  localizeArabicText,
  renderArabicMathML,
} from "@/exams/arabic-math";
import "@/arabic-math.css";

const MATH_SELECTOR = 'span[dir="ltr"][title][aria-label].font-mono';

export default function ArabicExamTypography() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-arabic-exam]");
    if (!root) return;

    let queued = false;
    const enhance = () => {
      queued = false;
      enhanceMath(root);
      localizeVisibleText(root);
    };
    const queueEnhance = () => {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(enhance);
    };

    enhance();
    const observer = new MutationObserver(queueEnhance);
    observer.observe(root, { childList: true, subtree: true, characterData: true });

    return () => observer.disconnect();
  }, []);

  return null;
}

function enhanceMath(root: HTMLElement): void {
  const spans = root.querySelectorAll<HTMLElement>(MATH_SELECTOR);
  for (let index = 0; index < spans.length; index += 1) {
    const span = spans[index];
    const source = span.getAttribute("title") ?? span.getAttribute("aria-label") ?? span.textContent ?? "";
    const alreadyRendered = span.querySelector("math") !== null && span.dataset.arabicMathSource === source;
    if (alreadyRendered) continue;

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
