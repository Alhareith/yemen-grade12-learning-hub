import type { ExamQuestion, RichContent } from "@shared/exams/question-model";

export const PILOT_EXAM_ID = "MATH-CALC-2020-ADAPTED-PILOT-01";
export const PILOT_REFERENCE_URL = "https://www.scribd.com/document/787167221/%D8%A7%D8%AE%D8%AA%D8%A8%D8%A7%D8%B1%D8%A7%D8%AA-%D8%A7%D9%84%D8%AA%D9%81%D8%A7%D8%B6%D9%84-%D9%88%D8%A7%D9%84%D8%AA%D9%83%D8%A7%D9%85%D9%84-%D9%85%D8%B9-%D8%A7%D9%84%D8%A7%D8%AC%D8%A7%D8%A8%D8%A9-2020%D9%85-1";
const VERIFICATION_URL = "https://github.com/Alhareith/yemen-grade12-learning-hub/blob/main/research/exams/04-answer-verification.md";
const SOURCE_FILE = "اختبارات التفاضل والتكامل مع الاجابة 2020م";

type ChoiceSpec = { label: string; value: string };
type Spec = { n: number; type: "true-false" | "single-choice"; stem: string; choices: ChoiceSpec[]; correctLabel: string; skill: string; points: number; explanation: string };

function rich(value: string): RichContent {
  const parts = value.split("|");
  const content: RichContent = [];
  for (let index = 0; index < parts.length; index += 1) {
    if (!parts[index]) continue;
    if (index % 2 === 1) content.push({ type: "math", latex: parts[index], display: "inline", altText: parts[index] });
    else content.push({ type: "text", text: parts[index] });
  }
  return content;
}

