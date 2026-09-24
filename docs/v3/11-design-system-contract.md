# V3 Design System Contract

Status: **FROZEN AT STAGE 3L**

This document is the canonical contract for the Learning Hub V3 design system after Stages 3A–3K.

If a Stage 3 snapshot document conflicts with this file, **this file wins**. Earlier documents remain useful as implementation history and rationale.

---

## 1. Contract scope

This contract freezes the reusable visual foundation only:

- visual tokens;
- Arabic typography;
- RTL behavior;
- functional icons;
- visual asset boundaries;
- core primitives;
- reference composite components;
- responsive composition rules;
- accessibility requirements;
- performance guardrails;
- validation harnesses;
- migration boundaries for later V3 stages.

It does **not** authorize redesigning all current product screens at once.

The architecture rule remains:

**Preserve → Isolate → Replace → Verify → Remove Legacy**

---

## 2. Sources of truth

### Architecture and boundaries

1. `docs/v3/01-architecture.md`
2. `docs/v3/02-legacy-boundary.md`
3. this contract

### Runtime design system

| Area | Runtime source |
|---|---|
| Tokens | `client/src/design-system/tokens/tokens.css`, `tokens.ts` |
| Typography / RTL | `client/src/design-system/typography/typography.css`, `typography.ts` |
| Icons | `client/src/design-system/icons/icon-system.ts` |
| Primitives | `client/src/design-system/primitives/` |
| Composite components | `client/src/design-system/components/` |
| Materialized assets | `client/src/design-system/assets/` |
| Isolated validation | `client/src/design-system/preview/` |

### Validation workflows

- `.github/workflows/v3-design-visual.yml`
- `.github/workflows/v3-design-quality.yml`
- existing `browser-smoke.yml`
- existing student-experience validation workflow

---

## 3. Isolation boundary

All V3 visual CSS must remain below:

```css
[data-v3-ui]
```

until a later migration stage intentionally moves a feature into V3.

### Required

- prefix shared V3 variables with `--v3-`;
- use logical RTL properties where practical;
- import V3 styles through V3 consumers;
- migrate feature-by-feature.

### Forbidden

Do not create V3 global overrides for:

- `:root`
- `body`
- generic `button`
- generic `a`
- generic `input`
- global footer rules
- existing Tailwind utility meanings

Do not solve migration by rewriting `v2.css` or `polish.css` globally.

---

## 4. Locked color system

### Brand

| Role | Value |
|---|---|
| Primary | `#0B4FBF` |
| Primary Strong | `#073EA5` |
| Primary Bright | `#287BEB` |
| Navy | `#0A1A74` |
| Ink | `#0F2A68` |

### Neutral surfaces

| Role | Value |
|---|---|
| Page | `#F7FBFF` |
| Page Blue | `#E8F3FE` |
| Card | `#FFFFFF` |
| Border | `#D8E8F7` |
| Search | `#F3F8FE` |

### Feature surfaces

| Feature | Value |
|---|---|
| Prompt Generator | `#F0EBFD` |
| Practice | `#E9FAF1` |
| Curriculum | `#E8F3FE` |
| Simulation | `#FEEFD3` |

### Subject surfaces

| Subject | Value |
|---|---|
| Math | `#E1F0FE` |
| Physics | `#F8EEFD` |
| Chemistry | `#FDF6E8` |
| Biology | `#E6FAF1` |
| Arabic | `#FCEBF2` |
| English | `#EAF4FF` |
| Islamic | `#E9FAF1` |
| Social | `#F6EDFA` |

### Semantic feedback

Brand blue does not replace semantic state colors.

- success → emerald/green;
- error → rose/red;
- warning → amber;
- neutral/help → ink/slate family.

---

## 5. Locked spacing, radius and shadow system

### Spacing

`4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 56`

Do not create a new shared spacing token for every local measurement.

### Radii

- control: 10px
- button: 12px
- medium: 14px
- card: 18px
- large surface/banner: 24px
- pill: 999px

### Shared shadows

- card: `0 8px 24px rgba(15,42,104,.08)`
- raised: `0 12px 32px rgba(15,42,104,.10)`
- soft inset: `inset 0 0 0 1px rgba(37,99,235,.08)`

Avoid introducing near-duplicate shadows per feature.

---

## 6. Typography contract

Primary UI family:

**IBM Plex Sans Arabic**

Fallback:

`Noto Sans Arabic → Tahoma → Arial → sans-serif`

Package:

`@fontsource/ibm-plex-sans-arabic@5.3.0`

Runtime delivery:

- self-hosted through the Vite bundle;
- no runtime font CDN;
- only the explicit `arabic` subset;
- weights 400 / 500 / 600 / 700 only.

Canonical imports for a V3 entry that needs the font:

```ts
import "@fontsource/ibm-plex-sans-arabic/arabic-400.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-500.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-600.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-700.css";
```

Do not add 800/900 to create hierarchy.

### Mobile

