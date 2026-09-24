# Learning Hub V3 — Architecture Contract

## 1. Purpose

هذه الوثيقة تثبت المعمارية المستهدفة لـ Learning Hub V3 قبل إعادة هيكلة الكود.

هي عقد للهجرة وليست وصفًا جديدًا للحالة الحالية.

الملف architecture.md في جذر المشروع يبقى مرجع الحالة الحالية حتى تكتمل الهجرة.

---

## 2. Migration Principle

V3 ليس إعادة كتابة كاملة.

المسار المعتمد:

Preserve → Isolate → Replace → Verify → Remove Legacy

أي:

1. نحافظ على ما يعمل.
2. نفصل المسؤوليات.
3. نبني البديل بجانب القديم.
4. نختبر البديل.
5. نحذف القديم فقط بعد إثبات البديل.

---

## 3. Core Student Flow

المسار الأساسي المستهدف:

Subject → Unit → Lesson → Practice → Result → Analytics

Skill ليست شرطًا لوجود سؤال أو تدريب.

Skills يمكن أن تبقى طبقة اختيارية للتصنيف والتحليل.

---

## 4. Curriculum Contract

الهيكل الإلزامي:

Subject → Unit → Lesson

الهيكل الاختياري:

Lesson → Skills

لكل كيان ID ثابت لا يعتمد على الاسم العربي الظاهر.

نحافظ على IDs الحالية المستقرة.

مثال موجود حاليًا:

Unit:
math-algebra-geometry-probability

Lesson:
math-algebra-geometry-probability:COUNT-COMBINATIONS

Optional Skill:
COUNT-COMBINATIONS-APPLY

في V3 يصبح lessonId هو الرابط الأساسي للأسئلة الجديدة.

---

## 5. Curriculum Independence

Curriculum يجب أن يكون صالحًا بدون:

- Exam Simulation
- Resource Registry
- Prompt Generator
- Practice UI

هذه الأنظمة تستهلك Curriculum Context ولكنها لا تصبح جزءًا من سلامة المنهج نفسه.

---

## 6. Question Architecture

Raw JSON ليس Runtime Database.

المسار المعتمد مستقبلًا:

Raw JSON
→ Source Adapter
→ Import Candidate
→ Curriculum Mapping
→ Normalization
→ Validation
→ Duplicate Analysis
→ Canonical Question Bank

واجهة الطالب تقرأ Canonical Question Bank فقط.

---

## 7. Raw JSON Rules

ملفات المصدر الخام تحفظ كما استلمناها.

لا نغير Raw JSON يدويًا فقط حتى يتوافق مع التطبيق.

إذا اختلف شكل ملف:

Adapter

إذا اختلف اسم المادة أو الوحدة أو الدرس:

Alias

إذا كانت المعلومة ناقصة أو تحتاج قرارًا يدويًا:

Override

---

## 8. Current Questions Migration

الأسئلة الموجودة حاليًا في الدروس الأولى ستُنقل لاحقًا إلى Migration JSON خاص بها.

هذا الملف:

- يمثل ترحيل المحتوى القديم.
- ليس نموذجًا امتحانيًا كاملًا.
- لا يحدد شكل ملفات JSON المستقبلية.
- لا يخلط مع مجلد النماذج الحقيقية.

---

## 9. Future Model Files

ملف JSON مستقبلي يمكن أن يمثل نموذجًا كاملًا مثل:

- جبر وهندسة واحتمالات.
- تفاضل وتكامل.
- فيزياء.
- كيمياء.

ويمكن أن يوجد عدد كبير من النماذج للمادة نفسها.

المعمارية لا تفترض:

one JSON = one lesson

---

## 10. Import Candidate

Adapter ينتج تمثيلًا وسيطًا مرنًا.

يمكن أن يحتوي على:

- sourceModelId
- externalQuestionId
- questionNumber
- rawSubject
- rawUnit
- rawLesson
- stem
- options
- correctAnswer
- originalData

rawSubject و rawUnit و rawLesson يمكن أن تكون ناقصة في المصدر.

---

## 11. Canonical Question Identity

السؤال Student-ready يجب أن يمتلك:

- id
- subjectId
- unitId
- lessonId

ويمكن أن يمتلك اختياريًا:

- skillIds
- tags
- difficulty

skillIds ليست إلزامية في V3.

أي سؤال لم يتم ربطه بدرس معروف لا يدخل تدريب الطالب.

---

## 12. Rich Question Content

نحافظ على المفاهيم الحالية القوية:

- QuestionType
- RichContent
- QuestionOption
- Mathematical segments
- Arabic RTL rendering
- Correct answer identity
- Explanation
- Source provenance
- Verification metadata

