# V3 Stage 5A — Curriculum Baseline & UX Boundary Lock

Status: **PASS — 5A BOUNDARY LOCKED**

Stage 5 owns the Curriculum experience beneath the frozen Stage 4 AppShell. Stage 5A is intentionally documentation/boundary-only: it records the current data truth, UX debt, stable identity contract, visual isolation rule, and regression risks before any Curriculum redesign begins.

Migration rule:

**Preserve → Isolate → Replace → Verify → Remove Legacy**

Stage 5A does not authorize Stage 5B or any later implementation work.

---

## 1. Baseline

Repository:

`Alhareith/yemen-grade12-learning-hub`

Base branch:

`main`

Stage 5 base commit:

`72f0fe12c2a66ebe61dbe0ddf1af2657b3764ae5`

That commit is the merge commit for PR #41:

`V3-04: Build application shell`

Stage 4 is therefore present in `main` before Stage 5 begins.

Implementation branch:

`feature/v3-curriculum-experience`

Stage 5A adds no runtime code and changes no Curriculum/question data.

---

## 2. Source precedence

Stage 5 work uses this order:

1. `docs/v3/01-architecture.md`
2. `docs/v3/02-legacy-boundary.md`
3. `docs/v3/11-design-system-contract.md`
4. `docs/v3/14-app-shell-contract.md`
5. runtime code for exact current behavior/data
6. older stage snapshots for history/rationale only

`13-stage4-app-shell-boundary.md` is historical Stage 4A evidence and does not override the frozen Stage 4 contract.

This Stage 5A document is subordinate to the four contracts above. It is the working baseline for Stage 5, not the final Stage 5 closure contract.

---

## 3. Stage 5 scope lock

Stage 5 owns the student Curriculum experience:

**Subject → Unit → Lesson**

Optional enrichment inside a verified lesson:

**Lesson → Skills**

Stage 5 may later replace Curriculum visual composition, hierarchy presentation, responsive behavior, subject/unit/lesson navigation, lesson presentation, and feature-local Curriculum interaction structure.

Stage 5 must not implement:

- JSON importer/adapters/generated canonical question bank;
- current-question migration JSON;
- lesson-centered Practice Engine;
- Analytics;
- final Resources/Telegram integration;
- external Simulation integration;
- Backend/Auth/Database/CMS/Cloud Sync;
- protected Legacy cleanup.

Those belong to later owning stages.

---

## 4. Current runtime ownership

### Curriculum feature UI

Primary surface:

`client/src/features/curriculum/CurriculumExplorer.tsx`

Current ownership inside the component:

- feature-local `subjectId`;
- feature-local `unitId`;
- feature-local `lessonId`;
- feature-local `skillId`;
- copied-prompt feedback state;
- subject/unit/lesson/skill selection handlers;
- current prompt-copy action;
- current skill-practice navigation;
- current resource rendering.

The application hash remains `#curriculum` while these selections change. Refreshing the route resets selection to the component defaults.

### Curriculum domain/model

Canonical model:

`shared/curriculum/curriculum-model.ts`

Runtime graph assembly:

`client/src/data/curriculum.ts`

Structure assembly:

`client/src/data/curriculumStructure.ts`

Verified detailed taxonomies:

- `research/curriculum/math-algebra-geometry-probability-skill-map.json`
- `research/exams/calculus-skill-map.json`

Curated unit/source input:

- `client/src/data/unitExpansions.ts`
- `client/src/data/richCatalog.ts`

Integrity regression:

`client/src/data/curriculum.test.ts`

### Adjacent consumers

Practice availability:

`client/src/data/practiceBank.ts`

Current contract remains:

`skillId → ready PracticeSet → #practice/<skillId>`

Prompt generation:

`client/src/data/promptCatalog.ts`

The Curriculum surface currently chooses the `rebuild-from-zero` prompt and builds it with subject/unit/lesson plus the selected skill as input.

These are dependencies consumed by Curriculum. They do not become Curriculum domain ownership.

---

## 5. Current data truth

Current `curriculumStructure` contains:

- 13 subjects;
- 10 units;
- 37 verified lessons;
- 65 verified skills.

Only five subjects currently have units in `unitExpansions` and therefore appear in the current Curriculum selector:

