# V3 Stage 5C — Mobile Curriculum Experience

Status: **PASS — 5C MOBILE EXPERIENCE IMPLEMENTED**

Stage 5C implements the mobile/compact Curriculum hierarchy defined by Stage 5A and Stage 5B.

## Implemented

- explicit Subject-first entry; Mathematics is no longer silently preselected;
- V3 Curriculum feature root under `[data-v3-ui]`;
- approved actionable `SubjectCard` + subject artwork for the five currently navigable subjects;
- mobile progression: Subject → Unit → Lesson → Lesson detail;
- local hierarchy-back transitions without changing `#curriculum`;
- truthful `unit-only` terminal state;
- verified Lesson grouping from existing `groupTitle`;
- one-Skill Lessons avoid a separate Skill-selection step;
- multi-Skill Lessons keep Skill selection optional inside Lesson detail;
- current Prompt action remains available at Lesson scope;
- current skill-based Practice route remains intact when a ready set exists;
- inherited source lists are no longer presented as if they were Lesson/Skill-specific;
- selected states include semantic `aria-pressed` state;
- mobile controls retain 44px+ targets and V3 focus treatment.

## Runtime files

- `client/src/features/curriculum/CurriculumExplorer.tsx`
- `client/src/features/curriculum/curriculum-explorer.css`

## Regression update

`.github/workflows/browser-smoke.yml` now tests the Stage 5B mobile contract instead of the obsolete automatic Math/Skill preselection.

The smoke path verifies:

1. Curriculum starts at Subject selection;
2. mobile Subject grid is two columns;
3. Math → AGP Unit → first verified Lesson;
4. single Skill appears without a fourth required navigation step;
5. Prompt and current Practice actions remain reachable;
6. no horizontal mobile overflow;
7. the existing Practice flow still opens through `#practice/<skillId>`.

## Deliberately not implemented in 5C

- desktop workspace composition — Stage 5D;
- final Lesson action visual hierarchy — Stage 5E;
- final shell/local-state cleanup — Stage 5F;
- new Practice Engine;
- Resources relation model;
- JSON/question migration.

## 5C acceptance

5C is PASS only after:

- `pnpm verify` passes;
- Browser Smoke passes with the new mobile hierarchy;
- V3 visual/accessibility/shell regression remains green;
- Vercel preview succeeds;
- protected Legacy remains unchanged.

Do not treat this file as the final Stage 5 contract.


## 5C closure evidence

Final 5C runtime head before this documentation-only closure:

`04e87ec02503041f9a81e409a155327c6ae35493`

Successful checks:

- Validate student experience / push — `36082098052`;
- Browser smoke test / push — `36082098051`;
- Validate student experience / pull_request — `36082101057`;
- Browser smoke test / pull_request — `36082100973`;
- V3 design system visual validation — `36082101002`;
- V3 accessibility performance regression — `36082100983`;
- V3 production shell regression — `36082100959`;
- Vercel status — **success**.

The Stage 4 final gate remains skipped by design outside `feature/v3-app-shell`.

Diff from the completed 5B head changes only:

- `client/src/features/curriculum/CurriculumExplorer.tsx`;
- `client/src/features/curriculum/curriculum-explorer.css`;
- `.github/workflows/browser-smoke.yml`;
- this Stage 5C document.

No protected Legacy file changed.

**Stage 5C: PASS.**
