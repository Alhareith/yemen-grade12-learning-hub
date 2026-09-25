# V3 Home Experience Contract

Status: **FROZEN AT STAGE 5.5**

This is the canonical post-Stage-5.5 contract for the Learning Hub V3 Home experience.

If a Stage 5.5 implementation snapshot conflicts with this document, this contract wins. The frozen Architecture, Legacy, Design System, AppShell and Curriculum contracts still take precedence over Home-local decisions.

Migration rule:

**Preserve → Isolate → Replace → Verify → Remove Legacy**

---

## 1. Scope

Stage 5.5 owns the product Home body beneath the frozen Stage 4 AppShell.

It owns:

- Home information hierarchy;
- Home-local responsive composition;
- Hero content and artwork composition;
- Curriculum entry;
- Home quick actions;
- Simulation entry;
- compact Resources/guidance entry;
- Home route-action mapping;
- Home-specific responsive/accessibility/visual regression.

It does not own:

- global Header;
- desktop primary navigation;
- MobileBottomNav;
- route lifecycle;
- Curriculum hierarchy state;
- Practice session state;
- Prompt generation logic;
- Resources catalogue/filter domain logic;
- ExamPilot runtime;
- JSON/question infrastructure;
- external Simulation integration.

---

## 2. Canonical runtime ownership

| Responsibility | Source |
|---|---|
| canonical Home presentation | `client/src/features/home/HomeExperience.tsx` |
| Home styling | `client/src/features/home/home-experience.css` |
| Home route semantics | `client/src/features/home/home-actions.ts` |
| Home route tests | `client/src/features/home/home-actions.test.ts` |
| AppShell integration | `client/src/App.tsx` |
| V3 assets | `client/src/design-system/assets/asset-paths.ts` |
| functional icons | `client/src/design-system/icons/icon-system.ts` |
| browser validation | `.github/workflows/v3-home-quality.yml` |
| machine-readable visual evidence | `reports/v3-home-visual-regression.json` |

The older `Home.tsx` still hosts preserved Prompt/Resources compatibility behavior while those features await their owning migration stages. It is not the canonical Home-body presentation.

---

## 3. Canonical hierarchy

Home body order is frozen as:

1. Hero
2. Curriculum entry
3. Quick Actions
4. Simulation
5. Resources / guidance

The AppShell Header and navigation are outside this hierarchy.

Home must not recreate mock browser/phone chrome.

---

## 4. Hero contract

Canonical copy:

- H1: `ابدأ من حيث تحتاج`
- supporting copy: `تابع المنهج خطوة بخطوة، افهم الموضوعات الصعبة، تدرّب على المتاح، وقِس تقدمك بثقة.`
- primary CTA: `ابدأ بالمنهج`
- secondary CTA: `تدرّب الآن`

Semantics:

- primary → Curriculum;
- Training without active Practice context → Curriculum fallback.

Hero uses approved V3 production artwork only.

No separate approved Hero photograph exists in the frozen asset package, so production composes the Hero from approved Subject and action artwork rather than inventing a new photographic derivative.

---

## 5. Curriculum entry

Canonical content:

- title: `المنهج الدراسي`
- description: `مواد الصف الثالث الثانوي في مسار واضح ومنظم.`
- CTA: `ادخل إلى المنهج`

Destination:

`#curriculum`

Home does not duplicate Subject/Unit/Lesson UI.

---

## 6. Quick Actions

Exactly four Home actions:

1. المنهج
2. التدريب
3. مولد الأوامر
4. المصادر

Canonical destinations:

| Action | Destination |
|---|---|
| المنهج | `#curriculum` |
| التدريب | `#curriculum` fallback |
| مولد الأوامر | `#prompts` |
| المصادر | `#resources` |

No generic `#practice` landing page is invented.

### Responsive composition

- 360px → 2×2 for readable content and 44px targets;
- 390 / 430px → four compact cards in one row, matching the canonical visual reference;
- 768px → compact 2×2;
- 900px+ → four cards in one desktop row.

The 390/430 calibration intentionally resolves a conflict between the pack's written grid note and its canonical reference image in favor of the visual source of truth.

---

## 7. Simulation

Canonical production entry:

- title: `محاكاة الرياضيات`;
- CTA: `ابدأ المحاكاة`;
- destination: `#exam-pilot`.

Stage 5.5 does not claim that the future external simulation site is integrated.

Simulation is not a sixth primary-navigation item.

Artwork:

`v3AssetPaths.simulation`

No substitute photographic asset is invented.

---

