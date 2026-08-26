/**
 * Design note: the simplified student view intentionally exposes only one official book and one checked Telegram channel per material.
 * Generated from reviewed research: 2026-08-27.
 */

export type SimpleMaterial = {
  id: string;
  title: string;
  book: { title: string; url: string; platform: string };
  telegram: { name: string; handle: string; url: string; kind: string; detail: string };
};

export const simpleMaterials: SimpleMaterial[] = [
  {
    "id": "رياضيات",
    "title": "رياضيات",
    "book": {
      "title": "كتاب الرياضيات - القسم العلمي",
      "url": "http://e-learning-moe.edu.ye/adel/android_1/book_12/mathematic_12th.pdf",
      "platform": "PDF"
    },
    "telegram": {
      "name": "الإمتياز في الرياضيات | الثالث الثانوي",
      "handle": "@Reveal12000",
      "url": "https://t.me/Reveal12000",
      "kind": "قناة متخصصة",
      "detail": "شروح وملخصات وأسئلة وزارية مرتبة حسب الدروس."
    }
  },
  {
    "id": "فيزياء",
    "title": "فيزياء",
    "book": {
      "title": "كتاب الفيزياء",
      "url": "http://e-learning-moe.edu.ye/adel/android_1/book_12/physical_12th.pdf",
      "platform": "PDF"
    },
    "telegram": {
      "name": "قناة الفيزياء الثانوية (2021 / 2022)",
      "handle": "@physics_ibb2022",
      "url": "https://t.me/physics_ibb2022",
      "kind": "قناة متخصصة",
      "detail": "شروحات وفيديوهات وكتب إلكترونية لفيزياء ثالث ثانوي."
    }
  },
  {
    "id": "كيمياء",
    "title": "كيمياء",
    "book": {
      "title": "كتاب الكيمياء",
      "url": "http://e-learning-moe.edu.ye/adel/android_1/book_12/chemistry_12th.pdf",
      "platform": "PDF"
    },
    "telegram": {
      "name": "الكيمياء الصف الثالث الثانوي اليمن",
      "handle": "@ChemistryYemen",
      "url": "https://t.me/ChemistryYemen",
      "kind": "قناة متخصصة",
      "detail": "ملفات المادة واختبارات ومناقشة موجهة للطلاب."
    }
  },
  {
    "id": "أحياء",
    "title": "أحياء",
    "book": {
      "title": "كتاب الأحياء",
      "url": "http://e-learning-moe.edu.ye/adel/android_1/book_12/biology_12th.pdf",
      "platform": "PDF"
    },
    "telegram": {
      "name": "قناة الأحياء للصف الثالث الثانوي — أ. عبير حيدر",
      "handle": "@abeerhydaar",
      "url": "https://t.me/abeerhydaar",
      "kind": "قناة متخصصة",
      "detail": "أسئلة وزارية ودروس مرتبة واختبارات ورسومات للمقرر."
    }
  },
  {
    "id": "لغة إنجليزية",
    "title": "لغة إنجليزية",
    "book": {
      "title": "كتاب اللغة الإنجليزية",
      "url": "http://e-learning-moe.edu.ye/adel/android_1/book_12/english_pubils_12th.pdf",
      "platform": "PDF"
    },
    "telegram": {
      "name": "الناصر إنجليزي ثالث ثانوي",
      "handle": "@AlnasserinEnglish12thGrade",
      "url": "https://t.me/AlnasserinEnglish12thGrade",
      "kind": "قناة متخصصة",
      "detail": "إعداد وإشراف أ. وديع اليوسفي لمادة الإنجليزية."
    }
  },
  {
    "id": "نحو وصرف",
    "title": "نحو وصرف",
    "book": {
      "title": "كتاب النحو والصرف",
      "url": "http://e-learning-moe.edu.ye/adel/android_1/book_12/nahw_12th.pdf",
      "platform": "PDF"
    },
    "telegram": {
      "name": "منصة خلاصة فكر في اللغة العربية (ثالث ثانوي)",
      "handle": "@kholastfekr",
      "url": "https://t.me/kholastfekr",
      "kind": "قناة متخصصة",
      "detail": "اختبارات وملفات مركزة للنحو واللغة العربية."
    }
  },
  {
    "id": "أدب ونصوص وبلاغة",
    "title": "أدب ونصوص وبلاغة",
    "book": {
      "title": "كتاب الأدب والنصوص والبلاغة",
      "url": "http://e-learning-moe.edu.ye/adel/android_1/book_12/nosos_12th.pdf",
      "platform": "PDF"
    },
    "telegram": {
      "name": "منصة خلاصة فكر في اللغة العربية (ثالث ثانوي)",
      "handle": "@kholastfekr",
      "url": "https://t.me/kholastfekr",
      "kind": "قناة متخصصة",
      "detail": "أدب ونصوص ونقد ومراجعات للثالث الثانوي."
    }
  },
  {
    "id": "قراءة",
    "title": "قراءة",
    "book": {
      "title": "كتاب القراءة",
      "url": "http://e-learning-moe.edu.ye/adel/android_1/book_12/reading_12th.pdf",
      "platform": "PDF"
    },
    "telegram": {
      "name": "منصة خلاصة فكر في اللغة العربية (ثالث ثانوي)",
      "handle": "@kholastfekr",
      "url": "https://t.me/kholastfekr",
      "kind": "قناة متخصصة",
      "detail": "مراجعات واختبارات للقراءة واللغة العربية."
    }
  },
  {
    "id": "قرآن كريم",
    "title": "قرآن كريم",
    "book": {
      "title": "كتاب القرآن الكريم",
      "url": "http://e-learning-moe.edu.ye/adel/android_1/book_12/holy_quran_12th.pdf",
      "platform": "PDF"
    },
    "telegram": {
      "name": "التعليمية اليمنية — روابط الوزارة ومكاتبها",
      "handle": "@yemeneducation2",
      "url": "https://t.me/yemeneducation2",
      "kind": "قناة رسمية عامة",
      "detail": "قناة رسمية معتمدة تنشر روابط ومقررات ونماذج تربوية."
    }
  },
  {
    "id": "سيرة نبوية",
    "title": "سيرة نبوية",
    "book": {
      "title": "كتاب السيرة النبوية",
      "url": "http://e-learning-moe.edu.ye/adel/android_1/book_12/al_sira_12th.pdf",
      "platform": "PDF"
    },
    "telegram": {
      "name": "التعليمية اليمنية — روابط الوزارة ومكاتبها",
      "handle": "@yemeneducation2",
      "url": "https://t.me/yemeneducation2",
      "kind": "قناة رسمية عامة",
      "detail": "قناة رسمية معتمدة تنشر روابط ومقررات ونماذج تربوية."
    }
  }
];
