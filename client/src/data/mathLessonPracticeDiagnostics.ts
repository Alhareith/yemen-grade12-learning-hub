import type { PracticeDiagnosticRule } from "@shared/practice/practice-diagnostics";

const complexNumberRules: PracticeDiagnosticRule[] = [
  {
    questionId: "practice:CPLX-NUMBER-USE:01",
    focusId: "complex-components",
    focusLabel: "تمييز الجزء الحقيقي من الجزء التخيلي",
    deepeningGoal: "أن أقرأ العدد أ + ب ت وأحدد الجزء الحقيقي ومعامل الجزء التخيلي دون خلط.",
  },
  {
    questionId: "practice:CPLX-NUMBER-USE:02",
    focusId: "complex-components",
    focusLabel: "تمييز الجزء الحقيقي من الجزء التخيلي",
    deepeningGoal: "أن أقرأ العدد أ + ب ت وأحدد الجزء الحقيقي ومعامل الجزء التخيلي دون خلط.",
  },
  {
    questionId: "practice:CPLX-NUMBER-USE:03",
    focusId: "imaginary-unit-powers",
    focusLabel: "قوى الوحدة التخيلية ت",
    deepeningGoal: "أن أفهم ت² = −١ وأستخدم دورة قوى ت بدل الحفظ المتقطع.",
  },
  {
    questionId: "practice:CPLX-NUMBER-USE:04",
    focusId: "imaginary-unit-powers",
    focusLabel: "قوى الوحدة التخيلية ت",
    deepeningGoal: "أن أفهم ت² = −١ وأستخدم دورة قوى ت بدل الحفظ المتقطع.",
  },
  {
    questionId: "practice:CPLX-NUMBER-USE:05",
    focusId: "conjugate-modulus",
    focusLabel: "المرافق والمقياس وعلاقتهما بالعدد المركب",
    deepeningGoal: "أن أميز المرافق عن المقياس وأفهم لماذا يتغير الجزء التخيلي فقط في المرافق.",
  },
  {
    questionId: "practice:CPLX-NUMBER-USE:06",
    focusId: "conjugate-modulus",
    focusLabel: "المرافق والمقياس وعلاقتهما بالعدد المركب",
    deepeningGoal: "أن أميز المرافق عن المقياس وأحسب المقياس من الجزأين الحقيقي والتخيلي.",
  },
  {
    questionId: "practice:CPLX-NUMBER-USE:07",
    focusId: "complex-equality",
    focusLabel: "تساوي عددين مركبين",
    deepeningGoal: "أن أساوي الجزأين الحقيقيين والتخيليين كلًا مع نظيره وأستخرج المجهولات بثقة.",
  },
  {
    questionId: "practice:CPLX-NUMBER-USE:08",
    focusId: "complex-classification",
    focusLabel: "تمييز العدد الحقيقي والتخيلي داخل الصورة المركبة",
    deepeningGoal: "أن أحدد متى يكون العدد المركب حقيقيًا أو تخيليًا من قيمة أ أو ب.",
  },
  {
    questionId: "practice:CPLX-NUMBER-USE:09",
    focusId: "conjugate-modulus",
    focusLabel: "المرافق والمقياس وعلاقتهما بالعدد المركب",
    deepeningGoal: "أن أفهم حاصل ضرب العدد في مرافقه وعلاقته بأ² + ب² بدل تطبيق قاعدة بلا معنى.",
  },
  {
    questionId: "practice:CPLX-NUMBER-USE:10",
    focusId: "complex-plane",
    focusLabel: "تمثيل العدد المركب على المستوى",
    deepeningGoal: "أن أربط أ + ب ت بالنقطة (أ، ب) وأميز ترتيب الإحداثيين وإشاراتهما.",
  },
];

