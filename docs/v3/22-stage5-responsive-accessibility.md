# V3 Stage 5G — Responsive + Accessibility

Status: **PASS — 5G RESPONSIVE + ACCESSIBILITY VERIFIED**

Stage 5G validates and hardens the implemented Curriculum experience across the frozen responsive widths and accessibility contract.

It does not redesign Curriculum hierarchy, change IDs, or begin Stage 5H regression closure.

## 1. Scope

Required widths:

`360 / 390 / 430 / 768 / 1024 / 1280 / 1440 / 1536`

Canonical evidence:

- mobile: `390×844`;
- desktop: `1536×1024`.

Required accessibility checks:

- RTL and Arabic language semantics;
- one logical H1;
- accessible button names;
- image alt attributes;
- keyboard activation;
- visible focus;
- programmatic focus transfer after hierarchy changes;
- 44×44px minimum interactive targets;
- non-color selected-state cue;
- reduced motion;
- text contrast;
- no horizontal overflow;
- truthful `unit-only` state.

## 2. Audit findings and fixes

### Programmatic heading focus

5C moved focus to each newly revealed hierarchy heading, but the feature stylesheet explicitly removed that heading outline.

5G replaces the hidden outline with a visible V3 focus ring.

This makes the focus transfer perceivable rather than only programmatically correct.

### Optional Skill selected state

Multi-Skill selection already exposed `aria-pressed`, but its visual selected state depended mainly on color.

5G adds a visible check icon inside the selected Skill chip.

The selection therefore has:

- semantic `aria-pressed`;
- color treatment;
- explicit non-color icon cue.

### Secondary-text contrast

Several Curriculum-specific secondary labels used 60–65% Ink mixed with white.

Those values were too close to the 4.5:1 normal-text threshold and some were below it on white/tinted surfaces.

5G normalizes Curriculum secondary text to the darker 68% Ink mix and verifies computed contrast in the production browser harness.

No global Design System token is changed.

## 3. Dedicated Curriculum quality harness

5G adds:

`.github/workflows/v3-curriculum-quality.yml`

The harness uses the production static build and visits the actual `#curriculum` route.

It does not validate an isolated preview fixture.

For every frozen width it verifies:

1. Curriculum root is `dir="rtl"` and `lang="ar"`;
2. exactly one Curriculum H1;
3. Subject grid composition:
   - two columns below 900;
   - four columns at 900+;
4. Subject → Unit → Lesson → Detail flow;
5. selected Unit/Lesson semantics;
6. programmatic focus transfer and visible focus ring;
7. mobile/compact single-panel progressive disclosure below 900;
8. desktop two-region layout from 900–1199;
9. desktop three-region layout at 1200+;
10. no horizontal overflow;
11. every visible Curriculum button is at least 44×44px;
12. every visible button has an accessible name;
13. every Curriculum image has `alt`;
14. secondary text contrast is at least 4.5:1;
15. `unit-only` does not fabricate Lessons or Lesson detail.

## 4. Canonical keyboard and motion checks

At 390 and 1536 the harness additionally verifies:

- Subject, Unit and Lesson can be activated by keyboard;
- focus lands on the newly revealed heading;
- the heading focus indicator is visible;
- a multi-Skill Lesson Skill can be selected with Space;
- `aria-pressed` changes;
- the visual check icon appears;
- Space can deselect the Skill;
- reduced-motion mode suppresses Curriculum control transitions/animations.

## 5. Evidence artifacts

The workflow records:

- `v3-curriculum-mobile-390x844.png`;
- `v3-curriculum-desktop-1536x1024.png`;
- `v3-curriculum-quality-report.json`.

The JSON report records each validated width, responsive mode, overflow result, touch-target result, focus result and measured contrast values.

## 6. Protected boundaries

5G does not modify:

- ExamPilot;
- ExamRunner;
- ExamResultReport;
- LearningDashboard;
- ArabicExamTypography;
- exam session storage;
- `shared/exams/*`;
- Arabic Math;
- question data;
- Practice Engine.

## 7. Deferred

5G does not start:

- 5H — Regression & Protected Legacy Verification;
- 5I — Curriculum Contract & Stage Closure;
- Stage 6 JSON Infrastructure;
- question migration;
- lesson-centered Practice;
- Analytics;
- Resources integration.

## 8. Acceptance

5G becomes PASS only when:

- dedicated Curriculum quality workflow is green;
- all eight widths pass;
- canonical mobile/desktop evidence is generated;
- keyboard/focus/selected-state/reduced-motion checks pass;
- contrast and touch-target checks pass;
- existing Validate, Browser Smoke, V3 visual, V3 accessibility/performance and AppShell regression remain green;
- Vercel preview is READY;
- protected Legacy remains untouched.

Stage 5H is not started.


---

## 9. 5G closure evidence

Final 5G runtime/harness head before this documentation-only closure:

`16f6ce3501b4f71687803a9cdca44a3e19d0a1ad`

Successful checks:

- Validate student experience / push — `36116626203`;
- Browser smoke test / push — `36116626236`;
- V3 Curriculum responsive accessibility / push — `36116626223`;
- Validate student experience / pull_request — `36116630040`;
- Browser smoke test / pull_request — `36116630053`;
- V3 production shell regression — `36116630090`;
- V3 Curriculum responsive accessibility / pull_request — `36116630132`;
- V3 accessibility performance regression — `36116630029`;
- V3 design system visual validation — `36116630069`;
- Vercel deployment `dpl_A9hfAgBkvEj93vfuFnEjAVdyBPvr` — **READY**.

Dedicated Curriculum evidence artifact:

- artifact id: `10855303279`;
- name: `v3-curriculum-responsive-accessibility`;
- SHA-256 digest: `e6ac2b8c8e09263f5e55212c78bd9f61c646057ebad7448573787d9c1f767aac`;
- contains canonical 390×844 and 1536×1024 screenshots plus the eight-width JSON report.

The dedicated harness passed all frozen widths:

`360 / 390 / 430 / 768 / 1024 / 1280 / 1440 / 1536`.

### Candidate failures resolved during 5G

Two failures occurred while creating the new harness and were fixed before PASS:

1. the first preview used the GitHub Pages-flavoured build at localhost, so the feature could not load at the root preview URL; the workflow now restores a Vercel-style production build before browser checks;
2. an early focus assertion read `activeElement` before the feature's requestAnimationFrame focus transfer completed; the harness now waits for the contracted focus destination and verifies its visible outline.

These were harness defects, not accepted runtime failures.

### Runtime fixes validated by 5G

- hierarchy headings now show visible focus after programmatic focus transfer;
- selected multi-Skill chips expose a visible check icon in addition to color and `aria-pressed`;
- Curriculum secondary text contrast was darkened within feature scope and passes the browser 4.5:1 checks;
- 44×44px minimum touch targets pass;
- no horizontal overflow is present across the eight frozen widths;
- `unit-only` remains truthful at every width;
- reduced-motion keyboard checks pass at 390 and 1536.

### Protected boundary result

**PASS.**

Diff from completed 5F changes only:

- `.github/workflows/v3-curriculum-quality.yml`;
- `client/src/features/curriculum/CurriculumExplorer.tsx`;
- `client/src/features/curriculum/curriculum-explorer.css`;
- this document;
- `docs/v3/README.md`.

No protected Legacy file changed.

**Stage 5G: PASS.**

Stage 5H is not started.