لا نحول الأسئلة إلى strings بسيطة إذا كان ذلك يفقد التنسيق أو التوثيق.

---

## 13. Verification Lifecycle

السؤال يمر منطقيًا عبر:

Imported
→ Mapped
→ Validated
→ Verified
→ Student-ready

نجاح JSON parsing لا يعني أن السؤال Verified.

Importer لا يغير الإجابة الصحيحة.

Normalization لا يغير الإجابة الصحيحة.

Deduplication لا يقرر صحة الإجابة.

---

## 14. Duplicate Policy

ثلاث حالات:

Exact Duplicate:
يمكن التعامل معه آليًا عند وجود تطابق موثوق.

Strong Normalized Match:
يخضع لقواعد دمج صريحة مع حفظ المصادر.

Near Duplicate:
يدخل قائمة مراجعة بشرية.

Near Duplicate لا يحذف تلقائيًا.

Source provenance يبقى محفوظًا بعد أي Merge.

---

## 15. Practice Domain

النظام الحالي يعتمد أساسًا على:

Skill
→ PracticeSet
→ Fixed Question IDs

النظام المستهدف:

Lesson
→ Verified Question Pool
→ Select 10
→ Practice Session

التدريب القياسي لا يصبح جاهزًا إلا عند توفر 10 أسئلة Verified وفريدة على الأقل للدرس.

لا نكرر السؤال داخل الجلسة نفسها.

---

## 16. Question Selection

الاختيار المستهدف يجب أن يكون:

- deterministic داخل الجلسة.
- مستقلًا عن Render.
- غير مرتبط بترتيب JSON الخام.
- قابلًا للاستعادة.
- قابلًا للتوسع لتوازن الصعوبة والمصادر لاحقًا.

نحافظ على Seed concept الموجود حاليًا في Practice Engine.

لكن Rotation الحالي ليس العقد النهائي للاختيار.

---

## 17. Practice Session Contract

الجلسة المستهدفة تحتوي مفاهيميًا على:

- sessionId
- lessonId
- questionIds
- currentIndex
- answers
- seed
- startedAt
- updatedAt
- completedAt

questionIds تختار مرة واحدة عند إنشاء الجلسة.

Refresh لا يعيد اختيار الأسئلة.

currentIndex يجب أن يصبح من Session State بدل أن يبقى UI state فقط.

---

## 18. Local Persistence

V3 يبقى Local-first.

لا يوجد حاليًا:

- Backend مطلوب.
- Login مطلوب.
- Cloud Sync مطلوب.

سنستخدم Versioned Local Storage Contract عندما نصل إلى Practice Session persistence.

نراجع أولًا Session Integrity الموجود في Exam domain للاستفادة من الأفكار العامة.

---

## 19. Results

النتيجة تعتمد على:

- questionCount
- correctCount
- incorrectCount
- percentage
- question-level results

النتيجة لا تعتمد على وجود skillId.

---

## 20. Analytics

Analytics الأساسية تكون Lesson-centered.

يمكن استخدام Metadata اختيارية مثل:

- tags
- skillIds
- difficulty

إذا كانت موجودة.

لا نستنتج Weak Skill أو Mastery دقيقًا من بيانات لا تحتوي دليلًا كافيًا.

---

## 21. Existing Diagnostics

Diagnostic Rules الحالية المرتبطة بالأسئلة تبقى صالحة أثناء الهجرة.

لا نحذفها حتى يوجد بديل.

الاتجاه المستقبلي هو الاستفادة أكثر من Question Metadata وTags بدل ملف تشخيص منفصل لكل سؤال.

---

## 22. Resources

Resources تصبح Domain مستقلة عن Curriculum.

V3 يحتفظ فقط بـ:

- YouTube
- Telegram

YouTube:
يمكن فتح الرابط.

Telegram:
لا يفتح رابط القناة مباشرة من الواجهة.

يمكن عرض:

- اسم القناة.
- الوصف.
- Handle.
- زر نسخ Handle.

تنظيف richCatalog يتم في مرحلة مستقلة لاحقًا.

---

## 23. Prompt Generator

Prompt Generator يبقى Feature مستقلة.

يمكن أن يستقبل سياق:

Subject
Unit
Lesson
Optional Skill

لكنه لا يصبح جزءًا من Curriculum Domain.

Prompt Generator ليس Chatbot داخل الموقع.

---

## 24. Full Exam Simulation

Full Exam Simulation يصبح موقعًا خارجيًا مستقلًا.

Learning Hub يعرض مدخلًا بارزًا له في Home.

الرابط يديره إعداد مركزي واحد مثل:

VITE_SIMULATION_URL

الكود الحالي للمحاكاة لا يحذف في Stage 1.

shared/exams لا يحذف ككتلة واحدة.

