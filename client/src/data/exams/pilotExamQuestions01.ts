import { formulaOptions, makePilotQuestion, math, parts, text } from "./pilotExamQuestionFactory";

export const pilotExamQuestions01 = [
  makePilotQuestion({
    order: 1, type: "true-false", correctOptionId: "T", skill: "LIM-FACTOR", difficulty: "easy",
    stem: parts(text("العبارة: "), math("lim_{x→2} (x^2-4)/(x-2) = 4")),
    explanation: parts(text("بعد التحليل "), math("x^2-4=(x-2)(x+2)"), text(" ثم الاختصار تصبح النهاية "), math("x+2→4"), text("؛ إذن العبارة صحيحة.")),
  }),
  makePilotQuestion({
    order: 2, type: "true-false", correctOptionId: "T", skill: "LIM-TRIG", difficulty: "easy",
    stem: parts(text("العبارة: "), math("lim_{x→0} sin(x)/x = 1")),
    explanation: text("هذه هي النهاية المثلثية الأساسية عندما تقاس الزاوية بالراديان؛ العبارة صحيحة."),
  }),
  makePilotQuestion({
    order: 3, type: "true-false", correctOptionId: "F", skill: "LIM-INFINITY", difficulty: "easy",
    stem: parts(text("العبارة: "), math("lim_{x→∞} (3x^2+1)/(x^2-5) = 0")),
    explanation: parts(text("البسط والمقام من الدرجة نفسها، فتساوي النهاية نسبة المعاملين الرئيسيين: "), math("3/1=3"), text("؛ لذلك العبارة خطأ.")),
  }),
  makePilotQuestion({
    order: 4, type: "true-false", correctOptionId: "T", skill: "CONT-POINT", difficulty: "easy",
    stem: parts(text("العبارة: الدالة "), math("f(x)=|x|"), text(" متصلة عند "), math("x=0"), text(".")),
    explanation: parts(text("النهاية اليمنى واليسرى عند الصفر تساويان "), math("0"), text(" وتساويان قيمة الدالة؛ العبارة صحيحة.")),
  }),
  makePilotQuestion({
    order: 5, type: "true-false", correctOptionId: "F", skill: "CONT-POINT", difficulty: "medium",
    stem: parts(text("العبارة: الدالة "), math("f(x)=(x^2-1)/(x-1)"), text(" بصيغتها المعطاة متصلة عند "), math("x=1"), text(".")),
    explanation: parts(text("رغم أن النهاية تساوي "), math("2"), text(" فإن الدالة غير معرفة عند "), math("x=1"), text("؛ لذا لا تكون متصلة هناك دون تعريف قيمة مناسبة.")),
  }),
  makePilotQuestion({
    order: 6, type: "true-false", correctOptionId: "T", skill: "DER-RULES", difficulty: "easy",
    stem: parts(text("العبارة: إذا "), math("f(x)=x^5"), text(" فإن "), math("f'(x)=5x^4"), text(".")),
    explanation: text("بتطبيق قاعدة القوة تنقص الأس واحدًا ويضرب الأس في المعامل؛ العبارة صحيحة."),
  }),
  makePilotQuestion({
    order: 7, type: "true-false", correctOptionId: "F", skill: "DER-EXP-LOG", difficulty: "easy",
    stem: parts(text("العبارة: مشتقة "), math("ln(x)"), text(" تساوي "), math("x"), text(".")),
    explanation: parts(text("المشتقة الصحيحة هي "), math("1/x"), text(" عندما "), math("x>0"), text("؛ العبارة خطأ.")),
  }),
  makePilotQuestion({
    order: 8, type: "true-false", correctOptionId: "T", skill: "DER-TRIG", difficulty: "easy",
    stem: parts(text("العبارة: "), math("d/dx[sin(x)] = cos(x)"), text(".")),
    explanation: text("هذه قاعدة الاشتقاق الأساسية لدالة الجيب؛ العبارة صحيحة."),
  }),
  makePilotQuestion({
    order: 9, type: "true-false", correctOptionId: "T", skill: "DER-CHAIN", secondarySkills: ["DER-RULES"], difficulty: "medium",
    stem: parts(text("العبارة: "), math("d/dx[(3x+1)^4] = 12(3x+1)^3"), text(".")),
    explanation: parts(text("بقاعدة التسلسل: "), math("4(3x+1)^3 × 3 = 12(3x+1)^3"), text("؛ العبارة صحيحة.")),
  }),
  makePilotQuestion({
    order: 10, type: "true-false", correctOptionId: "F", skill: "VAR-CRITICAL", difficulty: "medium",
    stem: parts(text("العبارة: إذا كان "), math("f'(a)=0"), text(" فلا بد أن تكون عند "), math("x=a"), text(" قيمة عظمى أو صغرى محلية.")),
    explanation: parts(text("الشرط "), math("f'(a)=0"), text(" يحدد نقطة حرجة فقط؛ مثال "), math("f(x)=x^3"), text(" عند الصفر لا يعطي قيمة قصوى.")),
  }),
  makePilotQuestion({
    order: 11, type: "true-false", correctOptionId: "T", skill: "APP-TANGENT", difficulty: "easy",
    stem: parts(text("العبارة: ميل مماس المنحنى "), math("y=x^2"), text(" عند "), math("x=1"), text(" يساوي "), math("2"), text(".")),
    explanation: parts(text("المشتقة "), math("y'=2x"), text("، وعند "), math("x=1"), text(" يكون الميل "), math("2"), text(".")),
  }),
  makePilotQuestion({
    order: 12, type: "true-false", correctOptionId: "T", skill: "APP-NORMAL", secondarySkills: ["APP-TANGENT"], difficulty: "easy",
    stem: parts(text("العبارة: إذا كان ميل المماس عند نقطة يساوي "), math("2"), text(" فإن ميل الناظم عندها يساوي "), math("-1/2"), text(".")),
    explanation: text("ميل الناظم هو السالب المقلوب لميل المماس عندما يكون الميلان معرفين؛ العبارة صحيحة."),
  }),
  makePilotQuestion({
    order: 13, type: "true-false", correctOptionId: "T", skill: "THM-ROLLE-CHECK", difficulty: "easy",
    stem: parts(text("العبارة: إذا كانت "), math("f"), text(" متصلة على "), math("[a,b]"), text(" وقابلة للاشتقاق على "), math("(a,b)"), text(" و "), math("f(a)=f(b)"), text(" فإن مبرهنة رول تضمن وجود "), math("c∈(a,b)"), text(" بحيث "), math("f'(c)=0"), text(".")),
    explanation: text("هذه هي شروط مبرهنة رول ونتيجتها مباشرة؛ العبارة صحيحة."),
  }),
  makePilotQuestion({
    order: 14, type: "true-false", correctOptionId: "F", skill: "THM-MVT-CHECK", difficulty: "easy",
    stem: parts(text("العبارة: تطبيق مبرهنة القيمة المتوسطة يتطلب دائمًا أن يكون "), math("f(a)=f(b)"), text(".")),
    explanation: text("تساوي قيمتي الطرفين شرط خاص بمبرهنة رول، وليس شرطًا عامًا لمبرهنة القيمة المتوسطة؛ العبارة خطأ."),
  }),
  makePilotQuestion({
    order: 15, type: "true-false", correctOptionId: "T", skill: "VAR-MONOTONICITY", difficulty: "easy",
    stem: parts(text("العبارة: إذا كان "), math("f'(x)>0"), text(" لكل نقطة في فترة، فإن "), math("f"), text(" متزايدة على تلك الفترة.")),
    explanation: text("إشارة المشتقة الموجبة على الفترة تعني تزايد الدالة عليها؛ العبارة صحيحة."),
  }),
  makePilotQuestion({
    order: 16, type: "true-false", correctOptionId: "F", skill: "VAR-INFLECTION", difficulty: "medium",
    stem: parts(text("العبارة: إذا تحقق فقط "), math("f''(a)=0"), text(" فإن "), math("(a,f(a))"), text(" نقطة انعطاف حتمًا.")),
    explanation: parts(text("انعدام المشتقة الثانية وحده لا يكفي؛ يجب التحقق من تغير التقعر، مثل تغير إشارة "), math("f''"), text(" حول النقطة.")),
  }),
  makePilotQuestion({
    order: 17, type: "true-false", correctOptionId: "T", skill: "INT-BASIC-RULES", difficulty: "easy",
    stem: parts(text("العبارة: "), math("∫ 2x dx = x^2 + C"), text(".")),
    explanation: parts(text("مشتقة "), math("x^2+C"), text(" هي "), math("2x"), text("؛ العبارة صحيحة.")),
  }),
  makePilotQuestion({
    order: 18, type: "true-false", correctOptionId: "F", skill: "INT-DEF", difficulty: "easy",
    stem: parts(text("العبارة: "), math("∫_0^1 x dx = 1"), text(".")),
    explanation: parts(text("القيمة هي "), math("[x^2/2]_0^1 = 1/2"), text("؛ لذا العبارة خطأ.")),
  }),
  makePilotQuestion({
    order: 19, type: "true-false", correctOptionId: "T", skill: "INT-SUBSTITUTION-RECOGNIZE", difficulty: "medium",
    stem: parts(text("العبارة: التكامل "), math("∫ 2x cos(x^2) dx"), text(" مناسب لطريقة التعويض "), math("u=x^2"), text(".")),
    explanation: parts(text("لأن "), math("du=2x dx"), text(" موجود داخل التكامل، فيتحول إلى "), math("∫cos(u)du"), text(".")),
  }),
  makePilotQuestion({
    order: 20, type: "true-false", correctOptionId: "F", skill: "INT-BY-PARTS-APPLY", difficulty: "medium",
    stem: parts(text("العبارة: "), math("∫ x e^x dx = x e^x + C"), text(".")),
    explanation: parts(text("بالتجزئة نحصل على "), math("∫x e^x dx = x e^x - e^x + C = e^x(x-1)+C"), text("؛ العبارة خطأ.")),
  }),
  makePilotQuestion({
    order: 21, type: "single-choice", correctOptionId: "A", skill: "LIM-FACTOR", difficulty: "easy",
    stem: parts(text("أوجد: "), math("lim_{x→3} (x^2-9)/(x-3)")),
    options: formulaOptions("6", "3", "9", "0"),
    explanation: parts(text("نحلل "), math("x^2-9=(x-3)(x+3)"), text("، ثم تكون النهاية "), math("x+3→6"), text(".")),
  }),
  makePilotQuestion({
    order: 22, type: "single-choice", correctOptionId: "A", skill: "LIM-RATIONALIZE", difficulty: "medium",
    stem: parts(text("أوجد: "), math("lim_{x→0} (√(x+4)-2)/x")),
    options: formulaOptions("1/4", "1/2", "2", "4"),
    explanation: parts(text("باستخدام المرافق يصبح التعبير "), math("1/(√(x+4)+2)"), text("، وعند الصفر يساوي "), math("1/4"), text(".")),
  }),
  makePilotQuestion({
    order: 23, type: "single-choice", correctOptionId: "A", skill: "LIM-INFINITY", difficulty: "easy",
    stem: parts(text("أوجد: "), math("lim_{x→∞} (5x^3-x)/(2x^3+1)")),
    options: formulaOptions("5/2", "2/5", "5", "2"),
    explanation: text("لأن درجتي البسط والمقام متساويتان فالنهاية نسبة المعاملين الرئيسيين: 5/2."),
  }),
  makePilotQuestion({
    order: 24, type: "single-choice", correctOptionId: "B", skill: "CONT-PARAMETER", secondarySkills: ["LIM-FACTOR"], difficulty: "medium",
    stem: parts(text("لتكن "), math("f(x)=(x^2-1)/(x-1)"), text(" عندما "), math("x≠1"), text(" و "), math("f(1)=k"), text(". ما قيمة "), math("k"), text(" التي تجعل الدالة متصلة عند 1؟")),
    options: formulaOptions("1", "2", "-1", "0"),
    explanation: parts(text("حتى تتصل الدالة يجب أن يكون "), math("k=lim_{x→1}(x+1)=2"), text(".")),
  }),
  makePilotQuestion({
    order: 25, type: "single-choice", correctOptionId: "A", skill: "DER-RULES", difficulty: "easy",
    stem: parts(text("إذا كانت "), math("f(x)=3x^4-2x^2+7"), text(" فما "), math("f'(x)"), text("؟")),
    options: formulaOptions("12x^3-4x", "12x^4-4x^2", "3x^3-2x", "12x^3-2x"),
    explanation: parts(text("نشتق حدًا حدًا: "), math("(3x^4)'=12x^3"), text(" و "), math("(-2x^2)'=-4x"), text(" والثابت مشتقته صفر.")),
  }),
] as const;