const specs: Spec[] = [
  { n: 1, type: "true-false", stem: "إذا كانت النهاية التالية موجودة فإن قيمتها تساوي 4:|\\lim_{x\\to2}\\frac{x^2-4}{x-2}|", choices: [{ label: "صح", value: "صح" }, { label: "خطأ", value: "خطأ" }], correctLabel: "صح", skill: "LIM-FACTOR", points: 1, explanation: "بعد التحليل: x²−4=(x−2)(x+2)، ثم تختصر (x−2) فتكون النهاية 4." },
  { n: 2, type: "true-false", stem: "القيمة التالية تساوي صفرًا:|\\lim_{x\\to0}\\frac{\\sin x}{x}|", choices: [{ label: "صح", value: "صح" }, { label: "خطأ", value: "خطأ" }], correctLabel: "خطأ", skill: "LIM-TRIG", points: 1, explanation: "النهاية المثلثية الأساسية تساوي 1 عندما تكون الزاوية بالراديان." },
  { n: 3, type: "true-false", stem: "كل دالة كسرية متصلة على مجموعة الأعداد الحقيقية كلها.", choices: [{ label: "صح", value: "صح" }, { label: "خطأ", value: "خطأ" }], correctLabel: "خطأ", skill: "CONT-POINT", points: 1, explanation: "الدالة الكسرية غير معرفة عند أصفار المقام؛ لذلك لا تكون متصلة عندها." },
  { n: 4, type: "true-false", stem: "إذا كانت f(x)=x^3 فإن f'(2)=12.", choices: [{ label: "صح", value: "صح" }, { label: "خطأ", value: "خطأ" }], correctLabel: "صح", skill: "DER-RULES", points: 1, explanation: "مشتقة x³ هي 3x²، وعند x=2 تكون 12." },
  { n: 5, type: "true-false", stem: "مشتقة \\ln x هي x.", choices: [{ label: "صح", value: "صح" }, { label: "خطأ", value: "خطأ" }], correctLabel: "خطأ", skill: "DER-EXP-LOG", points: 1, explanation: "مشتقة ln x هي 1/x." },
  { n: 6, type: "true-false", stem: "مشتقة \\sin x هي \\cos x.", choices: [{ label: "صح", value: "صح" }, { label: "خطأ", value: "خطأ" }], correctLabel: "صح", skill: "DER-TRIG", points: 1, explanation: "هذه قاعدة اشتقاق أساسية للدوال المثلثية." },
  { n: 7, type: "true-false", stem: "مشتقة e^{2x} هي 2e^{2x}.", choices: [{ label: "صح", value: "صح" }, { label: "خطأ", value: "خطأ" }], correctLabel: "صح", skill: "DER-EXP-LOG", points: 1, explanation: "بتطبيق قاعدة السلسلة نضرب في مشتقة 2x وهي 2." },
  { n: 8, type: "true-false", stem: "مشتقة (3x+1)^5 هي 5(3x+1)^4 فقط.", choices: [{ label: "صح", value: "صح" }, { label: "خطأ", value: "خطأ" }], correctLabel: "خطأ", skill: "DER-CHAIN", points: 1, explanation: "يلزم الضرب في مشتقة الدالة الداخلية 3، فالمشتقة 15(3x+1)^4." },
  { n: 9, type: "true-false", stem: "ميل المماس لمنحنى y=f(x) عند x=a يساوي f'(a) متى كانت المشتقة موجودة.", choices: [{ label: "صح", value: "صح" }, { label: "خطأ", value: "خطأ" }], correctLabel: "صح", skill: "APP-TANGENT", points: 1, explanation: "تعريف المشتقة الهندسي يعطي ميل المماس عند النقطة." },
  { n: 10, type: "true-false", stem: "إذا كان ميل المماس 2 فإن ميل الناظم عند النقطة نفسها يساوي -2.", choices: [{ label: "صح", value: "صح" }, { label: "خطأ", value: "خطأ" }], correctLabel: "خطأ", skill: "APP-NORMAL", points: 1, explanation: "ميل الناظم هو السالب المقلوب لميل المماس، أي -1/2." },
  { n: 11, type: "true-false", stem: "من شروط مبرهنة رول أن تكون الدالة متصلة على الفترة المغلقة وقابلة للاشتقاق على الفترة المفتوحة.", choices: [{ label: "صح", value: "صح" }, { label: "خطأ", value: "خطأ" }], correctLabel: "صح", skill: "THM-ROLLE-CHECK", points: 1, explanation: "هذان شرطان أساسيان، إضافة إلى تساوي قيمتي الطرفين." },
  { n: 12, type: "true-false", stem: "في مبرهنة القيمة المتوسطة توجد نقطة c داخل (a,b) تحقق f'(c)=(f(b)-f(a))/(b-a).", choices: [{ label: "صح", value: "صح" }, { label: "خطأ", value: "خطأ" }], correctLabel: "صح", skill: "THM-MVT-APPLY", points: 1, explanation: "هذه هي نتيجة مبرهنة القيمة المتوسطة عندما تتحقق شروطها." },
  { n: 13, type: "true-false", stem: "النقاط الحرجة للدالة هي فقط النقاط التي عندها f'(x)=0.", choices: [{ label: "صح", value: "صح" }, { label: "خطأ", value: "خطأ" }], correctLabel: "خطأ", skill: "VAR-CRITICAL", points: 1, explanation: "قد تكون النقطة حرجة أيضًا إذا لم توجد المشتقة عندها مع بقاء الدالة معرفة." },
  { n: 14, type: "true-false", stem: "إذا كان f'(x)>0 على فترة فإن f متزايدة على تلك الفترة.", choices: [{ label: "صح", value: "صح" }, { label: "خطأ", value: "خطأ" }], correctLabel: "صح", skill: "VAR-MONOTONICITY", points: 1, explanation: "إشارة المشتقة الموجبة تدل على التزايد." },
  { n: 15, type: "true-false", stem: "إذا تغيرت إشارة f'' حول نقطة وكان المنحنى مستمرًا عندها، فهي نقطة انعطاف.", choices: [{ label: "صح", value: "صح" }, { label: "خطأ", value: "خطأ" }], correctLabel: "صح", skill: "VAR-INFLECTION", points: 1, explanation: "تغير التقعر حول النقطة هو معيار أساسي لنقطة الانعطاف." },
  { n: 16, type: "true-false", stem: "|\\int x^2\\,dx=\\frac{x^3}{3}+C|.", choices: [{ label: "صح", value: "صح" }, { label: "خطأ", value: "خطأ" }], correctLabel: "صح", skill: "INT-BASIC-RULES", points: 1, explanation: "بتطبيق قاعدة القوى في التكامل نحصل على x³/3 + C." },
  { n: 17, type: "true-false", stem: "إذا كانت F دالة أصلية لـ f فإن F'(x)=f(x).", choices: [{ label: "صح", value: "صح" }, { label: "خطأ", value: "خطأ" }], correctLabel: "صح", skill: "INT-ANTIDERIVATIVE", points: 1, explanation: "هذا هو تعريف الدالة الأصلية." },
  { n: 18, type: "true-false", stem: "|\\int_a^a f(x)\\,dx=1| لأي دالة قابلة للتكامل.", choices: [{ label: "صح", value: "صح" }, { label: "خطأ", value: "خطأ" }], correctLabel: "خطأ", skill: "INT-DEFINITE-PROPERTIES", points: 1, explanation: "عندما يتساوى حدا التكامل تكون قيمة التكامل صفرًا." },
  { n: 19, type: "true-false", stem: "يكون التعويض مناسبًا غالبًا عندما يظهر تركيب دوال ومعه عامل يمثل مشتقة الدالة الداخلية.", choices: [{ label: "صح", value: "صح" }, { label: "خطأ", value: "خطأ" }], correctLabel: "صح", skill: "INT-SUBSTITUTION-RECOGNIZE", points: 1, explanation: "هذا هو النمط الشائع الذي يحوله التعويض إلى تكامل أبسط." },
  { n: 20, type: "true-false", stem: "صيغة التكامل بالتجزئة هي |\\int u\\,dv=uv-\\int v\\,du|.", choices: [{ label: "صح", value: "صح" }, { label: "خطأ", value: "خطأ" }], correctLabel: "صح", skill: "INT-BY-PARTS-APPLY", points: 1, explanation: "هذه الصيغة ناتجة من قاعدة اشتقاق حاصل الضرب." },
  { n: 21, type: "single-choice", stem: "احسب النهاية:|\\lim_{x\\to3}\\frac{x^2-9}{x-3}|", choices: [{ label: "أ", value: "3" }, { label: "ب", value: "6" }, { label: "ج", value: "9" }, { label: "د", value: "لا توجد" }], correctLabel: "ب", skill: "LIM-FACTOR", points: 2, explanation: "بعد التحليل والاختصار تصبح النهاية x+3، وعند x=3 تساوي 6." },
  { n: 22, type: "single-choice", stem: "احسب النهاية:|\\lim_{x\\to0}\\frac{\\sqrt{x+4}-2}{x}|", choices: [{ label: "أ", value: "1/4" }, { label: "ب", value: "1/2" }, { label: "ج", value: "2" }, { label: "د", value: "4" }], correctLabel: "أ", skill: "LIM-RATIONALIZE", points: 2, explanation: "بالضرب في المرافق تصبح 1/(√(x+4)+2)، وعند x=0 تساوي 1/4." },
  { n: 23, type: "single-choice", stem: "احسب:|\\lim_{x\\to\\infty}\\frac{3x^2+1}{x^2-5}|", choices: [{ label: "أ", value: "0" }, { label: "ب", value: "1" }, { label: "ج", value: "3" }, { label: "د", value: "∞" }], correctLabel: "ج", skill: "LIM-INFINITY", points: 2, explanation: "درجتا البسط والمقام متساويتان، فالنهاية نسبة معاملي أعلى قوة: 3/1." },
  { n: 24, type: "single-choice", stem: "إذا كانت f(x) معرفة قطعياً بحيث f(x)=x+1 عندما x<2، وf(2)=k، فأي قيمة لـ k تجعلها متصلة عند x=2؟", choices: [{ label: "أ", value: "1" }, { label: "ب", value: "2" }, { label: "ج", value: "3" }, { label: "د", value: "4" }], correctLabel: "ج", skill: "CONT-PARAMETER", points: 2, explanation: "النهاية اليسرى عند 2 هي 3، وللاتصال يجب أن تساوي f(2)." },
  { n: 25, type: "single-choice", stem: "إذا كانت f(x)=4x^3-5x+2، فما f'(x)؟", choices: [{ label: "أ", value: "12x^2-5" }, { label: "ب", value: "12x^2+5" }, { label: "ج", value: "4x^2-5" }, { label: "د", value: "3x^2-5" }], correctLabel: "أ", skill: "DER-RULES", points: 2, explanation: "نشتق حدًا حدًا: مشتقة 4x³ هي 12x² ومشتقة -5x هي -5." },
  { n: 26, type: "single-choice", stem: "إذا كانت f(x)=x^4، فما المشتقة الثانية f''(x)؟", choices: [{ label: "أ", value: "4x^3" }, { label: "ب", value: "12x^2" }, { label: "ج", value: "8x^2" }, { label: "د", value: "24x" }], correctLabel: "ب", skill: "DER-NTH", points: 2, explanation: "f'=4x³ ثم f''=12x²." },
  { n: 27, type: "single-choice", stem: "ما مشتقة f(x)=\\ln(2x)؟", choices: [{ label: "أ", value: "1/(2x)" }, { label: "ب", value: "1/x" }, { label: "ج", value: "2/x" }, { label: "د", value: "2" }], correctLabel: "ب", skill: "DER-EXP-LOG", points: 2, explanation: "بقاعدة السلسلة: (1/(2x))×2 = 1/x." },
  { n: 28, type: "single-choice", stem: "ما مشتقة f(x)=\\cos x؟", choices: [{ label: "أ", value: "sin x" }, { label: "ب", value: "-sin x" }, { label: "ج", value: "cos x" }, { label: "د", value: "-cos x" }], correctLabel: "ب", skill: "DER-TRIG", points: 2, explanation: "مشتقة cos x هي -sin x." },
  { n: 29, type: "single-choice", stem: "ما مشتقة f(x)=(x^2+1)^4؟", choices: [{ label: "أ", value: "4(x^2+1)^3" }, { label: "ب", value: "8x(x^2+1)^3" }, { label: "ج", value: "8x(x^2+1)^4" }, { label: "د", value: "4x(x^2+1)^3" }], correctLabel: "ب", skill: "DER-CHAIN", points: 2, explanation: "نشتق الخارجية ثم نضرب في مشتقة الداخلية 2x: 4(... )³×2x." },
  { n: 30, type: "single-choice", stem: "منحنى y=x^2 عند النقطة (1,1). ما معادلة المماس؟", choices: [{ label: "أ", value: "y=x+1" }, { label: "ب", value: "y=2x-1" }, { label: "ج", value: "y=2x+1" }, { label: "د", value: "y=x-1" }], correctLabel: "ب", skill: "APP-TANGENT", points: 2, explanation: "الميل f'(1)=2، وباستخدام صيغة النقطة والميل: y-1=2(x-1)." },
  { n: 31, type: "single-choice", stem: "إذا كان ميل المماس عند نقطة يساوي 3، فما ميل الناظم؟", choices: [{ label: "أ", value: "3" }, { label: "ب", value: "-3" }, { label: "ج", value: "1/3" }, { label: "د", value: "-1/3" }], correctLabel: "د", skill: "APP-NORMAL", points: 2, explanation: "ميل الناظم هو السالب المقلوب: -1/3." },
  { n: 32, type: "single-choice", stem: "للدالة f(x)=x^2-4x على [0,4] تتحقق شروط رول. ما قيمة c التي تحقق f'(c)=0؟", choices: [{ label: "أ", value: "1" }, { label: "ب", value: "2" }, { label: "ج", value: "3" }, { label: "د", value: "4" }], correctLabel: "ب", skill: "THM-ROLLE-APPLY", points: 2, explanation: "f'=2x-4، وبحل 2x-4=0 نجد c=2." },
  { n: 33, type: "single-choice", stem: "طبّق مبرهنة القيمة المتوسطة على f(x)=x^2 في [1,3]. ما قيمة c؟", choices: [{ label: "أ", value: "1" }, { label: "ب", value: "1.5" }, { label: "ج", value: "2" }, { label: "د", value: "2.5" }], correctLabel: "ج", skill: "THM-MVT-APPLY", points: 2, explanation: "ميل القاطع=(9-1)/(3-1)=4، ونحل 2c=4 فنحصل على c=2." },
  { n: 34, type: "single-choice", stem: "ما النقاط الحرجة للدالة f(x)=x^3-3x؟", choices: [{ label: "أ", value: "0 فقط" }, { label: "ب", value: "1 فقط" }, { label: "ج", value: "-1 و1" }, { label: "د", value: "-3 و3" }], correctLabel: "ج", skill: "VAR-CRITICAL", points: 2, explanation: "f'=3x²-3=3(x²-1)، فتساوي صفرًا عند x=±1." },
  { n: 35, type: "single-choice", stem: "على أي فترة تكون f(x)=x^2 متزايدة؟", choices: [{ label: "أ", value: "(-∞,0)" }, { label: "ب", value: "(0,∞)" }, { label: "ج", value: "(-∞,∞)" }, { label: "د", value: "لا تتزايد" }], correctLabel: "ب", skill: "VAR-MONOTONICITY", points: 2, explanation: "f'=2x وتكون موجبة عندما x>0." },
  { n: 36, type: "single-choice", stem: "ما القيمة العظمى المحلية للدالة f(x)=-x^2+4؟", choices: [{ label: "أ", value: "-4" }, { label: "ب", value: "0" }, { label: "ج", value: "2" }, { label: "د", value: "4" }], correctLabel: "د", skill: "VAR-EXTREMA", points: 2, explanation: "القطع المكافئ مفتوح لأسفل ورأسه عند x=0 وقيمته 4." },
  { n: 37, type: "single-choice", stem: "أين تقع نقطة الانعطاف للدالة f(x)=x^3؟", choices: [{ label: "أ", value: "x=-1" }, { label: "ب", value: "x=0" }, { label: "ج", value: "x=1" }, { label: "د", value: "لا توجد" }], correctLabel: "ب", skill: "VAR-INFLECTION", points: 2, explanation: "f''=6x وتتغير إشارتها حول x=0." },
  { n: 38, type: "single-choice", stem: "احسب:|\\int_0^2 x\\,dx|", choices: [{ label: "أ", value: "1" }, { label: "ب", value: "2" }, { label: "ج", value: "3" }, { label: "د", value: "4" }], correctLabel: "ب", skill: "INT-DEF", points: 2, explanation: "الدالة الأصلية x²/2، وبالتعويض من 0 إلى 2 نحصل على 2." },
  { n: 39, type: "single-choice", stem: "احسب:|\\int_1^3 2x\\,dx|", choices: [{ label: "أ", value: "4" }, { label: "ب", value: "6" }, { label: "ج", value: "8" }, { label: "د", value: "10" }], correctLabel: "ج", skill: "INT-DEF", points: 2, explanation: "الدالة الأصلية x²، فتكون 9-1=8." },
  { n: 40, type: "single-choice", stem: "أوجد:|\\int 3x^2\\,dx|", choices: [{ label: "أ", value: "x^3+C" }, { label: "ب", value: "3x^3+C" }, { label: "ج", value: "x^2+C" }, { label: "د", value: "6x+C" }], correctLabel: "أ", skill: "INT-BASIC-RULES", points: 2, explanation: "مشتقة x³ هي 3x²، لذلك التكامل x³+C." },
  { n: 41, type: "single-choice", stem: "أوجد:|\\int \\frac{1}{x}\\,dx|", choices: [{ label: "أ", value: "1/x+C" }, { label: "ب", value: "ln|x|+C" }, { label: "ج", value: "x+C" }, { label: "د", value: "e^x+C" }], correctLabel: "ب", skill: "INT-BASIC-RULES", points: 2, explanation: "التكامل القياسي لـ1/x هو ln|x|+C." },
  { n: 42, type: "single-choice", stem: "أوجد:|\\int e^{2x}\\,dx|", choices: [{ label: "أ", value: "e^{2x}+C" }, { label: "ب", value: "2e^{2x}+C" }, { label: "ج", value: "\\frac12 e^{2x}+C" }, { label: "د", value: "e^x+C" }], correctLabel: "ج", skill: "INT-EXP", points: 2, explanation: "نقسم على مشتقة الأس 2، فيكون التكامل نصف e^{2x}." },
  { n: 43, type: "single-choice", stem: "أوجد:|\\int \\cos x\\,dx|", choices: [{ label: "أ", value: "sin x+C" }, { label: "ب", value: "-sin x+C" }, { label: "ج", value: "cos x+C" }, { label: "د", value: "-cos x+C" }], correctLabel: "أ", skill: "INT-TRIG", points: 2, explanation: "مشتقة sin x هي cos x." },
  { n: 44, type: "single-choice", stem: "أوجد:|\\int 2x(x^2+1)^3\\,dx|", choices: [{ label: "أ", value: "(x^2+1)^4+C" }, { label: "ب", value: "\\frac14(x^2+1)^4+C" }, { label: "ج", value: "\\frac12(x^2+1)^4+C" }, { label: "د", value: "4(x^2+1)^3+C" }], correctLabel: "ب", skill: "INT-SUBSTITUTION-APPLY", points: 2, explanation: "ضع u=x²+1، فيكون du=2x dx، ثم ∫u³du=u⁴/4." },
  { n: 45, type: "single-choice", stem: "أوجد:|\\int xe^x\\,dx|", choices: [{ label: "أ", value: "xe^x+C" }, { label: "ب", value: "e^x(x-1)+C" }, { label: "ج", value: "e^x(x+1)+C" }, { label: "د", value: "x^2e^x+C" }], correctLabel: "ب", skill: "INT-BY-PARTS-APPLY", points: 2, explanation: "بالتجزئة u=x وdv=e^x dx فنحصل على xe^x-∫e^x dx=e^x(x-1)+C." },
  { n: 46, type: "single-choice", stem: "أي علاقة صحيحة؟", choices: [{ label: "أ", value: "∫_a^b f = ∫_b^a f" }, { label: "ب", value: "∫_a^b f = -∫_b^a f" }, { label: "ج", value: "∫_a^b f = 0 دائمًا" }, { label: "د", value: "∫_a^b f = 1 دائمًا" }], correctLabel: "ب", skill: "INT-DEFINITE-PROPERTIES", points: 2, explanation: "عكس حدود التكامل يغير إشارة التكامل." },
  { n: 47, type: "single-choice", stem: "ما القيمة المتوسطة للدالة f على [a,b] عندما تكون قابلة للتكامل؟", choices: [{ label: "أ", value: "∫_a^b f(x)dx" }, { label: "ب", value: "(b-a)∫_a^b f(x)dx" }, { label: "ج", value: "1/(b-a) ∫_a^b f(x)dx" }, { label: "د", value: "f(a)+f(b)" }], correctLabel: "ج", skill: "INT-MEAN-VALUE", points: 2, explanation: "متوسط قيمة الدالة على الفترة يساوي التكامل مقسومًا على طول الفترة." },
  { n: 48, type: "single-choice", stem: "إذا كانت F'(x)=2x وF(0)=3، فما F(x)؟", choices: [{ label: "أ", value: "x^2+3" }, { label: "ب", value: "2x^2+3" }, { label: "ج", value: "x^2" }, { label: "د", value: "2x+3" }], correctLabel: "أ", skill: "INT-ANTIDERIVATIVE", points: 2, explanation: "بالتكامل F=x²+C، ومن F(0)=3 نحصل على C=3." },
  { n: 49, type: "single-choice", stem: "إذا كان 0≤f(x)≤g(x) على [a,b]، فما العلاقة الصحيحة؟", choices: [{ label: "أ", value: "∫f ≥ ∫g" }, { label: "ب", value: "∫f ≤ ∫g" }, { label: "ج", value: "∫f = -∫g" }, { label: "د", value: "لا توجد علاقة" }], correctLabel: "ب", skill: "INT-COMPARISON", points: 2, explanation: "مبرهنة المقارنة تحفظ ترتيب الدالتين بعد التكامل على الفترة نفسها." },
  { n: 50, type: "single-choice", stem: "أي خاصية صحيحة عندما a<c<b؟", choices: [{ label: "أ", value: "∫_a^b f = ∫_a^c f + ∫_c^b f" }, { label: "ب", value: "∫_a^b f = ∫_a^c f - ∫_c^b f" }, { label: "ج", value: "∫_a^b f = 0" }, { label: "د", value: "∫_a^b f = f(c)" }], correctLabel: "أ", skill: "INT-DEFINITE-PROPERTIES", points: 2, explanation: "خاصية تجزئة الفترة تسمح بجمع التكاملين على الجزأين المتجاورين." },
];