const complexAddSubRules: PracticeDiagnosticRule[] = [
  {
    questionId: "practice:CPLX-ADD-SUB-APPLY:01",
    focusId: "complex-pair-form",
    focusLabel: "تحويل الزوج المرتب إلى الصورة الجبرية",
    deepeningGoal: "أن أحول (أ، ب) مباشرة إلى أ + ب ت ثم أبدأ العملية دون تبديل الجزأين أو إشاراتهما.",
  },
  {
    questionId: "practice:CPLX-ADD-SUB-APPLY:02",
    focusId: "complex-add-like-parts",
    focusLabel: "جمع الأجزاء المتناظرة في العددين المركبين",
    deepeningGoal: "أن أجمع الحقيقي مع الحقيقي والتخيلي مع التخيلي وأحافظ على إشارة كل حد.",
  },
  {
    questionId: "practice:CPLX-ADD-SUB-APPLY:03",
    focusId: "complex-cancellation",
    focusLabel: "ملاحظة إلغاء الحدود المتعاكسة",
    deepeningGoal: "أن ألاحظ بسرعة متى يتلاشى الجزء الحقيقي أو التخيلي بسبب وجود حدين متعاكسين.",
  },
  {
    questionId: "practice:CPLX-ADD-SUB-APPLY:04",
    focusId: "complex-cancellation",
    focusLabel: "ملاحظة إلغاء الحدود المتعاكسة",
    deepeningGoal: "أن أرتب الحدود بعد الطرح وأتعرف على الأجزاء المتساوية التي تتلاشى بدل إجراء خطوات زائدة.",
  },
  {
    questionId: "practice:CPLX-ADD-SUB-APPLY:05",
    focusId: "complex-subtraction-sign",
    focusLabel: "توزيع إشارة السالب عند طرح عدد مركب",
    deepeningGoal: "أن أغير إشارة كل حد داخل العدد المركب المطروح قبل جمع الحدود المتشابهة.",
  },
  {
    questionId: "practice:CPLX-ADD-SUB-APPLY:06",
    focusId: "complex-pair-form",
    focusLabel: "تحويل الزوج المرتب إلى الصورة الجبرية",
    deepeningGoal: "أن أربط الزوج (أ، ب) بالصورة أ + ب ت وأستخدمها بثقة داخل عملية جمع.",
  },
  {
    questionId: "practice:CPLX-ADD-SUB-APPLY:07",
    focusId: "complex-subtraction-sign",
    focusLabel: "توزيع إشارة السالب عند طرح عدد مركب",
    deepeningGoal: "أن أطرح الحقيقي والتخيلي كلًا مع نظيره دون فقد إشارة السالب أو تحويلها في حد واحد فقط.",
  },
  {
    questionId: "practice:CPLX-ADD-SUB-APPLY:08",
    focusId: "complex-negative-root",
    focusLabel: "تحويل الجذر السالب إلى صورة تحتوي ت قبل الجمع أو الطرح",
    deepeningGoal: "أن أحول √−٤ إلى ٢ت أولًا ثم أتعامل مع المسألة كجمع أو طرح عادي للأعداد المركبة.",
  },
  {
    questionId: "practice:CPLX-ADD-SUB-APPLY:09",
    focusId: "complex-subtraction-sign",
    focusLabel: "توزيع إشارة السالب عند طرح عدد مركب",
    deepeningGoal: "أن أوزع السالب على عدد مركب يحتوي حدودًا سالبة دون الوقوع في خطأ الإشارات المزدوجة.",
  },
  {
    questionId: "practice:CPLX-ADD-SUB-APPLY:10",
    focusId: "complex-negative-root",
    focusLabel: "تحويل الجذر السالب إلى صورة تحتوي ت قبل الجمع أو الطرح",
    deepeningGoal: "أن أتعرف بعد تحويل الجذر السالب على حالتي العددين المتساويين وأن طرح أحدهما من الآخر يساوي صفرًا.",
  },
];