- رياضيات
- لغة إنجليزية
- فيزياء
- كيمياء
- أحياء

The other current subject IDs remain valid Curriculum subject identities even though no unit expansion is currently present.

### Mapping status

Exactly two units are currently `lesson-skill`:

- `math-algebra-geometry-probability`
- `math-calculus`

The remaining eight units are `unit-only`.

A `unit-only` unit is valid Curriculum data. It means lesson/skill detail is not currently verified in the model.

**Stage 5 must not invent lesson names, skill names, IDs, mappings, or practice availability for a `unit-only` unit.**

---

## 6. Stable ID contract

Stage 5 is a presentation/experience migration, not an identity migration.

UI labels, artwork, ordering, layout, and selected-state presentation may change. Existing IDs must not be renamed for aesthetic consistency.

### Subject IDs — frozen current values

The current 13 subject IDs are:

`رياضيات`, `فيزياء`, `كيمياء`, `أحياء`, `لغة إنجليزية`, `نحو وصرف`, `أدب ونصوص وبلاغة`, `قراءة`, `قرآن كريم`, `حديث وتهذيب`, `إيمان`, `فقه`, `سيرة نبوية`.

Some current subject IDs are Arabic display-like strings. Stage 5 does **not** normalize or replace them merely because the target architecture prefers IDs independent from display labels. Any future identity migration requires its own data migration and regression evidence.

### Unit IDs — frozen current values

| Subject | Unit | Stable ID | Mapping truth |
|---|---|---|---|
| رياضيات | الجبر والهندسة والاحتمالات | `math-algebra-geometry-probability` | `lesson-skill` |
| رياضيات | التفاضل والتكامل | `math-calculus` | `lesson-skill` |
| لغة إنجليزية | قواعد المنهج والمراجعات اللغوية | `english-grammar-review` | `unit-only` |
| لغة إنجليزية | الكتاب والتدريب قبل الاختبار | `english-workbook-exam-practice` | `unit-only` |
| فيزياء | الكهرباء والتيار المتردد والموصلات | `physics-electricity-ac-conductors` | `unit-only` |
| فيزياء | النماذج الوزارية وحل المسائل | `physics-ministry-models-problem-solving` | `unit-only` |
| كيمياء | التفاعلات والأكسدة والاختزال | `chemistry-reactions-redox` | `unit-only` |
| كيمياء | المراجعة النهائية والنماذج الوزارية | `chemistry-final-review-ministry-models` | `unit-only` |
| أحياء | التنظيم العصبي والهرموني | `biology-neural-hormonal-regulation` | `unit-only` |
| أحياء | التكاثر والوراثة | `biology-reproduction-genetics` | `unit-only` |

### Lesson IDs — frozen as a set

There are 37 current lesson IDs.

They are materialized from the two verified taxonomy topic IDs using the current exact form:

`<stable-unit-id>:<taxonomy-topic-id>`

Examples:

- `math-algebra-geometry-probability:COUNT-COMBINATIONS`
- `math-algebra-geometry-probability:PROB-CONDITIONAL`
- `math-calculus:LIMITS`
- `math-calculus:CHAIN-RULE`

All exact current lesson IDs in the two taxonomy files are protected from UI-driven renaming.

### Skill IDs — frozen as a set

There are 65 current skill IDs defined by the same verified taxonomies.

Examples:

- `COUNT-COMBINATIONS-APPLY`
- `PROB-CONDITIONAL-APPLY`
- `DER-CHAIN`
- `INT-SUBSTITUTION-APPLY`

All exact current skill IDs remain stable in Stage 5 because current Practice, exam mapping, diagnostics, questions and Curriculum indexes already consume them.

### Out-of-scope IDs

Question IDs, exam IDs, Practice question/set IDs, source IDs and simulation IDs are not redesigned in Stage 5 and must remain unchanged.

---

## 7. Current relationship truth

The current hierarchy is valid:

`Subject → Unit → Lesson → Skill`

but the runtime UI over-promotes the optional layer.

Important current facts:

