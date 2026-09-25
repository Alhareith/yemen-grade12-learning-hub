# V3 Documentation Map

This directory is the architectural and migration record for Learning Hub V3.

## Precedence

When documents describe different moments in the migration, use this order:

1. `01-architecture.md` for architecture boundaries.
2. `02-legacy-boundary.md` for protected Legacy.
3. `11-design-system-contract.md` for the frozen Stage 3 visual/UI contract.
4. `14-app-shell-contract.md` for the frozen Stage 4 application-shell contract.
5. Runtime code for exact implementation values.
6. Earlier stage snapshots as historical rationale/snapshots.

Do not treat an older stage snapshot as authority over a later frozen contract.

## Documents

| File | Purpose |
|---|---|
| `00-baseline.md` | protected starting behavior |
| `01-architecture.md` | V3 architecture contract |
| `02-legacy-boundary.md` | protected legacy surfaces |
| `03-repository-restructure.md` | Stage 2 ownership restructure |
| `04-icon-system.md` | functional icon decisions |
| `05-design-tokens.md` | token calibration and lock |
| `06-typography-rtl.md` | Arabic typography and RTL |
| `07-core-primitives.md` | generic primitives |
| `08-reference-components.md` | reference composites |
| `09-responsive-visual-harness.md` | browser visual validation |
| `10-accessibility-performance-regression.md` | quality guardrails |
| `11-design-system-contract.md` | **canonical frozen Stage 3 contract** |
| `12-stage3-closure.md` | Stage 3 closure evidence and handoff |
| `13-stage4-app-shell-boundary.md` | historical Stage 4A boundary/baseline |
| `14-app-shell-contract.md` | **canonical frozen Stage 4 App Shell contract** |
| `15-stage4-closure.md` | Stage 4 closure evidence and handoff |
| `16-stage5-curriculum-boundary.md` | Stage 5A Curriculum baseline, identity lock, UX boundary and regression risks |
| `17-stage5-curriculum-ux-contract.md` | Stage 5B implementation-ready Curriculum UX contract for mobile/desktop hierarchy and states |
| `18-stage5-mobile-curriculum.md` | Stage 5C mobile/compact Curriculum implementation and verification |
| `19-stage5-desktop-curriculum.md` | Stage 5D desktop Curriculum workspace implementation and verification |
| `20-stage5-lesson-detail-actions.md` | Stage 5E Lesson detail, optional Skill and truthful Prompt/Practice action implementation |
| `21-stage5-shell-state.md` | Stage 5F one-time Curriculum ↔ Practice return-state and AppShell lifecycle integration |
| `22-stage5-responsive-accessibility.md` | Stage 5G Curriculum responsive/accessibility hardening and eight-width browser contract |
| `23-stage5-regression-protected-legacy.md` | Stage 5H protected Legacy/data diff guard and full regression verification |
| `24-curriculum-contract.md` | **canonical frozen Stage 5 Curriculum Experience contract** |
| `25-stage5-closure.md` | Stage 5 closure evidence and Stage 6 handoff |
| `26-stage5-5-home-boundary.md` | Stage 5.5A Home ownership/boundary lock against the exact-reference pack |
| `27-stage5-5-home-visual-ux-contract.md` | Stage 5.5B frozen Home visual/UX implementation contract |
| `28-stage5-5-mobile-home.md` | Stage 5.5C canonical mobile Home implementation record |
| `29-stage5-5-desktop-home.md` | Stage 5.5D canonical desktop Home implementation record |
| `30-stage5-5-route-action-wiring.md` | Stage 5.5E canonical Home route/action semantics |
| `31-stage5-5-component-asset-fidelity.md` | Stage 5.5F approved asset/component fidelity record |
| `32-stage5-5-responsive-accessibility-visual-regression.md` | Stage 5.5G eight-width browser/accessibility/visual-regression evidence |
| `33-home-contract.md` | **canonical frozen Stage 5.5 Home Experience contract** |
| `34-stage5-5-closure.md` | Stage 5.5 full regression and closure evidence |

## Stage snapshots

Files 04–10 intentionally preserve how each substage was implemented. Some statements describe the state at that time, such as whether a preview route had already been connected.

For current visual-system rules, use `11-design-system-contract.md`.

For current application-shell, routing, navigation and shell-lifecycle rules, use `14-app-shell-contract.md`.


For current Curriculum behavior after Stage 5, use `24-curriculum-contract.md`. Stage 5 files 16–23 remain implementation snapshots, audit evidence and rationale.

Later stages must consume the frozen Architecture, Legacy, Design System, AppShell and Curriculum contracts together rather than reviving an earlier Stage 5 snapshot.


For current Home behavior after Stage 5.5, use `33-home-contract.md`. Stage 5.5 files 26–32 remain implementation snapshots and evidence; `34-stage5-5-closure.md` records the closure gate.
