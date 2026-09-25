# V3 Stage 5B — Curriculum UX Contract

Status: **PASS — 5B UX CONTRACT LOCKED**

Stage 5B converts the Stage 5A boundary into an implementation-ready UX contract for the Curriculum experience.

It does not redesign the runtime yet.

The canonical hierarchy remains:

**Subject → Unit → Lesson**

Optional enrichment:

**Lesson → Skills**

This document is subordinate to:

1. `docs/v3/01-architecture.md`
2. `docs/v3/02-legacy-boundary.md`
3. `docs/v3/11-design-system-contract.md`
4. `docs/v3/14-app-shell-contract.md`
5. `docs/v3/16-stage5-curriculum-boundary.md`

Migration rule:

**Preserve → Isolate → Replace → Verify → Remove Legacy**

---

## 1. Purpose

5B locks the interaction model before mobile and desktop implementation begins.

It answers:

- what the student sees when entering Curriculum;
- how Subject, Unit and Lesson selection progresses;
- how mobile and desktop differ without changing the domain hierarchy;
- how selected state works;
- how incomplete Curriculum data is represented honestly;
- how optional Skills behave;
- how Prompt / Practice / Resources remain adjacent rather than becoming Curriculum integrity requirements;
- which existing Design System components are reused;
- what later Stage 5 substages may implement without reopening the UX model.

5B does **not** authorize 5C implementation until explicit human approval.

---

## 2. Entry contract

Canonical route remains:

`#curriculum`

Stage 5 does not add a new router or new top-level Curriculum hashes.

### Initial Curriculum entry

A fresh Curriculum entry must begin with an explicit Subject choice.

Do not silently preselect Mathematics merely because it is the first currently detailed subject.

The student should immediately understand:

> اختر المادة التي تريد متابعة منهجها.

This removes the current hidden default-state bias and makes the hierarchy truthful.

### Re-entry

Stage 5B does not introduce persistence or deep-linking for Curriculum-local selection.

Subject/Unit/Lesson persistence across unmounts, refreshes or browser sessions is deferred unless a later Stage 5 substage proves it is required.

The AppShell owns only the `curriculum` route. Curriculum feature state remains feature-owned.

---

## 3. Subject availability contract

The Curriculum primary subject catalogue is driven by actual Curriculum structure.

A subject is **navigable** when:

`curriculumIndex.getUnitsForSubject(subject.id).length > 0`

Current navigable subjects are therefore the existing five:

- رياضيات
- لغة إنجليزية
- فيزياء
- كيمياء
- أحياء

The remaining current subject identities stay valid data but are not promoted to fake Curriculum destinations while they have zero units.

### Rule

Do not create empty actionable subject cards merely to fill the eight approved visual artwork categories.

Visual asset availability does not create Curriculum data availability.

When later data adds units to an existing subject ID, that subject may enter the navigable catalogue without changing its ID.

---

## 4. Subject-card contract

The initial Curriculum subject catalogue should reuse the frozen Design System:

`SubjectCard variant="actionable"`

where its semantics match.

Required:

- approved subject artwork;
- approved subject tone;
- truthful metadata derived from current Curriculum data;
- explicit action;
- 44px+ actionable control geometry;
- visible focus;
- no Lucide replacement for subject artwork.

### Current visual mapping

| Curriculum subject | Design System tone | Approved artwork |
|---|---|---|
| رياضيات | `math` | `v3AssetPaths.subjects.math` |
| فيزياء | `physics` | `v3AssetPaths.subjects.physics` |
| كيمياء | `chemistry` | `v3AssetPaths.subjects.chemistry` |
| أحياء | `biology` | `v3AssetPaths.subjects.biology` |
| لغة إنجليزية | `english` | `v3AssetPaths.subjects.english` |

No domain identity is inferred from artwork keys.

### Subject metadata

Metadata must be truthful.

Examples of allowed derived statements:

- `وحدتان`
- `وحدتان · 37 درسًا موثقًا`
- `الوحدات متاحة · تفاصيل الدروس قيد التوثيق`

Do not hard-code fabricated lesson counts.

Do not claim lesson readiness for a subject whose units are all `unit-only`.

---

## 5. Primary hierarchy contract

The only required navigation hierarchy is:

1. Subject
2. Unit
3. Lesson

Skill is never displayed as a required Step 4.

### Subject selection

Selecting a Subject:

