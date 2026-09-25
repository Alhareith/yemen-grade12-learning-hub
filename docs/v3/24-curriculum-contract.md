# V3 Curriculum Experience Contract

Status: **FROZEN AT STAGE 5I**

This document is the canonical post-Stage-5 contract for the Learning Hub V3 Curriculum experience.

If a Stage 5 snapshot document conflicts with this file, **this file wins**. Files `16-stage5-curriculum-boundary.md` through `23-stage5-regression-protected-legacy.md` remain implementation history, audit evidence and rationale.

The migration rule remains:

**Preserve → Isolate → Replace → Verify → Remove Legacy**

---

## 1. Contract scope

Stage 5 freezes the student-facing Curriculum experience beneath the frozen Stage 4 AppShell.

It owns:

- Curriculum entry and hierarchy presentation;
- Subject / Unit / Lesson navigation;
- optional Skill refinement inside Lesson detail;
- mobile/compact progressive disclosure;
- desktop Curriculum workspace composition;
- Lesson detail and current Prompt/Practice actions;
- Curriculum-local state;
- one-time Curriculum ↔ Practice return context;
- feature-local responsive/accessibility behavior;
- Curriculum-specific regression coverage.

It does **not** own:

- JSON infrastructure;
- question-bank import/migration;
- the future lesson-centered Practice Engine;
- Analytics;
- final Resources relation model/UX;
- external Simulation integration;
- backend/auth/database/CMS/cloud sync;
- protected Legacy cleanup.

---

## 2. Source precedence

Use this order for Curriculum work after Stage 5:

1. `docs/v3/01-architecture.md`
2. `docs/v3/02-legacy-boundary.md`
3. `docs/v3/11-design-system-contract.md`
4. `docs/v3/14-app-shell-contract.md`
5. **this Curriculum Experience contract**
6. runtime code for exact implementation values
7. Stage 5 snapshots 16–23 as historical evidence

Stage 5 consumes the frozen Design System and AppShell. It does not redefine them.

---

## 3. Canonical runtime ownership

| Responsibility | Canonical runtime source |
|---|---|
| Curriculum surface / hierarchy state | `client/src/features/curriculum/CurriculumExplorer.tsx` |
| Curriculum feature styling | `client/src/features/curriculum/curriculum-explorer.css` |
| one-time Practice return context | `client/src/features/curriculum/curriculum-return-state.ts` |
| Practice-return state tests | `client/src/features/curriculum/curriculum-return-state.test.ts` |
| top-level route lifecycle integration | `client/src/App.tsx` |
| Curriculum graph/index consumption | `client/src/data/curriculum.ts` |
| Curriculum structure | `client/src/data/curriculumStructure.ts` |
| current Practice availability | `client/src/data/practiceBank.ts` |
| current Prompt catalogue | `client/src/data/promptCatalog.ts` |
| domain model/index contracts | `shared/curriculum/curriculum-model.ts` |

The UI consumes Curriculum data. It does not own or rewrite Curriculum identity/data.

---

## 4. Canonical Curriculum hierarchy

The required hierarchy is:

**Subject → Unit → Lesson**

Optional enrichment is:

**Lesson → Skills**

Skill is never a required fourth navigation gate.

A Lesson remains a valid Curriculum entity without requiring the student to choose a Skill.

Future Student-ready questions must remain lesson-centered as required by the architecture contract. Skill classification remains optional.

---

## 5. Stable identity contract

Stage 5 does not rename stable IDs for visual consistency.

### Subject identity

Existing subject IDs remain preserved.

Some current subject IDs are Arabic display-like values. Stage 5 intentionally does not normalize them.

Any future identity migration requires explicit data migration and regression evidence.

### Unit identity

The current 10 Unit IDs remain preserved, including:

- `math-algebra-geometry-probability`;
- `math-calculus`;
- `english-grammar-review`;
- `english-workbook-exam-practice`;
- `physics-electricity-ac-conductors`;
- `physics-ministry-models-problem-solving`;
- `chemistry-reactions-redox`;
- `chemistry-final-review-ministry-models`;
- `biology-neural-hormonal-regulation`;
- `biology-reproduction-genetics`.

### Lesson identity

