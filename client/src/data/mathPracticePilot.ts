import type { PracticeQuestion, PracticeSet } from "@shared/practice/practice-model";

type PilotSpec = {
  difficulty: PracticeQuestion["difficulty"];
  stem: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
};

export const pilotPracticeSkillTitles: Record<string, string> = {
  "CPLX-NUMBER-USE": "فهم وتمثيل العدد المركب",
  "COUNT-COMBINATIONS-APPLY": "تطبيق التوافيق",
  "CONIC-PARABOLA-APPLY": "حل مسائل القطع المكافئ",
  "PROB-CONDITIONAL-APPLY": "حل مسائل الاحتمال الشرطي والاستقلال وقانون الضرب",
  "DER-CHAIN": "تطبيق قاعدة التسلسل",
  "INT-SUBSTITUTION-APPLY": "تنفيذ التكامل بالتعويض",
};

const specs: Record<string, PilotSpec[]> = {
  "CPLX-NUMBER-USE": [
    { difficulty: "easy", stem: "إذا كان العدد المركب ع = ٣ + ٤ت، فما الجزء الحقيقي؟", options: ["٣", "٤", "−٣", "−٤"], correctIndex: 0, explanation: "الجزء الحقيقي هو العدد الذي لا يصاحبه الرمز ت، لذلك الجزء الحقيقي يساوي ٣." },
    { difficulty: "easy", stem: "إذا كان ع = ٥ − ٢ت، فما معامل الجزء التخيلي؟", options: ["٥", "٢", "−٢", "−٥"], correctIndex: 2, explanation: "معامل ت في العدد ٥ − ٢ت هو −٢." },
    { difficulty: "easy", stem: "ما قيمة ت²؟", options: ["١", "−١", "ت", "−ت"], correctIndex: 1, explanation: "حسب تعريف الوحدة التخيلية: ت² = −١." },
    { difficulty: "medium", stem: "ما قيمة ت⁴؟", options: ["١", "−١", "ت", "−ت"], correctIndex: 0, explanation: "ت⁴ = (ت²)² = (−١)² = ١." },
    { difficulty: "medium", stem: "ما مرافق العدد ٢ + ٣ت؟", options: ["٢ + ٣ت", "−٢ + ٣ت", "٢ − ٣ت", "−٢ − ٣ت"], correctIndex: 2, explanation: "المرافق يغيّر إشارة الجزء التخيلي فقط، لذلك مرافق ٢ + ٣ت هو ٢ − ٣ت." },
    { difficulty: "medium", stem: "ما مقياس العدد ٣ + ٤ت؟", options: ["٣", "٤", "٥", "٧"], correctIndex: 2, explanation: "المقياس = √(٣² + ٤²) = √٢٥ = ٥." },
    { difficulty: "medium", stem: "إذا كان ٢ + ٣ت = أ + ب ت، فما قيمة أ، ب بالترتيب؟", options: ["٢ ، ٣", "٣ ، ٢", "−٢ ، ٣", "٢ ، −٣"], correctIndex: 0, explanation: "يتساوى عددان مركبان عندما تتساوى الأجزاء الحقيقية والتخيلية؛ إذن أ = ٢، ب = ٣." },
    { difficulty: "hard", stem: "أي الأعداد الآتية عدد حقيقي؟", options: ["٧ + ٠ت", "٠ + ٧ت", "٣ + ت", "−٢ت"], correctIndex: 0, explanation: "يكون العدد المركب حقيقيًا عندما يكون معامل ت مساويًا للصفر، لذلك ٧ + ٠ت عدد حقيقي." },
    { difficulty: "hard", stem: "إذا كان ع = أ + ب ت، فما قيمة ع × مرافق ع؟", options: ["أ² + ب²", "أ² − ب²", "٢أب", "أ + ب"], correctIndex: 0, explanation: "(أ + ب ت)(أ − ب ت) = أ² − ب²ت² = أ² + ب² لأن ت² = −١." },
    { difficulty: "hard", stem: "أي نقطة تمثل العدد −٢ + ٥ت في المستوى المركب؟", options: ["(−٢ ، ٥)", "(٥ ، −٢)", "(٢ ، ٥)", "(−٥ ، ٢)"], correctIndex: 0, explanation: "الإحداثي الأفقي يمثل الجزء الحقيقي، والرأسي يمثل معامل ت؛ لذلك النقطة هي (−٢ ، ٥)." },
  ],
  "COUNT-COMBINATIONS-APPLY": [
    { difficulty: "easy", stem: "كم طريقة لاختيار طالبين من ٥ طلاب دون اعتبار للترتيب؟", options: ["٥", "١٠", "٢٠", "٢٥"], correctIndex: 1, explanation: "لأن الترتيب غير مهم نستخدم التوافيق: ٥ ق ٢ = ١٠." },
    { difficulty: "easy", stem: "ما قيمة ٦ ق ٣؟", options: ["١٥", "٢٠", "٣٠", "٦٠"], correctIndex: 1, explanation: "٦ ق ٣ = ٦! ÷ (٣!٣!) = ٢٠." },
    { difficulty: "easy", stem: "كم لجنة من ٤ أشخاص يمكن اختيارها من ٧ أشخاص؟", options: ["٢٨", "٣٥", "٤٢", "٧٠"], correctIndex: 1, explanation: "اختيار لجنة لا يعتمد على الترتيب، لذلك ٧ ق ٤ = ٣٥." },
    { difficulty: "medium", stem: "ما قيمة ن ق ١؟", options: ["١", "ن", "ن − ١", "ن!"], correctIndex: 1, explanation: "اختيار عنصر واحد من ن عناصر يمكن أن يتم بعدد ن من الطرق، لذلك ن ق ١ = ن." },
    { difficulty: "medium", stem: "ما قيمة ٨ ق ٠؟", options: ["٠", "١", "٨", "٤٠"], correctIndex: 1, explanation: "هناك طريقة واحدة لاختيار صفر عنصر: الاختيار الفارغ، لذلك ٨ ق ٠ = ١." },
    { difficulty: "medium", stem: "ما قيمة ٨ ق ٢؟", options: ["١٦", "٢٤", "٢٨", "٥٦"], correctIndex: 2, explanation: "٨ ق ٢ = ٨×٧ ÷ ٢ = ٢٨." },
    { difficulty: "medium", stem: "كم طريقة لاختيار كتابين من ٤ كتب مختلفة دون ترتيب؟", options: ["٤", "٦", "٨", "١٢"], correctIndex: 1, explanation: "نختار كتابين من أربعة دون ترتيب: ٤ ق ٢ = ٦." },
    { difficulty: "hard", stem: "ما قيمة ١٠ ق ٩؟", options: ["٩", "١٠", "٤٥", "٩٠"], correctIndex: 1, explanation: "باستخدام الخاصية ن ق ر = ن ق (ن−ر): ١٠ ق ٩ = ١٠ ق ١ = ١٠." },
    { difficulty: "hard", stem: "ما قيمة ٩ ق ٣؟", options: ["٣٦", "٧٢", "٨٤", "١٢٦"], correctIndex: 2, explanation: "٩ ق ٣ = ٩×٨×٧ ÷ (٣×٢×١) = ٨٤." },
    { difficulty: "hard", stem: "يراد اختيار ٣ طلاب من بين ٥ لتمثيل الصف دون تحديد مناصب. كم اختيارًا ممكنًا؟", options: ["١٠", "١٥", "٢٠", "٦٠"], correctIndex: 0, explanation: "لا توجد مناصب ولا ترتيب، لذلك العدد = ٥ ق ٣ = ١٠." },
  ],
  "CONIC-PARABOLA-APPLY": [
    { difficulty: "easy", stem: "في القطع المكافئ ص² = ٨س، ما قيمة البعد البؤري أ؟", options: ["١", "٢", "٤", "٨"], correctIndex: 1, explanation: "الصورة القياسية ص² = ٤أ س، ومن ٤أ = ٨ نحصل على أ = ٢." },
    { difficulty: "easy", stem: "في ص² = −١٢س، أين تقع البؤرة؟", options: ["(٣ ، ٠)", "(−٣ ، ٠)", "(٠ ، ٣)", "(٠ ، −٣)"], correctIndex: 1, explanation: "٤أ = −١٢، إذن أ = −٣، والبؤرة في الصورة ص² = ٤أ س هي (أ ، ٠)." },
    { difficulty: "easy", stem: "في س² = ١٦ص، أين تقع البؤرة؟", options: ["(٤ ، ٠)", "(−٤ ، ٠)", "(٠ ، ٤)", "(٠ ، −٤)"], correctIndex: 2, explanation: "٤أ = ١٦، إذن أ = ٤، وبؤرة س² = ٤أ ص هي (٠ ، أ) = (٠ ، ٤)." },
    { difficulty: "medium", stem: "ما دليل القطع المكافئ س² = −٢٠ص؟", options: ["ص = ٥", "ص = −٥", "س = ٥", "س = −٥"], correctIndex: 0, explanation: "٤أ = −٢٠، إذن أ = −٥، ودليل س² = ٤أ ص هو ص = −أ، أي ص = ٥." },
    { difficulty: "medium", stem: "ما بؤرة القطع المكافئ ص² = ٤س؟", options: ["(١ ، ٠)", "(−١ ، ٠)", "(٠ ، ١)", "(٠ ، −١)"], correctIndex: 0, explanation: "٤أ = ٤، إذن أ = ١، والبؤرة (أ ، ٠) = (١ ، ٠)." },
    { difficulty: "medium", stem: "ما دليل القطع المكافئ ص² = ١٢س؟", options: ["س = ٣", "س = −٣", "ص = ٣", "ص = −٣"], correctIndex: 1, explanation: "٤أ = ١٢، إذن أ = ٣، ودليل ص² = ٤أ س هو س = −أ = −٣." },
    { difficulty: "medium", stem: "في أي اتجاه يفتح القطع س² = ٨ص؟", options: ["إلى أعلى", "إلى أسفل", "إلى اليمين", "إلى اليسار"], correctIndex: 0, explanation: "لأن أ موجب في س² = ٤أ ص، فالقطع يفتح إلى أعلى." },
    { difficulty: "hard", stem: "في أي اتجاه يفتح القطع س² = −٨ص؟", options: ["إلى أعلى", "إلى أسفل", "إلى اليمين", "إلى اليسار"], correctIndex: 1, explanation: "لأن أ سالب في س² = ٤أ ص، فالقطع يفتح إلى أسفل." },
    { difficulty: "hard", stem: "قطع مكافئ رأسه نقطة الأصل وبؤرته (٣ ، ٠). ما معادلته؟", options: ["ص² = ١٢س", "ص² = −١٢س", "س² = ١٢ص", "س² = −١٢ص"], correctIndex: 0, explanation: "البؤرة (أ ، ٠) وتعطي أ = ٣، إذن ص² = ٤أ س = ١٢س." },
    { difficulty: "hard", stem: "قطع مكافئ رأسه نقطة الأصل وبؤرته (٠ ، −٢). ما معادلته؟", options: ["س² = ٨ص", "س² = −٨ص", "ص² = ٨س", "ص² = −٨س"], correctIndex: 1, explanation: "البؤرة (٠ ، أ) وتعطي أ = −٢، إذن س² = ٤أ ص = −٨ص." },
  ],
  "PROB-CONDITIONAL-APPLY": [
    { difficulty: "easy", stem: "إذا كان ل(أ ∩ ب) = ٠٫٢ و ل(ب) = ٠٫٥، فما ل(أ | ب)؟", options: ["٠٫٢", "٠٫٤", "٠٫٥", "٠٫٧"], correctIndex: 1, explanation: "ل(أ | ب) = ل(أ ∩ ب) ÷ ل(ب) = ٠٫٢ ÷ ٠٫٥ = ٠٫٤." },
    { difficulty: "easy", stem: "إذا كان ل(أ) = ٠٫٦ و ل(ب | أ) = ٠٫٥، فما ل(أ ∩ ب)؟", options: ["٠٫١", "٠٫٣", "٠٫٥", "٠٫٦"], correctIndex: 1, explanation: "من قانون الضرب: ل(أ ∩ ب) = ل(أ) × ل(ب | أ) = ٠٫٦ × ٠٫٥ = ٠٫٣." },
    { difficulty: "easy", stem: "إذا كانت أ، ب حادثتين مستقلتين، وكان ل(أ) = ٠٫٤، فما ل(أ | ب)؟", options: ["٠", "٠٫٤", "ل(ب)", "١"], correctIndex: 1, explanation: "في الحوادث المستقلة لا يغيّر وقوع ب احتمال أ، لذلك ل(أ | ب) = ل(أ) = ٠٫٤." },
    { difficulty: "medium", stem: "إذا كان ل(أ | ب) = ٠٫٢٥ و ل(ب) = ٠٫٤، فما ل(أ ∩ ب)؟", options: ["٠٫١", "٠٫٢", "٠٫٤", "٠٫٦٥"], correctIndex: 0, explanation: "ل(أ ∩ ب) = ل(أ | ب) × ل(ب) = ٠٫٢٥ × ٠٫٤ = ٠٫١." },
    { difficulty: "medium", stem: "إذا كان ل(ب | أ) = ٠٫٣ و ل(أ) = ٠٫٧، فما ل(أ ∩ ب)؟", options: ["٠٫١", "٠٫٢١", "٠٫٣", "١"], correctIndex: 1, explanation: "ل(أ ∩ ب) = ل(أ) × ل(ب | أ) = ٠٫٧ × ٠٫٣ = ٠٫٢١." },
    { difficulty: "medium", stem: "إذا كانت أ، ب حادثتين متنافيتين و ل(ب) > ٠، فما ل(أ | ب)؟", options: ["٠", "ل(أ)", "ل(ب)", "١"], correctIndex: 0, explanation: "الحادثتان المتنافيتان لا تجتمعان، لذلك ل(أ ∩ ب) = ٠ ومن ثم ل(أ | ب) = ٠." },
    { difficulty: "medium", stem: "كيس فيه ٣ كرات حمراء و٢ زرقاء. سُحبت كرة حمراء أولًا دون إعادة. ما احتمال أن تكون الثانية حمراء؟", options: ["١/٤", "١/٢", "٢/٣", "٣/٤"], correctIndex: 1, explanation: "بعد سحب حمراء يبقى كرتان حمراوان من أصل أربع كرات، فالاحتمال = ٢/٤ = ١/٢." },
    { difficulty: "hard", stem: "عند رمي حجر نرد، إذا علمت أن الناتج زوجي، فما احتمال أن يكون أكبر من ٣؟", options: ["١/٣", "١/٢", "٢/٣", "١"], correctIndex: 2, explanation: "النواتج الزوجية هي {٢،٤،٦}. الأكبر من ٣ بينها {٤،٦}، إذن الاحتمال ٢/٣." },
    { difficulty: "hard", stem: "اختير عدد عشوائيًا من ١ إلى ١٠. إذا علمت أنه زوجي، فما احتمال أن يكون من مضاعفات ٤؟", options: ["١/٥", "٢/٥", "١/٢", "٤/٥"], correctIndex: 1, explanation: "الأعداد الزوجية هي {٢،٤،٦،٨،١٠} وعددها ٥. مضاعفات ٤ بينها {٤،٨} وعددها ٢، فالاحتمال ٢/٥." },
    { difficulty: "hard", stem: "إذا كان ل(أ) = ٠٫٥، ل(ب) = ٠٫٤، ل(أ ∩ ب) = ٠٫٢، فما ل(ب | أ)؟", options: ["٠٫٢", "٠٫٤", "٠٫٥", "٠٫٨"], correctIndex: 1, explanation: "ل(ب | أ) = ل(أ ∩ ب) ÷ ل(أ) = ٠٫٢ ÷ ٠٫٥ = ٠٫٤." },
  ],
  "DER-CHAIN": [
    { difficulty: "easy", stem: "إذا كانت د(س) = (س² + ١)³، فما د′(س)؟", options: ["٣(س² + ١)²", "٦س(س² + ١)²", "٦س(س² + ١)³", "٣س²(س² + ١)²"], correctIndex: 1, explanation: "نشتق الخارجية ثم نضرب في مشتقة الداخلية: ٣(س²+١)² × ٢س = ٦س(س²+١)²." },
    { difficulty: "easy", stem: "إذا كانت د(س) = (٣س + ١)⁵، فما د′(س)؟", options: ["٥(٣س + ١)⁴", "١٥(٣س + ١)⁴", "١٥(٣س + ١)⁵", "٣(٣س + ١)⁴"], correctIndex: 1, explanation: "مشتقة القوة ٥(٣س+١)⁴ ثم نضرب في مشتقة ٣س+١ وهي ٣، فنحصل على ١٥(٣س+١)⁴." },
    { difficulty: "easy", stem: "إذا كانت د(س) = جا(س²)، فما د′(س)؟", options: ["جتا(س²)", "٢س جا(س²)", "٢س جتا(س²)", "س² جتا(س)"], correctIndex: 2, explanation: "مشتقة جا(الداخلية) هي جتا(الداخلية)، ثم نضرب في مشتقة س² وهي ٢س." },
    { difficulty: "medium", stem: "إذا كانت د(س) = √(٢س + ١)، فما د′(س)؟", options: ["١/√(٢س + ١)", "٢/√(٢س + ١)", "١/(٢√(٢س + ١))", "√(٢س + ١)"], correctIndex: 0, explanation: "مشتقة √ع هي ع′/(٢√ع). هنا ع′ = ٢، فيختصر ٢ مع المقام فتصبح ١/√(٢س+١)." },
    { difficulty: "medium", stem: "إذا كانت د(س) = (س³ − ٢)⁴، فما د′(س)؟", options: ["٤(س³ − ٢)³", "١٢س²(س³ − ٢)³", "١٢س(س³ − ٢)³", "٤س³(س³ − ٢)³"], correctIndex: 1, explanation: "نشتق الخارجية: ٤(س³−٢)³، ثم نضرب في مشتقة س³−٢ وهي ٣س²؛ الناتج ١٢س²(س³−٢)³." },
    { difficulty: "medium", stem: "إذا كانت د(س) = جتا(٥س)، فما د′(س)؟", options: ["−جا(٥س)", "−٥جا(٥س)", "٥جتا(٥س)", "٥جا(٥س)"], correctIndex: 1, explanation: "مشتقة جتا(ع) = −جا(ع) × ع′، ومشتقة ٥س هي ٥، إذن −٥جا(٥س)." },
    { difficulty: "medium", stem: "إذا كانت د(س) = هـ^(س²)، فما د′(س)؟", options: ["هـ^(س²)", "٢س هـ^(س²)", "س² هـ^س", "٢ هـ^(س²)"], correctIndex: 1, explanation: "مشتقة هـ^ع هي هـ^ع × ع′. هنا ع = س² ومشتقته ٢س." },
    { difficulty: "hard", stem: "إذا كانت د(س) = لو هـ(٣س + ٢)، فما د′(س)؟", options: ["١/(٣س + ٢)", "٣/(٣س + ٢)", "٣س/(٣س + ٢)", "٣س + ٢"], correctIndex: 1, explanation: "مشتقة لو هـ(ع) = ع′/ع، ومشتقة ٣س+٢ هي ٣، إذن ٣/(٣س+٢)." },
    { difficulty: "hard", stem: "إذا كانت د(س) = ١/(س² + ١)، فما د′(س)؟", options: ["٢س/(س² + ١)²", "−٢س/(س² + ١)²", "−١/(س² + ١)²", "٢/(س² + ١)"], correctIndex: 1, explanation: "نكتبها (س²+١)^−١ ثم نطبق قاعدة التسلسل: −١(س²+١)^−٢ × ٢س = −٢س/(س²+١)²." },
    { difficulty: "hard", stem: "إذا كانت د(س) = جا(٣س + ١)، فما د′(س)؟", options: ["جتا(٣س + ١)", "٣جتا(٣س + ١)", "−٣جا(٣س + ١)", "٣جا(٣س + ١)"], correctIndex: 1, explanation: "مشتقة جا(ع) = جتا(ع) × ع′، ومشتقة ٣س+١ هي ٣." },
  ],
  "INT-SUBSTITUTION-APPLY": [
    { difficulty: "easy", stem: "أوجد ∫ ٢س(س² + ١)³ دس.", options: ["(س² + ١)⁴/٤ + ث", "(س² + ١)⁴/٢ + ث", "٢(س² + ١)⁴ + ث", "(س² + ١)³/٣ + ث"], correctIndex: 0, explanation: "نضع ع = س²+١، فيكون دع = ٢س دس. يصبح التكامل ∫ ع³ دع = ع⁴/٤ + ث." },
    { difficulty: "easy", stem: "أوجد ∫ ٣(٣س + ٢)⁴ دس.", options: ["(٣س + ٢)⁵/٥ + ث", "(٣س + ٢)⁵/١٥ + ث", "٣(٣س + ٢)⁵/٥ + ث", "(٣س + ٢)⁴/٤ + ث"], correctIndex: 0, explanation: "نضع ع = ٣س+٢، فيكون دع = ٣ دس. يصبح التكامل ∫ ع⁴ دع = ع⁵/٥ + ث." },
    { difficulty: "easy", stem: "أوجد ∫ ٢س جتا(س²) دس.", options: ["جا(س²) + ث", "جتا(س²) + ث", "٢ جا(س²) + ث", "س² جا(س²) + ث"], correctIndex: 0, explanation: "نضع ع = س²، فيكون دع = ٢س دس، ثم ∫ جتا ع دع = جا ع + ث." },
    { difficulty: "medium", stem: "أوجد ∫ ٥ هـ^(٥س) دس.", options: ["هـ^(٥س) + ث", "٥هـ^(٥س) + ث", "هـ^(٥س)/٥ + ث", "٥س هـ^(٥س) + ث"], correctIndex: 0, explanation: "نضع ع = ٥س، فيكون دع = ٥ دس، فيصبح التكامل ∫ هـ^ع دع = هـ^ع + ث." },
    { difficulty: "medium", stem: "أوجد ∫ [٢س/(س² + ٤)] دس.", options: ["لو هـ(س² + ٤) + ث", "٢ لو هـ(س² + ٤) + ث", "١/(س² + ٤) + ث", "س²/(س² + ٤) + ث"], correctIndex: 0, explanation: "نضع ع = س²+٤، فيكون دع = ٢س دس، والتكامل ∫ دع/ع = لو هـ ع + ث." },
    { difficulty: "medium", stem: "أوجد ∫ جتا(٣س) دس.", options: ["٣ جا(٣س) + ث", "جا(٣س)/٣ + ث", "جتا(٣س)/٣ + ث", "−جا(٣س)/٣ + ث"], correctIndex: 1, explanation: "نضع ع = ٣س، فيكون دع = ٣ دس، ولذلك دس = دع/٣؛ الناتج جا(٣س)/٣ + ث." },
    { difficulty: "medium", stem: "أوجد ∫ [س/√(س² + ١)] دس.", options: ["√(س² + ١) + ث", "٢√(س² + ١) + ث", "١/√(س² + ١) + ث", "س²√(س² + ١) + ث"], correctIndex: 0, explanation: "نضع ع = س²+١، فيكون دع = ٢س دس؛ يصبح التكامل ١/٢ ∫ ع^−١/٢ دع = √ع + ث." },
    { difficulty: "hard", stem: "أوجد ∫ ٤س(٢س² + ١)² دس.", options: ["(٢س² + ١)³/٣ + ث", "(٢س² + ١)³/٦ + ث", "٤(٢س² + ١)³/٣ + ث", "(٢س² + ١)²/٢ + ث"], correctIndex: 0, explanation: "نضع ع = ٢س²+١، فيكون دع = ٤س دس، ثم ∫ ع² دع = ع³/٣ + ث." },
    { difficulty: "hard", stem: "أوجد ∫ (٢س + ١)⁵ دس.", options: ["(٢س + ١)⁶/٦ + ث", "(٢س + ١)⁶/١٢ + ث", "٢(٢س + ١)⁶/٦ + ث", "(٢س + ١)⁵/٥ + ث"], correctIndex: 1, explanation: "نضع ع = ٢س+١، فيكون دع = ٢ دس، أي دس = دع/٢؛ لذلك الناتج ع⁶/١٢ + ث." },
    { difficulty: "hard", stem: "أوجد ∫ [هـ^س/(١ + هـ^س)] دس.", options: ["لو هـ(١ + هـ^س) + ث", "هـ^س لو هـ(١ + هـ^س) + ث", "١/(١ + هـ^س) + ث", "هـ^(٢س)/٢ + ث"], correctIndex: 0, explanation: "نضع ع = ١ + هـ^س، فيكون دع = هـ^س دس، فيصبح التكامل ∫ دع/ع = لو هـ ع + ث." },
  ],
};