1. A Lesson owns `skillIds`, but architectural validity of a Lesson does not depend on forcing the student to choose a Skill.
2. Only the two detailed Math units currently have verified Lessons/Skills.
3. `curriculumIndex.getSkillContext()` resolves Subject + Unit + Lesson + Skill and also resolves inherited sources/prompts.
4. Current Lesson and Skill `sourceIds` are empty in the assembled structure.
5. Current Skill sources therefore mostly come from inherited Subject/Unit sources, not evidence that each source is genuinely skill-specific.
6. Current Lesson and Skill `promptIds` are also empty; prompt applicability is primarily subject-level.
7. Current question links are still skill-oriented and are enriched into the graph from the two current exam models.
8. Current Practice readiness is skill-oriented, not lesson-oriented.

These facts must remain truthful during the Stage 5 presentation migration.

---

## 8. Current UX audit

### Structural debt

`CurriculumExplorer.tsx` currently combines:

- subject selection;
- unit selection;
- lesson selection;
- mandatory-looking skill selection;
- skill detail;
- prompt copying;
- Practice entry;
- resource links

inside one large surface.

This makes the optional Skill layer appear structurally mandatory and mixes Curriculum hierarchy with adjacent feature actions.

### Visual debt

The current Curriculum surface still uses the pre-V3 visual language:

- violet/slate-heavy Tailwind classes;
- arbitrary local colors;
- `font-black`/very-heavy hierarchy;
- rounded/shadow values outside the frozen V3 token contract;
- generic functional icons where Stage 3 approved subject artwork exists.

This is replacement scope for later Stage 5 substages, not 5A runtime work.

### Responsive debt

Current behavior is mostly a stacked responsive Tailwind composition:

- one-column flow below the current `lg` split;
- two-column split at Tailwind `lg`;
- scroll-capped lesson list;
- no Stage 5-specific evidence across the frozen V3 validation widths.

The target must follow the V3 composition boundaries rather than treat desktop as enlarged mobile.

### Accessibility debt

The current surface has one H1, RTL inheritance and native buttons/links, but later migration must fix or verify:

- selected controls currently communicate state primarily through color;
- Curriculum selected buttons do not expose a consistent semantic selected-state contract;
- some current controls use 40px-ish geometry rather than the frozen 44px minimum;
- step labels are visual `strong` elements rather than a deliberate heading hierarchy;
- feature-local scroll regions need clear context when retained;
- logical RTL spacing should replace directional utility assumptions where relevant;
- the new V3 Curriculum scope must preserve visible focus and reduced motion.

### Navigation/state debt

The current feature stores all Curriculum selection locally and does not encode Subject/Unit/Lesson in the hash.

Stage 5A does not change the Stage 4 route matrix.

Any future deep-linking scheme that changes application hashes is a deliberate AppShell-contract change and cannot be introduced incidentally.

---

## 9. Preserve / Replace / Defer classification

### Preserve

- all current stable Curriculum IDs;
- verified Subject/Unit/Lesson/Skill data;
- exact `mappingStatus` truth;
- existing two detailed Math taxonomies;
- current graph/index integrity validation;
- existing question/exam mappings;
- current working skill-based Practice behavior and links;
- current Prompt Generator behavior/data;
- current Hash Routing;
- Arabic Math and protected Legacy;
- current deployment compatibility.

### Replace during Stage 5

- Curriculum visual composition;
- hierarchy presentation;
- mobile/desktop Curriculum UX;
- subject/unit/lesson navigation experience;
- lesson presentation;
- mandatory-looking Skill step;
- confusing mixed Curriculum/action composition;
- pre-V3 visual styling in Curriculum;
- selected-state semantics and Stage 5 accessibility defects;
- Curriculum-specific responsive behavior.

### Defer

- JSON Infrastructure;
- source adapters/import candidates;
- canonical question-bank generation;
- existing-question migration;
- lesson-centered Practice Engine;
- Analytics;
- final Resources/Telegram UX;
- external Simulation;
- Backend/Auth/Database/CMS/Cloud Sync;
- protected Legacy removal.

---

## 10. Target Stage 5 UX model

Stage 5 is anchored on:

**Subject → Unit → Lesson**

Skills are optional metadata/navigation **inside** a verified Lesson, not a required fourth gate.

### Mobile contract

Use progressive disclosure.

The student should move through one dominant decision at a time:

1. choose Subject;
2. choose Unit;
3. choose Lesson when verified;
4. view Lesson context/actions;
5. optionally inspect/select Skills when Skills exist.

