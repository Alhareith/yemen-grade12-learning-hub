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
  subjectId: "رياضيات" | "لغة إنجليزية" | "فيزياء" | "كيمياء" | "أحياء";
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
  {
    subjectId: "فيزياء",
    title: "الكهرباء والتيار المتردد والموصلات",
    label: "وحدة محورية",
    note: "افهم الفكرة من قائمة الشرح، ثم انتقل إلى مسائل الوحدة والنماذج الوزارية.",
    links: [
      { title: "فيزياء الصف الثالث الثانوي — المدرسة الإلكترونية اليمنية", description: "قائمة شرح منظمة للمنهج اليمني تضم 12 فيديو.", url: "https://www.youtube.com/playlist?list=PLC1boXvmEGWXF66sdOuQgzftuivQH6g3m", kind: "قائمة شرح" },
      { title: "فيديوهات الفيزياء ثالث ثانوي", description: "قناة مخصصة للمنهج اليمني تنشر فيديوهات ومسائل وملفات للمادة.", url: "https://t.me/physicsVideos_ibb2022", kind: "قناة Telegram", handle: "@physicsVideos_ibb2022" },
      { title: "قناة الفيزياء الثانوية", description: "شروحات وفيديوهات وكتب إلكترونية موجهة لفيزياء ثالث ثانوي.", url: "https://t.me/physics_ibb2022", kind: "قناة Telegram", handle: "@physics_ibb2022" },
      { title: "حل نماذج وحدة التيار المتردد", description: "نماذج وزارية مشروحة للوحدة الثانية ضمن قائمة القناة التعليمية.", url: "https://www.youtube.com/playlist?list=PLHpCitsFddiytYreLDwhSMrDeQnwN7Q4G", kind: "اختبارات" },
    ],
  },
  {
    subjectId: "فيزياء",
    title: "النماذج الوزارية وحل المسائل",
    label: "راجع وتدرّب",
    note: "عندما تنتهي من وحدتك، اختبر نفسك بنموذج ثم راجع طريقة الحل في القائمة.",
    links: [
      { title: "نماذج وزارية فيزياء — ثالث ثانوي علمي", description: "قائمة لحل أسئلة ومسائل الفيزياء من الوحدات المختلفة.", url: "https://www.youtube.com/playlist?list=PLHpCitsFddiytYreLDwhSMrDeQnwN7Q4G", kind: "اختبارات" },
      { title: "بوابة نماذج اختبارات الشهادة الثانوية", description: "بوابة رسمية لمكتب التربية في حضرموت تعرض مجلدات الاختبارات العلمية حسب السنوات.", url: "https://meoh.gov.ye/services/high-school-exam-forms/", kind: "اختبارات" },
      { title: "فيديوهات الفيزياء — مراجعات ومسائل", description: "ارجع إلى القناة للعثور على حلول المسائل والمراجعات المنشورة.", url: "https://t.me/physicsVideos_ibb2022", kind: "قناة Telegram", handle: "@physicsVideos_ibb2022" },
      { title: "المدرسة الإلكترونية اليمنية", description: "قائمة الشرح المرجعية للمادة؛ ابدأ بالفيديو المرتبط بوحدتك قبل النموذج الوزاري.", url: "https://www.youtube.com/playlist?list=PLC1boXvmEGWXF66sdOuQgzftuivQH6g3m", kind: "شرح عربي" },
    ],
  },
  {
    subjectId: "كيمياء",
    title: "التفاعلات والأكسدة والاختزال",
    label: "وحدة محورية",
    note: "تابع الشرح المتسلسل أولًا، ثم استخدم القناة لتثبيت المصطلحات والتدريبات.",
    links: [
      { title: "قائمة الكيمياء — المدرسة اليمنية", description: "قائمة شرح خاصة بكيمياء الثالث الثانوي وتعرض 12 درسًا.", url: "https://www.youtube.com/playlist?list=PLD-q7i0kPHhDKvQr57tajbtNCRzrdaKd8", kind: "قائمة شرح" },
      { title: "الكيمياء الصف الثالث الثانوي اليمن", description: "قناة لملفات المادة والاختبارات والمناقشة الموجهة للطلاب.", url: "https://t.me/ChemistryYemen", kind: "قناة Telegram", handle: "@ChemistryYemen" },
      { title: "قناة الكيمياء التعليمية", description: "تتضمن موادًا تعليمية في الكيمياء وموضوعات مثل أعداد التأكسد.", url: "https://t.me/EducationalChemistry", kind: "قناة Telegram", handle: "@EducationalChemistry" },
      { title: "كتاب أنشطة الكيمياء", description: "طبّق تدريبات الكتاب الرسمي بعد مشاهدة درس الوحدة.", url: "http://e-learning-moe.edu.ye/adel/android_1/book_12/chemistry_actions_12th.pdf", kind: "اختبارات" },
    ],
  },
  {
    subjectId: "كيمياء",
    title: "المراجعة النهائية والنماذج الوزارية",
    label: "راجع وتدرّب",
    note: "ابدأ بالنماذج مع الإجابات، ثم ارجع إلى الشرح عند ظهور نقطة غير واضحة.",
    links: [
      { title: "25 نموذجًا وزاريًا للكيمياء مع الإجابات", description: "منشور القناة التعليمية اليمنية لنماذج كيمياء الثالث الثانوي المرتبة حسب الوحدات.", url: "https://t.me/YemenEducationC/23988", kind: "اختبارات", handle: "@YemenEducationC" },
      { title: "نماذج اختبارات الكيمياء — ثالث ثانوي", description: "صفحة تجمع نماذج تدريبية للمادة؛ تصنّف كمصدر تدريبي مستقل.", url: "https://yemenedu.com/chemistry-3sec-exam-2025/", kind: "اختبارات" },
      { title: "الكيمياء الصف الثالث الثانوي اليمن", description: "متابعة المراجعات والاختبارات التي تنشرها القناة الخاصة بالمادة.", url: "https://t.me/ChemistryYemen", kind: "قناة Telegram", handle: "@ChemistryYemen" },
      { title: "قائمة الكيمياء — المدرسة اليمنية", description: "ارجع إلى درس الوحدة عندما تحتاج مراجعة الأساس النظري.", url: "https://www.youtube.com/playlist?list=PLD-q7i0kPHhDKvQr57tajbtNCRzrdaKd8", kind: "شرح عربي" },
    ],
  },
  {
    subjectId: "أحياء",
    title: "التنظيم العصبي والهرموني",
    label: "وحدة محورية",
    note: "ابدأ بالدروس المرئية، ثم حل تقويم الوحدة قبل الانتقال إلى الوحدة التالية.",
    links: [
      { title: "قائمة الأحياء — المدرسة اليمنية", description: "قائمة من 20 فيديو للمنهج؛ تتضمن التنظيم العصبي والهرموني وتقويم الوحدة الأولى.", url: "https://www.youtube.com/playlist?list=PLD-q7i0kPHhAGMSb044nvfgs0WpMA_6vP", kind: "قائمة شرح" },
      { title: "الجهاز العصبي في الكائنات الحية", description: "شرح الوحدة الأولى في قائمة المدرسة اليمنية.", url: "https://www.youtube.com/watch?v=x8IrORdGy_0&list=PLD-q7i0kPHhAGMSb044nvfgs0WpMA_6vP", kind: "شرح عربي" },
      { title: "أحياء ثالث ثانوي", description: "قناة متخصصة تنشر أسئلة ومراجعات لموضوعات الأحياء.", url: "https://t.me/Biologyfor12th", kind: "قناة Telegram", handle: "@Biologyfor12th" },
      { title: "قناة أ. عبير حيدر للأحياء", description: "أسئلة وزارية ودروس واختبارات ورسومات خاصة بالمقرر.", url: "https://t.me/abeerhydaar", kind: "قناة Telegram", handle: "@abeerhydaar" },
    ],
  },
  {
    subjectId: "أحياء",
    title: "التكاثر والوراثة",
    label: "وحدة محورية",
    note: "تعامل مع الوراثة والتكاثر كوحدتين تدريبيتين: شاهد المثال ثم حل أسئلة القناة.",
    links: [
      { title: "التكاثر في الكائنات الحية", description: "شرح مباشر للوحدة الثالثة ضمن قائمة الأحياء للمدرسة اليمنية.", url: "https://www.youtube.com/watch?v=YbV-oLRyEkQ&list=PLD-q7i0kPHhAGMSb044nvfgs0WpMA_6vP", kind: "شرح عربي" },
      { title: "قانون مندل الأول", description: "شرح للوحدة الرابعة مع أمثلة تطبيقية في قائمة الأحياء.", url: "https://www.youtube.com/watch?v=TdE0D62tJn4&list=PLD-q7i0kPHhAGMSb044nvfgs0WpMA_6vP", kind: "شرح عربي" },
      { title: "قائمة الأحياء — المدرسة اليمنية", description: "انتقل داخل القائمة بين التكاثر والوراثة وحل تقويم كل وحدة.", url: "https://www.youtube.com/playlist?list=PLD-q7i0kPHhAGMSb044nvfgs0WpMA_6vP", kind: "قائمة شرح" },
      { title: "أحياء ثالث ثانوي — أسئلة واختبارات", description: "ارجع إلى القناة للتدريب على مصطلحات وأسئلة الوحدات.", url: "https://t.me/Biologyfor12th", kind: "قناة Telegram", handle: "@Biologyfor12th" },
    ],
  },
];
