import fs from 'node:fs';
import path from 'node:path';

const root = '/home/ubuntu';
const subjectsCsv = path.join(root, 'subjects/all_remaining_subjects_sources.csv');
const mathJson = path.join(root, 'yemen_math_scientific_sources.json');
const output = path.join(root, 'yemen-grade12-learning-hub/client/src/data/catalog.ts');

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    const next = text[index + 1];
    if (character === '"' && quoted && next === '"') {
      field += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === ',' && !quoted) {
      row.push(field);
      field = '';
    } else if ((character === '\n' || character === '\r') && !quoted) {
      if (character === '\r' && next === '\n') index += 1;
      row.push(field);
      if (row.some((value) => value.trim())) rows.push(row);
      row = [];
      field = '';
    } else {
      field += character;
    }
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  const [header, ...body] = rows;
  return body.map((values) => Object.fromEntries(header.map((key, index) => [key, values[index] ?? ''])));
}

const remaining = parseCsv(fs.readFileSync(subjectsCsv, 'utf8'));
const mathPayload = JSON.parse(fs.readFileSync(mathJson, 'utf8'));
const mathRows = Array.isArray(mathPayload) ? mathPayload : mathPayload.sources ?? mathPayload.data ?? [];

const normalize = (entry, index, fallbackSubject = 'رياضيات') => ({
  id: String(entry.id ?? `catalog-${index + 1}`),
  subject: entry.subject ?? entry.material ?? fallbackSubject,
  title: entry.title ?? entry.name ?? 'مصدر تعليمي',
  resourceType: entry.resource_type ?? entry.resourceType ?? entry.type ?? 'resource',
  platform: entry.platform ?? entry.source_platform ?? 'Web',
  grade: entry.grade ?? 'الثالث الثانوي',
  track: entry.track ?? 'علمي',
  unit: entry.unit ?? entry.category ?? 'جميع الوحدات',
  url: entry.url ?? entry.link ?? '',
  trustLevel: entry.trust_level ?? entry.trustLevel ?? entry.trust ?? 'متوسط',
  linkStatus: entry.link_status ?? entry.linkStatus ?? 'تم التحقق',
  notes: entry.notes ?? entry.description ?? '',
  checkedAt: entry.checked_at ?? entry.checkedAt ?? '2026-08-27',
});

const catalog = [...mathRows.map((entry, index) => normalize(entry, index, 'رياضيات')), ...remaining.map((entry, index) => normalize(entry, index + mathRows.length))]
  .filter((entry) => entry.url && entry.track === 'علمي');

const source = `/**\n * Design note: “دفتر الوصول” — data is curated by subject so the UI can show one clear next step at a time.\n * Generated from the research catalog on ${new Date().toISOString().slice(0, 10)}.\n */\n\nexport type LearningSource = ${JSON.stringify(catalog[0] ?? {}, null, 2).replace(/:\s*"[^"]*"/g, ': string')}\n\nexport const learningSources = ${JSON.stringify(catalog, null, 2)} as const;\n\nexport const subjectMeta = {\n  "رياضيات": { icon: "Sigma", color: "blue", description: "افهم القاعدة، شاهد الشرح، ثم تدرب." },\n  "فيزياء": { icon: "Atom", color: "violet", description: "قوانين وتجارب ومسائل خطوة بخطوة." },\n  "كيمياء": { icon: "FlaskConical", color: "orange", description: "المفاهيم والمعادلات والأنشطة." },\n  "أحياء": { icon: "Dna", color: "green", description: "الرسومات والأنظمة الحيوية بوضوح." },\n  "لغة إنجليزية": { icon: "Languages", color: "red", description: "كتاب وشرح وتمارين للوحدات." },\n  "نحو وصرف": { icon: "Type", color: "amber", description: "قواعد ومراجعة وأسئلة تطبيقية." },\n  "أدب ونصوص وبلاغة": { icon: "BookOpenText", color: "rose", description: "النص والمعنى والبلاغة في مكان واحد." },\n  "قراءة": { icon: "BookMarked", color: "cyan", description: "نصوص ومراجعات مركزة." },\n  "قرآن كريم": { icon: "ScrollText", color: "emerald", description: "الكتاب وشرح الدروس والمراجعة." },\n  "حديث وتهذيب": { icon: "Quote", color: "teal", description: "مصادر الكتاب والمراجعة المنظمة." },\n  "إيمان": { icon: "HeartHandshake", color: "sky", description: "الكتاب والملخصات المراجعة." },\n  "فقه": { icon: "Scale", color: "indigo", description: "المصدر الرسمي ونماذج التدريب." },\n  "سيرة نبوية": { icon: "Compass", color: "slate", description: "كتاب السيرة والمراجعات الموثقة." }\n} as const;\n`;

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, source, 'utf8');
console.log(`Generated ${catalog.length} sources in ${output}`);