Current verified Lesson IDs remain the exact assembled IDs:

`<stable-unit-id>:<taxonomy-topic-id>`

### Skill identity

Current verified Skill IDs remain unchanged because current Practice, exam mappings, diagnostics and Curriculum indexes consume them.

Stage 5 never uses an aesthetic/UI reason to rename Subject/Unit/Lesson/Skill IDs.

---

## 6. Current verified data truth at Stage 5 freeze

At Stage 5 closure the current Curriculum structure contains:

- 13 Subject identities;
- 10 Units;
- 37 verified Lessons;
- 65 verified Skills.

Five Subjects currently have Units and therefore appear as navigable Curriculum destinations:

- رياضيات
- لغة إنجليزية
- فيزياء
- كيمياء
- أحياء

Exactly two Units currently expose verified Lesson/Skill breakdown:

- `math-algebra-geometry-probability`;
- `math-calculus`.

Their `mappingStatus` is `lesson-skill`.

The remaining eight current Units are `unit-only`.

These counts describe the frozen Stage 5 data snapshot; later data stages may expand the dataset without changing this UX contract.

---

## 7. Subject-entry contract

Canonical route:

`#curriculum`

A fresh Curriculum entry begins with explicit Subject choice.

Do not silently preselect Mathematics or any other Subject.

The primary actionable Subject catalogue is driven by actual Curriculum structure:

`getUnitsForSubject(subject.id).length > 0`

Approved artwork availability never creates a fake Curriculum destination.

When later data gives Units to an existing Subject ID, that Subject may become navigable without changing its ID.

---

## 8. Selection/reset contract

Changing Subject resets:

- Unit;
- Lesson;
- optional Skill.

Changing Unit resets:

- Lesson;
- optional Skill.

Changing Lesson resets:

- optional Skill.

Changing Skill does not reset Lesson.

Multi-Skill selection is optional and reversible.

Selecting the currently selected Skill again clears the Skill selection.

---

## 9. Mapping-status contract

Raw mapping truth remains preserved in data.

### `lesson-skill`

A verified Lesson list exists and may contain optional Skills.

The student may enter Lesson detail.

### `unit-only`

The Unit is a valid Curriculum entity, but Lesson breakdown is not currently verified.

Required behavior:

- keep the Unit selectable;
- explain truthfully that Lesson detail is not yet approved;
- do not invent Lesson names;
- do not invent Skill names;
- do not invent Practice availability;
- do not present the Unit as broken merely because detail is not yet mapped.

Technical `mappingStatus` strings need not be shown to students.

---

## 10. Lesson grouping contract

Existing `groupTitle` may organize verified Lessons.

Rules:

- use only groups present in current data;
- preserve source order;
- do not invent academic groups for layout purposes;
- a Lesson without `groupTitle` remains valid.

---

## 11. Mobile and compact composition

### Below 640px

Curriculum uses progressive disclosure:

`SubjectIndex → UnitIndex → LessonIndex → LessonDetail`

Only the current hierarchy panel is the dominant visible Curriculum panel.

Subject catalogue uses two columns.

Unit/Lesson navigation uses the available mobile width without horizontal page overflow.

### 640–899px

Compact/tablet retains the same hierarchy semantics and progressive disclosure.

The Stage 4 mobile AppShell navigation remains active below 900px.

Stage 5 does not introduce a conflicting shell breakpoint.

---

## 12. Desktop composition

### 900–1199px

The selected Curriculum experience uses a two-region desktop workspace.

Unit context remains visible while Lesson navigation/detail use the wider content region.

### 1200px+

The workspace uses three hierarchy regions:

**Units | Lessons | Lesson Detail**

Skill remains inside Lesson detail and never becomes a fourth hierarchy column.

### Desktop Subject entry

Before a Subject is selected, the desktop Subject catalogue uses four columns where current content permits.

Changing Subject remains possible inside Curriculum; returning Home is not required.

Desktop is not a scaled mobile wizard.

---

## 13. Lesson-detail contract

Lesson identity is primary.

Lesson Detail may show derived, truthful metadata such as:

- verified Skill count;
- ready current Practice count.

No metadata may create a new Curriculum entity or imply unverified readiness.

### One Skill