const complexMulDivRules: PracticeDiagnosticRule[] = [
  {
    questionId: "practice:CPLX-MUL-DIV-APPLY:01",
    focusId: "complex-conjugate-product",
    focusLabel: "ضرب العدد المركب في مرافقه",
    deepeningGoal: "أن أفهم لماذا ع × ع̄ يساوي أ² + ب² وأطبق ذلك حتى عندما يحتوي المعامل على جذر.",
  },
  {
    questionId: "practice:CPLX-MUL-DIV-APPLY:02",
    focusId: "complex-conjugate-product",
    focusLabel: "ضرب العدد المركب في مرافقه",
    deepeningGoal: "أن أستخدم المرافق لإلغاء الحدين التخيليين وأحسب أ² + ب² دون أخطاء حسابية.",
  },
  {
    questionId: "practice:CPLX-MUL-DIV-APPLY:03",
    focusId: "complex-conjugate-product",
    focusLabel: "ضرب العدد المركب في مرافقه",
    deepeningGoal: "أن أفرق بين تربيع المعامل وتغيير إشارة الجزء التخيلي عند تكوين المرافق.",
  },
  {
    questionId: "practice:CPLX-MUL-DIV-APPLY:04",
    focusId: "complex-conjugate-product",
    focusLabel: "ضرب العدد المركب في مرافقه",
    deepeningGoal: "أن أحسب حاصل ضرب العدد في مرافقه من مربعي الجزأين الحقيقي والتخيلي بثبات.",
  },
  {
    questionId: "practice:CPLX-MUL-DIV-APPLY:05",
    focusId: "complex-radical-square",
    focusLabel: "تربيع معاملات الجذور في الضرب",
    deepeningGoal: "أن أتذكر أن (√أ)² = أ ثم أكمل قاعدة الضرب في المرافق دون ترك الجذر كما هو.",
  },
  {
    questionId: "practice:CPLX-MUL-DIV-APPLY:06",
    focusId: "complex-division-conjugate",
    focusLabel: "استخدام مرافق المقام في قسمة الأعداد المركبة",
    deepeningGoal: "أن أضرب البسط والمقام في مرافق المقام وأحول المقام إلى عدد حقيقي قبل التبسيط.",
  },
  {
    questionId: "practice:CPLX-MUL-DIV-APPLY:07",
    focusId: "complex-division-conjugate",
    focusLabel: "استخدام مرافق المقام في قسمة الأعداد المركبة",
    deepeningGoal: "أن أختار مرافق المقام الصحيح وأحافظ على إشارات البسط أثناء التربيع والتبسيط.",
  },
  {
    questionId: "practice:CPLX-MUL-DIV-APPLY:08",
    focusId: "complex-division-cancellation",
    focusLabel: "ملاحظة إلغاء الجزء الحقيقي بعد ترشيد المقام",
    deepeningGoal: "أن أوسع حاصل الضرب بعد استخدام المرافق وألاحظ متى تتلاشى الحدود الحقيقية فيتبقى ت فقط.",
  },
  {
    questionId: "practice:CPLX-MUL-DIV-APPLY:09",
    focusId: "complex-division-conjugate",
    focusLabel: "استخدام مرافق المقام في قسمة الأعداد المركبة",
    deepeningGoal: "أن أطبق طريقة المرافق على معاملات جذرية متساوية وأبسّط الناتج النهائي بدقة.",
  },
  {
    questionId: "practice:CPLX-MUL-DIV-APPLY:10",
    focusId: "complex-division-cancellation",
    focusLabel: "ملاحظة إلغاء الجزء الحقيقي بعد ترشيد المقام",
    deepeningGoal: "أن أتعرف على نمط البسط والمقام المتعامد الذي يؤدي بعد الترشيد إلى ناتج تخيلي خالص.",
  },
];

