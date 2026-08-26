import fs from 'node:fs';
import path from 'node:path';

const home = '/home/ubuntu';
const output = path.join(home, 'yemen-grade12-learning-hub/client/src/data/simpleCatalog.ts');

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const current = text[index];
    const next = text[index + 1];
    if (current === '"' && quoted && next === '"') { field += '"'; index += 1; }
    else if (current === '"') quoted = !quoted;
    else if (current === ',' && !quoted) { row.push(field); field = ''; }
    else if ((current === '\n' || current === '\r') && !quoted) {
      if (current === '\r' && next === '\n') index += 1;
      row.push(field); if (row.some((value) => value.trim())) rows.push(row); row = []; field = '';
    } else field += current;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  const [headers, ...data] = rows;
  return data.map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ''])));
}

function normalize(entry, fallbackSubject = 'رياضيات') {
  return {
    subject: entry.subject ?? entry.material ?? fallbackSubject,
    title: entry.title ?? entry.name ?? '',
    resourceType: entry.resource_type ?? entry.resourceType ?? entry.type ?? '',
    url: entry.url ?? entry.link ?? '',
    platform: entry.platform ?? '',
    trustLevel: entry.trust_level ?? entry.trustLevel ?? '',
  };
}

const mathPayload = JSON.parse(fs.readFileSync(path.join(home, 'yemen_math_scientific_sources.json'), 'utf8'));
const mathRows = (Array.isArray(mathPayload) ? mathPayload : mathPayload.sources ?? mathPayload.data ?? []).map((item) => normalize(item));
const restRows = parseCsv(fs.readFileSync(path.join(home, 'subjects/all_remaining_subjects_sources.csv'), 'utf8')).map((item) => normalize(item));
const sources = [...mathRows, ...restRows];

const channels = {
  رياضيات: { name: 'الإمتياز في الرياضيات | الثالث الثانوي', handle: '@Reveal12000', url: 'https://t.me/Reveal12000', kind: 'قناة متخصصة', detail: 'شروح وملخصات وأسئلة وزارية مرتبة حسب الدروس.' },
  فيزياء: { name: 'قناة الفيزياء الثانوية (2021 / 2022)', handle: '@physics_ibb2022', url: 'https://t.me/physics_ibb2022', kind: 'قناة متخصصة', detail: 'شروحات وفيديوهات وكتب إلكترونية لفيزياء ثالث ثانوي.' },
  كيمياء: { name: 'الكيمياء الصف الثالث الثانوي اليمن', handle: '@ChemistryYemen', url: 'https://t.me/ChemistryYemen', kind: 'قناة متخصصة', detail: 'ملفات المادة واختبارات ومناقشة موجهة للطلاب.' },
  أحياء: { name: 'قناة الأحياء للصف الثالث الثانوي — أ. عبير حيدر', handle: '@abeerhydaar', url: 'https://t.me/abeerhydaar', kind: 'قناة متخصصة', detail: 'أسئلة وزارية ودروس مرتبة واختبارات ورسومات للمقرر.' },
  'لغة إنجليزية': { name: 'الناصر إنجليزي ثالث ثانوي', handle: '@AlnasserinEnglish12thGrade', url: 'https://t.me/AlnasserinEnglish12thGrade', kind: 'قناة متخصصة', detail: 'إعداد وإشراف أ. وديع اليوسفي لمادة الإنجليزية.' },
  'نحو وصرف': { name: 'منصة خلاصة فكر في اللغة العربية (ثالث ثانوي)', handle: '@kholastfekr', url: 'https://t.me/kholastfekr', kind: 'قناة متخصصة', detail: 'اختبارات وملفات مركزة للنحو واللغة العربية.' },
  'أدب ونصوص وبلاغة': { name: 'منصة خلاصة فكر في اللغة العربية (ثالث ثانوي)', handle: '@kholastfekr', url: 'https://t.me/kholastfekr', kind: 'قناة متخصصة', detail: 'أدب ونصوص ونقد ومراجعات للثالث الثانوي.' },
  قراءة: { name: 'منصة خلاصة فكر في اللغة العربية (ثالث ثانوي)', handle: '@kholastfekr', url: 'https://t.me/kholastfekr', kind: 'قناة متخصصة', detail: 'مراجعات واختبارات للقراءة واللغة العربية.' },
  'قرآن كريم': { name: 'التعليمية اليمنية — روابط الوزارة ومكاتبها', handle: '@yemeneducation2', url: 'https://t.me/yemeneducation2', kind: 'قناة رسمية عامة', detail: 'قناة رسمية معتمدة تنشر روابط ومقررات ونماذج تربوية.' },
  'سيرة نبوية': { name: 'التعليمية اليمنية — روابط الوزارة ومكاتبها', handle: '@yemeneducation2', url: 'https://t.me/yemeneducation2', kind: 'قناة رسمية عامة', detail: 'قناة رسمية معتمدة تنشر روابط ومقررات ونماذج تربوية.' },
};

const order = Object.keys(channels);
const fallbackBooks = {
  رياضيات: 'https://e-learning-moe.edu.ye/adel/android_1/book_12/mathematic_12th.pdf',
};

const materials = order.map((subject) => {
  const candidates = sources.filter((source) => source.subject === subject && ["textbook", "activity_book", "workbook"].includes(source.resourceType));
  const book = candidates.find((source) => source.resourceType === 'textbook') ?? candidates[0] ?? { title: `كتاب ${subject} الرسمي`, url: fallbackBooks[subject] ?? '', platform: 'بوابة التعليم الإلكتروني اليمنية' };
  return { id: subject, title: subject, book: { title: book.title || `كتاب ${subject} الرسمي`, url: book.url, platform: book.platform || 'بوابة التعليم الإلكتروني اليمنية' }, telegram: channels[subject] };
});

const file = `/**\n * Design note: the simplified student view intentionally exposes only one official book and one checked Telegram channel per material.\n * Generated from reviewed research: 2026-08-27.\n */\n\nexport type SimpleMaterial = {\n  id: string;\n  title: string;\n  book: { title: string; url: string; platform: string };\n  telegram: { name: string; handle: string; url: string; kind: string; detail: string };\n};\n\nexport const simpleMaterials: SimpleMaterial[] = ${JSON.stringify(materials, null, 2)};\n`;
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, file, 'utf8');
console.log(`Generated ${materials.length} simplified materials.`);
