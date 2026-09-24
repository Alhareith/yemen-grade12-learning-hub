# V3 Documentation Map

This directory is the architectural and migration record for Learning Hub V3.

## Precedence

When documents describe different moments in the migration, use this order:

1. `01-architecture.md` for architecture boundaries.
2. `02-legacy-boundary.md` for protected Legacy.
3. `11-design-system-contract.md` for the frozen Stage 3 visual/UI contract.
4. Runtime code for exact implementation values.
5. Earlier Stage 3 documents as historical rationale/snapshots.

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

## Stage snapshots

Files 04–10 intentionally preserve how each substage was implemented. Some statements describe the state at that time, such as whether a preview route had already been connected.

For current rules and current final Stage 3 behavior, use `11-design-system-contract.md`.