If a Lesson has one Skill:

- do not add a separate Skill-selection step;
- show the Skill as Lesson metadata;
- current skill-specific actions may resolve against that sole Skill.

### Multiple Skills

If a Lesson has multiple Skills:

- Skills appear inside Lesson detail;
- selection is optional;
- selected state uses semantic state plus a non-color visual cue;
- a Skill may be deselected;
- no Skill is implicitly selected merely to expose Practice.

### Zero Skills

A verified zero-Skill Lesson remains valid.

Stage 5 UI must not make Skill metadata a requirement for Lesson validity.

---

## 14. Prompt Generator boundary

Prompt Generator remains a separate feature.

Lesson Detail may provide it:

- Subject;
- Unit;
- Lesson;
- optional selected Skill.

Prompt explanation is available for a verified Lesson even when current Practice is unavailable.

The product term is:

**مولد الأوامر / Prompt Generator**

Do not label it an AI assistant or chatbot.

---

## 15. Current Practice boundary

Stage 5 preserves the current Practice contract:

`Skill → Ready PracticeSet → #practice/<skillId>`

A Practice action is shown only when:

- a concrete Skill context exists; and
- `getReadyPracticeSetForSkill(skill.id)` returns a ready set.

Do not infer Lesson-level Practice readiness from the presence of any Skill-level set.

For a multi-Skill Lesson:

- no Practice CTA appears before the required Skill context is chosen;
- an unready selected Skill shows truthful non-action status;
- a ready selected Skill exposes the existing Practice route.

Stage 5 does **not** implement the target future contract:

`Lesson → Verified Question Pool → Select 10 → Practice Session`

That belongs to the later Practice stage after JSON/question migration.

---

## 16. Curriculum ↔ Practice return contract

When current Practice is launched from Lesson Detail, Curriculum prepares a one-time in-memory return context:

- Subject ID;
- Unit ID;
- Lesson ID;
- active Skill ID.

Returning through the current Practice “العودة إلى المنهج” action restores the launching Lesson Detail once.

The context is:

- feature-owned;
- in-memory only;
- consumed once;
- cancelled if Practice exits to a non-Curriculum product destination.

It is not:

- Local Storage persistence;
- Session Storage persistence;
- a deep-link URL;
- global App-owned Curriculum state.

Refreshing `#curriculum` remains a fresh Subject-first entry.

---

## 17. Resources boundary

Resources remain independent from Curriculum validity.

At Stage 5 freeze, current Lesson/Skill source relations do not justify presenting inherited Subject/Unit sources as specifically Lesson- or Skill-related.

Therefore Curriculum must not automatically label inherited sources as:

- “مصادر مرتبطة بهذا الدرس”;
- “مصادر مرتبطة بهذه المهارة”.

Final Resources/Telegram relation UX remains owned by the later Resources stage.

---

## 18. Simulation boundary

Simulation is not part of the Curriculum hierarchy.

Stage 5 does not add Simulation as:

- a required Lesson action;
- a sixth primary navigation item;
- a Curriculum validity dependency.

External Simulation integration remains deferred.

---

## 19. AppShell and routing boundary

Stage 5 consumes the frozen Stage 4 AppShell.

Canonical routes remain:

- `#curriculum`;
- `#practice/<skillId>`;
- existing Stage 4 route matrix.

Stage 5 does not add:

- React Router;
- Subject hashes;
- Unit hashes;
- Lesson hashes;
- query-string Curriculum routing.

AppShell owns global navigation and route lifecycle.

Curriculum owns feature-local hierarchy state.

---

## 20. Design System and visual isolation

Curriculum V3 styling is scoped beneath:

`[data-v3-ui]`

Stage 5 consumes:

- frozen V3 colors/tokens;
- IBM Plex Sans Arabic 400/500/600/700;
- Lucide functional icons;
- approved Subject artwork;
- `SubjectCard`;
- `QuickActionCard`;
- `Surface`;
- `Button`;
- `Chip`.

Feature-local components/styles are permitted when they express real Curriculum hierarchy semantics.

Stage 5 does not:

- recreate the AppShell;
- add global V3 overrides;
- change frozen Design System tokens;
- replace Subject artwork with generic Lucide icons;
- reintroduce the legacy violet visual language.

