# V3 Stage 5E — Lesson Detail & Actions

Status: **PASS — 5E LESSON DETAIL & ACTIONS IMPLEMENTED**

Stage 5E completes the Lesson-detail composition and action hierarchy defined by the Stage 5B contract.

It does not replace the current Practice engine and does not create Lesson-level question pools.

## 1. Audit findings

The current verified Curriculum contains:

- 37 Lessons;
- 27 single-Skill Lessons;
- 10 multi-Skill Lessons;
- no verified zero-Skill Lesson in the current data;
- 11 single-Skill Lessons with a ready Practice set;
- 16 single-Skill Lessons without a ready Practice set;
- two multi-Skill Lessons where only one of several Skills currently has ready Practice:
  - الدوال المركبة وقاعدة التسلسل;
  - طرق التكامل.

This means Practice availability cannot honestly be represented as a Lesson-wide boolean.

## 2. Lesson identity first

Lesson Detail now keeps the Lesson title and group first.

A compact summary reports:

- number of verified Skills;
- number of ready Skill Practice sets.

These counts are derived from current runtime data and create no new Curriculum records.

## 3. Optional Skill contract implemented

### Single Skill

A single Skill is shown as Lesson metadata.

There is no fourth navigation step and no required selection.

The UI states whether ready Practice currently exists for that Skill.

### Multiple Skills

Skills are selectable inside Lesson Detail only.

Selection is optional.

Clicking the currently selected Skill again clears the Skill selection and returns Prompt generation to Lesson-level context.

Each Skill exposes a textual availability cue:

- `تدريب متاح`;
- `شرح فقط حاليًا`.

The cue is not color-only.

## 4. Prompt action

Prompt remains available for every verified Lesson.

It uses the existing Prompt Generator model:

- Subject;
- Unit;
- Lesson;
- optional selected Skill.

The UI names the action as Lesson explanation and never calls it an AI assistant.

The action reuses the frozen `QuickActionCard` and Prompt Generator artwork.

## 5. Practice action

Practice remains exactly:

`Skill → Ready PracticeSet → #practice/<skillId>`

A Practice action is rendered only when:

- a Skill context is resolved; and
- `getReadyPracticeSetForSkill(skill.id)` returns a ready set.

For multi-Skill Lessons, no Skill is chosen implicitly.

When no Skill is selected, the UI explains that training requires a Skill selection but Lesson explanation does not.

When the selected Skill has no ready Practice set, the UI shows a non-action status instead of a disabled/fake Practice button.

## 6. Resources boundary

Lesson Detail still does not render inherited Subject/Unit sources as Lesson-specific resources.

Current Lesson/Skill `sourceIds` remain empty.

No final Resources integration is introduced.

## 7. Visual implementation

Stage 5E reuses:

- `Surface`;
- `Chip`;
- `QuickActionCard`;
- approved Prompt Generator artwork;
- approved Practice artwork;
- existing V3 tokens under `[data-v3-ui]`.

No new global V3 override is added.

## 8. Regression coverage

Browser Smoke now verifies:

- single-Skill Lesson summary and ready Practice action;
- Prompt action remains available;
- no inherited source list is mislabeled as Lesson-specific;
- multi-Skill Lesson starts with no implicit Skill selection;
- selecting a ready Skill reveals Practice;
- selecting that Skill again clears optional selection;
- selecting an unready Skill does not render a fake Practice CTA;
- truthful unavailable status appears;
- Prompt remains available even when Practice is unavailable;
- existing Practice route/session remains intact.

## 9. Deferred

5E does not implement:

- Lesson-centered Practice Engine;
- JSON infrastructure;
- question migration;
- Analytics;
- final Resources relation model;
- external Simulation integration;
- backend/auth/database;
- Curriculum deep links.

## 10. Acceptance

5E becomes PASS only when:

- `pnpm verify` is green;
- Browser Smoke is green with the new Lesson action cases;
- V3 visual/accessibility regressions remain green;
- AppShell regression remains green;
- Vercel preview is READY;
- protected Legacy is untouched.

Stage 5F is not started.


---

## 11. 5E closure evidence

Final 5E runtime head before this documentation-only closure:

`e26d13729eea5d8504a80427765eba737fd11213`

Successful checks:

- Validate student experience / push — `36114705106`;
- Browser smoke test / push — `36114705220`;
- Validate student experience / pull_request — `36114710977`;
- Browser smoke test / pull_request — `36114710990`;
- V3 design system visual validation — `36114710981`;
- V3 accessibility performance regression — `36114710994`;
- V3 production shell regression — `36114710992`;
- Vercel commit status — **success**.

The first 5E Browser Smoke candidate failed only because one assertion depended on the Arabic digit glyph emitted by `Intl.NumberFormat` in CI. The runtime behavior was correct. The assertion was corrected to verify semantic summary labels rather than locale-specific numeral rendering, and the final candidate passed.

Diff from the completed 5D head changes only:

- `client/src/features/curriculum/CurriculumExplorer.tsx`;
- `client/src/features/curriculum/curriculum-explorer.css`;
- `.github/workflows/browser-smoke.yml`;
- `docs/v3/20-stage5-lesson-detail-actions.md`;
- `docs/v3/README.md`.

No protected Legacy file changed.

**Stage 5E: PASS.**

Stage 5F is not started.
