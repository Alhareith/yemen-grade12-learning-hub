# V3 Stage 5.5F — Component / Asset Fidelity

Status: **PASS — ASSET FIDELITY CLOSED**

Depends on:
- `docs/v3/11-design-system-contract.md`
- `docs/v3/27-stage5-5-home-visual-ux-contract.md`
- Stage 5.5 reference pack `04_COMPONENT_ASSET_MAP.md`
- Stage 5.5 reference pack `spec/asset-map.json`

## Asset policy applied

Stage 5.5 uses the approved production accessor:

`client/src/design-system/assets/asset-paths.ts`

No new runtime image asset was introduced.

No remote image dependency was introduced.

No reference screenshot or crop is shipped as production UI.

## Hero

The reference pack does not define a separate approved Hero bitmap.

Per its priority rule, the Hero is therefore composed from existing approved production artwork:

- Math subject artwork;
- Physics subject artwork;
- Chemistry subject artwork;
- Biology subject artwork;
- Arabic subject artwork;
- English subject artwork;
- approved Curriculum action artwork.

The previous CSS-generated fake book stack was removed from both JSX and CSS.

CSS remains responsible only for layout, surface treatment and composition around approved artwork.

## Quick Actions

Approved assets are used directly for:

- Curriculum → `v3AssetPaths.actions.curriculum`
- Practice → `v3AssetPaths.actions.practice`
- Prompt Generator → `v3AssetPaths.actions.prompts`

Resources has no dedicated approved WebP in the frozen asset map, so it correctly uses:

`functionalIcons.content.resources`

This follows the reference pack instead of inventing a replacement illustration.

## Simulation

Simulation uses the exact approved production derivative:

`v3AssetPaths.simulation`

The functional Target/status icons remain secondary UI cues.

No substitute Simulation illustration is generated.

## Curriculum Home entry

The prominent Curriculum entry uses:

- approved Curriculum action artwork;
- a compact composition of approved Subject-family artwork.

It does not duplicate Curriculum domain UI.

## Icon fidelity

All functional icons come from:

`client/src/design-system/icons/icon-system.ts`

No second icon library was added.

Directional semantics continue to use the frozen RTL icon contract.

## Performance

This substage adds zero new image payload to the repository.

It reuses Stage 3 validated WebP assets and retains intrinsic image width/height.

Below-fold action/simulation artwork remains eligible for lazy loading.

The primary Hero artwork is intentionally available immediately where needed.

## Result gate

Stage 5.5F closure evidence:
- Validate student experience / push — **success**.
- TypeScript, Vitest and production build step — **success**.
- No new runtime image asset was added.

## Result

**Stage 5.5F — PASS.**

Stage 5.5G may now proceed.
