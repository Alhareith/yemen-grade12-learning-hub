/**
 * Design note: rich catalog keeps official books for all subjects, full trusted source sets for science/language subjects, and book-only cards for Islamic subjects.
 */

export type ResourceCard = { id: string; title: string; url: string; platform: string; category: string; categoryLabel: string; badge: string; detail: string; handle?: string };
export type MaterialCatalog = { id: string; title: string; icon: string; bookOnly: boolean; sources: ResourceCard[] };

export const materials: MaterialCatalog[] = [
  {
    "id": "رياضيات",
    "title": "رياضيات",
    "icon": "Sigma",
    "bookOnly": false,
    "sources": [
      {
        "id": "رياضيات-0",
        "title": "صفحة الصف الثالث ثانوي - الإدارة العامة للتعليم الإلكتروني",
        "url": "http://e-learning-moe.edu.ye/ClassTwelve.php",
        "platform": "Web",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "المرجع الرسمي الذي يعرض كتب القسم العلمي وروابط PDF"
      },
      {
        "id": "رياضيات-1",
        "title": "كتاب الرياضيات - القسم العلمي",
        "url": "http://e-learning-moe.edu.ye/adel/android_1/book_12/mathematic_12th.pdf",
        "platform": "PDF",
        "category": "books",
        "categoryLabel": "الكتب الرسمية",
        "badge": "كتاب رسمي",
        "detail": "رابط PDF مباشر من بوابة التعليم الإلكتروني"
      },
      {
        "id": "رياضيات-2",
        "title": "كتاب تمارين الرياضيات - القسم العلمي",
        "url": "http://e-learning-moe.edu.ye/adel/android_1/book_12/exercise_mathe_12th.pdf",
        "platform": "PDF",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "رابط PDF مباشر من بوابة التعليم الإلكتروني"
      },
      {
        "id": "رياضيات-3",
        "title": "الكتب الدراسية اليمنية",
        "url": "https://t.me/Books_Yemen_new",
        "platform": "Telegram",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "القناة مرتبطة من صفحة البوابة الرسمية وتعلن نشر المناهج"
      },
      {
        "id": "رياضيات-4",
        "title": "المنصة اليمنية للتعليم الإلكتروني - يمان",
        "url": "https://meyon.com.ye/a/yaman.elearin.edu/videos?s=1",
        "platform": "Web",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "منصة مرتبطة بالبوابة وتعرض فيديوهات للثالث الثانوي"
      },
      {
        "id": "رياضيات-5",
        "title": "صديق الطالب - أ/ محمد الدوكري",
        "url": "https://www.youtube.com/channel/UCgQXF1GXFkjoB6f5Ms8BGgQ",
        "platform": "YouTube",
        "category": "youtube",
        "categoryLabel": "YouTube والشرح",
        "badge": "قناة معلم",
        "detail": "قناة مدرسية تعليمية؛ ينبغي توجيه الطالب إلى قوائم التشغيل المناسبة"
      },
      {
        "id": "رياضيات-6",
        "title": "حل الأسئلة الوزارية 2025م الخاصة بالرياضيات",
        "url": "https://www.youtube.com/playlist?list=PLDyfyc2u-gxEfYp97rzoclJuWAKPCCjsW",
        "platform": "YouTube",
        "category": "youtube",
        "categoryLabel": "YouTube والشرح",
        "badge": "قائمة شرح",
        "detail": "قائمة لمحمد الدوكري؛ تشمل التفاضل والتكامل والجبر والهندسة والاحتمالات"
      },
      {
        "id": "رياضيات-7",
        "title": "رياضيات أتمتة - وقود الأوائل",
        "url": "https://www.youtube.com/@Riathiat_atmatah_math",
        "platform": "YouTube",
        "category": "youtube",
        "categoryLabel": "YouTube والشرح",
        "badge": "قناة معلم",
        "detail": "قناة مستقلة متخصصة؛ المحتوى الظاهر مطابق للمنهج اليمني"
      },
      {
        "id": "رياضيات-8",
        "title": "حل الأسئلة الوزارية للأعداد المركبة 2025م",
        "url": "https://www.youtube.com/watch?v=W8atUbNHu9o",
        "platform": "YouTube",
        "category": "youtube",
        "categoryLabel": "YouTube والشرح",
        "badge": "فيديو شرح",
        "detail": "من قناة رياضيات أتمتة"
      },
      {
        "id": "رياضيات-9",
        "title": "الأعداد المركبة - شرح 1",
        "url": "https://www.youtube.com/watch?v=K05SQORR2Ws",
        "platform": "YouTube",
        "category": "youtube",
        "categoryLabel": "YouTube والشرح",
        "badge": "فيديو شرح",
        "detail": "من قناة رياضيات أتمتة"
      },
      {
        "id": "رياضيات-10",
        "title": "الأعداد المركبة - شرح 2",
        "url": "https://www.youtube.com/watch?v=30FHFSFdANw",
        "platform": "YouTube",
        "category": "youtube",
        "categoryLabel": "YouTube والشرح",
        "badge": "فيديو شرح",
        "detail": "من قناة رياضيات أتمتة"
      },
      {
        "id": "رياضيات-11",
        "title": "جمع وطرح وتساوي الأعداد المركبة",
        "url": "https://www.youtube.com/watch?v=dSNuyljpnXw",
        "platform": "YouTube",
        "category": "youtube",
        "categoryLabel": "YouTube والشرح",
        "badge": "فيديو شرح",
        "detail": "من قناة رياضيات أتمتة"
      },
      {
        "id": "رياضيات-12",
        "title": "ضرب وقسمة الأعداد المركبة بالصورة الجبرية",
        "url": "https://www.youtube.com/watch?v=Tw6B0uBELjE",
        "platform": "YouTube",
        "category": "youtube",
        "categoryLabel": "YouTube والشرح",
        "badge": "فيديو شرح",
        "detail": "من قناة رياضيات أتمتة"
      },
      {
        "id": "رياضيات-13",
        "title": "الصورة القطبية للأعداد المركبة",
        "url": "https://www.youtube.com/watch?v=JyaZah_v6_c",
        "platform": "YouTube",
        "category": "youtube",
        "categoryLabel": "YouTube والشرح",
        "badge": "فيديو شرح",
        "detail": "من قناة رياضيات أتمتة"
      },
      {
        "id": "رياضيات-14",
        "title": "التحويل من الصورة الجبرية إلى القطبية",
        "url": "https://www.youtube.com/watch?v=qoeWJp6VBM",
        "platform": "YouTube",
        "category": "youtube",
        "categoryLabel": "YouTube والشرح",
        "badge": "فيديو شرح",
        "detail": "من قناة رياضيات أتمتة"
      },
      {
        "id": "رياضيات-15",
        "title": "اقرأ معي وتعلم على الانترنت",
        "url": "https://www.youtube.com/channel/UCrx0GbS_uoJMRTrTE4WOkFw/playlists",
        "platform": "YouTube",
        "category": "youtube",
        "categoryLabel": "YouTube والشرح",
        "badge": "قناة معلم",
        "detail": "قناة تحتوي قوائم للثالث الثانوي، مع ضرورة اختيار القائمة العلمية المناسبة"
      },
      {
        "id": "رياضيات-16",
        "title": "جبر واحتمالات ثالث ثانوي اليمن",
        "url": "https://www.youtube.com/playlist?list=PLiLqqc43AoR3lQJ1YiLjFq4PRD95lO_rY",
        "platform": "YouTube",
        "category": "youtube",
        "categoryLabel": "YouTube والشرح",
        "badge": "قائمة شرح",
        "detail": "23 فيديو؛ بعض عناصر القائمة قديمة ويجب مطابقة الدرس مع الطبعة الحالية"
      },
      {
        "id": "رياضيات-17",
        "title": "رياضيات ثالث ثانوي اليمن - 48 درسًا",
        "url": "https://www.youtube.com/playlist?list=PLiLqqc43AoR2TFs-DNOV8veKSwETnglvz",
        "platform": "YouTube",
        "category": "youtube",
        "categoryLabel": "YouTube والشرح",
        "badge": "قائمة شرح",
        "detail": "قائمة ظهرت في قناة اقرأ معي؛ تحتاج فهرسة داخلية قبل التوصية"
      },
      {
        "id": "رياضيات-18",
        "title": "قناة رياضيات ثالث ثانوي - اليمن mathematics yemen",
        "url": "https://www.youtube.com/@-mathematicsyemen5134",
        "platform": "YouTube",
        "category": "youtube",
        "categoryLabel": "YouTube والشرح",
        "badge": "قناة معلم",
        "detail": "12 فيديو ظاهرًا وقائمة للنهايات المثلثية"
      },
      {
        "id": "رياضيات-19",
        "title": "شرح النهايات المثلثية - قائمة تشغيل",
        "url": "https://www.youtube.com/playlist?list=PL7vxjmJ2XTN1nvdzi0hZGBTRxHwMZqjdq",
        "platform": "YouTube",
        "category": "youtube",
        "categoryLabel": "YouTube والشرح",
        "badge": "قائمة شرح",
        "detail": "قائمة من 12 فيديو"
      },
      {
        "id": "رياضيات-20",
        "title": "فيديوهات دروس الرياضيات التفاضل والتكامل - ثالث ثانوي",
        "url": "https://t.me/mathyemenibb2022",
        "platform": "Telegram",
        "category": "telegram",
        "categoryLabel": "قنوات Telegram",
        "badge": "قناة Telegram",
        "detail": "قناة متخصصة بالفيديوهات؛ ظهر فيها محتوى للمنهج اليمني واختبارات جبر وهندسة"
      },
      {
        "id": "رياضيات-21",
        "title": "اختبارات وزارية جبر وهندسة 3ث علمي",
        "url": "https://t.me/exam3mathYemen",
        "platform": "Telegram",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "قناة متخصصة في اختبارات الجبر والهندسة؛ 698 مشتركًا وقت الفحص"
      },
      {
        "id": "رياضيات-22",
        "title": "اختبارات وزارية 3ث تفاضل وتكامل",
        "url": "https://t.me/exam3takamolmathYemen",
        "platform": "Telegram",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "قناة متخصصة في اختبارات التفاضل والتكامل؛ 756 مشتركًا وقت الفحص"
      },
      {
        "id": "رياضيات-23",
        "title": "الإدارة العامة للتوجيه التربوي - وزارة التربية والتعليم والبحث العلمي",
        "url": "https://t.me/yeducation2",
        "platform": "Telegram",
        "category": "telegram",
        "categoryLabel": "قنوات Telegram",
        "badge": "قناة Telegram",
        "detail": "قناة تصف نفسها بأنها تحت إشراف الإدارة العامة للتوجيه؛ مرجع للأخبار والنماذج لا للشرح"
      },
      {
        "id": "رياضيات-24",
        "title": "الأوائل لطلاب ثالث ثانوي",
        "url": "https://t.me/nahgalawael",
        "platform": "Telegram",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "قناة تجميعية تضم ملخصات وكتبًا ونماذج لجميع المواد، ويجب انتقاء منشورات الرياضيات"
      },
      {
        "id": "رياضيات-25",
        "title": "الإمتياز في الرياضيات - الثالث الثانوي",
        "url": "https://t.me/Reveal12000",
        "platform": "Telegram",
        "category": "youtube",
        "categoryLabel": "YouTube والشرح",
        "badge": "قناة معلم",
        "detail": "قناة للأستاذ شاجع الدميني؛ المحتوى قد يحتوي منشورات محالة لمواد أخرى"
      },
      {
        "id": "رياضيات-26",
        "title": "ملتقى طلبة ثالث ثانوي - اليمن",
        "url": "https://t.me/thirdgroupye",
        "platform": "Telegram",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "قناة عامة لجميع المواد؛ يجب ربط منشور أو وسم رياضيات بدل إرسال الطالب إلى التدفق العام"
      },
      {
        "id": "رياضيات-27",
        "title": "قناة رياضيات اليمن",
        "url": "https://t.me/Yemenmath",
        "platform": "Telegram",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "تظهر مؤشرات تغطية للرياضيات، لكن المحتوى الحديث مختلط بإعلانات وروابط غير تعليمية"
      },
      {
        "id": "رياضيات-28",
        "title": "بنك الأسئلة - الرياضيات 3ث",
        "url": "https://www.e-najah.net/QBTHSSMath/",
        "platform": "Web",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "اختبارات أتمتة مقسمة حسب الوحدات وتستند في معظمها إلى أسئلة وزارية سابقة"
      },
      {
        "id": "رياضيات-29",
        "title": "اختبار الأعداد المركبة - النموذج الأول",
        "url": "https://forms.gle/Lmqy4BhM8m3EpWgm7",
        "platform": "Google Forms",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "اختبار تدريبي من بنك نجاح"
      },
      {
        "id": "رياضيات-30",
        "title": "اختبار الأعداد المركبة - النموذج الثاني",
        "url": "https://forms.gle/eAynR8rkdortcGSZ9",
        "platform": "Google Forms",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "اختبار تدريبي من بنك نجاح"
      },
      {
        "id": "رياضيات-31",
        "title": "اختبار الأعداد المركبة - النموذج الثالث",
        "url": "https://forms.gle/ZGRU1m4MJ8i9gQog7",
        "platform": "Google Forms",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "اختبار تدريبي من بنك نجاح"
      },
      {
        "id": "رياضيات-32",
        "title": "اختبار الأعداد المركبة - النموذج الرابع",
        "url": "https://forms.gle/E5RhgtDU5B3SBFtd9",
        "platform": "Google Forms",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "اختبار تدريبي من بنك نجاح"
      },
      {
        "id": "رياضيات-33",
        "title": "اختبار مبدأ العد وذات الحدين - النموذج الأول",
        "url": "https://forms.gle/hsAZ48Ff2UkRBwsPA",
        "platform": "Google Forms",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "اختبار تدريبي من بنك نجاح"
      },
      {
        "id": "رياضيات-34",
        "title": "اختبار مبدأ العد وذات الحدين - النموذج الثاني",
        "url": "https://forms.gle/LojGiYdU7ehsUjm49",
        "platform": "Google Forms",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "اختبار تدريبي من بنك نجاح"
      },
      {
        "id": "رياضيات-35",
        "title": "اختبار مبدأ العد وذات الحدين - النموذج الثالث",
        "url": "https://forms.gle/w1Lhhvn5sXzyKsjWA",
        "platform": "Google Forms",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "اختبار تدريبي من بنك نجاح"
      },
      {
        "id": "رياضيات-36",
        "title": "اختبار مبدأ العد وذات الحدين - النموذج الرابع",
        "url": "https://forms.gle/vveFG1wcb5ATRQya6",
        "platform": "Google Forms",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "اختبار تدريبي من بنك نجاح"
      },
      {
        "id": "رياضيات-37",
        "title": "اختبار الاحتمالات - النموذج الأول",
        "url": "https://forms.gle/BT5vmi2npvZ5WDX87",
        "platform": "Google Forms",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "اختبار تدريبي من بنك نجاح"
      },
      {
        "id": "رياضيات-38",
        "title": "اختبار الاحتمالات - النموذج الثاني",
        "url": "https://forms.gle/jQm3vm7A3jKDMCrT9",
        "platform": "Google Forms",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "اختبار تدريبي من بنك نجاح"
      },
      {
        "id": "رياضيات-39",
        "title": "اختبار الاحتمالات - النموذج الثالث",
        "url": "https://forms.gle/8xciSH2DMvHa3KDHA",
        "platform": "Google Forms",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "اختبار تدريبي من بنك نجاح"
      },
      {
        "id": "رياضيات-40",
        "title": "اختبار الاحتمالات - النموذج الرابع",
        "url": "https://forms.gle/nZRtUkLm4cH9Vfxa7",
        "platform": "Google Forms",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "اختبار تدريبي من بنك نجاح"
      },
      {
        "id": "رياضيات-41",
        "title": "اختبار القطوع المخروطية - النموذج الأول",
        "url": "https://docs.google.com/forms/d/e/1FAIpQLSeLXTyaVBwjztYR5oQZ2wJAEHXCRAp_e34nGRgJ_c53mrGoaA/viewform?usp=sf_link",
        "platform": "Google Forms",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "اختبار تدريبي من بنك نجاح"
      },
      {
        "id": "رياضيات-42",
        "title": "اختبار القطوع المخروطية - النموذج الثاني",
        "url": "https://docs.google.com/forms/d/e/1FAIpQLScbt1qtRYR-hKTMC8lttbiy_60SMIdsgZHI_CQXf8bUQBPh5w/viewform?usp=sf_link",
        "platform": "Google Forms",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "اختبار تدريبي من بنك نجاح"
      },
      {
        "id": "رياضيات-43",
        "title": "اختبار القطوع المخروطية - النموذج الثالث",
        "url": "https://docs.google.com/forms/d/e/1FAIpQLSewUh09lEC7SCz5os-5mtU2SnVW1Jk1D3hqfpCiqxX1VpYLRw/viewform?usp=sf_link",
        "platform": "Google Forms",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "اختبار تدريبي من بنك نجاح"
      },
      {
        "id": "رياضيات-44",
        "title": "اختبار القطوع المخروطية - النموذج الرابع",
        "url": "https://docs.google.com/forms/d/e/1FAIpQLSekZZ16Rf4x1z3A77JZWHBRp69G_1U3ikC2pWoI5p1eWVqH3A/viewform?usp=sf_link",
        "platform": "Google Forms",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "اختبار تدريبي من بنك نجاح"
      },
      {
        "id": "رياضيات-45",
        "title": "اختبار التفاضل - النموذج الأول",
        "url": "https://docs.google.com/forms/d/e/1FAIpQLScNCh_MQU72pV_8l4kOZmqLLp9T7WfoB3v2vPQSmRkvdavQwQ/viewform?usp=sf_link",
        "platform": "Google Forms",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "اختبار تدريبي من بنك نجاح"
      },
      {
        "id": "رياضيات-46",
        "title": "اختبار التفاضل - النموذج الثاني",
        "url": "https://docs.google.com/forms/d/e/1FAIpQLSdfnTXw1sz-3Yls-DRFoIRpV_S9fNle2CcSMnEaNSHOm0h8-A/viewform?usp=sf_link",
        "platform": "Google Forms",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "اختبار تدريبي من بنك نجاح"
      },
      {
        "id": "رياضيات-47",
        "title": "اختبار التفاضل - النموذج الثالث",
        "url": "https://docs.google.com/forms/d/e/1FAIpQLSep9cfmdKxssZDlvMiy4eLN4fgQwlvXeC1kd-KWJuwJ_ObaHg/viewform?usp=sf_link",
        "platform": "Google Forms",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "اختبار تدريبي من بنك نجاح"
      },
      {
        "id": "رياضيات-48",
        "title": "اختبار التفاضل - النموذج الرابع",
        "url": "https://docs.google.com/forms/d/e/1FAIpQLScMols2lbTOVx8Ru-R1TwaWUTDEliqw--q1FBbYehLoRedadQ/viewform?usp=sf_link",
        "platform": "Google Forms",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "اختبار تدريبي من بنك نجاح"
      },
      {
        "id": "رياضيات-49",
        "title": "اختبار التكامل - النموذج الأول",
        "url": "https://forms.gle/JE4o8ebozf728gfS7",
        "platform": "Google Forms",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "اختبار تدريبي من بنك نجاح"
      },
      {
        "id": "رياضيات-50",
        "title": "اختبار التكامل - النموذج الثاني",
        "url": "https://forms.gle/MUCU4YMQxzc2sJPo9",
        "platform": "Google Forms",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "اختبار تدريبي من بنك نجاح"
      },
      {
        "id": "رياضيات-51",
        "title": "اختبار التكامل - النموذج الثالث",
        "url": "https://forms.gle/QX7oNLaNvJxetxg7A",
        "platform": "Google Forms",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "اختبار تدريبي من بنك نجاح"
      },
      {
        "id": "رياضيات-52",
        "title": "اختبار التكامل - النموذج الرابع",
        "url": "https://forms.gle/Q49YjZbtGkgygDsV8",
        "platform": "Google Forms",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "اختبار تدريبي من بنك نجاح"
      },
      {
        "id": "رياضيات-53",
        "title": "الاختبار الشامل التفاضل والتكامل",
        "url": "https://forms.gle/zuh68veq3JgBBBw4A",
        "platform": "Google Forms",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "اختبار تدريبي شامل من بنك نجاح"
      },
      {
        "id": "رياضيات-54",
        "title": "نماذج اختبارات الجبر والهندسة - ثالث ثانوي علمي 2025",
        "url": "https://yemenedu.com/math-algebra-3sec-exam-2025/",
        "platform": "Web",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "صفحة مستقلة تعرض ملف PDF؛ يلزم فحص الملف قبل وسمه وزاريًا"
      },
      {
        "id": "رياضيات-55",
        "title": "تنزيل نماذج الجبر والهندسة PDF",
        "url": "https://yemenedu.com/?sdm_process_download=1&download_id=172",
        "platform": "Web",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "رابط تنزيل من موقع YemenEdu؛ لا يوصف بأنه رسمي دون مصدر أصلي"
      },
      {
        "id": "رياضيات-56",
        "title": "نماذج اختبارات التفاضل والتكامل - ثالث ثانوي علمي 2025",
        "url": "https://yemenedu.com/math-calculus-3sec-exam-2025/",
        "platform": "Web",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "صفحة مستقلة تعرض رابط Google Drive"
      },
      {
        "id": "رياضيات-57",
        "title": "معاينة نماذج التفاضل والتكامل PDF",
        "url": "https://drive.google.com/file/d/1WuaZNnuuMO_bhu7dlvsKAdaG2oLL1J31/view?usp=sharing",
        "platform": "Google Drive",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "ملف خارجي؛ يجب فحصه يدويًا قبل التوصية"
      },
      {
        "id": "رياضيات-58",
        "title": "تنزيل نماذج التفاضل والتكامل PDF",
        "url": "https://drive.google.com/uc?export=download&id=1WuaZNnuuMO_bhu7dlvsKAdaG2oLL1J31",
        "platform": "Google Drive",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "ملف خارجي؛ يجب فحصه يدويًا قبل التوصية"
      },
      {
        "id": "رياضيات-59",
        "title": "نماذج اختبارات الشهادة الثانوية - مكتب تربية حضرموت",
        "url": "https://meoh.gov.ye/services/high-school-exam-forms/",
        "platform": "Web",
        "category": "tests",
        "categoryLabel": "النماذج والاختبارات",
        "badge": "اختبارات",
        "detail": "بوابة مكتب وزارة التربية والتعليم بمحافظة حضرموت، وتعرض مجلدات اختبارات علمي حسب السنوات"
      },
      {
        "id": "رياضيات-60",
        "title": "مجلد اختبارات 2017-2018 علمي",
        "url": "https://drive.google.com/drive/folders/1lS_GIk2lJD-1XwM1YCwDztzssaK3Pbkk",
        "platform": "Google Drive",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "مجلد مرتبط ببوابة مكتب تربية حضرموت؛ يجب انتقاء ملفات الرياضيات داخله"
      },
      {
        "id": "رياضيات-61",
        "title": "نسخة احتياطية من كتاب الرياضيات العلمي",
        "url": "https://www.yemenbooks.com/2017/07/Book-Math-Third-Secondary-Yemen.html",
        "platform": "Web",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "مفيد كنسخة احتياطية، لكن الصفحة تشير إلى طبعة قديمة ويجب عدم تقديمها كأحدث نسخة"
      },
      {
        "id": "رياضيات-62",
        "title": "نسخة احتياطية من كتاب تمارين الرياضيات العلمي",
        "url": "https://www.yemenbooks.com/2017/07/Book-Math-Exsrsise-Third-Secondary-Yemen.html",
        "platform": "Web",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "مفيد كنسخة احتياطية، مع ضرورة التحقق من الطبعة"
      },
      {
        "id": "رياضيات-63",
        "title": "قائمة كتب الثالث الثانوي العلمي على موقع كتبك المدرسي",
        "url": "https://www.alktab24.com/books/%D9%83%D8%AA%D8%A7%D8%A8-%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6%D9%8A%D8%A7%D8%AA-%D8%A7%D9%84%D8%B5%D9%81-%D8%A7%D9%84%D8%AB%D8%A7%D9%84%D8%AB-%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%88%D9%8A-%D8%A7%D9%84-2/",
        "platform": "Web",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "مصدر داعم",
        "detail": "نسخة احتياطية تشير إلى Google Drive؛ يجب مقارنة غلاف PDF بالنسخة الرسمية"
      }
    ]
  },
  {
    "id": "فيزياء",
    "title": "فيزياء",
    "icon": "Atom",
    "bookOnly": false,
    "sources": [
      {
        "id": "فيزياء-0",
        "title": "كتاب الفيزياء",
        "url": "http://e-learning-moe.edu.ye/adel/android_1/book_12/physical_12th.pdf",
        "platform": "PDF",
        "category": "books",
        "categoryLabel": "الكتب الرسمية",
        "badge": "كتاب رسمي",
        "detail": "بوابة التعليم الإلكتروني الرسمية"
      },
      {
        "id": "فيزياء-1",
        "title": "كتاب أنشطة الفيزياء",
        "url": "http://e-learning-moe.edu.ye/adel/android_1/book_12/physical_actions_12th.pdf",
        "platform": "PDF",
        "category": "books",
        "categoryLabel": "الكتب الرسمية",
        "badge": "كتاب أنشطة",
        "detail": "بوابة التعليم الإلكتروني الرسمية"
      },
      {
        "id": "فيزياء-2",
        "title": "فيزياء الصف الثالث الثانوي - المدرسة الإلكترونية اليمنية",
        "url": "https://www.youtube.com/playlist?list=PLC1boXvmEGWXF66sdOuQgzftuivQH6g3m",
        "platform": "YouTube",
        "category": "youtube",
        "categoryLabel": "YouTube والشرح",
        "badge": "قائمة شرح",
        "detail": "12 فيديو موثق من المنهج اليمني"
      },
      {
        "id": "فيزياء-3",
        "title": "فيديوهات الفيزياء ثالث ثانوي",
        "url": "https://t.me/physicsVideos_ibb2022",
        "platform": "Telegram",
        "category": "telegram",
        "categoryLabel": "قنوات Telegram",
        "badge": "قناة Telegram",
        "detail": "قناة مستقلة متخصصة"
      },
      {
        "id": "فيزياء-4",
        "title": "بوابة نماذج الاختبارات",
        "url": "https://meoh.gov.ye/services/high-school-exam-forms/",
        "platform": "Web",
        "category": "tests",
        "categoryLabel": "النماذج والاختبارات",
        "badge": "اختبارات",
        "detail": "بوابة مكتب التربية بحضرموت"
      },
      {
        "id": "فيزياء-telegram-0",
        "title": "قناة الفيزياء الثانوية (2021 / 2022)",
        "url": "https://t.me/physics_ibb2022",
        "platform": "Telegram @physics_ibb2022",
        "category": "telegram",
        "categoryLabel": "قنوات Telegram",
        "badge": "قناة Telegram",
        "detail": "شروحات وفيديوهات وكتب إلكترونية لفيزياء ثالث ثانوي.",
        "handle": "@physics_ibb2022"
      }
    ]
  },
  {
    "id": "كيمياء",
    "title": "كيمياء",
    "icon": "FlaskConical",
    "bookOnly": false,
    "sources": [
      {
        "id": "كيمياء-0",
        "title": "كتاب الكيمياء",
        "url": "http://e-learning-moe.edu.ye/adel/android_1/book_12/chemistry_12th.pdf",
        "platform": "PDF",
        "category": "books",
        "categoryLabel": "الكتب الرسمية",
        "badge": "كتاب رسمي",
        "detail": "بوابة التعليم الإلكتروني الرسمية"
      },
      {
        "id": "كيمياء-1",
        "title": "كتاب أنشطة الكيمياء",
        "url": "http://e-learning-moe.edu.ye/adel/android_1/book_12/chemistry_actions_12th.pdf",
        "platform": "PDF",
        "category": "books",
        "categoryLabel": "الكتب الرسمية",
        "badge": "كتاب أنشطة",
        "detail": "بوابة التعليم الإلكتروني الرسمية"
      },
      {
        "id": "كيمياء-2",
        "title": "قائمة الكيمياء - المدرسة اليمنية",
        "url": "https://www.youtube.com/playlist?list=PLD-q7i0kPHhDKvQr57tajbtNCRzrdaKd8",
        "platform": "YouTube",
        "category": "youtube",
        "categoryLabel": "YouTube والشرح",
        "badge": "قائمة شرح",
        "detail": "12 درسًا ظاهرًا"
      },
      {
        "id": "كيمياء-3",
        "title": "المدرسة اليمنية",
        "url": "https://www.youtube.com/@-yemenischool5780",
        "platform": "YouTube",
        "category": "youtube",
        "categoryLabel": "YouTube والشرح",
        "badge": "قناة معلم",
        "detail": "يجب اختيار قائمة الكيمياء لا القناة العامة"
      },
      {
        "id": "كيمياء-telegram-0",
        "title": "الكيمياء الصف الثالث الثانوي اليمن",
        "url": "https://t.me/ChemistryYemen",
        "platform": "Telegram @ChemistryYemen",
        "category": "telegram",
        "categoryLabel": "قنوات Telegram",
        "badge": "قناة Telegram",
        "detail": "ملفات المادة واختبارات ومناقشة موجهة للطلاب.",
        "handle": "@ChemistryYemen"
      }
    ]
  },
  {
    "id": "أحياء",
    "title": "أحياء",
    "icon": "Dna",
    "bookOnly": false,
    "sources": [
      {
        "id": "أحياء-0",
        "title": "كتاب الأحياء",
        "url": "http://e-learning-moe.edu.ye/adel/android_1/book_12/biology_12th.pdf",
        "platform": "PDF",
        "category": "books",
        "categoryLabel": "الكتب الرسمية",
        "badge": "كتاب رسمي",
        "detail": "بوابة التعليم الإلكتروني الرسمية"
      },
      {
        "id": "أحياء-1",
        "title": "كتاب أنشطة الأحياء",
        "url": "http://e-learning-moe.edu.ye/adel/android_1/book_12/biology_actions_12th.pdf",
        "platform": "PDF",
        "category": "books",
        "categoryLabel": "الكتب الرسمية",
        "badge": "كتاب أنشطة",
        "detail": "بوابة التعليم الإلكتروني الرسمية"
      },
      {
        "id": "أحياء-2",
        "title": "قائمة الأحياء - المدرسة اليمنية",
        "url": "https://www.youtube.com/playlist?list=PLD-q7i0kPHhAGMSb044nvfgs0WpMA_6vP",
        "platform": "YouTube",
        "category": "youtube",
        "categoryLabel": "YouTube والشرح",
        "badge": "قائمة شرح",
        "detail": "قائمة موثقة بالمنهج اليمني"
      },
      {
        "id": "أحياء-3",
        "title": "أحياء ثالث ثانوي",
        "url": "https://t.me/Biologyfor12th",
        "platform": "Telegram",
        "category": "telegram",
        "categoryLabel": "قنوات Telegram",
        "badge": "قناة Telegram",
        "detail": "قناة متخصصة لكن بعض الملفات للقسم الإنجليزي"
      },
      {
        "id": "أحياء-telegram-0",
        "title": "قناة الأحياء للصف الثالث الثانوي — أ. عبير حيدر",
        "url": "https://t.me/abeerhydaar",
        "platform": "Telegram @abeerhydaar",
        "category": "telegram",
        "categoryLabel": "قنوات Telegram",
        "badge": "قناة Telegram",
        "detail": "أسئلة وزارية ودروس مرتبة واختبارات ورسومات للمقرر.",
        "handle": "@abeerhydaar"
      }
    ]
  },
  {
    "id": "لغة إنجليزية",
    "title": "لغة إنجليزية",
    "icon": "Languages",
    "bookOnly": false,
    "sources": [
      {
        "id": "لغة إنجليزية-0",
        "title": "كتاب اللغة الإنجليزية",
        "url": "http://e-learning-moe.edu.ye/adel/android_1/book_12/english_pubils_12th.pdf",
        "platform": "PDF",
        "category": "books",
        "categoryLabel": "الكتب الرسمية",
        "badge": "كتاب رسمي",
        "detail": "بوابة التعليم الإلكتروني الرسمية"
      },
      {
        "id": "لغة إنجليزية-1",
        "title": "كتاب التمارين English Workbook",
        "url": "http://e-learning-moe.edu.ye/adel/android_1/book_12/english_work_12th.pdf",
        "platform": "PDF",
        "category": "books",
        "categoryLabel": "الكتب الرسمية",
        "badge": "كتاب تمارين",
        "detail": "بوابة التعليم الإلكتروني الرسمية"
      },
      {
        "id": "لغة إنجليزية-2",
        "title": "English Language grade 12",
        "url": "https://www.youtube.com/playlist?list=PLJzLYByPsG2DHUe_K1i36zuq5pfgaqyr3",
        "platform": "YouTube",
        "category": "youtube",
        "categoryLabel": "YouTube والشرح",
        "badge": "قائمة شرح",
        "detail": "القائمة مخصصة للقسمين العلمي والأدبي وفق المنهج اليمني"
      },
      {
        "id": "لغة إنجليزية-3",
        "title": "الناصر إنجليزي ثالث ثانوي",
        "url": "https://t.me/AlnasserinEnglish12thGrade",
        "platform": "Telegram",
        "category": "telegram",
        "categoryLabel": "قنوات Telegram",
        "badge": "قناة Telegram",
        "detail": "إعداد وإشراف أ. وديع اليوسفي"
      }
    ]
  },
  {
    "id": "نحو وصرف",
    "title": "نحو وصرف",
    "icon": "Type",
    "bookOnly": false,
    "sources": [
      {
        "id": "نحو وصرف-0",
        "title": "كتاب النحو والصرف",
        "url": "http://e-learning-moe.edu.ye/adel/android_1/book_12/nahw_12th.pdf",
        "platform": "PDF",
        "category": "books",
        "categoryLabel": "الكتب الرسمية",
        "badge": "كتاب رسمي",
        "detail": "بوابة التعليم الإلكتروني الرسمية"
      },
      {
        "id": "نحو وصرف-1",
        "title": "شرح كتاب النحو والصرف",
        "url": "https://www.youtube.com/watch?v=EKskdfhdDqg",
        "platform": "YouTube",
        "category": "youtube",
        "categoryLabel": "YouTube والشرح",
        "badge": "فيديو شرح",
        "detail": "شرح يذكر جميع مدارس الجمهورية اليمنية"
      },
      {
        "id": "نحو وصرف-2",
        "title": "منصة خلاصة فكر",
        "url": "https://t.me/kholastfekr",
        "platform": "Telegram",
        "category": "telegram",
        "categoryLabel": "قنوات Telegram",
        "badge": "قناة Telegram",
        "detail": "منصة عربية متخصصة للثالث الثانوي"
      },
      {
        "id": "نحو وصرف-3",
        "title": "ملخص كتاب النحو والصرف",
        "url": "https://m.lisanarb.com/2023/04/pdf_233.html",
        "platform": "Web",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "ملخص",
        "detail": "الصفحة تشير إلى المناهج اليمنية القديمة"
      }
    ]
  },
  {
    "id": "أدب ونصوص وبلاغة",
    "title": "أدب ونصوص وبلاغة",
    "icon": "BookOpenText",
    "bookOnly": false,
    "sources": [
      {
        "id": "أدب ونصوص وبلاغة-0",
        "title": "كتاب الأدب والنصوص والبلاغة",
        "url": "http://e-learning-moe.edu.ye/adel/android_1/book_12/nosos_12th.pdf",
        "platform": "PDF",
        "category": "books",
        "categoryLabel": "الكتب الرسمية",
        "badge": "كتاب رسمي",
        "detail": "بوابة التعليم الإلكتروني الرسمية"
      },
      {
        "id": "أدب ونصوص وبلاغة-1",
        "title": "منصة خلاصة فكر",
        "url": "https://t.me/kholastfekr",
        "platform": "Telegram",
        "category": "telegram",
        "categoryLabel": "قنوات Telegram",
        "badge": "قناة Telegram",
        "detail": "تنشر ملفات واختبارات ومسابقات عربية"
      },
      {
        "id": "أدب ونصوص وبلاغة-2",
        "title": "كتاب الأدب والنصوص والنقد - سهل",
        "url": "https://sahl.io/ye/book/675/ثالث-ثانوي/الادب-والنصوص-والنقد",
        "platform": "Web",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "موقع داعم",
        "detail": "شرح/نسخة مستقلة للمقارنة"
      }
    ]
  },
  {
    "id": "قراءة",
    "title": "قراءة",
    "icon": "BookMarked",
    "bookOnly": false,
    "sources": [
      {
        "id": "قراءة-0",
        "title": "كتاب القراءة",
        "url": "http://e-learning-moe.edu.ye/adel/android_1/book_12/reading_12th.pdf",
        "platform": "PDF",
        "category": "books",
        "categoryLabel": "الكتب الرسمية",
        "badge": "كتاب رسمي",
        "detail": "بوابة التعليم الإلكتروني الرسمية"
      },
      {
        "id": "قراءة-1",
        "title": "مراجعة لغة عربية - القراءة",
        "url": "https://www.youtube.com/watch?v=Et8angnzo5c",
        "platform": "YouTube",
        "category": "youtube",
        "categoryLabel": "YouTube والشرح",
        "badge": "فيديو شرح",
        "detail": "فيديو مراجعة للقراءة في اليمن"
      },
      {
        "id": "قراءة-2",
        "title": "منصة خلاصة فكر",
        "url": "https://t.me/kholastfekr",
        "platform": "Telegram",
        "category": "telegram",
        "categoryLabel": "قنوات Telegram",
        "badge": "قناة Telegram",
        "detail": "يجب ربط منشورات القراءة فقط"
      },
      {
        "id": "قراءة-3",
        "title": "كتاب القراءة - يمن منهج",
        "url": "https://yemenmanhaj.com/books/القراءة-للصف-الثالث-الثانوي/",
        "platform": "Web",
        "category": "reviews",
        "categoryLabel": "مواقع وملخصات",
        "badge": "موقع داعم",
        "detail": "نسخة مستقلة احتياطية"
      }
    ]
  },
  {
    "id": "قرآن كريم",
    "title": "قرآن كريم",
    "icon": "ScrollText",
    "bookOnly": true,
    "sources": [
      {
        "id": "قرآن كريم-0",
        "title": "كتاب القرآن الكريم",
        "url": "http://e-learning-moe.edu.ye/adel/android_1/book_12/holy_quran_12th.pdf",
        "platform": "PDF",
        "category": "books",
        "categoryLabel": "الكتب الرسمية",
        "badge": "كتاب رسمي",
        "detail": "بوابة التعليم الإلكتروني الرسمية"
      }
    ]
  },
  {
    "id": "حديث وتهذيب",
    "title": "حديث وتهذيب",
    "icon": "Quote",
    "bookOnly": true,
    "sources": [
      {
        "id": "حديث وتهذيب-0",
        "title": "كتاب الحديث والتهذيب",
        "url": "http://e-learning-moe.edu.ye/adel/android_1/book_12/al_hadith_fikh_12th.pdf",
        "platform": "PDF",
        "category": "books",
        "categoryLabel": "الكتب الرسمية",
        "badge": "كتاب رسمي",
        "detail": "التسمية الرسمية في البوابة"
      }
    ]
  },
  {
    "id": "إيمان",
    "title": "إيمان",
    "icon": "HeartHandshake",
    "bookOnly": true,
    "sources": [
      {
        "id": "إيمان-0",
        "title": "كتاب الإيمان",
        "url": "http://e-learning-moe.edu.ye/adel/android_1/book_12/al_eiman_12th.pdf",
        "platform": "PDF",
        "category": "books",
        "categoryLabel": "الكتب الرسمية",
        "badge": "كتاب رسمي",
        "detail": "بوابة التعليم الإلكتروني الرسمية"
      }
    ]
  },
  {
    "id": "فقه",
    "title": "فقه",
    "icon": "Scale",
    "bookOnly": true,
    "sources": [
      {
        "id": "فقه-0",
        "title": "كتاب الفقه",
        "url": "http://e-learning-moe.edu.ye/adel/android_1/book_12/fikh_12th.pdf",
        "platform": "PDF",
        "category": "books",
        "categoryLabel": "الكتب الرسمية",
        "badge": "كتاب رسمي",
        "detail": "بوابة التعليم الإلكتروني الرسمية"
      }
    ]
  },
  {
    "id": "سيرة نبوية",
    "title": "سيرة نبوية",
    "icon": "Compass",
    "bookOnly": true,
    "sources": [
      {
        "id": "سيرة نبوية-0",
        "title": "كتاب السيرة النبوية",
        "url": "http://e-learning-moe.edu.ye/adel/android_1/book_12/al_sira_12th.pdf",
        "platform": "PDF",
        "category": "books",
        "categoryLabel": "الكتب الرسمية",
        "badge": "كتاب رسمي",
        "detail": "بوابة التعليم الإلكتروني الرسمية"
      }
    ]
  }
];
export const examChannels = [
  {
    "title": "الإدارة العامة للإعلام التربوي والقناة التعليمية-اليمن",
    "handle": "@YemenEducationC",
    "url": "https://t.me/YemenEducationC",
    "badge": "قناة رسمية",
    "detail": "نماذج وزارية وحلول ومراجعات للثالث الثانوي."
  },
  {
    "title": "الإمتياز في الرياضيات | الثالث الثانوي",
    "handle": "@Reveal12000",
    "url": "https://t.me/Reveal12000",
    "badge": "مراجعة واختبارات",
    "detail": "نماذج وأسئلة وبوت للاختبارات لطلاب الثالث الثانوي."
  }
];
export const resourceCategories = [
  { id: 'all', label: 'كل المصادر' },
  { id: 'books', label: 'الكتب الرسمية' },
  { id: 'youtube', label: 'YouTube والشرح' },
  { id: 'telegram', label: 'Telegram' },
  { id: 'tests', label: 'الاختبارات' },
  { id: 'reviews', label: 'مواقع وملخصات' },
] as const;