| Role | Size | Line height | Weight |
|---|---:|---:|---:|
| H1 | 28 | 1.25 | 700 |
| H2 | 22 | 1.30 | 700 |
| H3 | 17 | 1.35 | 600 |
| Body | 14 | 1.75 | 400 |
| Meta | 12 | 1.60 | 500 |
| Button | 14 | 1.20 | 600 |

### Desktop

| Role | Size | Line height | Weight |
|---|---:|---:|---:|
| H1 | 36 | 1.25 | 700 |
| H2 | 27 | 1.30 | 700 |
| H3 | 20 | 1.35 | 600 |
| Body | 16 | 1.75 | 400 |
| Meta | 13 | 1.60 | 500 |
| Button | 16 | 1.20 | 600 |

---

## 7. RTL contract

V3 root behavior:

- `direction: rtl`;
- logical `text-align: start`;
- controls inherit UI font and direction;
- no global icon mirroring.

Use explicit LTR isolation only where internal ordering requires it:

- URLs;
- code;
- file names;
- technical identifiers;
- score sequences.

Supported mechanisms:

- `data-v3-ltr`
- `data-v3-number`
- native `dir`
- `bdi` for dynamic mixed-direction content.

### Protected Arabic Math boundary

`client/src/arabic-math.css` remains independent.

Do not force the UI font into MathML or replace its math-specific direction/font handling.

---

## 8. Functional icon contract

General functional library:

**Lucide only**

Core sizes:

- XS 16
- SM 18
- MD 20
- LG 24

Stroke:

- default 2
- active 2.25

### RTL directions

- Back → ArrowRight
- Forward → ChevronLeft
- Previous → ChevronRight
- Next → ChevronLeft
- Expand → ChevronDown
- Collapse → ChevronUp
- ExternalLink → unchanged

Never apply global `scaleX(-1)`.

### Visual illustrations are not icons

Do not use Lucide subject glyphs as V3 subject artwork.

These remain visual assets:

- brand mark;
- eight subject illustrations;
- simulation artwork;
- quick-action artwork.

---

## 9. Asset contract

Materialized and validated in the repository:

- Simulation WebP
- Prompt Generator quick-action WebP
- Practice quick-action WebP
- Curriculum quick-action WebP

The complete Stage 3D production package remains source material for:

- brand symbol;
- Math illustration;
- Physics illustration;
- Chemistry illustration;
- Biology illustration;
- Arabic illustration;
- English illustration;
- Islamic illustration;
- Social illustration.

### Closure blocker

The nine assets above are the **only known Stage 3 visual-asset materialization gap** at the end of 3L.

They must be materialized and verified before Stage 3 is closed if full subject-art parity is claimed.

Do not replace this gap with Lucide icons, invented illustrations, or temporary production placeholders.

---

## 10. Core primitive contract

Approved generic primitives:

- `Button`
- `IconButton`
- `SearchField`
- `Surface`
- `Chip`

Later feature work should reuse these when their semantics match.

Do not create a feature-local duplicate of a primitive merely to change color, spacing, or radius.

A feature-specific component is appropriate when it contains domain structure or behavior that does not belong in the generic primitive.

### Interaction baseline

- interactive touch target: minimum 44×44px;
- keyboard focus must be visible;
- icon-only actions require accessible names;
- selectable chips expose `aria-pressed`;
- disabled state uses native semantics;
- reduced motion is respected.

---

## 11. Reference composite contract

Approved composites:

- `SubjectCard`
- `QuickActionCard`
- `SimulationBanner`
- `MobileBottomNav`

### SubjectCard

Two deliberate variants:

- `compact` → Home-style card;
- `actionable` → Curriculum-style card with full-width CTA.

Do not force both contexts into one identical visual composition.

### QuickActionCard

Approved tones:

- prompts
- practice
- curriculum

### SimulationBanner

- warm simulation surface;
- real simulation artwork is visually dominant;
- functional Lucide icon is secondary;
- simulation ultimately opens an independent external simulation site in the later integration stage.

### MobileBottomNav

Exactly five target semantics:

1. الرئيسية
2. المنهج
3. التدريب
4. مولد الأوامر
5. المزيد

Rules:

- visible labels;
- 20px functional icons;
- active state changes color/stroke;
- 64px minimum height;
- hidden at desktop composition boundary.

---

## 12. Responsive contract

Validation widths:

`360 / 390 / 430 / 768 / 1024 / 1280 / 1440 / 1536`

Canonical evidence:

- Mobile: 390×844
- Desktop: 1536×1024

Composition boundaries:

- below 640 → mobile;
- 640–899 → compact/tablet;
- 900+ → desktop composition;
- 1200+ → wide reference range.

### Mobile defaults

- content padding 14px;
- header 58px;
- section gap 16px;
- grid gap 10px where calibrated;
- subject grid 2 columns;
- simulation minimum 138px;
- bottom navigation 64px.

### Desktop defaults