The current selection context must remain understandable while the next level is shown. Exact card geometry and transitions belong to 5B/5C.

### Desktop contract

Desktop should use the larger viewport to keep hierarchy/context visible without rendering four equal mandatory steps.

A master/detail or multi-region composition is allowed, but it must still express the same Subject → Unit → Lesson hierarchy and keep Skill subordinate to Lesson.

Exact columns, sidebar width and lesson-detail composition are deferred to 5B/5D.

### Progressive disclosure

Approved at the contract level.

Do not dump every Subject, Unit, Lesson, Skill, action and source at equal visual weight.

The hierarchy must reveal detail as the student establishes context.

### Selected state

Every selectable level must expose state semantically and visually.

State may use `aria-current`, `aria-pressed`, native selection semantics, or an equivalent correct pattern chosen in implementation.

Color alone is insufficient.

### Unit with incomplete mapping

For `unit-only`:

- the Unit remains selectable/visible;
- the UI states truthfully that lesson detail is not yet verified;
- no guessed lesson cards appear;
- no fake Skill layer appears;
- no fake lesson-level Practice availability appears.

### No invented Curriculum data

UI code must render only entities present in `curriculumStructure/curriculumGraph`.

A missing Lesson/Skill is not an invitation for placeholder academic content.

---

## 11. Prompt / Practice / Resources boundaries

### Prompt Generator

Prompt Generator remains a separate feature.

Curriculum may provide it verified context:

- Subject;
- Unit;
- Lesson;
- optional Skill.

Do not call it an AI assistant/chatbot.

Stage 5 may improve where the explanation/prompt action appears, but does not redesign Prompt Generator domain logic in 5A.

### Practice

Current runtime truth remains skill-based:

`getReadyPracticeSetForSkill(skillId)`

and:

`#practice/<skillId>`

Stage 5 must not claim that a Lesson has the future verified 10-question pool unless that later Practice architecture actually exists.

A current ready Practice action may remain available where its current Skill relationship is real.

### Resources

Resources remain independent from Curriculum integrity.

The current `getSkillContext()` source resolution inherits Subject and Unit sources into Skill context. That is useful data access, but it does **not** prove every inherited source is lesson-specific or skill-specific.

Therefore Stage 5 must not label inherited sources as specifically related to a Lesson/Skill without explicit relation evidence.

Final YouTube/Telegram resource UX remains deferred to the Resources owning stage.

---

## 12. V3 visual isolation boundary

Stage 5 must consume the frozen Stage 3 Design System without changing the AppShell.

The current AppShell intentionally leaves the feature outlet outside broad `[data-v3-ui]` descendant styling.

When Curriculum begins visual migration, the V3 boundary belongs at the Curriculum feature root, not around the entire AppShell outlet or protected routes.

Intended later shape:

```tsx
<section data-v3-ui data-curriculum-explorer dir="rtl">
  ...
</section>
```

Feature-local styles, if introduced, must remain scoped to the Curriculum V3 root and consume:

- frozen V3 tokens;
- IBM Plex Sans Arabic 400/500/600/700;
- Lucide for functional icons;
- approved subject artwork for subjects;
- existing primitives/composites where semantics match.

Stage 5 must not:

- rebuild AppShell;
- wrap ExamPilot in V3 feature styles;
- change protected Arabic Math styles;
- create global `:root`, `body`, generic button/link/input overrides;
- rewrite `v2.css` or `polish.css` as a shortcut;
- reintroduce violet as the V3 Curriculum brand identity;
- duplicate frozen primitives merely for spacing/color variants.

---

## 13. Stage 5 regression risks

Stage 5 must explicitly guard against:

1. renaming stable Subject/Unit/Lesson/Skill IDs for UI reasons;
2. making Skill mandatory for Lesson validity or navigation;
3. dropping or flattening `mappingStatus`;
4. inventing Lessons/Skills for `unit-only` units;
5. presenting inherited Subject/Unit resources as verified Skill/Lesson relations;
6. breaking `#practice/<skillId>` encoding or current ready-set behavior;
7. claiming future lesson-centered Practice readiness before its owning stage;
8. breaking current prompt construction/copy behavior while moving actions;
9. moving Curriculum feature state into AppShell;
10. changing the frozen Stage 4 route matrix incidentally;
11. leaking V3 CSS/typography into protected Legacy or Arabic Math;
12. duplicating global navigation/header inside Curriculum;
13. mobile overflow or content hidden behind fixed bottom navigation;
14. color-only selected states or sub-44px migrated controls;
15. globally mirroring directional icons in RTL;
16. changing question/exam/practice data in a UI migration;
17. treating Resources or Simulation as required for Curriculum validity;
18. changing frozen Design System tokens/components without explicit design-system review.