const complexPolarRules: PracticeDiagnosticRule[] = [
  {
    questionId: "practice:CPLX-POLAR-USE:01",
    focusId: "polar-first-quadrant",
    focusLabel: "حساب المقياس والزاوية في الربع الأول",
    deepeningGoal: "أن أحسب ر من √(أ² + ب²) وأتعرف على الزوايا الخاصة في الربع الأول دون خلط بين π⁄٦ وπ⁄٣.",
  },
  {
    questionId: "practice:CPLX-POLAR-USE:02",
    focusId: "polar-third-quadrant",
    focusLabel: "تحديد الزاوية الصحيحة في الربع الثالث",
    deepeningGoal: "أن أحدد الربع الثالث من إشارتَي الجزأين ثم أضيف π إلى الزاوية المرجعية بدل اختيار زاوية من ربع آخر.",
  },
  {
    questionId: "practice:CPLX-POLAR-USE:03",
    focusId: "polar-second-quadrant",
    focusLabel: "تحديد الزاوية الصحيحة في الربع الثاني",
    deepeningGoal: "أن أستخدم θ = π − الزاوية المرجعية عندما يكون الجزء الحقيقي سالبًا والتخيلي موجبًا.",
  },
  {
    questionId: "practice:CPLX-POLAR-USE:04",
    focusId: "polar-fourth-quadrant",
    focusLabel: "تحديد الزاوية الصحيحة في الربع الرابع",
    deepeningGoal: "أن أتعرف على الربع الرابع وأستخدم زاوية سالبة مناسبة أو ما يكافئها دون تغيير المقياس.",
  },
  {
    questionId: "practice:CPLX-POLAR-USE:05",
    focusId: "polar-first-quadrant",
    focusLabel: "حساب المقياس والزاوية في الربع الأول",
    deepeningGoal: "أن أميز من النسبة بين الجزأين هل الزاوية π⁄٦ أم π⁄٣ بعد حساب المقياس.",
  },
  {
    questionId: "practice:CPLX-POLAR-USE:06",
    focusId: "polar-third-quadrant",
    focusLabel: "تحديد الزاوية الصحيحة في الربع الثالث",
    deepeningGoal: "أن أربط الزاوية المرجعية π⁄٦ بالربع الثالث فأصل إلى ٧π⁄٦ بثبات.",
  },
  {
    questionId: "practice:CPLX-POLAR-USE:07",
    focusId: "polar-second-quadrant",
    focusLabel: "تحديد الزاوية الصحيحة في الربع الثاني",
    deepeningGoal: "أن أربط الزاوية المرجعية π⁄٦ بالربع الثاني فأصل إلى ٥π⁄٦ دون عكس الإشارات.",
  },
  {
    questionId: "practice:CPLX-POLAR-USE:08",
    focusId: "polar-fourth-quadrant",
    focusLabel: "تحديد الزاوية الصحيحة في الربع الرابع",
    deepeningGoal: "أن أميز عندما تكون الزاوية المرجعية π⁄٣ في الربع الرابع فأكتب −π⁄٣ أو زاويتها الموجبة المكافئة.",
  },
  {
    questionId: "practice:CPLX-POLAR-USE:09",
    focusId: "polar-equal-components",
    focusLabel: "التعرف على زاوية π⁄٤ عند تساوي الجزأين",
    deepeningGoal: "أن أتعرف فورًا على زاوية π⁄٤ عندما يكون الجزآن الحقيقي والتخيلي متساويين وموجبين، مع حساب المقياس بصورة صحيحة.",
  },
  {
    questionId: "practice:CPLX-POLAR-USE:10",
    focusId: "polar-third-quadrant",
    focusLabel: "تحديد الزاوية الصحيحة في الربع الثالث",
    deepeningGoal: "أن أتعرف على الزاوية المرجعية π⁄٣ ثم أنقلها إلى الربع الثالث لأحصل على ٤π⁄٣.",
  },
];