- max container 1280px;
- content padding 24px;
- header 72px;
- section gap 24px;
- grid gap 16px;
- subject grid 4 columns;
- simulation minimum 108px.

Do not assume mobile is simply a shrunken desktop layout.

---

## 13. Accessibility contract

Required for migrated V3 features:

- semantic HTML first;
- accessible names for controls;
- one logical page H1;
- labelled navigation landmarks;
- labelled form controls;
- image `alt` policy;
- visible keyboard focus;
- minimum 44px interactive targets;
- state must not rely on color alone;
- critical text/action contrast target ≥ 4.5:1;
- `prefers-reduced-motion` respected.

Stage 3K browser checks are the baseline implementation evidence.

---

## 14. Performance contract

Current Stage 3 guardrails:

- total font assets ≤ 450KB;
- single font asset ≤ 120KB;
- total materialized WebP assets ≤ 150KB;
- single WebP ≤ 40KB;
- CLS lab alarm ≤ 0.1;
- local CI LCP alarm ≤ 3500ms when reported.

Latest validated Stage 3K measurements:

- font build payload: 360,316 bytes;
- WebP build payload: 20,656 bytes;
- largest font asset: 46,924 bytes;
- largest WebP: 8,942 bytes;
- browser font requests on V3 preview: 4;
- browser WebP requests on V3 preview: 3;
- CLS: ~0.00085;
- local CI LCP: ~1124ms.

These are regression guardrails, not production Core Web Vitals claims.

---

## 15. Validation harness contract

Hidden validation routes:

- `#design-system-preview`
- `#design-system-primitives`

They are engineering fixtures, not product navigation destinations.

### They may

- load V3-only assets;
- render isolated components;
- generate screenshots;
- exercise keyboard/responsive states.

### They must not

- appear as normal user navigation;
- become a replacement Home;
- carry product business logic;
- become a shortcut around later migration stages.

---

## 16. Product semantics that later UI must preserve

- There is **no AI assistant/chatbot** in the product.
- The feature is **مولد الأوامر / Prompt Generator**.
- Full simulation is an independent external destination when its verified replacement is ready.
- Resources remain independent from lessons.
- Only genuinely lesson-related YouTube material may be shown in lesson context.
- Telegram resource UX presents information/handle/copy behavior rather than direct channel opening.
- Primary learning model remains:
  **Subject → Unit → Lesson → Practice → Result → Analytics**
- Skill remains optional.

---

## 17. Protected legacy boundary

Later stages must not casually rewrite or delete:

- current internal exam runtime;
- exam session storage;
- shared exam domain;
- Arabic Math renderer/styles;
- verified question IDs/content/evidence;
- current practice/session behavior;
- GitHub Pages hash routing;
- regression workflows.

Legacy is removed only after its replacement is implemented and verified.

---

## 18. Allowed changes in later stages

Later migration stages may:

- compose approved primitives/composites into real feature screens;
- add feature-specific components where domain semantics justify them;
- tune local layout within this token system;
- replace a legacy screen after equivalent behavior is verified;
- add missing production assets from the approved Stage 3D package;
- add documented semantic icon keys if a genuinely new action appears;
- extend validation for new migrated screens.

---

## 19. Changes requiring explicit design-system review

Do not silently change:

- brand palette;
- subject palette;
- typography family;
- typography scale;
- spacing scale;
- radius scale;
- shared shadows;
- breakpoints;
- touch-target minimum;
- icon library;
- RTL directional semantics;
- SubjectCard variant contract;
- bottom-navigation semantics;
- accessibility/performance guardrails.

A change is acceptable only when there is measured evidence or a real product requirement, and the contract + runtime source + validation must be updated together.

---

## 20. Prohibited shortcuts

Do not:

- reintroduce violet as the V3 brand identity;
- use arbitrary hard-coded near-duplicate colors across features;
- add global `!important` patches as a V3 strategy;
- create a second generic icon library without evidence;
- use Lucide as subject artwork;
- use font 800/900 for routine hierarchy;
- disable horizontal overflow to hide broken geometry;
- remove visible focus;
- shrink interactive controls below 44px;
- globally flip icons for RTL;
- attach Resources to Curriculum by default;
- label Prompt Generator as an AI assistant;
- delete protected Legacy before replacement verification;
- treat the marketing composite references as raw viewport screenshots for pixel-diff claims.

---

## 21. Deferred component-level decisions

These are not global design tokens yet:

- exact Hero height;
- exact rendered subject-illustration sizes;
- Curriculum desktop sidebar width;
- exact blue gradient recipe;
- feature-specific card heights.

Resolve them in the owning migration stage with browser evidence instead of promoting guesses into global tokens.

---

## 22. Stage 3L freeze rule

At the end of 3L:

- the contract is frozen;
- future stages consume it rather than redesign it;
- Stage 3M may fix closure defects and materialize pending approved assets;
- Stage 3M must not introduce a new visual language.

Any substantive visual-system redesign after this point requires a deliberate contract revision, not an incidental feature patch.
