export type PromptStage = "diagnose" | "learn" | "apply" | "correct" | "retain" | "master" | "exam";
export type PromptSituation = "lost" | "did-not-understand" | "stuck" | "wrong-answer" | "remember" | "check-mastery" | "exam-ready";
export type SubjectFamily = "quantitative" | "science" | "language" | "textual";

export type PromptContext = {
  subject: string;
  unit?: string;
  lesson?: string;
  input?: string;
};

export type StudyPrompt = {
  id: string;
  title: string;
  shortDescription: string;
  stage: PromptStage;
  situations: PromptSituation[];
  priority: 1 | 2 | 3;
  inputLabel?: string;
  inputPlaceholder?: string;
  build: (context: PromptContext) => string;
};

export type PromptSituationGroup = {
  id: PromptSituation;
  title: string;
  description: string;
};

export const promptSituationGroups: PromptSituationGroup[] = [
  { id: "lost", title: "أنا ضايع", description: "لا أعرف من أين أبدأ أو أشعر أن عندي أساسًا ناقصًا." },
  { id: "did-not-understand", title: "لم أفهم الشرح", description: "سمعت الشرح أو قرأته لكن الفكرة ما زالت غير واضحة." },
  { id: "stuck", title: "أحاول أحل", description: "فهمت جزءًا من الدرس لكنني توقفت أثناء التطبيق." },
  { id: "wrong-answer", title: "إجابتي طلعت خطأ", description: "أريد معرفة موضع الخطأ وكيف أمنع تكراره." },
  { id: "remember", title: "أريد أثبّت المعلومة", description: "فهمت الدرس وأريد أن أتذكره بدون حفظ أعمى." },
  { id: "check-mastery", title: "أريد أتأكد أني فهمت", description: "اختبرني واكتشف النقاط التي ما زالت ضعيفة." },
  { id: "exam-ready", title: "أستعد للاختبار", description: "أريد تدريبًا يشبه الاختبار ومراجعة مركزة على نقاط الضعف." },
];

const subjectFamilyById: Record<string, SubjectFamily> = {
  "رياضيات": "quantitative",
  "فيزياء": "quantitative",
  "كيمياء": "science",
  "أحياء": "science",
  "لغة إنجليزية": "language",
  "نحو وصرف": "language",
  "أدب ونصوص وبلاغة": "textual",
  "قراءة": "textual",
  "قرآن كريم": "textual",
  "حديث وتهذيب": "textual",
  "إيمان": "textual",
  "فقه": "textual",
  "سيرة نبوية": "textual",
};

const subjectSpecificRules: Record<SubjectFamily, string> = {
  quantitative: "في المسائل: علّمني كيف أقرأ المعطيات وأحدد المطلوب وأختار القاعدة أو القانون قبل الحساب. لا تقفز للنتيجة، وراجع الإشارات والوحدات والحسابات عند الحاجة.",
  science: "اربط المصطلح أو العملية بسببها ونتيجتها وعلاقتها بما قبلها. عند وجود معادلات أو حسابات أو تفاعلات، فسّر معنى كل خطوة بدل الاكتفاء بتنفيذها.",
  language: "ميّز بين القاعدة والمعنى والاستعمال. استخدم أمثلة قصيرة مناسبة لمقرر الثالث الثانوي، وصحح الخطأ مع بيان السبب ثم اطلب مني محاولة جديدة.",
  textual: "اعتمد على النص أو المعلومة التي أقدّمها عندما تكون الدقة النصية مهمة، ولا تخترع اقتباسات أو ألفاظًا منسوبة إلى الكتاب. ركز على الفهم والعلاقات والمعاني ثم الاسترجاع.",
};

function contextHeader({ subject, unit, lesson }: PromptContext) {
  return [
    "أنا طالب أتعلم ذاتيًا في الصف الثالث الثانوي في اليمن.",
    `المادة: ${subject}.`,
    unit ? `الوحدة/المحور: ${unit}.` : "",
    lesson ? `الدرس: ${lesson}.` : "",
    "تعامل معي كمدرّس خصوصي يساعدني على الفهم والاستقلال، لا كآلة تعطي إجابات جاهزة.",
  ].filter(Boolean).join("\n");
}

