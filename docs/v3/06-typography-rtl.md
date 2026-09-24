# V3 Stage 3G — Typography & RTL Foundation

Status: **LOCKED FOR STAGE 3G**

Stage 3G locks the V3 Arabic UI type system and RTL behavior without altering the current product or the protected Arabic-math rendering layer.

## 1. Primary Arabic UI font

V3 uses **IBM Plex Sans Arabic** as its primary interface font.

Reasons:
- it is already the nearest visual family identified by the approved design package;
- it supports the complete 400/500/600/700 weight range needed by this design system;
- it is available as a self-hostable web-font package rather than requiring Google Fonts at runtime;
- the family remains readable at the compact mobile sizes present in the references.

Fallback stack:

`IBM Plex Sans Arabic → Noto Sans Arabic → Tahoma → Arial → sans-serif`

## 2. Loading contract

Locked delivery method:

- package: `@fontsource/ibm-plex-sans-arabic`
- locked package baseline for Stage 3: `5.3.0`
- delivery: self-hosted through the Vite bundle;
- required weights: 400, 500, 600, 700;
- explicit runtime subset: `arabic` only;
- no Google Fonts or third-party font CDN at runtime.

The dependency is intentionally installed when the isolated V3 preview/app entry first consumes the typography stylesheet. Stage 3G does not add an unused font dependency to the current application bundle.

The future consuming entry should import only the required weights, conceptually:

```ts
import "@fontsource/ibm-plex-sans-arabic/arabic-400.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-500.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-600.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-700.css";
```

Then import the scoped V3 token and typography styles.

## 3. Mobile type scale

| Role | Size | Line height | Weight |
|---|---:|---:|---:|
| H1 | 28 px | 1.25 | 700 |
| H2 | 22 px | 1.30 | 700 |
| H3 | 17 px | 1.35 | 600 |
| Body | 14 px | 1.75 | 400 |
| Meta | 12 px | 1.60 | 500 |
| Button | 14 px | 1.20 | 600 |

## 4. Desktop type scale

At the V3 desktop composition boundary (`>=900px`):

| Role | Size | Line height | Weight |
|---|---:|---:|---:|
| H1 | 36 px | 1.25 | 700 |
| H2 | 27 px | 1.30 | 700 |
| H3 | 20 px | 1.35 | 600 |
| Body | 16 px | 1.75 | 400 |
| Meta | 13 px | 1.60 | 500 |
| Button | 16 px | 1.20 | 600 |

These values preserve the reference hierarchy without carrying forward the current product's frequent `font-black` / `font-extrabold` usage.

## 5. Weight policy

Only four UI weights are part of the V3 contract:

- 400 regular
- 500 medium
- 600 semibold
- 700 bold

800/900 are not design-system weights. A feature must not introduce them merely to create hierarchy that should instead come from size, spacing, color, or composition.

## 6. Scoped runtime rules

Runtime source:

- `client/src/design-system/typography/typography.css`
- `client/src/design-system/typography/typography.ts`

All typography rules remain below `[data-v3-ui]`.

Stage 3G does not change:
- `body`
- `:root`
- `.font-sans`
- `.font-kufi`
- current feature classes.

## 7. RTL root contract

Every isolated V3 surface has:

- `direction: rtl`;
- logical `text-align: start`;
- Arabic UI font inherited by controls;
- no global icon flipping.

Directional icon semantics remain owned by the Stage 3E icon system.

## 8. Mixed Arabic + numbers/Latin

Arabic sentences remain RTL.

Use explicit LTR isolation only for content whose internal order must stay left-to-right, such as:
- numeric score sequences such as `50/80`;
- URLs;
- code fragments;
- file names;
- technical identifiers.

Supported hooks:

- `data-v3-ltr`
- `data-v3-number`
- native `dir="ltr"` / `dir="rtl"`
- semantic HTML `bdi` when dynamic mixed-direction text needs isolation.

`data-v3-number` also uses tabular numerals for stable metrics/results layout.

Do **not** set `direction:ltr` on every number in normal Arabic prose.

## 9. Inputs and search

Within V3:
- input, textarea, select, and button inherit the V3 family;
- Arabic input defaults to RTL;
- alignment uses logical start;
- a URL/code field can opt into `dir="ltr"`;
- placeholder direction follows the control unless the field is explicitly LTR.

This avoids per-screen RTL patches.

## 10. Buttons and icon placement

Typography does not control directional glyph selection; Stage 3E does.

Placement rule:
- identity/action icon: RTL start (right);
- forward chevron: RTL end (left);
- back ArrowRight stays beside the return label;
- labels remain visible for ambiguous icon actions.

## 11. Arabic math boundary

`client/src/arabic-math.css` remains protected and independent.

The V3 UI family must not override:
- MathML/math fonts;
- Arabic words embedded inside math;
- specialized math direction/isolation.

A future V3 component wrapping `ArabicRichContent` must preserve that existing boundary rather than forcing `font-family: inherit` onto its math descendants.

## 12. Accessibility and readability

- do not encode state using typography alone;
- body line-height remains generous for Arabic;
- buttons stay semibold rather than black;
- meta text remains 12 px minimum in the V3 scale;
- no decorative letter-spacing is applied to Arabic UI text;
- text zoom must remain functional because sizes are not locked by fixed-height text containers.

## 13. What remains for browser validation

The following are locked as the intended system but still require visual evidence in the Stage 3 showcase:

- exact font metrics after the real package is bundled;
- whether H3 should remain 600 everywhere or use 700 in specific composite components;
- line wrapping on 360/390/430 widths;
- Latin/Arabic baseline harmony for identifiers and percentages.

Those checks may refine component usage, but not silently introduce a second typography system.

## 14. Acceptance criteria

- IBM Plex Sans Arabic chosen as one primary V3 UI family;
- self-hosted Vite/npm delivery contract locked;
- no runtime font CDN required;
- only 400/500/600/700 weights allowed;
- mobile and desktop scales locked;
- typography encoded in CSS + TypeScript;
- RTL root behavior scoped to `[data-v3-ui]`;
- mixed-direction isolation rules defined;
- form-control inheritance defined;
- icon direction remains delegated to 3E;
- Arabic-math boundary remains untouched;
- no current product screen is restyled by 3G.
