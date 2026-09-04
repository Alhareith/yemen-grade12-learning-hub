export const PILOT_EXAM_ID = "MATH-CALC-2020-ADAPTED-PILOT-01" as const;

export const pilotExamProvenance = {
  relation: "adapted" as const,
  publicLabel: "محاكاة تدريبية متكيفة مع بنية النماذج الوزارية — ليست نسخة حرفية من ورقة امتحان",
  referenceYear: 2020,
  referenceFormat: {
    durationMinutes: 180,
    trueFalseCount: 20,
    trueFalsePointsEach: 1,
    singleChoiceCount: 30,
    singleChoicePointsEach: 2,
    totalQuestions: 50,
    totalPoints: 80,
  },
  primaryReference: {
    publisher: "الإدارة العامة للإعلام التربوي والقناة التعليمية-اليمن",
    title: "نماذج اختبارات وزارية في التفاضل والتكامل 2020 للثالث الثانوي",
    url: "https://t.me/s/YemenEducationC/15308",
  },
  readableSolvedMirror: {
    title: "اختبارات التفاضل والتكامل مع الاجابة 2020م",
    url: "https://www.scribd.com/document/787167221/اختبارات-التفاضل-والتكامل-مع-الاجابة-2020م-1",
    usage: "مرجع قابل للقراءة للتحقق من بنية 20 صح/خطأ ثم 30 اختيارًا وزمن ثلاث ساعات ووجود أوراق إجابة؛ لا تُنسب صياغات المحاكاة إليه حرفيًا.",
  },
  verificationPolicy: [
    "كل سؤال في المحاكاة مصاغ صياغة جديدة داخل نطاق مقرر التفاضل والتكامل، ولا يُعرض كسؤال وزاري حرفي.",
    "الإجابة الصحيحة حُققت رياضيًا على الصياغة المنشورة نفسها، لا بالاعتماد على OCR وحده.",
    "كل سؤال مرتبط بمهارة من خريطة YEMEN-G12-MATH-CALCULUS-V1.",
    "النموذج لا يصبح ready إلا إذا اجتاز 50 سؤالًا جميع بوابات validateExamQuestion.",
  ],
} as const;
