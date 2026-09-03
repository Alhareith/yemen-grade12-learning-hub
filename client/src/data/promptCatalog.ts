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
  families?: SubjectFamily[];
  subjects?: string[];
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
  { id: "did-not-understand", title: "لم أفهم الشرح", description: "أريد شرحًا مختلفًا وأوضح من الذي سمعته." },
  { id: "stuck", title: "متوقف في سؤال", description: "أحتاج أن أعرف كيف أفكر وأكمل الحل." },
  { id: "wrong-answer", title: "إجابتي خطأ", description: "أريد معرفة الخطأ وتصحيحه وفهم سببه." },
  { id: "remember", title: "أريد أثبّت الدرس", description: "أريد تذكره بالفهم والاسترجاع لا بالحفظ الأعمى." },
  { id: "check-mastery", title: "أريد أتأكد أني فهمت", description: "اختبار قصير مع الإجابات والتفسير في النهاية." },
  { id: "exam-ready", title: "أستعد للاختبار", description: "مراجعة وأسئلة متدرجة مع نموذج إجابة كامل." },
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

const familyRules: Record<SubjectFamily, string> = {
  quantitative: "في المسائل ابدأ بقراءة المعطيات والمطلوب، ثم وضّح كيف نختار القانون أو القاعدة، وبعدها نفّذ الحل خطوة بخطوة مع التحقق من الإشارات والوحدات والنتيجة.",
  science: "اربط كل مصطلح أو عملية بسببها ونتيجتها وعلاقتها بما قبلها، وعند وجود معادلة أو حساب فسّر معنى كل خطوة لا شكلها فقط.",
  language: "ميّز بين القاعدة والمعنى والاستعمال، واشرح سبب الخطأ بوضوح ثم أعرض الصياغة الصحيحة ومثالًا جديدًا.",
  textual: "إذا كانت الدقة تعتمد على نص من الكتاب فاعتمد على النص الذي أضعه لك ولا تخترع اقتباسات. ركز على الفكرة والمعنى والعلاقات ثم الاسترجاع.",
};

function contextHeader({ subject, unit, lesson }: PromptContext) {
  return [
    "أنا طالب أتعلم ذاتيًا في الصف الثالث الثانوي في اليمن.",
    `المادة: ${subject}.`,
    unit ? `الوحدة/المحور: ${unit}.` : "",
    lesson ? `الدرس/الفكرة: ${lesson}.` : "",
    "أريد شرحًا مناسبًا لمستواي ومباشرًا دون تعقيد جامعي غير مطلوب.",
  ].filter(Boolean).join("\n");
}

function tutorPolicy(subject: string) {
  const family = subjectFamilyById[subject] ?? "textual";
  return `قواعد الإجابة:\n- أكمل الإجابة كاملة في رد واحد؛ لا تنتظر مني إجابة ولا توقف الشرح في المنتصف.\n- لا تحوّل الإجابة إلى محادثة سؤال بسؤال. إذا أردت أن تجعلني أفكر، ضع سؤال التفكير أولًا ثم أكمل الشرح، واجعل الحل أو الإجابة النموذجية في نهاية الرد تحت عنوان واضح.\n- لا تعطِ نتيجة بلا سبب؛ اشرح منطق الاختيار والخطوات.\n- استخدم أمثلة من مستوى الثالث الثانوي اليمني قدر الإمكان.\n- إذا كان هناك أكثر من طريق، ابدأ بالطريق الأبسط والأقرب للمقرر ثم اذكر البديل باختصار.\n- إذا كانت معلومة نصية دقيقة غير موجودة في مدخلاتي، صرّح بأنك تحتاج النص ولا تختلقه.\n- ${familyRules[family]}`;
}

function buildPrompt(context: PromptContext, task: string) {
  return `${contextHeader(context)}\n\n${tutorPolicy(context.subject)}\n\nمهمتك:\n${task}`;
}

