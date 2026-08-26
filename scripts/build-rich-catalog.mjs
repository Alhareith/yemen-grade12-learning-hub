import fs from 'node:fs';
import path from 'node:path';

const home = '/home/ubuntu';
const target = path.join(home, 'yemen-grade12-learning-hub/client/src/data/richCatalog.ts');

function csvRows(text) {
  const rows = [];
  let row = []; let field = ''; let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index]; const next = text[index + 1];
    if (character === '"' && quoted && next === '"') { field += '"'; index += 1; }
    else if (character === '"') quoted = !quoted;
    else if (character === ',' && !quoted) { row.push(field); field = ''; }
    else if ((character === '\n' || character === '\r') && !quoted) { if (character === '\r' && next === '\n') index += 1; row.push(field); if (row.some((item) => item.trim())) rows.push(row); row = []; field = ''; }
    else field += character;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  const [headers, ...body] = rows;
  return body.map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ''])));
}

function normalize(item, fallback = 'رياضيات') {
  return {
    subject: item.subject ?? item.material ?? fallback,
    title: item.title ?? item.name ?? 'مصدر تعليمي',
    resourceType: item.resource_type ?? item.resourceType ?? item.type ?? 'resource',
    platform: item.platform ?? 'Web',
    url: item.url ?? item.link ?? '',
    trustLevel: item.trust_level ?? item.trustLevel ?? 'متوسط',
    notes: item.notes ?? item.description ?? '',
  };
}

const mathData = JSON.parse(fs.readFileSync(path.join(home, 'yemen_math_scientific_sources.json'), 'utf8'));
const math = (Array.isArray(mathData) ? mathData : mathData.sources ?? mathData.data ?? []).map((entry) => normalize(entry));
const rest = csvRows(fs.readFileSync(path.join(home, 'subjects/all_remaining_subjects_sources.csv'), 'utf8')).map((entry) => normalize(entry));
const raw = [...math, ...rest].filter((item) => item.url && !item.trustLevel.includes('بحاجة مراجعة'));

const subjectOrder = ['رياضيات', 'فيزياء', 'كيمياء', 'أحياء', 'لغة إنجليزية', 'نحو وصرف', 'أدب ونصوص وبلاغة', 'قراءة', 'قرآن كريم', 'حديث وتهذيب', 'إيمان', 'فقه', 'سيرة نبوية'];
const bookOnly = new Set(['قرآن كريم', 'حديث وتهذيب', 'إيمان', 'فقه', 'سيرة نبوية']);
const labels = {
  textbook: { key: 'books', label: 'الكتب الرسمية', badge: 'كتاب رسمي' },
  activity_book: { key: 'books', label: 'الكتب الرسمية', badge: 'كتاب أنشطة' },
  workbook: { key: 'books', label: 'الكتب الرسمية', badge: 'كتاب تمارين' },
  playlist: { key: 'youtube', label: 'YouTube والشرح', badge: 'قائمة شرح' },
  video: { key: 'youtube', label: 'YouTube والشرح', badge: 'فيديو شرح' },
  teacher_channel: { key: 'youtube', label: 'YouTube والشرح', badge: 'قناة معلم' },
  specialized_channel: { key: 'telegram', label: 'قنوات Telegram', badge: 'قناة Telegram' },
  official_education_channel: { key: 'telegram', label: 'قنوات Telegram', badge: 'قناة Telegram' },
  official_exam_portal: { key: 'tests', label: 'النماذج والاختبارات', badge: 'اختبارات' },
  exam_page: { key: 'tests', label: 'النماذج والاختبارات', badge: 'اختبارات' },
  summary_page: { key: 'reviews', label: 'مواقع وملخصات', badge: 'ملخص' },
  textbook_mirror: { key: 'reviews', label: 'مواقع وملخصات', badge: 'موقع داعم' },
  subject_hub: { key: 'reviews', label: 'مواقع وملخصات', badge: 'موقع داعم' },
};

const icons = {
  رياضيات: 'Sigma', فيزياء: 'Atom', كيمياء: 'FlaskConical', أحياء: 'Dna', 'لغة إنجليزية': 'Languages', 'نحو وصرف': 'Type', 'أدب ونصوص وبلاغة': 'BookOpenText', قراءة: 'BookMarked', 'قرآن كريم': 'ScrollText', 'حديث وتهذيب': 'Quote', إيمان: 'HeartHandshake', فقه: 'Scale', 'سيرة نبوية': 'Compass',
};