## 8. Resources / guidance

Canonical title:

`مصادر وإرشادات مهمة`

Canonical CTA:

`عرض جميع المصادر`

Destination:

`#resources`

Home may display compact route-neutral guidance tiles.

It does not own subject filtering or the final Resources relation model.

---

## 9. Asset contract

Approved runtime access remains:

`v3AssetPaths`

Home reuses:

- Curriculum action artwork;
- Practice action artwork;
- Prompt action artwork;
- Simulation artwork;
- approved Subject-family artwork.

Resources uses the frozen functional icon system because no dedicated approved Resource WebP exists.

Forbidden:

- shipping a reference screenshot as UI;
- inventing a parallel icon library;
- adding a remote runtime Hero image;
- replacing approved assets merely to reduce pixel-diff.

---

## 10. AppShell boundary

Home must preserve the frozen Stage 4 shell.

It must not recreate:

- Header;
- desktop navigation;
- bottom navigation;
- mock search/profile/notification controls;
- shell loading/error UI.

Canonical AppShell break:

- below 900px → MobileBottomNav;
- 900px+ → desktop navigation.

---

## 11. Responsive contract

Required widths:

`360 / 390 / 430 / 768 / 1024 / 1280 / 1440 / 1536`

Canonical:

- 390×844;
- 1536×1024.

Frozen V3 max content container remains:

`1280px`

The Home may calibrate local section geometry but may not silently change the shared Design System container token.

Final canonical desktop geometry at 1536:

- Hero: 1280×294;
- Curriculum: ~435×215;
- Quick Actions region: ~829×157;
- Simulation: 1280×136;
- Resources: 1280×88.

Final canonical mobile geometry at 390:

- Hero: 362×234;
- Curriculum: 362×128;
- Quick Actions: 362×132;
- Simulation: 362×148;
- Resources: 362×60.

Browser rasterization variance is allowed.

---

## 12. Accessibility

Home must preserve:

- Arabic `lang="ar"`;
- RTL;
- one logical H1;
- semantic headings/sections;
- image alt policy;
- visible focus;
- all visible actions ≥44px;
- reduced motion;
- no color-only action meaning;
- no horizontal document overflow.

Global `overflow-x: hidden` is forbidden as a defect-hiding strategy.

---

## 13. Performance

Home adds no runtime dependency.

Preferred implementation:

- CSS Grid/Flex;
- approved WebP assets;
- intrinsic image geometry;
- lazy loading below fold where appropriate;
- shallow DOM;
- no carousel/video background/animation library.

Existing Stage 3 asset/font budgets remain authoritative.

---

## 14. Visual fidelity rule

The Stage 5.5 reference pack is the visual source of truth for Home-local composition.

Visual matching priority:

1. hierarchy;
2. section geometry;
3. whitespace/density;
4. typography roles;
5. artwork placement;
6. radii/borders/shadows;
7. icon/CTA alignment.

Two differences are explicitly intentional:

1. frozen real AppShell replaces mock Header/phone chrome;
2. approved production artwork replaces photographic mock artwork where the pack does not provide an approved production derivative.

These are not grounds for copying mock chrome or inventing new assets.

---

## 15. Validation contract

Dedicated workflow:

`.github/workflows/v3-home-quality.yml`

It verifies:

- all eight widths;
- canonical screenshots;
- overflow;
- touch targets;
- asset loading/alt;
- route semantics;
- focus;
- reduced motion;
- AppShell breakpoint behavior.

Evidence artifact:

`v3-home-responsive-visual-evidence`

Visual-regression reporting also records deliberate deviations instead of hiding them behind a meaningless strict whole-image pixel threshold.

---

## 16. Protected boundaries

Stage 5.5 must not modify protected Legacy or preserved Stage 5 data:

- ExamPilot / ExamRunner / result/analytics legacy UI;
- Arabic Math;
- exam session storage;
- `shared/exams/**`;
- Curriculum data/structure;
- Practice bank;
- Prompt catalogue.

Removal remains deferred to its owning later stage.

---

## 17. Change control

After Stage 5.5 closure, do not silently change:

- Home hierarchy;
- canonical action semantics;
- Training fallback;
- Simulation truthfulness;
- quick-action composition rules;
- Home asset policy;
- AppShell boundary;
- canonical responsive targets;
- accessibility rules;
- visual-regression workflow.

A later intentional change requires owning-stage rationale, runtime change and matching regression evidence.

---

## Stage result

This contract is frozen only when `docs/v3/34-stage5-5-closure.md` records Stage 5.5 PASS.
