# V3 Stage 3H — Core UI Primitives

Status: **IMPLEMENTED FOR STAGE 3H**

Stage 3H introduces the first reusable UI components that consume the locked V3 tokens, typography rules, and semantic icon system. It intentionally does not redesign Home, Curriculum, Practice, Prompt Generator, Resources, or the legacy exam.

## 1. Scope

Implemented primitives:

- `Button`
- `IconButton`
- `SearchField`
- `Surface`
- `Chip`

Implemented isolated fixture:

- `PrimitivesPreview`

Not implemented in 3H:

- SubjectCard
- SimulationBanner
- QuickActionCard
- MobileBottomNav
- curriculum-specific cards
- practice-specific cards
- feature navigation
- app shell

Those belong to composite/component stages.

## 2. Runtime files

```text
client/src/design-system/primitives/
  Button.tsx
  Chip.tsx
  IconButton.tsx
  SearchField.tsx
  Surface.tsx
  index.ts
  primitives.css

client/src/design-system/preview/
  PrimitivesPreview.tsx
  primitives-preview.css
```

The preview imports the V3 token, typography, and primitive styles, but it is not connected to `App.tsx` or any production route.

## 3. Button

Variants:

- primary
- secondary
- ghost
- danger

Sizes:

- sm
- md

Rules:

- semantic HTML `button`;
- defaults to `type="button"`;
- optional Lucide icon;
- RTL-aware placement through start/end order rather than global icon mirroring;
- disabled state;
- focus-visible state;
- reduced-motion safe;
- uses V3 button height, typography, radius, and palette tokens.

No feature-specific meaning is embedded in Button.

## 4. IconButton

Rules:

- requires an accessible `label`;
- label is applied through `aria-label` and `title`;
- minimum size uses the locked 44px touch target;
- icon dimensions and stroke widths come from Stage 3E;
- active state changes color/stroke, not glyph;
- does not flip icons with CSS.

## 5. SearchField

Rules:

- visible label by default;
- native `input type="search"`;
- search icon comes from `functionalIcons.action.search`;
- control height comes from V3 tokens;
- RTL alignment follows the Stage 3G root contract;
- supports standard input props so feature screens can manage value/state without business logic entering the primitive.

## 6. Surface

Variants:

- card
- raised
- subtle

Padding:

- sm
- md
- lg

Surface only provides reusable presentation structure. It is not a SubjectCard or feature card.

## 7. Chip

Tones:

- neutral
- primary
- success
- warning

Rules:

- interactive button semantics;
- `aria-pressed` represents selection;
- selected status never depends on color alone because the pressed state is programmatically exposed;
- semantic success/warning palettes stay separate from brand blue.

## 8. Accessibility

3H locks:

- minimum 44px target for IconButton;
- visible focus ring;
- disabled semantics through native button behavior;
- `aria-label` for icon-only controls;
- `aria-pressed` for selectable chips;
- visible SearchField label;
- reduced-motion handling.

A full keyboard/accessibility audit still belongs to Stage 3K.

## 9. CSS isolation

All primitive selectors are descendants of:

`[data-v3-ui]`

There are no new global selectors for:
- button
- input
- label
- body
- :root

The current application's `v2.css`, `polish.css`, and feature utility classes remain unchanged.

## 10. Typography/font note

The isolated preview consumes the Stage 3G typography contract, but 3H does not add a font package to the current application entry. The exact self-hosted IBM Plex Sans Arabic payload will be attached when the preview becomes a runnable validation entry in the visual harness stage, so an unused font dependency is not shipped prematurely.

## 11. Acceptance criteria

- five generic primitives exist;
- every primitive consumes locked V3 foundations rather than hard-coded feature colors;
- icon-only controls use Stage 3E sizes/strokes;
- typography comes from Stage 3G variables;
- RTL behavior does not use global mirroring;
- focus and disabled states exist;
- preview fixture demonstrates all primitives together;
- preview is isolated and not routed;
- no feature or legacy file is restyled;
- build/typecheck/browser regression remains green.
