# V3 Stage 3I — Reference Composite Components

Status: **IMPLEMENTED FOR STAGE 3I**

Stage 3I composes the locked V3 foundations into reference-facing visual components while keeping them isolated from production feature screens.

## Implemented

- `SubjectCard`: `compact` + `actionable`
- `QuickActionCard`
- `SimulationBanner`
- `MobileBottomNav`
- `CompositePreview`
- canonical Stage 3D asset-path map

## SubjectCard

The two variants preserve the Stage 3C reference difference instead of hiding it:

- Home compact card: shorter composition, no full-width CTA.
- Curriculum actionable card: taller card with a full-width primary CTA.

Both use the same subject pastel token family and Stage 3D illustration slots.

## QuickActionCard

Three tones map to the approved feature surfaces: prompts, practice, curriculum. These cards expect Stage 3D artwork rather than Lucide substitutes.

## SimulationBanner

The Stage 3D simulation artwork remains dominant. Lucide is used only for the small external-action affordance. Exact gradient tuning remains a visual-harness concern.

## MobileBottomNav

- exactly five items;
- semantic Lucide icons;
- visible labels;
- 20px icons;
- active state changes color/stroke;
- 64px minimum height;
- hidden at the desktop composition boundary.

Target semantics:
الرئيسية / المنهج / التدريب / مولد الأوامر / المزيد.

## Asset boundary

Stage 3D produced the binary assets as a repo-ready package. The GitHub connector available in this environment cannot directly transfer those generated local binary files into repository blobs, so 3I records their canonical runtime paths in `client/src/design-system/assets/asset-paths.ts`.

No fake icons or placeholder illustrations replace them. The visual harness/integration step must materialize the Stage 3D binary files before routing the preview.

## Isolation

No production route imports `CompositePreview`. No changes are made to Home, Curriculum, Practice, Prompt Generator, Resources, legacy exam, App.tsx, or legacy global CSS.

## Acceptance criteria

- reference-facing composites exist;
- Home/Curriculum SubjectCard difference is preserved as variants;
- Stage 3D assets are the expected illustration source;
- no subject Lucide icons are introduced;
- five-item mobile nav matches target semantics;
- components consume V3 tokens/typography/icons;
- preview remains isolated;
- current build and browser regressions remain green.
