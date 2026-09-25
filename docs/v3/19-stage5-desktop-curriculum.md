# V3 Stage 5D — Desktop Curriculum Experience

Status: **PASS — 5D DESKTOP EXPERIENCE IMPLEMENTED**

Stage 5D adds the desktop composition defined by the Stage 5B UX contract without changing Curriculum data, IDs, routes, Practice semantics, or the completed Stage 5C mobile flow.

## Desktop implementation

### Initial state

At 900px+ the Curriculum still begins with explicit Subject choice.

- no automatic Mathematics selection;
- actionable subject catalogue remains the entry surface;
- the frozen desktop Subject grid uses four columns;
- approved subject artwork remains the visual identity.

### Selected Subject workspace

After a Subject is selected:

- a desktop-only context bar keeps the current Subject visible;
- the student can change Subject without returning Home;
- Unit navigation remains persistent;
- Lesson navigation appears beside it when a Unit is selected;
- Lesson detail remains visible with the hierarchy instead of replacing it;
- mobile hierarchy-back controls are hidden on desktop because the hierarchy itself is visible.

### 900–1199px

Compact desktop uses two regions:

- persistent Unit navigation;
- Lesson navigation and Lesson detail use the wider second region in sequence.

This avoids forcing three narrow columns at 1024px.

### 1200px+

Wide desktop uses three regions:

- Units;
- Lessons;
- Lesson detail.

Skill remains inside Lesson detail and never becomes a fourth hierarchy column.

### Incomplete mapping

For `unit-only` Units, the truthful Unit state occupies the available content region. No empty Lesson/Skill column is fabricated.

## Desktop guidance states

When a Subject is selected but no Unit is selected, the workspace contains a neutral guidance surface.

When a verified Unit is selected but no Lesson is selected, Lesson navigation remains visible and the detail region explains the next action.

These are UI guidance only and do not create Curriculum entities.

## Regression evidence added

Browser Smoke now validates the production Curriculum at:

- mobile 390px — two-column Subject catalogue and progressive hierarchy;
- compact desktop 1024px — two-region workspace;
- wide desktop 1536px — three-region workspace;
- desktop Subject catalogue — four columns;
- simultaneous Unit/Lesson/Detail visibility on wide desktop;
- no horizontal overflow;
- no duplicate mobile hierarchy-back controls on desktop.

A dedicated `curriculum-desktop-smoke.png` artifact is captured.

## Files changed by 5D

- `client/src/features/curriculum/CurriculumExplorer.tsx`
- `client/src/features/curriculum/curriculum-explorer.css`
- `.github/workflows/browser-smoke.yml`
- this document
- V3 documentation map

## Deferred

5D does not implement:

- final Lesson Detail/Actions refinement — Stage 5E;
- final Shell Integration & State cleanup — Stage 5F;
- new Practice Engine;
- JSON/question migration;
- Analytics;
- final Resources relation model.

## Acceptance

5D becomes PASS only after the desktop browser contract, full validation, V3 quality regressions, AppShell regression, and Vercel status are green while Stage 5C mobile behavior remains green.


## 5D closure evidence

Final 5D runtime head before this documentation-only closure:

`97ee9ff868e4546c1e768e7e882ad20f1b2a7453`

Successful checks:

- Validate student experience / push — `36082543276`;
- Browser smoke test / push — `36082543282`;
- Validate student experience / pull_request — `36082547617`;
- Browser smoke test / pull_request — `36082547656`;
- V3 design system visual validation — `36082547624`;
- V3 accessibility performance regression — `36082547613`;
- V3 production shell regression — `36082547649`;
- Vercel deployment `dpl_F1yTe2p2hsxDpyaP9guX94Gz7XPS` — **READY**.

The Browser Smoke result includes both the existing 390px Stage 5C path and the new 1024/1536 Stage 5D assertions.

Diff from the completed 5C head changes only:

- `client/src/features/curriculum/CurriculumExplorer.tsx`;
- `client/src/features/curriculum/curriculum-explorer.css`;
- `.github/workflows/browser-smoke.yml`;
- `docs/v3/19-stage5-desktop-curriculum.md`;
- `docs/v3/README.md`.

No protected Legacy file changed.

**Stage 5D: PASS.**

Stage 5E is not started.