function tutorPolicy(subject: string) {
  const family = subjectFamilyById[subject] ?? "textual";
  return `قواعد التدريس:\n- ابقَ ضمن مستوى الثالث الثانوي والمنهج اليمني قدر الإمكان، ولا تدخل في تعقيد جامعي إلا إذا طلبته.\n- لا تفترض أنني فهمت المصطلحات السابقة؛ اكتشف الفجوة عندما تظهر.\n- استخدم خطوة تعليمية واحدة واضحة في كل مرة عندما يكون التفاعل أفضل من الشرح الطويل.\n- لا تقل فقط إن إجابتي خاطئة؛ حدّد سبب الخطأ أو الفكرة الناقصة.\n- لا تمدح إجابة غير دقيقة؛ قيّمها بدقة ووضوح.\n- بعد الشرح أو التصحيح، اجعلني أفعل شيئًا بنفسي للتأكد من الفهم.\n- إذا لم تكن متأكدًا من جزئية خاصة بنص المقرر، اطلب مني تزويدك بالنص بدل اختراع محتوى.\n- ${subjectSpecificRules[family]}`;
}

function buildPrompt(context: PromptContext, task: string) {
  return `${contextHeader(context)}\n\n${tutorPolicy(context.subject)}\n\nمهمتك الآن:\n${task}`;
}