سنراجع لاحقًا ما هو Generic مثل:

- Session concepts.
- Scoring.
- Result logic.
- Integrity validation.

وما هو Exam-specific.

---

## 25. Routing

نبقى على Hash Routing أثناء الهجرة.

هذا يحافظ على توافق GitHub Pages والاستضافة الساكنة.

لاحقًا نخرج Routing Logic من App.tsx إلى Application Layer منظمة.

لا نضيف Router dependency جديدة دون حاجة حقيقية.

---

## 26. Target Client Structure

الاتجاه المستهدف تدريجيًا:

client/src/
- app/
- design-system/
- features/
  - home/
  - curriculum/
  - practice/
  - analytics/
  - prompts/
  - resources/
- data/
- lib/
- styles/

هذا Target وليس أمر Move جماعي.

لا ننقل المشروع كله مرة واحدة.

---

## 27. Target Shared Structure

الاتجاه المستهدف:

shared/
- curriculum/
- questions/
- practice/
- analytics/
- prompts/

shared/exams يبقى أثناء الهجرة حتى نقرر ما الذي يعاد استخدامه وما الذي يصبح Legacy.

shared لا يعتمد على React.

UI يعتمد على Domain وليس العكس.

---

## 28. Future Data Zones

الاتجاه المستقبلي:

data/
- raw/
  - migration/
  - models/
    - math/
    - physics/
    - chemistry/
- mappings/
- generated/

هذه المجلدات لا تنشأ الآن لمجرد التنظيم.

تنشأ عندما تبدأ JSON Infrastructure فعليًا.

---

## 29. Generated Question Bank

Canonical Question Bank يجب أن يكون:

- deterministic.
- reproducible.
- validated.
- independent from UI.
- صالحًا للبناء الساكن.

Generated files ليست مصدرًا للتحرير اليدوي.

---

## 30. Protected Assets

أثناء الهجرة نحمي:

- Stable curriculum IDs.
- Verified questions.
- Correct answers.
- Explanations.
- Provenance.
- Verification state.
- Arabic math rendering.
- Existing tests.
- Seed concept.
- Existing diagnostics حتى استبدالها.
- Static deployment.
- GitHub Pages compatibility.

---

## 31. Explicit Non-Goals

لا نبني الآن:

- Backend.
- Database server.
- Authentication.
- User accounts.
- Cloud sync.
- CMS.
- WebSocket multiplayer.
- WebRTC multiplayer.
- LAN multiplayer.
- AI classification service.

---

## 32. Future Multiplayer Boundary

التحضير المستقبلي يعني فقط فصل Quiz Logic عن Transport.

المفهوم المستقبلي:

Question Bank
→ Question Selector
→ Quiz Session Core
→ Transport

Transport قد يصبح مستقبلًا:

- Solo
- Realtime
- Peer or LAN

لكن لا ننفذ هذه الأنواع الآن.

---

## 33. Migration Order

الترتيب المعتمد:

1. Baseline.
2. Architecture Contract.
3. Repository Restructure.
4. Design System.
5. App Shell.
6. Curriculum UI.
7. JSON Infrastructure.
8. Existing Question Migration.
9. Lesson Practice Engine.
10. Analytics.
11. Resources and External Simulation.
12. Responsive and Regression.
13. Legacy Cleanup.

---

## 34. Architecture Invariants

القواعد التي لا يجوز كسرها:

1. Raw JSON لا يقرأه UI مباشرة.
2. Raw JSON لا يعدل لإرضاء التطبيق.
3. كل Student-ready question له lessonId معروف.
4. Skill classification اختيارية للأسئلة الجديدة.
5. السؤال غير Verified لا يدخل التدريب.
6. السؤال لا يتكرر داخل Session واحدة.
7. questionIds تثبت بعد إنشاء Session.
8. Result يعتمد على Session الفعلية.
9. Resources مستقلة عن صحة Curriculum.
10. Simulation مستقلة عن Practice Engine.
11. UI لا يكرر Domain Logic.
12. Legacy لا يحذف قبل نجاح Replacement.
13. كل مرحلة تمر pnpm verify.
14. كل تغيير كبير يمر Branch وPR.
15. pre-v3-restructure لا يتحرك.

---

## 35. Stage 1 Exit Criteria

Stage 1 تصبح PASS عندما:

- Stage 0 مسجلة PASS.
- هذه الوثيقة تصل إلى main.
- لا يتغير Runtime behavior.
- لا تتغير Curriculum IDs.
- لا تتغير Question Data.
- pnpm verify ينجح.
- CI ينجح.
- Browser Smoke ينجح.
- تصبح هذه الوثيقة مرجع المراحل التالية.

Status:

IN PROGRESS