export const selfStudyPrompts: StudyPrompt[] = [
  {
    id: "diagnose-gap",
    title: "شخّص سبب عدم فهمي",
    shortDescription: "يحدد الأساس الناقص ثم يبني لك طريقًا قصيرًا لإصلاحه.",
    stage: "diagnose",
    situations: ["lost", "did-not-understand"],
    priority: 1,
    inputLabel: "ما الذي تحاول فهمه؟",
    inputPlaceholder: "اكتب اسم الفكرة أو صف أين بدأت تضيع…",
    build: (context) => buildPrompt(context, `حلّل سبب تعثري في: ${context.input || "[اكتب الفكرة أو المشكلة هنا]"}.\nلا تبدأ بملخص ضخم. قدّم التشخيص بهذه البنية:\n1) أكثر 3 فجوات سابقة محتملة تمنع الفهم.\n2) اختبار ذاتي سريع من 3 أسئلة فقط لتمييز أي فجوة هي الأقرب.\n3) بعد الأسئلة مباشرة ضع مفتاح الإجابة وما الذي يعنيه كل خطأ.\n4) اشرح لي الأساس الأقرب الذي أحتاجه في أبسط صورة.\n5) أعطني مثالًا صغيرًا يربط الأساس بالدرس الحالي.\n6) اختم بخطة من ثلاث خطوات أدرسها الآن.`),
  },
  {
    id: "rebuild-from-zero",
    title: "اشرح الدرس من الصفر",
    shortDescription: "شرح كامل يبدأ من المتطلبات الضرورية وينتهي بتطبيق وأسئلة مع الحل.",
    stage: "learn",
    situations: ["lost"],
    priority: 1,
    inputLabel: "ما الدرس أو الجزء الصعب؟",
    inputPlaceholder: "مثال: الاشتقاق، التيار المتردد، قاعدة لغوية…",
    build: (context) => buildPrompt(context, `علّمني هذا الجزء من الصفر: ${context.input || "[اكتب اسم الدرس أو الجزء]"}.\nرتّب الإجابة هكذا:\n- ما الذي يجب أن أعرفه قبله فقط.\n- الفكرة الأساسية بلغة بسيطة جدًا.\n- لماذا نحتاجها أو ما فائدتها في هذا الدرس.\n- مثال واضح مشروح خطوة بخطوة.\n- خطأ شائع ولماذا يقع الطلاب فيه.\n- 3 أسئلة تدريب: سهل، متوسط، أصعب.\n- بعد فاصل واضح ضع الحلول النموذجية كاملة مع التفسير.`),
  },
  {
    id: "different-explanation",
    title: "اشرح بطريقة مختلفة عن المدرس",
    shortDescription: "يغيّر زاوية الشرح ويستخدم تشبيهًا أو صورة ذهنية ثم يعود للمصطلح الصحيح.",
    stage: "learn",
    situations: ["did-not-understand"],
    priority: 1,
    inputLabel: "ما الذي لم تفهمه؟",
    inputPlaceholder: "اكتب الفكرة أو الصق العبارة الصعبة…",
    build: (context) => buildPrompt(context, `لم أفهم هذه الفكرة بالطريقة المعتادة: ${context.input || "[ضع الفكرة هنا]"}.\nلا تكرر تعريف الكتاب فقط. اشرحها بثلاث زوايا قصيرة: 1) صورة ذهنية أو تشبيه مناسب، 2) تفسير منطقي بسيط، 3) الصياغة الصحيحة بالمصطلحات الدراسية. ثم أعطني مثالًا يوضح الفهم الصحيح مقابل الخطأ الشائع. أخيرًا ضع سؤالين للتحقق من الفهم، ثم ضع الإجابتين النموذجيتين مع سبب كل إجابة.`),
  },
  {
    id: "worked-example",
    title: "علّمني من مثال محلول",
    shortDescription: "مثال كامل يشرح لماذا اخترنا كل خطوة، ثم تمرين مشابه وحله.",
    stage: "learn",
    situations: ["did-not-understand", "stuck"],
    priority: 2,
    inputLabel: "ضع السؤال أو نوع المثال",
    inputPlaceholder: "الصق السؤال أو اكتب نوع المسألة…",
    build: (context) => buildPrompt(context, `علّمني باستخدام مثال واحد في: ${context.input || "[ضع السؤال أو نوع المثال]"}.\nقبل كل خطوة اكتب: ماذا لاحظنا؟ ماذا قررنا؟ ولماذا؟ ثم نفّذ الخطوة. لا تختصر القفزات المهمة. بعد المثال أعطني تمرينًا مشابهًا مع تغيير واحد مهم، ثم اترك سطرًا أو فاصلًا واضحًا وبعده اعرض الحل النموذجي للتمرين ووضح أين يختلف عن المثال الأول.`),
  },
  {
    id: "choose-method",
    title: "كيف أعرف أي قاعدة أو قانون أستخدم؟",
    shortDescription: "يدرّبك على التعرف على إشارات السؤال واختيار الطريقة الصحيحة.",
    stage: "apply",
    situations: ["stuck", "check-mastery"],
    priority: 1,
    families: ["quantitative", "science", "language"],
    inputLabel: "ضع السؤال الذي حيّرك",
    inputPlaceholder: "الصق السؤال هنا…",
    build: (context) => buildPrompt(context, `حلّل هذا السؤال: ${context.input || "[ضع السؤال هنا]"}.\nلا تبدأ بالحساب. اعرض أولًا: المعطيات/الكلمات المفتاحية، المطلوب، الإشارات التي تدل على القاعدة أو القانون، والخيارات المحتملة ولماذا نستبعد كل خيار غير مناسب. بعد ذلك اختر الطريقة الصحيحة وفسّر سبب الاختيار، ثم أكمل الحل كاملًا. اختم بقاعدة قرار قصيرة من نوع: «إذا رأيت كذا، فكّر أولًا في كذا».`),
  },
  {
    id: "hint-then-solution",
    title: "أعطني تلميحات ثم الحل",
    shortDescription: "تلميحات متدرجة لتفكر بنفسك، ثم الحل الكامل في نهاية الرد.",
    stage: "apply",
    situations: ["stuck"],
    priority: 1,
    families: ["quantitative", "science", "language"],
    inputLabel: "السؤال وآخر خطوة وصلت لها",
    inputPlaceholder: "ضع السؤال ثم محاولتك إن وجدت…",
    build: (context) => buildPrompt(context, `هذا السؤال الذي توقفت فيه: ${context.input || "[ضع السؤال ومحاولتك]"}.\nرتّب ردك في قسمين.\nالقسم الأول «فكّر قبل أن ترى الحل»: أعطني 3 تلميحات متدرجة من الأخف إلى الأقوى بدون كشف النتيجة مباشرة.\nالقسم الثاني «الحل بعد المحاولة»: بعد فاصل واضح، حل السؤال كاملًا خطوة بخطوة واشرح لماذا كل خطوة صحيحة، ثم اذكر أقصر فكرة يجب أن أتذكرها إذا جاء سؤال مشابه.`),
  },
  {
    id: "first-error",
    title: "اكتشف الخطأ في حلي وصححه",
    shortDescription: "يحدد أول خطأ وسببه ثم يكمل التصحيح والحل بطريقة تعليمية.",
    stage: "correct",
    situations: ["wrong-answer", "stuck"],
    priority: 1,
    families: ["quantitative", "science", "language"],
    inputLabel: "السؤال ومحاولتك",
    inputPlaceholder: "الصق السؤال ثم الحل الذي كتبته…",
    build: (context) => buildPrompt(context, `راجع محاولتي: ${context.input || "[ضع السؤال ومحاولتك]"}.\nاعرض أولًا ما كان صحيحًا في حلي، ثم حدد أول خطأ فعلي، وصنّفه: فهم/اختيار قاعدة/حساب/إشارة/وحدة/لغة. اشرح لماذا هو خطأ وكيف كان يجب أن أفكر في تلك اللحظة. بعد ذلك أكمل الحل الصحيح من نقطة الخطأ حتى النهاية. اختم بمثال قصير جدًا على نفس نوع الخطأ مع الإجابة الصحيحة.`),
  },
  {
    id: "misconception-contrast",
    title: "فرّق بين شيئين ألخبط بينهم",
    shortDescription: "مقارنة مباشرة بين مفهومين أو قاعدتين متشابهتين.",
    stage: "correct",
    situations: ["did-not-understand", "wrong-answer", "remember"],
    priority: 2,
    inputLabel: "ما الشيئان اللذان تخلط بينهما؟",
    inputPlaceholder: "مثال: قاعدتان، مصطلحان، زمنان، عمليتان…",
    build: (context) => buildPrompt(context, `أنا أخلط بين: ${context.input || "[اكتب المفهومين أو القاعدتين]"}.\nاعمل مقارنة قصيرة جدًا توضح: التعريف، متى يُستخدم كل واحد، العلامة الفارقة الأسرع، الخطأ الشائع، ومثال مقابل لكل واحد. بعد ذلك أعطني 4 حالات جديدة وأسأل «أي واحد ينطبق؟ ولماذا؟»، ثم ضع مفتاح الإجابات كاملًا بعد فاصل واضح.`),
  },
  {
    id: "active-recall",
    title: "ثبّت الدرس في ذاكرتي",
    shortDescription: "أسئلة استرجاع نشط مع مفتاح إجابة في نهاية الرد.",
    stage: "retain",
    situations: ["remember", "check-mastery"],
    priority: 1,
    build: (context) => buildPrompt(context, `حوّل هذا الموضوع إلى جلسة استرجاع نشط كاملة. لا تبدأ بملخص. ضع 8 أسئلة قصيرة متنوعة: تعريف بكلماتي، لماذا، مقارنة، ترتيب، تطبيق، وتصحيح خطأ. اجعل الأسئلة أولًا وحدها حتى أستطيع تغطية الإجابات والتفكير. بعد فاصل واضح بعنوان «مفتاح الإجابة» ضع الإجابات النموذجية المختصرة مع تفسير النقاط التي يكثر الخلط فيها. اختم بثلاث بطاقات تذكر فقط لأصعب النقاط.`),
  },
  {
    id: "graduated-practice",
    title: "درّبني من السهل للصعب",
    shortDescription: "تدريب متدرج كامل مع الحلول في قسم منفصل.",
    stage: "apply",
    situations: ["stuck", "check-mastery", "exam-ready"],
    priority: 1,
    build: (context) => buildPrompt(context, `أنشئ تدريبًا من 6 أسئلة على هذا الموضوع: سؤالان أساسيان، سؤالان متوسطان، سؤالان أصعب أو مركبان. لا تضع الحل بجانب السؤال. بعد عرض الأسئلة كلها ضع فاصلًا واضحًا ثم «الحلول النموذجية»، وحل كل سؤال مع تفسير الطريقة لا النتيجة فقط. بعد الحلول اذكر المهارة التي يقيسها كل مستوى.`),
  },
  {
    id: "mastery-check",
    title: "هل أتقنت الدرس فعلًا؟",
    shortDescription: "اختبار قصير يقيس الفهم والاختيار والتطبيق، ثم يعطيك معيار تقييم ذاتي.",
    stage: "master",
    situations: ["check-mastery"],
    priority: 1,
    build: (context) => buildPrompt(context, `أنشئ اختبار إتقان من 6 أسئلة يقيس: فهم الفكرة، تفسير السبب، اختيار الطريقة، تطبيق مباشر، تطبيق جديد، واكتشاف خطأ. اعرض الأسئلة أولًا فقط. بعد فاصل واضح ضع الإجابات مع توزيع بسيط للدرجات. ثم أعطني معيارًا أقيّم به نفسي: إذا حصلت على كذا فأنا غير ثابت، كذا جيد، كذا متقن، وما الذي أراجعه في كل حالة.`),
  },
  {
    id: "exam-simulation",
    title: "اختبار مصغر مثل الاختبار",
    shortDescription: "محاكاة قصيرة ثم نموذج إجابة وتحليل لأنواع الأخطاء.",
    stage: "exam",
    situations: ["exam-ready"],
    priority: 1,
    build: (context) => buildPrompt(context, `أنشئ اختبارًا مصغرًا مناسبًا لمستوى الثالث الثانوي في هذا الموضوع، من 8 أسئلة متنوعة قدر الإمكان. اجعل قسم الأسئلة مستقلًا تمامًا بلا تلميحات. بعد فاصل واضح ضع نموذج الإجابة والتفسير. ثم أضف جدولًا صغيرًا يربط كل خطأ محتمل بنوعه: نقص معرفة، سوء فهم، اختيار طريقة، أو خطأ تنفيذ/تسرع، وما المراجعة المناسبة له.`),
  },
  {
    id: "rapid-review",
    title: "مراجعة مركزة قبل الاختبار",
    shortDescription: "ملخص ذكي + أسئلة سريعة + إجابات، بدون إطالة غير ضرورية.",
    stage: "exam",
    situations: ["exam-ready", "remember"],
    priority: 2,
    inputLabel: "ما الذي يقلقك؟",
    inputPlaceholder: "اختياري: اكتب نقاط ضعفك أو ما تخشاه في الاختبار…",
    build: (context) => buildPrompt(context, `أريد مراجعة مركزة قبل الاختبار${context.input ? `، وأكثر ما يقلقني: ${context.input}` : ""}. رتّبها إلى: 1) أهم 7 أفكار لا يجوز أن أدخل الاختبار بدونها، 2) أكثر 5 أخطاء شائعة، 3) 6 أسئلة سريعة تغطي أهم المهارات، 4) فاصل واضح ثم الإجابات النموذجية، 5) قائمة أخيرة من 3 أشياء أراجعها إذا لم يكن لدي إلا عشر دقائق.`),
  },
  {
    id: "math-read-problem",
    title: "فكّك المسألة الرياضية ثم حلها",
    shortDescription: "رياضيات: معطيات، مطلوب، فكرة الحل، ثم الحل الكامل والتحقق.",
    stage: "apply",
    situations: ["stuck", "wrong-answer", "check-mastery"],
    priority: 1,
    subjects: ["رياضيات"],
    inputLabel: "ضع المسألة",
    inputPlaceholder: "الصق المسألة الرياضية هنا…",
    build: (context) => buildPrompt(context, `حلّل ثم حل هذه المسألة الرياضية: ${context.input || "[ضع المسألة]"}.\nقبل الحل اكتب: المعطيات، المطلوب، نوع المسألة، الإشارة التي تقود للقاعدة، والقاعدة المختارة ولماذا. ثم حلها خطوة بخطوة، وتحقق من النتيجة إن أمكن. أخيرًا اكتب «كيف أتعرف على هذا النوع مستقبلًا؟» في سطرين.`),
  },
  {
    id: "physics-law-units",
    title: "اختر القانون واضبط الوحدات ثم حل",
    shortDescription: "فيزياء: يمنع التعويض العشوائي ويشرح اختيار القانون والتحويلات.",
    stage: "apply",
    situations: ["stuck", "wrong-answer", "check-mastery"],
    priority: 1,
    subjects: ["فيزياء"],
    inputLabel: "ضع مسألة الفيزياء",
    inputPlaceholder: "الصق المسألة مع الأرقام والوحدات…",
    build: (context) => buildPrompt(context, `حل هذه مسألة الفيزياء: ${context.input || "[ضع المسألة]"}.\nابدأ بجدول صغير: الكمية، الرمز، القيمة، الوحدة. حدّد المطلوب. وضّح أي تحويل وحدات يجب إجراؤه ولماذا. اختر القانون وفسّر لماذا هو المناسب وليس قانونًا آخر متشابهًا. ثم عوّض واحسب خطوة بخطوة، واكتب الوحدة مع كل مرحلة مهمة، واختم بفحص منطقي للنتيجة.`),
  },
  {
    id: "chemistry-reaction-story",
    title: "افهم التفاعل ثم طبّق عليه",
    shortDescription: "كيمياء: يشرح ماذا يحدث ولماذا ثم يعطي سؤالين مع الإجابة.",
    stage: "learn",
    situations: ["did-not-understand", "stuck", "check-mastery"],
    priority: 1,
    subjects: ["كيمياء"],
    inputLabel: "ضع التفاعل أو الفكرة",
    inputPlaceholder: "الصق المعادلة أو اكتب اسم التفاعل…",
    build: (context) => buildPrompt(context, `اشرح ما يحدث فعليًا في: ${context.input || "[ضع التفاعل أو الفكرة]"}.\nابدأ بوصف لفظي بسيط للمواد الداخلة وما الذي يتغير وما الناتج. اربط ذلك بالرموز الكيميائية. إذا كانت هناك أكسدة/اختزال أو موازنة أو حساب، وضّح العلامة التي تجعلني أتعرف عليها. ثم أعطني سؤالين تطبيقيين، وبعد فاصل واضح ضع الإجابة النموذجية والتفسير.`),
  },
  {
    id: "biology-process-map",
    title: "حوّل العملية الحيوية إلى قصة سببية",
    shortDescription: "أحياء: يربط المراحل والسبب والنتيجة بدل حفظ قائمة جامدة.",
    stage: "learn",
    situations: ["did-not-understand", "remember", "check-mastery"],
    priority: 1,
    subjects: ["أحياء"],
    inputLabel: "ضع العملية أو الموضوع",
    inputPlaceholder: "اكتب اسم العملية الحيوية أو الجزء الذي تريد فهمه…",
    build: (context) => buildPrompt(context, `اشرح هذه العملية الحيوية: ${context.input || "[اكتب العملية]"}.\nرتبها كقصة سببية: ما الذي يبدأها؟ ماذا يحدث بعده؟ لماذا؟ وما نتيجة كل مرحلة؟ ثم اعرض مخططًا نصيًا بأسهم. وضح ماذا سيحدث إذا تعطلت مرحلة مهمة. أخيرًا ضع 4 أسئلة استرجاع ثم فاصلًا ومفتاح الإجابات.`),
  },
  {
    id: "english-correct-retry",
    title: "صحّح الإنجليزية واشرح السبب",
    shortDescription: "إنجليزي: يحدد الخطأ ويصححه ويعطي أمثلة تدريب مع الإجابات.",
    stage: "correct",
    situations: ["wrong-answer", "stuck", "check-mastery"],
    priority: 1,
    subjects: ["لغة إنجليزية"],
    inputLabel: "ضع الجملة أو إجابتك",
    inputPlaceholder: "Paste your sentence or answer here…",
    build: (context) => buildPrompt(context, `راجع: ${context.input || "[ضع الجملة أو الإجابة]"}.\nاعرض الجملة الأصلية، ثم الخطأ، نوعه، سبب الخطأ بالعربية، والصياغة الصحيحة. إذا توجد أكثر من صياغة صحيحة فاذكر الأنسب للمقرر. ثم أعطني 3 جمل تدريبية على نفس القاعدة، وبعد فاصل واضح ضع الإجابات الصحيحة مع السبب.`),
  },
  {
    id: "arabic-grammar-analysis",
    title: "حلّل الجملة نحويًا خطوة بخطوة",
    shortDescription: "نحو وصرف: يوضح وظيفة الكلمة والعامل والعلامة وسببها.",
    stage: "apply",
    situations: ["stuck", "wrong-answer", "check-mastery"],
    priority: 1,
    subjects: ["نحو وصرف"],
    inputLabel: "ضع الجملة أو الكلمة المطلوبة",
    inputPlaceholder: "اكتب الجملة وحدد الكلمة التي تريد تحليلها…",
    build: (context) => buildPrompt(context, `حلّل: ${context.input || "[ضع الجملة والكلمة]"}.\nلا تبدأ بالإعراب النهائي فقط. وضّح علاقة الكلمة بما قبلها وما بعدها، العامل أو القاعدة، الموقع الإعرابي، العلامة، وسبب العلامة. إذا كانت هناك قراءة خاطئة محتملة فاذكرها ولماذا لا تنطبق. ثم أعطني جملتين مشابهتين، وبعد فاصل ضع التحليل الصحيح لهما.`),
  },
  {
    id: "text-understand-evidence",
    title: "افهم النص واستخرج منه الإجابة",
    shortDescription: "للنصوص والمواد الشرعية: يعتمد على النص المرفق ويمنع اختراع الاقتباسات.",
    stage: "learn",
    situations: ["did-not-understand", "wrong-answer", "remember", "check-mastery"],
    priority: 1,
    subjects: ["أدب ونصوص وبلاغة", "قراءة", "قرآن كريم", "حديث وتهذيب", "إيمان", "فقه", "سيرة نبوية"],
    inputLabel: "ضع النص أو الفقرة من كتابك",
    inputPlaceholder: "الصق الفقرة أو السؤال والنص المرتبط به…",
    build: (context) => buildPrompt(context, `اعتمد على النص التالي: ${context.input || "[ضع النص أو الفقرة]"}.\nاستخرج الفكرة الأساسية ثم الأفكار الفرعية والعلاقات أو الحجج أو الأحكام بحسب طبيعة المادة. إذا كان السؤال يتطلب استدلالًا فاذكر العبارة الدالة من النص المرفق فقط. وضح المعنى بأسلوب طالب ثالث ثانوي. ثم ضع 4 أسئلة فهم واسترجاع، وبعد فاصل واضح ضع الإجابات النموذجية ودليل كل إجابة من النص إن كان موجودًا.`),
  },
];

