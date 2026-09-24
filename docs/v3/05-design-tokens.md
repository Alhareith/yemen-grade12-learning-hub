# V3 Stage 3F — Design Token Lock

Status: **LOCKED FOR STAGE 3F**

Stage 3F converts the calibrated measurements from Stage 3C into a deliberately small V3 token system. The tokens are isolated from the current/legacy interface and are not applied to feature screens in this stage.

## 1. Runtime sources

- CSS variables: `client/src/design-system/tokens/tokens.css`
- TypeScript constants: `client/src/design-system/tokens/tokens.ts`
- Scope root: `[data-v3-ui]`

The CSS file is intentionally **not imported into the current product shell yet**. Stage 3 primitives/showcase may import it inside the isolated V3 validation surface later.

## 2. Isolation contract

Stage 3B found that `index.css`, `v2.css`, and `polish.css` currently affect the whole application. Therefore V3 does not redefine existing globals such as:

```css
:root { --primary: ... }
body { ... }
footer { ... }
```

Instead, every V3 variable starts with `--v3-` and only exists below:

```css
[data-v3-ui] { ... }
```

This prevents the new royal-blue identity from recoloring the current exam, practice, prompt, curriculum, footer, or Arabic-math surfaces before their migration stage.

## 3. Locked palette

### Brand

| Token | Value |
|---|---|
| Primary | `#0B4FBF` |
| Primary Strong | `#073EA5` |
| Primary Bright | `#287BEB` |
| Navy | `#0A1A74` |
| Ink | `#0F2A68` |

The three blues are intentional. Stage 3C found a deeper Home CTA and a brighter Curriculum CTA/highlight. We retain a compact three-step blue family instead of creating many near-duplicate shades.

### Neutral surfaces

| Token | Value |
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

Simulation is a base surface token only. The reference banner also contains illustration/illumination; the token is not intended to reproduce that entire visual effect.

### Subjects

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

These values remain close to the supplied design package because Stage 3C image sampling confirmed that the package values were already within the visual envelope of the references.

## 4. Semantic feedback colors

Semantic status is independent from the brand:

- success: emerald
- error: rose
- warning: amber

A correct answer must not become royal blue merely because blue is the V3 identity.

## 5. Spacing

Locked scale:

`4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 56`

No larger token catalogue is introduced. Component-specific values such as the calibrated 10 px Curriculum mobile grid gap may exist as layout tokens without expanding the general spacing scale.

## 6. Radii

| Purpose | Value |
|---|---|
| compact control | 10 px |
| button | 12 px |
| medium | 14 px |
| card | 18 px |
| large surface/banner | 24 px |
| pill | 999 px |

Legacy values such as 26 px and 28 px are not carried into the V3 token scale.

## 7. Shadows

Only three shared effects are locked:

- card: `0 8px 24px rgba(15,42,104,.08)`
- raised: `0 12px 32px rgba(15,42,104,.10)`
- soft inset: `inset 0 0 0 1px rgba(37,99,235,.08)`

The system deliberately avoids the many near-duplicate shadows currently hard-coded in feature files.

## 8. Controls

| Control | Locked geometry |
|---|---|
| mobile/general control | 44 px |
| desktop primary button | 46 px |
| search | 44 px |
| minimum touch target | 44 px |
| button radius | 12 px |

The 44 px minimum also aligns with the Stage 3E icon-only control requirement.

## 9. Layout

### Shared

- maximum content container: 1280 px

### Mobile default

- content padding: 14 px
- header: 58 px
- section gap: 16 px
- Curriculum subject grid gap: 10 px
- subject columns: 2
- Home simulation minimum: 138 px
- bottom navigation: 64 px

### Desktop

At `min-width: 900px`:

- content padding: 24 px
- header: 72 px
- section gap: 24 px
- grid gap: 16 px
- subject columns: 4
- simulation minimum: 108 px
- primary button: 46 px

At `min-width: 640px`, compact/tablet layout increases content padding to 20 px and the general grid gap to 16 px without pretending tablet is full desktop.

## 10. Breakpoint contract

The runtime token file records these architecture points:

- mobile boundary: 640 px
- desktop composition boundary: 900 px
- wide desktop reference boundary: 1200 px

These are design-system composition boundaries, not permission to scatter feature-specific media queries. Future features should reuse the same strategy unless a measured content constraint requires an exception.

Validation must still cover 360, 390, 430, 768, 1024, 1280, 1440, and 1536 widths.

## 11. Curriculum card calibration

The actionable Curriculum subject card keeps:

- radius: 18 px
- visual aspect target: approximately 1.35:1

This is a visual target, not a guarantee that every implementation must use a hard CSS `aspect-ratio`; content must remain usable.

The Home compact subject card is a different visual variant and is not forced into this ratio.

## 12. Explicitly deferred

Stage 3F does **not** lock:

- typography or line-height — Stage 3G;
- exact Hero height;
- exact rendered illustration dimensions;
- Curriculum desktop sidebar width;
- exact blue gradient recipe;
- feature-specific card heights.

Those values require either typography calibration or browser/component evidence and would be premature tokens now.

## 13. What is not changed

Stage 3F does not modify or import into:

- `client/src/index.css`
- `client/src/v2.css`
- `client/src/polish.css`
- `client/src/arabic-math.css`
- Home
- Curriculum
- Practice
- Prompt Generator
- legacy Exam runtime

## 14. Acceptance criteria

- compact palette locked;
- subject surfaces locked;
- semantic feedback separated from brand;
- spacing scale remains small;
- radii reduced to a clear scale;
- shadows reduced to three shared effects;
- mobile/desktop layout constants recorded;
- V3 CSS variables are scoped under `[data-v3-ui]`;
- no `:root`, body, footer, or generic element overrides added;
- no current feature imports the new token stylesheet;
- deferred decisions are explicit rather than guessed.