---

## 21. Accessibility contract

Curriculum must preserve:

- Arabic `lang="ar"`;
- RTL direction;
- one logical H1;
- semantic heading order;
- accessible control names;
- keyboard operation;
- visible focus;
- programmatic focus transfer after hierarchy changes;
- 44×44px minimum interactive targets;
- selected state that does not rely on color alone;
- normal-text contrast of at least 4.5:1 for checked Curriculum secondary text;
- reduced-motion behavior;
- logical RTL properties;
- no global icon mirroring;
- no horizontal page overflow.

Subject artwork is decorative where the visible Subject label already provides the meaning and may use `alt=""`.

---

## 22. Responsive validation contract

Frozen validation widths:

`360 / 390 / 430 / 768 / 1024 / 1280 / 1440 / 1536`

Canonical visual evidence:

- `390×844`;
- `1536×1024`.

Curriculum-specific validation lives in:

`.github/workflows/v3-curriculum-quality.yml`

The harness validates the real production `#curriculum` route, not an isolated mock.

---

## 23. Regression and protected boundaries

Stage 5 preserves:

- ExamPilot;
- ExamRunner;
- ExamResultReport;
- LearningDashboard;
- ArabicExamTypography;
- ArabicRichContent;
- exam session recovery;
- `shared/exams/**`;
- Arabic Math;
- current Practice data/engine;
- current Prompt catalogue;
- current Curriculum data/model;
- diagnostics;
- Hash Routing;
- GitHub Pages/static deployment.

The dedicated Stage 5 diff guard is:

`.github/workflows/v3-stage5-regression.yml`

It fails if Stage 5 changes protected Legacy or the preserved Curriculum/Practice/Prompt data foundations relative to `main`.

---

## 24. Validation workflows

Stage 5 closure depends on these independent checks:

- Validate student experience;
- Browser Smoke;
- V3 production shell regression;
- V3 design system visual validation;
- V3 accessibility/performance regression;
- V3 Curriculum responsive/accessibility;
- V3 Stage 5 regression boundary;
- Vercel deployment status;
- GitHub Pages/static build verification inside the Stage 5 regression workflow.

A green Stage 4 final gate is not required on later branches because that gate is intentionally scoped to `feature/v3-app-shell`.

---

## 25. Change-control rule

After Stage 5I, do not silently change:

- Subject → Unit → Lesson hierarchy;
- optional Skill semantics;
- stable Curriculum IDs;
- fresh Subject-first entry;
- `unit-only` truthfulness;
- mobile progressive-disclosure model;
- desktop 2-/3-region composition contract;
- current Practice availability semantics;
- one-time Practice return behavior;
- Resources independence;
- Curriculum routing boundary;
- accessibility/responsive requirements;
- protected-data/Legacy regression boundary.

A later change requires:

1. an owning-stage requirement;
2. a deliberate runtime/data change;
3. matching regression evidence;
4. an update to this contract if the behavior is intended to become permanent.

---

## 26. Stage 6 handoff

The next owning stage is JSON Infrastructure.

Stage 6 must consume this Curriculum contract rather than redesign the Curriculum UI.

Stage 6 may build:

- raw source zones;
- adapters;
- import candidates;
- mappings;
- normalization/validation infrastructure;
- generated canonical question-bank infrastructure.

Stage 6 must not:

- make Raw JSON a UI runtime source;
- rename stable Curriculum IDs casually;
- make Skill mandatory;
- inject unverified Lessons into Curriculum;
- bypass `lessonId` for Student-ready questions;
- replace the Stage 5 Practice UI contract prematurely;
- couple Resources to Curriculum integrity.

The Stage 5 UI should continue consuming the current Curriculum graph/index contract until a later owning stage deliberately migrates the data source with equivalent behavior and regression proof.

---

## 27. Stage 5 freeze rule

At Stage 5I:

- Curriculum Experience contract is frozen;
- snapshots 16–23 become historical implementation evidence;
- future stages consume this contract;
- protected Legacy remains protected;
- JSON/question/Practice architecture remains deferred to its owning stages;
- PR review and merge remain explicit human approval gates.

No merge to `main` is authorized by this document.
