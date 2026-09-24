# V3 Design System

This directory contains the isolated V3 UI foundation.

Before changing it, read:

`docs/v3/11-design-system-contract.md`

## Structure

```text
design-system/
├─ assets/
├─ components/
├─ icons/
├─ preview/
├─ primitives/
├─ tokens/
└─ typography/
```

## Usage order

A migrated feature should generally consume:

1. tokens;
2. typography / RTL;
3. semantic functional icons;
4. existing primitive;
5. existing composite if the visual semantics match;
6. feature-local component only when domain structure requires it.

Do not jump directly to hard-coded Tailwind/CSS values when a locked V3 token already exists.

## Scope root

A V3 migration surface must live below:

```tsx
<div data-v3-ui dir="rtl">
  ...
</div>
```

Do not promote V3 variables to global `:root` during feature migration.

## Existing generic primitives

- Button
- IconButton
- SearchField
- Surface
- Chip

## Existing composites

- SubjectCard
- QuickActionCard
- SimulationBanner
- MobileBottomNav

## Icons

Use `functionalIcons` from `icons/icon-system.ts`.

Do not choose arbitrary directional icons screen-by-screen.

Do not use Lucide subject glyphs as V3 subject illustrations.

## Typography

Primary family: IBM Plex Sans Arabic.

Consumers that need the packaged V3 font should import only:

```ts
import "@fontsource/ibm-plex-sans-arabic/arabic-400.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-500.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-600.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-700.css";
```

Do not override Arabic Math fonts.

## Validation fixtures

- `#design-system-preview`
- `#design-system-primitives`

These are hidden engineering fixtures and must not be linked as product pages.

## Current closure gap

The Stage 3D brand symbol and eight subject illustrations still need binary materialization into the repository before Stage 3 closure can claim full subject-art parity.

Do not replace them with placeholder production artwork.