const complexPowersRootsRules: PracticeDiagnosticRule[] = [
  {
    questionId: "practice:CPLX-POWERS-ROOTS-APPLY:01",
    focusId: "complex-power-ratio-cycle",
    focusLabel: "تحويل النسبة المركبة إلى قوة من قوى ت ثم استخدام الدورة",
    deepeningGoal: "أن أبسط (١ + ت) ÷ (١ − ت) إلى ت أولًا، ثم أجمع الأسس وأختزل الأس النهائي بترديد ٤ دون خطوات زائدة.",
  },
  {
    questionId: "practice:CPLX-POWERS-ROOTS-APPLY:02",
    focusId: "complex-root-square",
    focusLabel: "استرجاع العدد المركب من أحد جذريه بالتربيع",
    deepeningGoal: "أن أوسع مربع (أ + ب ت) مع الحد الأوسط ٢أب ت وأستخدم ت² = −١ بصورة صحيحة.",
  },
  {
    questionId: "practice:CPLX-POWERS-ROOTS-APPLY:03",
    focusId: "complex-power-ratio-cycle",
    focusLabel: "تحويل النسبة المركبة إلى قوة من قوى ت ثم استخدام الدورة",
    deepeningGoal: "أن أتعرف على قيمة (ت − ١) ÷ (ت + ١) ثم أختزل الأس الكبير اعتمادًا على دورة ت كل أربع قوى.",
  },
  {
    questionId: "practice:CPLX-POWERS-ROOTS-APPLY:04",
    focusId: "complex-root-signs",
    focusLabel: "ضبط الإشارات عند تربيع جذر مركب",
    deepeningGoal: "أن أطبق (أ − ب ت)² = أ² − ٢أب ت + ب²ت² دون تحويل إشارة الحد الأوسط أو ت² بصورة خاطئة.",
  },
  {
    questionId: "practice:CPLX-POWERS-ROOTS-APPLY:05",
    focusId: "complex-power-negative-i",
    focusLabel: "دورة قوى −ت والأسس الكبيرة",
    deepeningGoal: "أن أبسط النسبة إلى −ت وأتعرف على أن الأس المضاعف لـ٤ يعيد القيمة إلى ١ قبل ضرب العامل الخارجي.",
  },
  {
    questionId: "practice:CPLX-POWERS-ROOTS-APPLY:06",
    focusId: "complex-power-ratio-cycle",
    focusLabel: "تحويل النسبة المركبة إلى قوة من قوى ت ثم استخدام الدورة",
    deepeningGoal: "أن أجمع الأس الخارجي مع أس النسبة بعد تبسيطها إلى ت ثم أستخدم باقي القسمة على ٤ للوصول للناتج مباشرة.",
  },
  {
    questionId: "practice:CPLX-POWERS-ROOTS-APPLY:07",
    focusId: "complex-root-radicals",
    focusLabel: "تربيع عدد مركب بمعاملات جذرية",
    deepeningGoal: "أن أربيع معاملات الجذور وأحسب الحد الأوسط بدقة ثم أستخدم ت² = −١ قبل جمع الجزء الحقيقي.",
  },
  {
    questionId: "practice:CPLX-POWERS-ROOTS-APPLY:08",
    focusId: "complex-power-ratio-cycle",
    focusLabel: "تحويل النسبة المركبة إلى قوة من قوى ت ثم استخدام الدورة",
    deepeningGoal: "أن أختزل الأس الكلي إلى أحد البواقي ٠،١،٢،٣ بعد تحويل النسبة إلى ت، وأربط كل باقٍ بالقيمة الصحيحة.",
  },
  {
    questionId: "practice:CPLX-POWERS-ROOTS-APPLY:09",
    focusId: "complex-root-radicals",
    focusLabel: "تربيع عدد مركب بمعاملات جذرية",
    deepeningGoal: "أن أحسب (√٢ ت)² على أنه −٢، وأحافظ على الحد الأوسط ٢√٢ ت عند استرجاع العدد المركب.",
  },
  {
    questionId: "practice:CPLX-POWERS-ROOTS-APPLY:10",
    focusId: "complex-root-radicals",
    focusLabel: "تربيع عدد مركب بمعاملات جذرية",
    deepeningGoal: "أن أحسب حاصل ضرب √٣ و√٢ داخل الحد الأوسط على أنه √٦، ثم أطبق الإشارة و ت² = −١ دون خلط.",
  },
];