export const selfStudyPrompts: StudyPrompt[] = [
  {
    id: "diagnose-gap",
    title: "شخّص أين مشكلتي",
    shortDescription: "يكتشف هل المشكلة في هذا الدرس أم في أساس سابق ناقص.",
    stage: "diagnose",
    situations: ["lost", "did-not-understand"],
    priority: 1,
    inputLabel: "ما الذي تحاول فهمه؟",
    inputPlaceholder: "اكتب اسم الفكرة أو صف أين بدأت تضيع…",
    build: (context) => buildPrompt(context, `أنا لا أريد شرحًا طويلًا مباشرة. أريدك أولًا أن تشخّص سبب تعثري في: ${context.input || "[اكتب الفكرة أو المشكلة هنا]"}.\nاسألني من سؤالين إلى ثلاثة أسئلة قصيرة جدًا، سؤالًا واحدًا في كل رسالة، تقيس المتطلبات السابقة والفكرة الحالية. بعد إجاباتي أخبرني بدقة: ما الذي أفهمه، وما الفجوة الأقرب التي تمنعني من التقدم، وما أول شيء يجب أن أصلحه. ثم ابدأ معي من تلك النقطة فقط.`),
  },
  {
    id: "rebuild-from-zero",
    title: "ابنِ الدرس معي من الصفر",
    shortDescription: "لمن يشعر أن الدرس كله غير مفهوم أو أن الأساس ضعيف.",
    stage: "learn",
    situations: ["lost"],
    priority: 1,
    inputLabel: "ما الدرس أو الجزء الصعب؟",
    inputPlaceholder: "مثال: الاشتقاق، التيار المتردد، قاعدة لغوية…",
    build: (context) => buildPrompt(context, `أريد أن أتعلم هذا الجزء من الصفر: ${context.input || "[اكتب اسم الدرس أو الجزء هنا]"}.\nابدأ فقط بالمتطلبات السابقة الضرورية، وليس بكل ما سبق في المادة. ثم قدّم الفكرة المركزية بأبسط صياغة صحيحة، وبعدها مثالًا صغيرًا جدًا. توقف واسألني سؤال تحقق واحدًا. إذا أجبت جيدًا انتقل للجزء التالي، وإذا لم أفهم غيّر طريقة الشرح قبل أن تزيد التفاصيل.`),
  },
  {
    id: "different-explanation",
    title: "اشرحها بطريقة غير شرح المدرس",
    shortDescription: "يغيّر زاوية الشرح بدل تكرار نفس الكلام الذي لم يفدك.",
    stage: "learn",
    situations: ["did-not-understand"],
    priority: 1,
    inputLabel: "ما الذي لم تفهمه من الشرح؟",
    inputPlaceholder: "الصق العبارة أو اكتب الفكرة التي لم تدخل رأسك…",
    build: (context) => buildPrompt(context, `لقد سمعت أو قرأت شرحًا ولم أفهم هذه الفكرة: ${context.input || "[ضع الفكرة هنا]"}.\nلا تكرر تعريف الكتاب بصياغة أخرى فقط. اشرحها من زاوية مختلفة: ابدأ بصورة ذهنية أو سؤال بسيط أو تشبيه مناسب إن كان مفيدًا، ثم اربط ذلك بالمصطلح الصحيح في المنهج. بعد ذلك أعطني مثالًا يوضح الفرق بين الفهم الصحيح والخطأ الشائع، ثم اسألني أن أشرح الفكرة لك بكلماتي.`),
  },
  {
    id: "worked-example",
    title: "علّمني من مثال واحد",
    shortDescription: "مثال محلول يكشف طريقة التفكير، لا مجرد سلسلة خطوات.",
    stage: "learn",
    situations: ["did-not-understand", "stuck"],
    priority: 2,
    inputLabel: "ضع نوع المثال أو السؤال",
    inputPlaceholder: "اكتب سؤالًا أو نوع المسائل التي تريد فهمها…",
    build: (context) => buildPrompt(context, `استخدم مثالًا واحدًا مناسبًا لهذا الموضوع: ${context.input || "[اكتب نوع السؤال أو المثال]"}.\nقبل كل خطوة في المثال قل لي باختصار: ما الذي لاحظناه في السؤال؟ ولماذا اخترنا هذه الخطوة تحديدًا؟ لا تستخدم خطوات لا تشرح سببها. بعد إنهاء المثال، أعطني سؤالًا مشابهًا مع تغيير مهم واحد واتركه لي أحله وحدي.`),
  },
  {
    id: "choose-method",
    title: "كيف أعرف أي قاعدة أستخدم؟",
    shortDescription: "يدرّبك على اتخاذ القرار قبل الحل بدل حفظ شكل المثال.",
    stage: "apply",
    situations: ["stuck", "check-mastery"],
    priority: 1,
    inputLabel: "ضع السؤال الذي حيّرك",
    inputPlaceholder: "الصق المسألة أو السؤال هنا…",
    build: (context) => buildPrompt(context, `هذا السؤال حيّرني في اختيار الطريقة: ${context.input || "[ضع السؤال هنا]"}.\nلا تحله الآن. استخرج الإشارات الموجودة في السؤال التي يجب أن تلفت انتباهي، ثم ضع لي قائمة قصيرة بالخيارات المحتملة وعلّمني كيف أستبعد غير المناسب منها. اسألني في النهاية أن أختار القاعدة/القانون/الطريقة بنفسي وأبرر اختياري، ثم قيّم اختياري قبل بدء الحل.`),
  },
  {
    id: "hint-ladder",
    title: "أعطني تلميحًا فقط",
    shortDescription: "يحافظ على محاولتك ويعطيك أقل مساعدة ممكنة.",
    stage: "apply",
    situations: ["stuck"],
    priority: 1,
    inputLabel: "السؤال وآخر خطوة وصلت لها",
    inputPlaceholder: "ضع السؤال ثم ما فعلته حتى الآن…",
    build: (context) => buildPrompt(context, `أنا أحاول بنفسي في: ${context.input || "[ضع السؤال ومحاولتك]"}.\nلا تكشف الحل النهائي. استخدم سُلّم تلميحات: التلميح الأول مجرد توجيه لما يجب أن ألاحظه؛ إذا طلبت المزيد أعطني تلميحًا أوضح؛ ولا تصل إلى خطوة شبه محلولة إلا بعد أن أفشل في المحاولة. بعد كل تلميح توقف وانتظر محاولتي.`),
  },
  {
    id: "first-error",
    title: "اكتشف أول خطأ في حلي",
    shortDescription: "يوقف المراجعة عند أول خطأ حتى تفهم سببه وتصححه بنفسك.",
    stage: "correct",
    situations: ["wrong-answer", "stuck"],
    priority: 1,
    inputLabel: "السؤال ومحاولتك كاملة",
    inputPlaceholder: "الصق السؤال ثم الحل الذي كتبته…",
    build: (context) => buildPrompt(context, `راجع محاولتي بالترتيب: ${context.input || "[ضع السؤال ومحاولتك هنا]"}.\nحدد أول موضع فقط خرج فيه التفكير أو الحساب أو القاعدة عن المسار الصحيح. لا تكمل البحث عن بقية الأخطاء الآن. أخبرني ما الذي كان صحيحًا قبل هذه النقطة، وما نوع الخطأ، ولماذا حدث، ثم اطلب مني تصحيح الخطوة بنفسي. بعد تصحيحي تابع من حيث توقفنا.`),
  },
  {
    id: "misconception-contrast",
    title: "فرّق لي بين شيئين ألخبط بينهم",
    shortDescription: "يبني حدودًا واضحة بين مفاهيم أو قواعد متشابهة.",
    stage: "correct",
    situations: ["did-not-understand", "wrong-answer", "remember"],
    priority: 2,
    inputLabel: "ما الشيئان اللذان تخلط بينهما؟",
    inputPlaceholder: "مثال: قاعدتان، مصطلحان، زمنان، عمليتان…",
    build: (context) => buildPrompt(context, `أنا أخلط بين: ${context.input || "[اكتب المفهومين أو القاعدتين]"}.\nابنِ المقارنة على: متى أستخدم/أفكر في الأول؟ متى أستخدم/أفكر في الثاني؟ ما العلامة الفارقة الأسرع؟ ما الخطأ الشائع الذي يسبب الخلط؟ استخدم مثالين قصيرين متقابلين، ثم أعطني حالة جديدة واجعلني أحدد أيهما ينطبق ولماذا.`),
  },
  {
    id: "teach-back",
    title: "خلّني أشرح لك وأنت قيّمني",
    shortDescription: "يكشف الفهم الوهمي عن طريق الشرح بكلماتك أنت.",
    stage: "master",
    situations: ["check-mastery", "remember"],
    priority: 1,
    inputLabel: "اكتب شرحك أنت",
    inputPlaceholder: "اشرح الفكرة كأنك تشرحها لزميل…",
    build: (context) => buildPrompt(context, `سأشرح أنا الفكرة بكلماتي: ${context.input || "[اكتب شرحك هنا]"}.\nقيّم شرحي على ثلاثة أشياء فقط: ما الصحيح، ما الناقص، وما العبارة غير الدقيقة إن وجدت. لا تعطِني شرحًا بديلًا كاملًا فورًا. اسألني سؤالًا واحدًا يجعلني أصلح أضعف نقطة في شرحي بنفسي، ثم أعد تقييم الفهم.`),
  },
  {
    id: "active-recall",
    title: "ثبّت الدرس في ذاكرتي",
    shortDescription: "استرجاع نشط بدل إعادة القراءة والحفظ السلبي.",
    stage: "retain",
    situations: ["remember", "check-mastery"],
    priority: 1,
    build: (context) => buildPrompt(context, `أريد تثبيت هذا الموضوع في الذاكرة بدون أن تعطيني ملخصًا جاهزًا. ابدأ بأسئلة استرجاع قصيرة من دون خيارات، سؤالًا واحدًا في كل مرة. نوّع بين: تعريف الفكرة بكلماتي، سبب أو علاقة، تمييز بين مفهومين، وتطبيق صغير. عندما أنسى لا تعطِ الإجابة فورًا؛ أعطني إشارة صغيرة. في النهاية كوّن لي قائمة من 3 نقاط فقط ظهر أنني أنساها أو أخلط فيها.`),
  },
  {
    id: "graduated-practice",
    title: "درّبني من السهل للصعب",
    shortDescription: "يتكيف مع أدائك ويمنع الانتقال قبل تثبيت المستوى السابق.",
    stage: "apply",
    situations: ["stuck", "check-mastery", "exam-ready"],
    priority: 1,
    build: (context) => buildPrompt(context, `أنشئ تدريبًا متدرجًا على هذا الموضوع. ابدأ بسؤال أساسي يكشف هل أفهم الفكرة، ثم متوسط يتطلب اختيار الطريقة، ثم سؤال أصعب أو مركب. أعطني سؤالًا واحدًا فقط في كل مرة. لا ترفع الصعوبة إذا كان خطئي مفاهيميًا؛ عالج الخطأ أولًا بسؤال أبسط. لا تعطِ الحل قبل محاولتي.`),
  },
  {
    id: "mastery-check",
    title: "هل أتقنت الدرس فعلًا؟",
    shortDescription: "اختبار قصير يفرّق بين الحفظ والفهم والتطبيق.",
    stage: "master",
    situations: ["check-mastery"],
    priority: 1,
    build: (context) => buildPrompt(context, `اختبر إتقاني للموضوع في جولة قصيرة. أريد أن تقيس ثلاث طبقات: 1) فهم الفكرة، 2) اختيار القاعدة أو التفسير الصحيح، 3) تطبيق جديد لم أشاهد مثله حرفيًا. اسأل سؤالًا واحدًا في كل مرة. في النهاية أعطني حكمًا من: غير ثابت / جيد ويحتاج نقطة واحدة / متقن، مع ذكر الدليل من إجاباتي ونقطة العمل التالية فقط.`),
  },
  {
    id: "exam-simulation",
    title: "اختبرني مثل الاختبار",
    shortDescription: "أسئلة امتحانية دون مساعدة أثناء الحل ثم تحليل للأخطاء.",
    stage: "exam",
    situations: ["exam-ready"],
    priority: 1,
    build: (context) => buildPrompt(context, `حاكِ لي اختبارًا قصيرًا مناسبًا لمستوى الثالث الثانوي في هذا الموضوع. أثناء السؤال لا تعطِ تلميحات ولا حلولًا إلا إذا طلبت إنهاء المحاكاة. أعطني سؤالًا واحدًا في كل مرة وسجّل نوع أخطائي ذهنيًا. بعد نهاية الجولة حلّل الأخطاء إلى: نقص معرفة، سوء فهم، اختيار طريقة، أو خطأ تنفيذ/تسرع. ثم اقترح أقصر تدريب يعالج أضعف نوع فقط.`),
  },
  {
    id: "rapid-review",
    title: "راجع معي قبل الاختبار",
    shortDescription: "مراجعة مركزة تبدأ بما لا تتذكره بدل تلخيص الدرس كله.",
    stage: "exam",
    situations: ["exam-ready", "remember"],
    priority: 2,
    inputLabel: "ما الذي تتوقع أنك ضعيف فيه؟",
    inputPlaceholder: "اختياري: اكتب النقاط التي تقلقك…",
    build: (context) => buildPrompt(context, `أريد مراجعة فعالة قبل الاختبار${context.input ? `، وأكثر ما يقلقني: ${context.input}` : ""}. لا تبدأ بملخص شامل. ابدأ بـ5 أسئلة تشخيص سريعة، سؤالًا واحدًا في كل مرة، ثم ركز المراجعة على ما أخطئ فيه فقط. استخدم الاسترجاع والتطبيق أكثر من الشرح. اختم بثلاث نقاط أخيرة أراجعها، وثلاثة أنواع أسئلة يجب أن أكون قادرًا على حلها أو الإجابة عنها.`),
  },
];

