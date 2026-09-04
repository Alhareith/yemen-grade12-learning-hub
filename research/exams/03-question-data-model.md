# المرحلة 3 — نموذج بيانات السؤال الامتحاني

## الحالة
معتمد — النسخة 1.1

## الهدف
تعريف عقد بيانات صارم يخدم واجهة الاختبار، التصحيح، مراجعة الأخطاء، وتحليل المهارات، مع فصل الحقيقة الامتحانية عن التفسير التعليمي.

## أنواع السؤال
- `single-choice`
- `true-false`

## المحتوى
السؤال والخيارات يخزنان كمقاطع `text` و`math` بدل HTML حر. مقطع الرياضيات يحتوي LaTeX و`altText`.

## التصحيح
الإجابة تحفظ كـ`correctOptionId` وتشير إلى خيار موجود. `points` موجبة.

## دليل الإجابة
`answerEvidence.type` يقبل:
- `published-key`: مفتاح إجابة منشور لنفس السؤال/الورقة.
- `published-solution`: حل منشور لنفس السؤال.
- `independent-verification`: تحقق مستقل لصياغة متكيفة، مع رابط سجل التحقق وموضعه.

وجود شرح تعليمي ليس شرطًا للتصحيح. الشرح له حالة مراجعة مستقلة.

## علاقة السؤال بالمصدر
`source.relation`:
- `verbatim`: نقل أمين من المصدر؛ يلزم `questionPage` ويمكن مراجعته صفحةً صفحةً.
- `adapted`: صياغة تدريبية جديدة تستلهم البنية/المهارة؛ يلزم `adaptationNote`، ولا نختلق `questionPage` غير حقيقي.

إذا غاب `relation` تعامل البيانات القديمة كبيانات حرفية/legacy ويظل `questionPage` مطلوبًا.

## المصدر
كل سؤال يحتفظ بـ:
- `sourcePackageUrl`
- `sourceFileName`
- `digitizationMethod`
- `relation`
- `questionPage` عند النقل الحرفي
- `adaptationNote` عند التكييف

## المهارات
- `primarySkillId`: واحدة إلزامية.
- `secondarySkillIds`: حتى مهارتين.
- لا تدخل مهارة غير موجودة في taxonomy المعتمد.
- `errorInsights` اختيارية ولا تعتمد إلا بعد مراجعة.

## حالات التحقق
`digitized → reviewed → answer-verified → verified`

أو `blocked` عند وجود تعارض.

السؤال `verified` يتطلب:
- مطابقة المصدر/طبيعة العلاقة.
- مراجعة النص والرياضيات والخيارات.
- تحقق الإجابة.
- مراجعة تصنيف المهارة.
- عدم وجود `blockingNotes`.

## العقود التنفيذية
- TypeScript: `shared/exams/question-model.ts`
- JSON Schema: `research/exams/question.schema.json`
- سجل تحقق pilot المتكيف: `research/exams/04-pilot-answer-verification.md`

## مبدأ منع التضليل
لا يجوز وصف سؤال `adapted` بأنه سؤال وزاري حرفي، ولا ربط تحقق مستقل بمفتاح ورقة أخرى. الواجهة والتقرير يجب أن يعرضا نوع provenance الحقيقي.

## بوابة الإغلاق
المرحلة 3 مغلقة. العقد يدعم الآن النقل الحرفي والتكييف الصريح دون كسر البيانات السابقة.