const complexQuadraticRules: PracticeDiagnosticRule[] = [
  {
    questionId: "practice:CPLX-QUADRATIC-SOLVE:01",
    focusId: "quadratic-discriminant-i",
    focusLabel: "حساب المميز عندما يحتوي معامل ع على ت",
    deepeningGoal: "أن أحسب (ب ت)² باستخدام ت² = −١ قبل متابعة المميز، فلا أتعامل مع ت كعدد حقيقي.",
  },
  {
    questionId: "practice:CPLX-QUADRATIC-SOLVE:02",
    focusId: "quadratic-formula-signs",
    focusLabel: "ضبط إشارة −ب وإشارة ± في الصيغة العامة",
    deepeningGoal: "أن أنقل معامل ع إلى البسط بإشارة −ب الصحيحة ثم أتعامل مع فرعي ± دون قلب إشارة أحد الجذرين.",
  },
  {
    questionId: "practice:CPLX-QUADRATIC-SOLVE:03",
    focusId: "quadratic-normalize-i-square",
    focusLabel: "تبسيط ت² قبل حل المعادلة",
    deepeningGoal: "أن أحول ت² إلى −١ أولًا عندما تظهر في الحد الثابت، ثم أحل معادلة تربيعية مبسطة بدل إبقاء ت² كما هي.",
  },
  {
    questionId: "practice:CPLX-QUADRATIC-SOLVE:04",
    focusId: "quadratic-imaginary-square-root",
    focusLabel: "استخراج الجذر التربيعي لمميز سالب",
    deepeningGoal: "أن أحول √−٤٩ إلى ٧ت وأدخله في الصيغة العامة بدقة بدل إيقاف الحل عند مميز سالب.",
  },
  {
    questionId: "practice:CPLX-QUADRATIC-SOLVE:05",
    focusId: "quadratic-normalize-i-square",
    focusLabel: "تبسيط ت² قبل حل المعادلة",
    deepeningGoal: "أن ألاحظ أن −٥ت² = +٥ لأن ت² = −١، وأضبط الإشارة قبل حساب المميز.",
  },
  {
    questionId: "practice:CPLX-QUADRATIC-SOLVE:06",
    focusId: "quadratic-normalize-i-square",
    focusLabel: "تبسيط ت² قبل حل المعادلة",
    deepeningGoal: "أن أحول +٦ت² إلى −٦ أولًا ثم أحسب المميز والجذور دون خلط بين معامل ت والحد الحقيقي.",
  },
  {
    questionId: "practice:CPLX-QUADRATIC-SOLVE:07",
    focusId: "quadratic-formula-signs",
    focusLabel: "ضبط إشارة −ب وإشارة ± في الصيغة العامة",
    deepeningGoal: "أن أكتب −ب بصورة صحيحة عندما يكون ب سالبًا ثم أقسم كلا فرعي البسط كاملين على ٢.",
  },
  {
    questionId: "practice:CPLX-QUADRATIC-SOLVE:08",
    focusId: "quadratic-discriminant-i",
    focusLabel: "حساب المميز عندما يحتوي معامل ع على ت",
    deepeningGoal: "أن أحسب (٥ت)² = −٢٥ ثم أطرح ٤أج، فأصل إلى المميز الحقيقي السالب الصحيح.",
  },
  {
    questionId: "practice:CPLX-QUADRATIC-SOLVE:09",
    focusId: "quadratic-imaginary-square-root",
    focusLabel: "استخراج الجذر التربيعي لمميز سالب",
    deepeningGoal: "أن أتعرف على √−١ = ت ثم أستخدمه في الصيغة العامة للوصول إلى الجذرين بدل اعتبار المعادلة بلا حل.",
  },
  {
    questionId: "practice:CPLX-QUADRATIC-SOLVE:10",
    focusId: "quadratic-root-pair-check",
    focusLabel: "مراجعة زوج الجذور بعد الحل",
    deepeningGoal: "أن أراجع مجموع الجذرين وحاصل ضربهما مع −ب÷أ و ج÷أ للتأكد من الإشارات قبل اعتماد الإجابة.",
  },
];

const diagnosticRulesBySkill: Record<string, readonly PracticeDiagnosticRule[]> = {
  "CPLX-NUMBER-USE": complexNumberRules,
  "CPLX-ADD-SUB-APPLY": complexAddSubRules,
  "CPLX-MUL-DIV-APPLY": complexMulDivRules,
  "CPLX-POLAR-USE": complexPolarRules,
  "CPLX-POWERS-ROOTS-APPLY": complexPowersRootsRules,
  "CPLX-QUADRATIC-SOLVE": complexQuadraticRules,
};

export function getPracticeDiagnosticRulesForSkill(skillId: string): readonly PracticeDiagnosticRule[] {
  return diagnosticRulesBySkill[skillId] ?? [];
}

export const mathLessonPracticeDiagnosticSkillIds = Object.freeze(Object.keys(diagnosticRulesBySkill));