---

## 14. Protected Legacy

Stage 5 does not modify or remove:

- `client/src/pages/ExamPilot.tsx`
- `client/src/components/ExamRunner.tsx`
- `client/src/components/ExamResultReport.tsx`
- `client/src/components/LearningDashboard.tsx`
- `client/src/components/ArabicExamTypography.tsx`
- `client/src/exams/session-storage.ts`
- `shared/exams/*`
- `shared/exams/question-model.ts`
- `client/src/lib/arabic-math.ts`
- `client/src/components/ArabicRichContent.tsx`
- `client/src/arabic-math.css`

Stage 5A itself changes no runtime or protected file.

---

## 15. Stage 5A verification plan

Because 5A is documentation-only, no new runtime test is justified.

After the boundary commit, verify:

- `pnpm verify` through the existing Validate student experience workflow;
- Browser smoke;
- V3 design system visual validation;
- V3 accessibility/performance regression;
- V3 production shell regression;
- Vercel commit status when reported;
- GitHub Pages/static build compatibility by preserving the exact Stage 4 runtime and checking the merged Stage 4 Pages result plus current build workflows;
- protected Legacy by branch diff: 5A must contain documentation files only.

The Stage 4 final gate is intentionally scoped to the Stage 4 branch and must not be repurposed as a permanent Stage 5 blocker.

---

## 16. 5A definition of done

5A is PASS only when:

- Stage 4 is confirmed merged into `main`;
- Stage 5 branch starts at the exact current `main` head;
- current Curriculum UI/model/data/dependencies are audited;
- data ownership and current mapping truth are explicit;
- stable IDs are locked against UI-driven renaming;
- Subject → Unit → Lesson is the required experience hierarchy;
- Skill is explicitly optional;
- Prompt/Practice/Resources boundaries are explicit;
- `unit-only` behavior forbids invented Curriculum data;
- Curriculum V3 scope boundary is explicit;
- protected Legacy remains untouched;
- deferred stages remain deferred;
- regression risks are recorded;
- this document and the V3 documentation map are committed;
- required CI is green.

All 5A checks recorded below are green. Stage 5B remains blocked until explicit human approval.


---

## 17. 5A closure evidence

Stage 5A candidate commit:

`3622884f0cfee3195ca02815a822e2dd003ade32`

Draft PR:

`#42 — V3-05: Build curriculum experience`

The PR remains Draft and is not merged.

### Candidate branch diff

Comparison against the Stage 4 merge base contains only:

- added `docs/v3/16-stage5-curriculum-boundary.md`;
- modified `docs/v3/README.md`.

No runtime source, Curriculum/question data, Design System source, workflow, deployment configuration, or protected Legacy file changed.

### Candidate CI

Successful candidate checks:

- Validate student experience / push — `36080755117`;
- Browser smoke test / push — `36080755113`;
- Validate student experience / pull_request — `36080874430`;
- Browser smoke test / pull_request — `36080874321`;
- V3 design system visual validation / pull_request — `36080874348`;
- V3 accessibility performance regression / pull_request — `36080874397`;
- V3 production shell regression / pull_request — `36080874376`;
- Vercel commit status — **success**.

The Stage 4 final CI gate is **skipped by design** on this PR because that workflow is explicitly scoped to `feature/v3-app-shell`; this is not a Stage 5 failure.

### Static deployment evidence

The exact Stage 5 base commit `72f0fe12...` passed the GitHub Pages deployment workflow on `main` in run `36079643833`.

Stage 5A changes documentation only, while the branch validation continues to run the production build through `pnpm verify`. No deployment/runtime configuration changed.

### Protected boundary result

**PASS.**

The 5A diff contains no protected Legacy file and no runtime source file.

### Stage transition

**Stage 5A: PASS.**

Do not begin Stage 5B until explicit human approval.
