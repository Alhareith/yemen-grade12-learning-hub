/**
 * Design note — دفتر الوصول: unit expansions surface a short, curated path for the most important study blocks without replacing the complete catalog.
 */
export type UnitLink = {
  title: string;
  description: string;
  url: string;
  kind: "شرح عربي" | "قناة Telegram" | "اختبارات" | "قائمة شرح" | "إثرائي بالعربية";
  handle?: string;
};

export type UnitExpansion = {
  subjectId: "رياضيات" | "لغة إنجليزية";
  title: string;
  label: string;
  note: string;
  links: UnitLink[];
};

export const unitExpansions: UnitExpansion[] = [
  {
    subjectId: "رياضيات",
    title: "الجبر والهندسة والاحتمالات",
    label: "وحدة محورية",
    note: "ابدأ بالشرح المنظم، ثم راجع النماذج الوزارية قبل الاختبار.",
    links: [
      { title: "جبر واحتمالات ثالث ثانوي اليمن", description: "قائمة شرح من 23 فيديو تغطي الجبر والاحتمالات.", url: "https://www.youtube.com/playlist?list=PLiLqqc43AoR3lQJ1YiLjFq4PRD95lO_rY", kind: "قائمة شرح" },
      { title: "الأعداد المركبة — رياضيات أتمتة", description: "شرح عربي مباشر من قناة متخصصة بالمنهج اليمني.", url: "https://www.youtube.com/watch?v=K05SQORR2Ws", kind: "شرح عربي" },
      { title: "اختبارات وزارية جبر وهندسة", description: "قناة نماذج ومراجعة للجبر والهندسة للثالث العلمي.", url: "https://t.me/exam3mathYemen", kind: "قناة Telegram", handle: "@exam3mathYemen" },
      { title: "نماذج اختبارات الجبر والهندسة", description: "صفحة نماذج تدريبية خاصة برياضيات الثالث الثانوي.", url: "https://yemenedu.com/math-algebra-3sec-exam-2025/", kind: "اختبارات" },
    ],
  },
  {
    subjectId: "رياضيات",
    title: "التفاضل والتكامل",
    label: "وحدة محورية",
    note: "ثبّت النهايات والمشتقات أولًا، ثم انتقل إلى التدريب على الأسئلة الوزارية.",
    links: [
      { title: "فيديوهات التفاضل والتكامل — ثالث ثانوي", description: "قناة مخصصة لفيديوهات هذه الوحدة وفق المنهج اليمني.", url: "https://t.me/mathyemenibb2022", kind: "قناة Telegram", handle: "@mathyemenibb2022" },
      { title: "شرح النهايات المثلثية", description: "قائمة تشغيل مخصصة للنهايات المثلثية.", url: "https://www.youtube.com/playlist?list=PL7vxjmJ2XTN1nvdzi0hZGBTRxHwMZqjdq", kind: "قائمة شرح" },
      { title: "حل الأسئلة الوزارية 2025 — محمد الدوكري", description: "قائمة شرح تشمل التفاضل والتكامل والجبر والهندسة.", url: "https://www.youtube.com/playlist?list=PLDyfyc2u-gxEfYp97rzoclJuWAKPCCjsW", kind: "شرح عربي" },
      { title: "اختبارات وزارية تفاضل وتكامل", description: "قناة مراجعة ونماذج مخصصة للوحدة.", url: "https://t.me/exam3takamolmathYemen", kind: "قناة Telegram", handle: "@exam3takamolmathYemen" },
    ],
  },
  {
    subjectId: "لغة إنجليزية",
    title: "قواعد المنهج والمراجعات اللغوية",
    label: "ابدأ هنا",
    note: "استخدم شرح المنهج أولًا، ثم أضف كورس القواعد العربي لتثبيت الأساسيات.",
    links: [
      { title: "English Language Grade 12", description: "قائمة شرح مرتبطة بالصف الثالث الثانوي اليمني.", url: "https://www.youtube.com/playlist?list=PLJzLYByPsG2DHUe_K1i36zuq5pfgaqyr3", kind: "قائمة شرح" },
      { title: "الناصر إنجليزي ثالث ثانوي", description: "قناة خاصة بالصف الثالث الثانوي بإشراف مدرس لغة إنجليزية.", url: "https://t.me/AlnasserinEnglish12thGrade", kind: "قناة Telegram", handle: "@AlnasserinEnglish12thGrade" },
      { title: "English Grammar — English Start", description: "كورس قواعد مرتب بالعربية لتقوية الجملة والأزمنة والضمائر.", url: "https://www.youtube.com/playlist?list=PL4z9gdpRQP4wBwC3HLjJ1Tqp_sEkcBgbo", kind: "إثرائي بالعربية" },
      { title: "كورس ZAmericanEnglish", description: "دروس عربية مرتبة من المستوى التأسيسي حتى الطلاقة؛ مصدر إثرائي اختياري.", url: "https://www.youtube.com/@ZAmericanEnglish", kind: "إثرائي بالعربية" },
    ],
  },
  {
    subjectId: "لغة إنجليزية",
    title: "الكتاب والتدريب قبل الاختبار",
    label: "راجع وتدرّب",
    note: "افتح كتاب التمارين وحل التدريبات، ثم تابع القناة الخاصة بالمقرر للمراجعة.",
    links: [
      { title: "English Workbook — كتاب التمارين", description: "كتاب التمارين الرسمي للصف الثالث الثانوي.", url: "http://e-learning-moe.edu.ye/adel/android_1/book_12/english_work_12th.pdf", kind: "اختبارات" },
      { title: "الناصر إنجليزي ثالث ثانوي", description: "مراجعات واستفسارات خاصة بطلاب المقرر.", url: "https://t.me/AlnasserinEnglish12thGrade", kind: "قناة Telegram", handle: "@AlnasserinEnglish12thGrade" },
      { title: "قناة الإعلام التربوي والقناة التعليمية", description: "قناة الوزارة للأخبار التعليمية والملفات التي تنشرها القناة التعليمية.", url: "https://t.me/YemenEducationC", kind: "قناة Telegram", handle: "@YemenEducationC" },
      { title: "English Start — قواعد الإنجليزية", description: "ارجع إلى الكورس عند الحاجة لقاعدة غير واضحة من الكتاب.", url: "https://www.youtube.com/@EnglishStart", kind: "إثرائي بالعربية" },
    ],
  },
];