export function getSubjectFamily(subjectId: string): SubjectFamily {
  return subjectFamilyById[subjectId] ?? "textual";
}

function appliesToSubject(prompt: StudyPrompt, subjectId: string) {
  const family = getSubjectFamily(subjectId);
  if (prompt.subjects && !prompt.subjects.includes(subjectId)) return false;
  if (prompt.families && !prompt.families.includes(family)) return false;
  return true;
}

export function getPromptsForSituation(subjectId: string, situation: PromptSituation) {
  return selfStudyPrompts
    .filter((prompt) => prompt.situations.includes(situation) && appliesToSubject(prompt, subjectId))
    .sort((a, b) => a.priority - b.priority);
}

export function getPromptsForSubject(subjectId: string) {
  return selfStudyPrompts.filter((prompt) => appliesToSubject(prompt, subjectId));
}

export function getRecommendedPrompts(subjectId: string, situation?: PromptSituation) {
  const source = situation ? getPromptsForSituation(subjectId, situation) : getPromptsForSubject(subjectId);
  return [...source].sort((a, b) => {
    const aSpecific = Number(a.subjects?.includes(subjectId) ?? false);
    const bSpecific = Number(b.subjects?.includes(subjectId) ?? false);
    if (aSpecific !== bSpecific) return bSpecific - aSpecific;
    return a.priority - b.priority;
  });
}
