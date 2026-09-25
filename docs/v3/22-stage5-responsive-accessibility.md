# V3 Stage 5G — Responsive + Accessibility

Status: **IMPLEMENTATION CANDIDATE — CI PENDING**

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
