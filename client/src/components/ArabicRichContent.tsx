import type { RichContent } from "@shared/exams/question-model";
import {
  arabicMathPlainText,
  localizeArabicText,
  renderArabicMathML,
} from "@/exams/arabic-math";
import "@/arabic-math.css";

export default function ArabicRichContent({ content }: { content: RichContent }) {
  return (
    <span dir="rtl" lang="ar" className="arabic-rich-content">
      {content.map((segment, index) => {
        if (segment.type === "text") {
          return <span key={index}>{localizeArabicText(segment.text)}</span>;
        }

        const display = segment.display === "block" ? "block" : "inline";
        const label = arabicMathPlainText(segment.latex);
        const markup = renderArabicMathML(segment.latex, display);

        return (
          <span
            key={index}
            dir="rtl"
            lang="ar"
            title={label}
            className={display === "block" ? "arabic-math-wrap arabic-math-block" : "arabic-math-wrap arabic-math-inline"}
            dangerouslySetInnerHTML={{ __html: markup }}
          />
        );
      })}
    </span>
  );
}