- sets `subjectId`;
- clears any Unit selection from the previous Subject;
- clears Lesson selection;
- clears optional Skill selection;
- reveals the Units state.

### Unit selection

Selecting a Unit:

- sets `unitId`;
- clears Lesson selection from the previous Unit;
- clears optional Skill selection;
- resolves behavior from the exact `mappingStatus`;
- reveals either the Lessons state or the truthful `unit-only` state.

### Lesson selection

Selecting a verified Lesson:

- sets `lessonId`;
- clears optional Skill selection;
- opens Lesson detail;
- never requires a Skill selection before the Lesson is considered valid.

### Skill selection

Selecting a Skill, when offered:

- affects only optional skill-specific context/actions;
- does not change the owning Subject/Unit/Lesson;
- does not become a route requirement;
- does not make the Lesson invalid when no Skill is selected.

---

## 6. Mobile UX contract

Below 640px, Curriculum uses progressive disclosure.

The logical mobile states are:

`SubjectIndex → UnitIndex → LessonIndex → LessonDetail`

`Skills` live inside `LessonDetail` and are not a fifth page in the required flow.

### SubjectIndex

Show:

- one logical page H1 for Curriculum;
- short orientation copy;
- two-column actionable SubjectCard grid;
- only navigable subjects.

Do not show Unit/Lesson/Skill panels beneath the subject grid on the same long page.

### UnitIndex

After Subject selection:

- show compact selected Subject context;
- show one-column Unit list;
- provide a local hierarchy-back action to Subjects;
- do not add a second global Home navigation control.

Unit rows/cards must make mapping truth understandable without requiring technical words such as `lesson-skill`.

### LessonIndex

For a `lesson-skill` Unit:

- show selected Subject + Unit context;
- show verified Lessons only;
- group Lessons by existing `groupTitle` when present;
- preserve source order from the current Curriculum model;
- do not manufacture groups when `groupTitle` is absent.

For a `unit-only` Unit, LessonIndex is not rendered.

### LessonDetail

Show:

- selected Subject;
- selected Unit;
- Lesson title;
- existing `groupTitle` when present;
- Lesson actions whose data contract is currently truthful;
- optional Skills area when Skills exist.

The student must be able to use/understand the Lesson even if no optional Skill is selected.

### Mobile back behavior

Feature-local Back moves one hierarchy level upward:

- LessonDetail → LessonIndex
- LessonIndex → UnitIndex
- UnitIndex → SubjectIndex

It does not mutate the application hash.

AppShell primary navigation remains the owner of Home/Curriculum/Practice/Prompts/Resources navigation.

### Mobile focus behavior

After a forward hierarchy selection, focus should move to the newly revealed state heading.

After a hierarchy-back action, focus should return to the control/context that initiated that level when practical.

Do not animate focus/scroll in a way that violates reduced-motion preferences.

---

## 7. Compact / tablet contract

At 640–899px:

- keep the same information hierarchy as mobile;
- allow wider grids and more breathing room;
- do not prematurely render the full desktop workspace;
- preserve AppShell mobile primary navigation because the shell switches only at 900px.

The feature must not create a breakpoint that contradicts the shell navigation boundary.

---

## 8. Desktop UX contract

At 900px+ Curriculum uses a desktop composition rather than a scaled-up mobile wizard.

### Desktop initial state

Before a Subject is chosen:

- show the Curriculum H1/orientation;
- show the actionable Subject catalogue in a desktop grid;
- use the frozen four-column subject-grid direction where content allows;
- do not preselect Mathematics.

### Desktop selected state

After Subject selection, the layout may become a persistent Curriculum workspace.

Required behavior:

- selected Subject identity remains visible;
- Unit navigation remains readily available;
- current Lesson context can be viewed without losing the Unit/Subject context;
- changing Subject does not require returning to Home;
- Skills stay subordinate to Lesson detail.

A two-region or three-region desktop implementation is allowed.

5B deliberately does **not** freeze an exact sidebar width or pixel column recipe because the Design System contract explicitly deferred Curriculum desktop sidebar width.

### Desktop hierarchy principle

Desktop may expose more than one hierarchy level simultaneously, but it must not flatten the hierarchy.

Subject, Unit and Lesson must remain visually and semantically distinguishable.

Do not show Subject/Unit/Lesson/Skill as four equal columns.

---

## 9. Progressive disclosure contract

Progressive disclosure is mandatory for Stage 5.

Required principle:

**Show the next meaningful decision, not every possible object at once.**

