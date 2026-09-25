# V3 Stage 5.5G — Responsive + Accessibility + Visual Regression

Status: **PASS — RESPONSIVE / ACCESSIBILITY / VISUAL REGRESSION CLOSED**

Depends on:
- `docs/v3/27-stage5-5-home-visual-ux-contract.md`
- `docs/v3/28-stage5-5-mobile-home.md`
- `docs/v3/29-stage5-5-desktop-home.md`
- `docs/v3/31-stage5-5-component-asset-fidelity.md`
- `Stage5_5_Home_Exact_Reference_Pack.zip`

Dedicated workflow:
`.github/workflows/v3-home-quality.yml`

Machine-readable evidence:
`reports/v3-home-visual-regression.json`

---

## 1. Validation widths

The real production Home was rendered and measured at:

`360 / 390 / 430 / 768 / 1024 / 1280 / 1440 / 1536`

Canonical evidence:

- Mobile: `390×844`
- Desktop: `1536×1024`

The workflow uses the built Vite production output and headless Chrome, not an isolated mock component.

---

## 2. Browser assertions

Every validated width passes:

- no document horizontal overflow;
- no Home child escaping the viewport;
- all visible Home actions at least 44×44px;
- all production images loaded;
- all images carry an `alt` attribute;
- Arabic / RTL semantics;
- one logical Home H1;
- canonical action hrefs;
- AppShell mobile/desktop navigation breakpoint behavior;
- visible keyboard focus on canonical Home CTA;
- reduced-motion behavior.

Routes verified:

- المنهج → `#curriculum`
- التدريب → `#curriculum` fallback
- مولد الأوامر → `#prompts`
- المصادر → `#resources`
- المحاكاة → `#exam-pilot`

---

## 3. Canonical mobile result — 390×844

Measured Home zones:

| Zone | Y | Height |
|---|---:|---:|
| Hero | 64 | 234 |
| Curriculum | 308 | 128 |
| Quick Actions | 452 | 132 |
| Simulation | 594 | 148.1 |
| Resources | 752.1 | 60 |

Home body height:

`766.1px`

The reference image normalized to 390px width is approximately:

`390×813`

The production viewport also contains the frozen AppShell header and fixed bottom navigation.

### Visual calibration decision

The exact mobile reference visibly uses four compact Quick Actions in one row at its canonical phone composition.

The earlier written pack layout note described a 2×2 grid.

Stage 5.5G resolves this conflict using the pack's own visual-source precedence:

- 390 / 430 → four compact actions in one row, matching the canonical image;
- 360 → 2×2 fallback to preserve readable content and 44px interaction requirements;
- 768 → compact/tablet 2×2 composition.

This is an evidence-driven calibration, not a new Home hierarchy.

---

## 4. Canonical desktop result — 1536×1024

Measured Home zones:

| Zone | X | Y | Width | Height |
|---|---:|---:|---:|---:|
| Hero | 128 | 72 | 1280 | 294 |
| Curriculum | 128 | 382 | 435.2 | 215.4 |
| Quick Actions | 579.2 | 440.8 | 828.8 | 156.6 |
| Simulation | 128 | 613.4 | 1280 | 136 |
| Resources | 128 | 765.4 | 1280 | 88 |

The result preserves the frozen 1280px V3 content maximum rather than stretching the Home to the presentation mock's wider visual canvas.

The final desktop calibration intentionally:

- removed the unnecessary 24px top offset beneath the AppShell;
- reduced inter-section rhythm from the coarse first pass to the measured reference rhythm;
- reduced Quick Action vertical density;
- stopped Simulation artwork intrinsic dimensions from expanding the banner;
- calibrated Simulation to 136px at the canonical desktop width.

---

## 5. Iterative regression evidence

### Iteration 1

Run:

`36143135719`

Found a real defect:

- Simulation at 1024px expanded to `331.8px`.

Cause:

- intrinsic artwork geometry was participating in the grid track sizing.

Resolution:

- Simulation artwork became absolutely contained by its visual region;
- the test threshold was not weakened.

### Iteration 2

Run:

`36143741076`

Found a real 360px containment defect:

- decorative Hero glow extended approximately 3px outside the viewport.

Resolution:

- the decorative element itself was moved inside the Hero boundary;
- no global `overflow-x: hidden` workaround was added.

### Iteration 3

Run:

`36143824271`

Result:

**PASS across all eight widths.**

This run produced canonical screenshots and measurement evidence.

### Final desktop calibration

After side-by-side reference inspection, desktop section offsets and density were tightened once more.

Final calibrated run:

`36144407709`

Result:

**PASS.**

Artifact:

- ID: `10867928255`
- name: `v3-home-responsive-visual-evidence`
- SHA-256: `66cd35df43b1a110f62085469423960213249007f503352bab6b26460f854582`

Artifact includes:

- `home-mobile-390x844.png`
- `home-desktop-1536x1024.png`
- `home-body-mobile-390.png`
- `home-body-desktop-1536.png`
- `home-responsive-report.json`

---

## 6. Reference comparison method

The comparison did not stop at screenshot generation.

The canonical screenshots were compared against:

- `references/04-mobile-content-only.png`
- `references/03-desktop-content-only.png`

Methods used:

1. normalize the reference to the canonical production viewport width;
2. inspect side-by-side composition;
3. create a 50/50 overlay;
4. create an absolute RGB difference image;
5. compare measured zone geometry;
6. adjust implementation and rerun browser validation.

Informational whole-image mean absolute RGB differences after normalization:

- mobile: `51.64`
- desktop: `42.19`

These pixel values are **not** used as a binary pass threshold because two documented differences are contractually required:

- the frozen Stage 4 AppShell is not the mock Header;
- the approved production artwork is not the photographic presentation artwork.

The decisive acceptance evidence is section hierarchy, geometry, density, route behavior, accessibility and the intentional-difference audit.

---

## 7. Intentional remaining visual differences

### AppShell mock chrome

The reference contains search/profile/notification presentation chrome.

Production keeps the frozen Stage 4:

- real Header;
- real desktop navigation;
- real MobileBottomNav.

No duplicate or fake shell was created.

### Hero artwork

The mock contains a photographic study scene.

The Stage 5.5 pack contains no approved production Hero photograph.

Production therefore uses the approved Stage 3 subject/action artwork composition, as required by the asset priority rule.

### Simulation artwork

The mock shows a photographic classroom/exam scene.

Production uses the exact approved Stage 3 Simulation WebP.

A new unapproved derivative was not invented merely to force screenshot similarity.

### Desktop width

The reference presentation uses a wider content canvas.

Production retains the frozen:

`--v3-container-max: 1280px`

This is an architectural/design-system constraint, not an unresolved CSS defect.

---

## 8. Accessibility result

**PASS**

Verified:

- RTL;
- Arabic language;
- one H1;
- semantic sections/headings;
- image alt policy;
- 44px actions;
- keyboard focus;
- reduced motion;
- loaded assets;
- no overflow;
- no hidden horizontal clipping workaround.

---

## 9. Responsive result

**PASS**

All required widths pass the dedicated Home browser workflow.

The canonical 390px and 1536px compositions now align closely with the reference hierarchy and vertical rhythm within the frozen AppShell / Design System constraints.

---

## Result

**Stage 5.5G — PASS.**

Stage 5.5H may now begin full regression and closure.
