# V3 Stage 3K — Accessibility, Performance & Regression

Status: **IMPLEMENTED FOR STAGE 3K**

Stage 3K hardens the isolated V3 design system before its documentation freeze.

## Accessibility checks

The quality workflow verifies both hidden validation routes:

- `#design-system-preview`
- `#design-system-primitives`

Automated checks cover:
- explicit RTL root;
- one H1 on the composite validation page;
- labelled primary navigation;
- accessible names for all buttons;
- alt attributes for rendered images;
- labelled search input;
- aria-label on icon-only controls;
- keyboard Tab entry and visible focus outline;
- minimum 44×44 px button targets;
- reduced-motion behavior;
- critical CTA and body text contrast at 4.5:1 or higher.

3K also corrects previously smaller interactive targets:
- compact Button: 44 px minimum;
- Chip: 44 px minimum;
- Simulation CTA: 44 px minimum.

## Performance guardrails

The workflow records build metrics and rejects accidental Stage-3 bloat above conservative guardrails:

- total font payload <= 450 KB;
- any single font asset <= 120 KB;
- total WebP payload <= 150 KB;
- any single WebP asset <= 40 KB.

These are engineering guardrails, not claims about real-user Core Web Vitals.

The browser test also records local lab:
- CLS, required <= 0.1;
- LCP observation, required <= 3500 ms when reported.

Because this runs against localhost CI, LCP is used only as a regression alarm, not as a production performance score.

## Font loading

IBM Plex Sans Arabic remains isolated to the lazy V3 validation chunk. The harness imports only the explicit `arabic` subset for weights 400/500/600/700, avoiding unused Latin and Latin-ext font subsets. The current Home route does not import the Fontsource CSS directly.

This keeps the Stage-3 preview accurate without forcing the V3 font into unmigrated legacy screens.

## Static deployment regression

3K verifies both:
- normal Vercel-style build;
- `GITHUB_ACTIONS=true` GitHub Pages build.

This protects the existing base-path strategy.

## Legacy regression

Existing workflows continue to run unchanged:
- Validate student experience;
- Browser smoke test;
- V3 design system visual validation.

The existing browser smoke continues to exercise:
- Home;
- Prompt Generator;
- Curriculum;
- Practice rounds and diagnostics;
- two protected exam models;
- Arabic Math;
- RTL;
- local asset/console/page failures.

3K additionally checks that the protected Arabic Math stylesheet still contains its core isolation and math-font rules.

## Reduced motion

V3 primitive transitions are disabled under `prefers-reduced-motion: reduce`.

Composite interactive controls now explicitly follow the same contract.

## Known visual asset boundary

The Stage 3J validation route currently carries the real Simulation and three Quick Action WebPs. Subject/brand binary artwork remains tracked by the Stage 3D production package and must be materialized before Stage 3 closure if full subject-art parity is required.

This does not weaken accessibility/geometry validation: reserved subject-art slots retain calibrated dimensions and are marked decorative.

## Acceptance criteria

- keyboard focus verified in browser;
- visible focus verified;
- 44 px touch target policy enforced;
- semantic names/labels verified;
- critical contrast checked;
- reduced motion verified;
- CLS/LCP regression alarms active;
- font and WebP budgets active;
- Vercel-style build passes;
- GitHub Pages build passes;
- existing legacy smoke remains green;
- protected Arabic Math contract remains intact.