Therefore:

- Subject selection precedes Unit choice;
- Unit selection precedes Lesson choice;
- Lesson detail contains optional Skill refinement;
- Practice availability appears only where current data supports it;
- Resources do not flood Lesson detail by inheritance;
- Simulation does not become part of the Curriculum hierarchy.

Desktop may keep previous context visible, but the current decision remains visually dominant.

---

## 10. Selected-state contract

A selected item must be identifiable through more than color.

Implementation may use the semantically appropriate pattern:

- `aria-pressed`;
- `aria-current`;
- native selection semantics;
- explicit visible selected marker plus accessible state.

The same entity must not appear simultaneously selected in two conflicting places.

### Reset rules

Changing Subject resets:

- Unit
- Lesson
- Skill

Changing Unit resets:

- Lesson
- Skill

Changing Lesson resets:

- Skill

Changing Skill does not reset Lesson.

These rules are deterministic and feature-local.

---

## 11. `mappingStatus` UX contract

The raw technical value must remain preserved in data but need not be shown literally to students.

### `lesson-skill`

Meaning:

- verified Lesson list exists;
- optional Skills may exist;
- Lesson detail may be entered.

Student-facing wording may say:

- `الدروس متاحة`
- `تفاصيل الدروس موثقة`

### `unit-only`

Meaning:

- the Unit is real and selectable;
- Lesson breakdown is not verified;
- no Lesson or Skill names may be inferred.

The terminal Unit state must communicate:

- the Unit exists;
- lesson detail has not yet been documented/verified;
- no fake Lesson list is hidden behind the message.

Allowed concept:

`تفاصيل دروس هذه الوحدة لم تُعتمد بعد.`

Do not label the Unit as broken, empty or unavailable.

### Unit-only actions

A `unit-only` state may later expose only actions that are valid at Subject/Unit scope.

It must not expose:

- lesson-specific Practice;
- guessed Lesson prompt context;
- guessed Skill context.

---

## 12. Lesson grouping contract

Existing `groupTitle` is present in verified Math taxonomies and should be used as navigation structure when available.

Examples include current groups such as:

- الأعداد المركبة
- الاحتمالات
- النهايات والاتصال
- التفاضل
- التكامل

Rules:

- grouping is presentation derived from existing data;
- group titles remain ordered by first appearance in the Lesson sequence;
- no UI-only academic group is invented;
- a Lesson without `groupTitle` remains fully valid.

This avoids an unstructured 26-item Lesson wall while preserving the verified taxonomy.

---

## 13. Optional Skill UX contract

Skills are subordinate Lesson metadata/interaction.

### One Skill

If a Lesson has exactly one Skill:

- do not force a separate Skill-selection step;
- the Skill may be displayed as a label/chip/metadata;
- current skill-specific actions may use the sole Skill context where that is behaviorally truthful.

### Multiple Skills

If a Lesson has multiple Skills:

- expose them inside Lesson detail;
- use a disclosure/list/chip structure appropriate to the final Lesson design;
- selection is optional unless the student chooses an action that requires a specific Skill;
- do not navigate away from the Lesson merely to select a Skill.

### Zero Skills

A verified Lesson with zero Skills remains a valid Lesson.

Do not disable the Lesson just because Skill metadata is absent.

Practice behavior remains constrained by current skill-based Practice availability.

---

## 14. Lesson action hierarchy

Exact Lesson-detail composition belongs to 5E, but 5B fixes the priority model.

### Primary educational context

Lesson identity comes first.

Actions are secondary to the Lesson, not the other way around.

### Prompt Generator

A Lesson may expose an explanation/Prompt action using:

- Subject;
- Unit;
- Lesson;
- optional Skill.

The feature name remains:

**مولد الأوامر / Prompt Generator**

Do not present it as an in-site AI assistant/chatbot.

### Practice

Current Practice remains:

`Skill → Ready PracticeSet`

Stage 5 may surface current truthful Practice availability inside Lesson detail.

It must not transform the engine into:

`Lesson → 10 verified questions`

That belongs to the later Practice stage after JSON/question migration.

### Resources

Current Lesson/Skill `sourceIds` are empty.

Inherited Subject/Unit sources do not prove Lesson-level relevance.

Therefore the Stage 5 Lesson detail should **not** render the current inherited source list under a label such as `مصادر مرتبطة بهذا الدرس` or `بهذه المهارة`.

Resources remain accessible through their independent feature until an explicit relation exists.