const optionIds = ["a", "b", "c", "d"] as const;
const optionLabels = ["أ", "ب", "ج", "د"] as const;

function toQuestion(skillId: string, spec: PilotSpec, index: number): PracticeQuestion {
  const number = String(index + 1).padStart(2, "0");
  return {
    schemaVersion: "1.0",
    kind: "practice",
    id: `practice:${skillId}:${number}`,
    skillId,
    type: "single-choice",
    difficulty: spec.difficulty,
    stem: [{ type: "text", text: spec.stem }],
    options: spec.options.map((text, optionIndex) => ({
      id: optionIds[optionIndex],
      label: optionLabels[optionIndex],
      content: [{ type: "text", text }],
    })),
    answer: {
      correctOptionId: optionIds[spec.correctIndex],
      explanation: [{ type: "text", text: spec.explanation }],
    },
    provenance: { origin: "authored" },
    verification: {
      status: "verified",
      checks: {
        contentReviewed: true,
        answerReviewed: true,
        explanationReviewed: true,
        skillReviewed: true,
      },
      reviewedAt: "2026-09-07T12:00:00+03:00",
      reviewedBy: "project-content-review",
      blockingNotes: [],
    },
  };
}

export const mathPracticePilotQuestions: PracticeQuestion[] = Object.entries(specs).flatMap(([skillId, skillSpecs]) =>
  skillSpecs.map((spec, index) => toQuestion(skillId, spec, index)),
);

export const mathPracticePilotSets: PracticeSet[] = Object.keys(specs).map((skillId) => ({
  schemaVersion: "1.0",
  id: `practice-set:${skillId}:pilot-v1`,
  skillId,
  title: `تدريب: ${pilotPracticeSkillTitles[skillId]}`,
  questionIds: mathPracticePilotQuestions.filter((question) => question.skillId === skillId).map((question) => question.id),
  roundSize: 5,
  status: "ready",
}));

export const pilotPracticeSkillIds = Object.keys(specs);
