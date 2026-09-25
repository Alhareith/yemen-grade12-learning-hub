# V3 Stage 5.5C — Mobile Home Exact Implementation

Status: **PASS — MOBILE IMPLEMENTATION CLOSED**

Depends on:
- `docs/v3/26-stage5-5-home-boundary.md`
- `docs/v3/27-stage5-5-home-visual-ux-contract.md`

Canonical target:
- `390×844`
- `Stage5_5_Home_Exact_Reference_Pack/references/04-mobile-content-only.png`

## 1. Runtime delivered

The canonical Home route now renders the new V3 Home composition through:

- `client/src/features/home/HomeExperience.tsx`
- `client/src/features/home/home-experience.css`

The previous floating violet Curriculum CTA from `client/src/App.tsx` was removed because it was Home-local legacy chrome that contradicted the Stage 5.5 visual hierarchy.

## 2. Mobile hierarchy

The implemented mobile order is:

1. Hero
2. Curriculum entry
3. 2×2 Quick Actions
4. Simulation
5. compact Resources / guidance

The fixed Stage 4 `MobileBottomNav` remains owned by AppShell and is not duplicated.

## 3. Hero

Implemented:

- H1 `ابدأ من حيث تحتاج`
- truthful supporting copy
- primary Curriculum CTA
- Training CTA following Stage 4 fallback to Curriculum
- light V3 blue/white composition
- compact artwork/copy split rather than a desktop crop
- CSS-composed study/books visual using approved visual language and approved production artwork
- one logical H1

The previous dark/violet legacy Home Hero is no longer the canonical Home surface.

## 4. Curriculum entry

Implemented as one prominent full-width card:

- `المنهج الدراسي`
- truthful description
- `ادخل إلى المنهج`
- `#curriculum`
- no Subject selector
- no Unit/Lesson duplication

## 5. Quick Actions

Implemented as a mobile 2×2 grid:

1. المنهج
2. التدريب
3. مولد الأوامر
4. المصادر

Routes remain truthful:

- Curriculum → `#curriculum`
- Training → `#curriculum` fallback
- Prompt Generator → `#prompts`
- Resources → `#resources`

Approved Stage 3 action assets are reused where available; Resources uses the frozen functional icon system.

## 6. Simulation

Implemented as a strong full-width Navy/blue surface:

- title `محاكاة الرياضيات`
- current-runtime truthful copy
- approved Simulation WebP
- functional Target/status icons
- CTA → `#exam-pilot`
- no external-simulation claim
- no sixth primary-navigation item

## 7. Resources

Implemented as a compact secondary rail:

- `مصادر وإرشادات مهمة`
- concise guidance copy
- CTA → `#resources`
- no Resources filtering/catalogue logic inside the new Home presentation

## 8. Mobile geometry

Base mobile CSS uses:

- 14px Home content padding
- 16px section rhythm through frozen V3 token
- 10px quick-grid gap
- 18px card radius
- 24px large-surface radius
- ≥44px CTA targets
- no global overflow hiding
- no fixed text-clipping height
- mobile/compact rules only below 900px in this substage

## 9. Accessibility/performance

Implemented:

- `data-v3-ui` scoped styling
- Arabic RTL semantics
- semantic section headings
- visible `:focus-visible`
- reduced-motion handling
- no new runtime dependency
- CSS Grid/Flex only
- approved WebP reuse
- intrinsic image dimensions
- below-fold artwork lazy loading
- no screenshot-as-background

## 10. Deliberately deferred

Stage 5.5C does not close:

- desktop 1536×1024 composition — Stage 5.5D
- route/domain extraction of old Prompt/Resources host — Stage 5.5E
- final asset-fidelity tuning — Stage 5.5F
- canonical screenshot/diff loop — Stage 5.5G
- full closure — Stage 5.5H

## 11. Validation gate

The Draft PR is:

`#43 — V3-05.5: Build exact Home experience`

The branch is not merged and remains Draft.

At the Stage 5.5C closure snapshot:
- Validate student experience / push — **success**.
- Vercel commit status — **success**.
- Browser Smoke was started and remains part of the shared regression suite; its final result is consumed again in Stage 5.5G/H.
- No Stage 5.5C-specific code/build blocker remains.

## Result

**Stage 5.5C — PASS.**

Desktop implementation may now proceed to Stage 5.5D.