### Simulation

Simulation is not a Lesson action owned by Curriculum in Stage 5.

---

## 15. Visual composition contract

Curriculum migration root must be scoped beneath:

`[data-v3-ui]`

The feature should use:

- Page / Page Blue / Card / Border / Search tokens;
- Primary / Primary Strong / Primary Bright / Navy / Ink;
- IBM Plex Sans Arabic weights 400/500/600/700;
- frozen spacing/radius/shadow scale;
- Lucide for functional icons only;
- approved subject artwork;
- existing Design System primitives where semantics match.

### Reuse-first

Expected reusable components:

- `SubjectCard` for subject catalogue;
- `Surface` for generic bounded sections where appropriate;
- `Button` / `IconButton` for standard actions;
- `Chip` for optional Skill/status semantics when appropriate.

### Feature-local components are allowed

Stage 5 may later create feature-local components such as:

- Curriculum context/breadcrumb;
- Unit navigation item;
- Lesson navigation item/group;
- Lesson detail composition;
- optional Skill group.

These are allowed because they carry Curriculum domain hierarchy.

Do not create a duplicate generic button/card merely to change padding or color.

---

## 16. Heading and landmark contract

The Curriculum route has one logical H1.

Recommended page-level H1 concept:

`المنهج`

Hierarchy states below it use H2/H3 in document order.

Do not create a new H1 every time Subject/Unit/Lesson state changes.

The AppShell remains the global navigation landmark owner.

Curriculum may add labelled local navigation/section semantics for its hierarchy, but must not duplicate the primary navigation landmark.

---

## 17. RTL and directional behavior

Required:

- Arabic RTL;
- logical inline/block CSS properties where practical;
- no global icon mirroring;
- Back in RTL uses the frozen directional semantics;
- IDs/technical strings may use explicit LTR isolation only when displayed;
- subject artwork itself is not mirrored;
- scrollable regions must not rely on left/right-only spacing assumptions.

---

## 18. Responsive invariants

Required validation widths remain:

`360 / 390 / 430 / 768 / 1024 / 1280 / 1440 / 1536`

Canonical evidence later:

- mobile `390×844`
- desktop `1536×1024`

### Below 640

- two-column Subject grid;
- one-column Unit/Lesson flow;
- progressive hierarchy states;
- no horizontal page overflow.

### 640–899

- compact/tablet adaptation;
- mobile AppShell navigation remains active;
- hierarchy remains progressive.

### 900+

- desktop workspace behavior allowed;
- desktop shell navigation active;
- no mobile-only stacked duplication;
- Subject/Unit/Lesson context can coexist where useful.

### 1200+

- use available width without stretching reading/detail content beyond useful measure;
- do not introduce a separate information architecture.

---

## 19. Accessibility interaction contract

Migrated Curriculum controls must preserve:

- minimum 44×44px interaction target;
- keyboard operation for every selection/action;
- visible focus;
- semantic selected state;
- non-color state cue;
- logical heading order;
- useful accessible names;
- one H1;
- reduced-motion support;
- no focus loss after progressive state changes.

### Status text

`unit-only` and availability states must use text/icon semantics, not color alone.

### Decorative artwork

Subject artwork is decorative when the visible Subject name already supplies the meaning:

`alt=""`

Avoid repeating the same Subject name through both text and image alt unless the illustration conveys additional content.

---

## 20. Empty and edge states

### No navigable Subjects

The feature must fail safely with an honest Curriculum-unavailable message rather than crashing or inventing content.

### Subject with no Units

Such a Subject is not in the primary actionable catalogue under the current contract.

### `lesson-skill` with zero Lessons

This is a data integrity error under the current model validator, not a normal UI empty state.

### Lesson with zero Skills

Valid; Lesson detail remains available.

### No ready Practice

Do not show a disabled fake training CTA implying imminent availability.

Prefer truthful absence or an explicit non-action status if the final Lesson design needs it.

---

## 21. State ownership and routing boundary

Curriculum feature owns:

- `subjectId`;
- `unitId`;
- `lessonId`;
- optional `skillId`;
- feature-local hierarchy transitions.

AppShell owns:

- `#curriculum`;
- primary navigation;
- header/mobile navigation;
- route focus/scroll lifecycle.

Stage 5B does not add:

- React Router;
- Subject/Unit/Lesson hashes;
- query-string routing;
- Local Storage Curriculum persistence;
- global App state for Curriculum selection.