export function getSubjectFamily(subjectId: string): SubjectFamily {
  return subjectFamilyById[subjectId] ?? "textual";
}

export function getPromptsForSituation(situation: PromptSituation) {
  return selfStudyPrompts
    .filter((prompt) => prompt.situations.includes(situation))
    .sort((a, b) => a.priority - b.priority);
}

export function getPromptsForSubject(_subjectId: string) {
  return selfStudyPrompts;
}

export function getRecommendedPrompts(subjectId: string, situation?: PromptSituation) {
  const source = situation ? getPromptsForSituation(situation) : selfStudyPrompts;
  const family = getSubjectFamily(subjectId);
  const preferredIds: Record<SubjectFamily, string[]> = {
    quantitative: ["diagnose-gap", "choose-method", "hint-ladder", "first-error", "graduated-practice", "mastery-check"],
    science: ["diagnose-gap", "different-explanation", "misconception-contrast", "active-recall", "graduated-practice", "mastery-check"],
    language: ["different-explanation", "misconception-contrast", "first-error", "teach-back", "active-recall", "mastery-check"],
    textual: ["different-explanation", "teach-back", "active-recall", "misconception-contrast", "mastery-check", "rapid-review"],
  };
  const preferred = new Set(preferredIds[family]);
  return [...source].sort((a, b) => Number(preferred.has(b.id)) - Number(preferred.has(a.id)) || a.priority - b.priority);
}