export const pilotCalculusQuestions: ExamQuestion[] = specs.map((spec) => {
  const options = spec.choices.map((choice, index) => ({ id: `O${index + 1}`, label: choice.label, content: rich(choice.value) }));
  const correctIndex = spec.choices.findIndex((choice) => choice.label === spec.correctLabel);
  if (correctIndex < 0) throw new Error(`Missing correct option for pilot question ${spec.n}`);
  return {
    schemaVersion: "1.0",
    id: `MATH-CALC-2020-A-Q${String(spec.n).padStart(3, "0")}`,
    examId: PILOT_EXAM_ID,
    order: spec.n,
    sourceQuestionNumber: String(spec.n),
    type: spec.type,
    stem: rich(spec.stem),
    options,
    assets: [],
    answer: { correctOptionId: `O${correctIndex + 1}`, points: spec.points, answerEvidence: { type: "independent-verification", sourceUrl: VERIFICATION_URL, locator: `Q${String(spec.n).padStart(2, "0")} — independent mathematical verification` } },
    source: { sourcePackageUrl: PILOT_REFERENCE_URL, sourceFileName: SOURCE_FILE, digitizationMethod: "manual", relation: "adapted", adaptationNote: "سؤال تدريبي أصلي صيغ لقياس المهارة نفسها وبنية الاختبار المرجعي؛ ليس نقلًا حرفيًا لسؤال وزاري." },
    analysis: { primarySkillId: spec.skill, secondarySkillIds: [] },
    difficulty: "unrated",
    explanation: { status: "reviewed", content: rich(spec.explanation) },
    verification: { status: "verified", checks: { sourceMatched: true, textReviewed: true, mathReviewed: true, optionsReviewed: true, answerVerified: true, skillReviewed: true, mediaReviewed: true }, reviewedAt: "2026-09-04T22:45:00+03:00", reviewedBy: "OpenAI-assisted independent verification", blockingNotes: [] },
  };
});