Any later need for deep linking requires deliberate routing-contract review.

---

## 22. Explicit non-goals for 5C–5F implementation

While implementing this UX contract, do not opportunistically build:

- Curriculum search infrastructure;
- JSON import architecture;
- canonical question bank;
- question migration;
- lesson-centered practice sessions;
- analytics;
- final resource relation model;
- external simulation integration;
- backend/auth/database;
- content-management tooling.

A local UI filter may only be introduced later if the actual Curriculum list demonstrates a real usability need and it remains presentation-only.

---

## 23. Implementation handoff

After 5B approval:

### 5C — Mobile Curriculum Experience

Owns implementation of:

- SubjectIndex;
- UnitIndex;
- LessonIndex;
- mobile hierarchy-back/context;
- Curriculum V3 root;
- mobile visual composition.

It should not complete the full Lesson action design owned by 5E.

### 5D — Desktop Curriculum Experience

Owns:

- initial desktop Subject catalogue;
- selected desktop workspace;
- persistent context layout;
- desktop responsive composition.

### 5E — Lesson Detail & Actions

Owns:

- Lesson detail composition;
- optional Skill presentation;
- truthful Prompt action;
- current skill-based Practice availability;
- removal of misleading inherited skill/lesson resource presentation.

### 5F — Shell Integration & State

Owns final feature-to-shell state/lifecycle integration if implementation reveals real integration work.

5G+ remain regression/closure stages.

---

## 24. 5B regression risks

5B implementation must guard specifically against:

1. preserving the current silent Mathematics preselection;
2. rendering Skills as required hierarchy;
3. losing Unit/Lesson context on desktop;
4. turning mobile into one huge page containing every hierarchy level;
5. creating dead Subject cards for subjects without Units;
6. showing technical `mappingStatus` strings to students;
7. hiding `unit-only` truth behind fabricated Lessons;
8. using inherited Resources as if Lesson-specific;
9. changing current skill-based Practice semantics;
10. duplicating AppShell navigation;
11. adding a new route/deep-link scheme accidentally;
12. selected states that rely only on background color;
13. breaking focus when moving between mobile hierarchy states;
14. introducing layout widths outside the frozen breakpoint strategy without evidence;
15. reusing Lucide instead of approved subject artwork.

---

## 25. 5B definition of done

5B is PASS only when:

- 5A remains intact;
- no runtime/data/protected-Legacy change is introduced by 5B;
- explicit Subject entry behavior is locked;
- navigable Subject policy is locked;
- mobile hierarchy states are locked;
- desktop hierarchy behavior is locked without prematurely freezing sidebar pixels;
- deterministic selection/reset behavior is locked;
- `mappingStatus` behavior is locked;
- Lesson grouping behavior is locked;
- Skill optionality behavior is implementation-ready;
- Prompt/Practice/Resources action boundaries are implementation-ready;
- V3 component reuse/isolation is explicit;
- responsive/accessibility behavior is explicit;
- this document is committed;
- required CI is green.

All 5B checks recorded below are green. 5C remains blocked until explicit human approval.


---

## 26. 5B closure evidence

5B candidate commit:

`5b8a74cc3ed868e93f6f5c667962d2488ab6d426`

Draft PR:

`#42 — V3-05: Build curriculum experience`

The PR remains Draft and is not merged.

### 5B candidate diff

Compared with the completed 5A head `14be34ee6fa9f2b9d1c6b9b848841b60e6affa82`, 5B changes only:

- added `docs/v3/17-stage5-curriculum-ux-contract.md`;
- modified `docs/v3/README.md`.

No runtime source, Curriculum/question data, Design System source, workflow, deployment configuration, or protected Legacy file changed.

### 5B candidate CI

Successful checks:

- Validate student experience / push — `36081446167`;
- Browser smoke test / push — `36081446187`;
- Validate student experience / pull_request — `36081450284`;
- Browser smoke test / pull_request — `36081450293`;
- V3 design system visual validation / pull_request — `36081450390`;
- V3 accessibility performance regression / pull_request — `36081450289`;
- V3 production shell regression / pull_request — `36081450350`;
- Vercel commit status — **success**.

The Stage 4 final CI gate is skipped by design outside `feature/v3-app-shell`; this is not a Stage 5 failure.

### Protected boundary result

**PASS.**

Stage 5B changes documentation only.

### Stage transition

**Stage 5B: PASS.**

Do not begin Stage 5C until explicit human approval.
