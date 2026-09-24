# V3 Stage 3J — Responsive + Visual Validation Harness

Status: **IMPLEMENTED FOR STAGE 3J**

## Purpose

Stage 3J turns the isolated V3 composite system into a browser-verifiable surface. It does not migrate Home or Curriculum. The hidden hash route exists only to prove that Stage 3 can reproduce the reference composition safely.

Validation route:

`#design-system-preview`

There is no user-facing navigation link to this route.

## Materialized Stage 3D assets

The harness now carries real binary WebP assets for:
- simulation;
- prompt quick action;
- practice quick action;
- curriculum quick action.

They are imported through Vite, so build hashing and GitHub Pages/Vercel base handling are exercised by the real build rather than by raw `/src/` URLs.

Stage 3M materialized the brand symbol and all eight subject illustrations from the exact approved Stage 3D package. The harness now renders the full production asset set; no reserved subject-art slots, Lucide substitutions, or invented artwork remain.

## Canonical screenshots

CI captures:
- `v3-design-mobile-390x844.png`
- `v3-design-desktop-1536x1024.png`

These are evidence screenshots of the isolated system, not screenshots of production Home.

## Responsive verification widths

Structural checks run at:

`360 / 390 / 430 / 768 / 1024 / 1280 / 1440 / 1536`

Rules:
- below 900: 2 subject columns, mobile bottom navigation visible;
- 900 and above: 4 subject columns, mobile bottom navigation hidden;
- no horizontal overflow;
- all rendered validation images must load;
- RTL root must remain explicit;
- five bottom-nav items;
- simulation banner minimum geometry must remain within the calibrated envelope.

## Reference comparison policy

The approved 1448×1086 reference images are composite marketing mockups, not raw browser screenshots. Therefore Stage 3J does not perform a misleading full-image pixel diff.

Comparison is split into:

1. automated structural checks;
2. canonical browser screenshots;
3. human review of hierarchy, spacing, pastels, blue identity, card proportions, banner prominence, and mobile/desktop composition.

Subject-art validation now uses the materialized Stage 3D production illustrations for all eight subjects.

## Regression boundary

The existing `browser-smoke.yml` remains untouched and continues to verify current Home, prompts, curriculum, practice, exams, Arabic math, and RTL.

The new workflow is additive:

`.github/workflows/v3-design-visual.yml`

## Acceptance criteria

- hidden isolated preview route works;
- production feature routes remain unchanged;
- real Stage 3D WebP assets are bundled in the preview;
- Vite resolves those assets in static output;
- 8 responsive widths are checked;
- canonical mobile and desktop screenshots are generated;
- mobile/desktop composition switches at the locked boundary;
- no horizontal overflow;
- no request, page, or console errors;
- existing browser smoke still passes.