const verifiedTelegram = {
  رياضيات: [{ title: 'الإمتياز في الرياضيات | الثالث الثانوي', handle: '@Reveal12000', url: 'https://t.me/Reveal12000', detail: 'شروح وملخصات وأسئلة وزارية مرتبة حسب الدروس.' }],
  فيزياء: [{ title: 'قناة الفيزياء الثانوية (2021 / 2022)', handle: '@physics_ibb2022', url: 'https://t.me/physics_ibb2022', detail: 'شروحات وفيديوهات وكتب إلكترونية لفيزياء ثالث ثانوي.' }],
  كيمياء: [{ title: 'الكيمياء الصف الثالث الثانوي اليمن', handle: '@ChemistryYemen', url: 'https://t.me/ChemistryYemen', detail: 'ملفات المادة واختبارات ومناقشة موجهة للطلاب.' }],
  أحياء: [{ title: 'قناة الأحياء للصف الثالث الثانوي — أ. عبير حيدر', handle: '@abeerhydaar', url: 'https://t.me/abeerhydaar', detail: 'أسئلة وزارية ودروس مرتبة واختبارات ورسومات للمقرر.' }],
  'لغة إنجليزية': [{ title: 'الناصر إنجليزي ثالث ثانوي', handle: '@AlnasserinEnglish12thGrade', url: 'https://t.me/AlnasserinEnglish12thGrade', detail: 'إعداد وإشراف أ. وديع اليوسفي.' }],
  'نحو وصرف': [{ title: 'منصة خلاصة فكر في اللغة العربية (ثالث ثانوي)', handle: '@kholastfekr', url: 'https://t.me/kholastfekr', detail: 'اختبارات وملفات مركزة للنحو.' }],
  'أدب ونصوص وبلاغة': [{ title: 'منصة خلاصة فكر في اللغة العربية (ثالث ثانوي)', handle: '@kholastfekr', url: 'https://t.me/kholastfekr', detail: 'أدب ونصوص ونقد ومراجعات.' }],
  قراءة: [{ title: 'منصة خلاصة فكر في اللغة العربية (ثالث ثانوي)', handle: '@kholastfekr', url: 'https://t.me/kholastfekr', detail: 'مراجعات واختبارات للقراءة واللغة العربية.' }],
};

const compact = (entry, sequence) => {
  const meta = labels[entry.resourceType] ?? { key: 'reviews', label: 'مواقع وملخصات', badge: 'مصدر داعم' };
  return { id: `${entry.subject}-${sequence}`, title: entry.title, url: entry.url, platform: entry.platform, category: meta.key, categoryLabel: meta.label, badge: meta.badge, detail: entry.notes || '' };
};

const materials = subjectOrder.map((subject) => {
  const entries = raw.filter((entry) => entry.subject === subject);
  const official = entries.filter((entry) => entry.resourceType === 'textbook');
  const selected = bookOnly.has(subject) ? official : entries;
  const unique = new Map();
  selected.forEach((entry, index) => unique.set(entry.url, compact(entry, index)));
  const list = [...unique.values()];
  if (!bookOnly.has(subject)) {
    (verifiedTelegram[subject] ?? []).forEach((channel, index) => {
      if (!unique.has(channel.url)) list.push({ id: `${subject}-telegram-${index}`, title: channel.title, url: channel.url, platform: `Telegram ${channel.handle}`, category: 'telegram', categoryLabel: 'قنوات Telegram', badge: 'قناة Telegram', detail: channel.detail, handle: channel.handle });
    });
  }
  return { id: subject, title: subject, icon: icons[subject], bookOnly: bookOnly.has(subject), sources: list };
});

const examChannels = [
  { title: 'الإدارة العامة للإعلام التربوي والقناة التعليمية-اليمن', handle: '@YemenEducationC', url: 'https://t.me/YemenEducationC', badge: 'قناة رسمية', detail: 'نماذج وزارية وحلول ومراجعات للثالث الثانوي.' },
  { title: 'الإمتياز في الرياضيات | الثالث الثانوي', handle: '@Reveal12000', url: 'https://t.me/Reveal12000', badge: 'مراجعة واختبارات', detail: 'نماذج وأسئلة وبوت للاختبارات لطلاب الثالث الثانوي.' },
];

const output = `/**\n * Design note: rich catalog keeps official books for all subjects, full trusted source sets for science/language subjects, and book-only cards for Islamic subjects.\n */\n\nexport type ResourceCard = { id: string; title: string; url: string; platform: string; category: string; categoryLabel: string; badge: string; detail: string; handle?: string };\nexport type MaterialCatalog = { id: string; title: string; icon: string; bookOnly: boolean; sources: ResourceCard[] };\n\nexport const materials: MaterialCatalog[] = ${JSON.stringify(materials, null, 2)};\nexport const examChannels = ${JSON.stringify(examChannels, null, 2)};\nexport const resourceCategories = [\n  { id: 'all', label: 'كل المصادر' },\n  { id: 'books', label: 'الكتب الرسمية' },\n  { id: 'youtube', label: 'YouTube والشرح' },\n  { id: 'telegram', label: 'Telegram' },\n  { id: 'tests', label: 'الاختبارات' },\n  { id: 'reviews', label: 'مواقع وملخصات' },\n] as const;\n`;
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, output, 'utf8');
console.log(`Generated ${materials.length} materials and ${materials.reduce((sum, material) => sum + material.sources.length, 0)} source cards.`);
