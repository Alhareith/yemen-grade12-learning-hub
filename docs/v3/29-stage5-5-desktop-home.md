# V3 Stage 5.5D — Desktop Home Exact Implementation

Status: **PASS — DESKTOP IMPLEMENTATION CLOSED**

Depends on:
- `docs/v3/26-stage5-5-home-boundary.md`
- `docs/v3/27-stage5-5-home-visual-ux-contract.md`
- `docs/v3/28-stage5-5-mobile-home.md`

Canonical target:
- `1536×1024`
- `Stage5_5_Home_Exact_Reference_Pack/references/03-desktop-content-only.png`

## 1. Desktop composition delivered

The Home implementation now switches at the frozen AppShell desktop boundary (`900px+`) into a desktop-specific composition rather than stretching the mobile layout.

Wide-reference calibration is refined again at `1200px+`.

## 2. Hero

At desktop:

- target height is approximately 294px;
- artwork region occupies approximately 52%;
- copy/action region occupies approximately 48%;
- approved V3 typography roles are preserved;
- primary and secondary CTAs form a deliberate pair;
- supporting benefit cues are visible only in desktop composition;
- no AppShell Header/Nav is recreated.

The artwork remains semantic CSS + approved production artwork rather than a screenshot crop.

## 3. Middle composition

Desktop uses:

- Curriculum entry ≈34%;
- Quick Actions ≈66%;
- 16px middle-grid gap.

The Curriculum card remains visually larger than one Quick Action and keeps its own art/copy/CTA hierarchy.

Quick Actions become four equal desktop cards in one row:

1. المنهج
2. التدريب
3. مولد الأوامر
4. المصادر

This is a distinct desktop composition, not a 2×2 mobile grid scaled wider.

## 4. Simulation

Desktop Simulation is a full-width Navy/blue banner around the 125–145px target range.

It uses three visual regions:

- approved Simulation artwork on the left;
- title, truthful description and CTA in the center;
- current truthful capability cues on the right.

The CTA remains `#exam-pilot`.

No external-simulation capability is claimed.

## 5. Resources / guidance rail

At desktop the final Home rail becomes:

- product guidance lead on the right;
- four quiet compact guidance tiles in the center;
- all-resources CTA on the left.

It remains visually subordinate to Curriculum and Simulation and contains no Resources domain/filter state.

## 6. Frozen AppShell preserved

Stage 5.5D does not change:

- global Header;
- desktop navigation semantics;
- mobile bottom navigation;
- hash routing;
- route lifecycle;
- shell error/loading boundaries.

The Stage 4 desktop navigation remains the only application-level navigation.

## 7. Design System fidelity

Desktop uses the same frozen:

- V3 colors/tokens;
- IBM Plex Sans Arabic approved weights;
- `v3AssetPaths`;
- `functionalIcons`;
- radius/shadow/touch-target contract.

No second visual system or icon library was introduced.

## 8. Performance/accessibility

Desktop implementation uses only CSS Grid/Flex and the approved assets already loaded by the project.

It preserves:

- semantic headings;
- one logical Home H1;
- visible focus;
- reduced motion;
- no global horizontal-overflow hiding;
- no JS viewport math;
- no screenshot background;
- intrinsic image geometry.

## 9. Canonical implementation files

- `client/src/features/home/HomeExperience.tsx`
- `client/src/features/home/home-experience.css`
- `client/src/features/home/Home.tsx`
- `client/src/App.tsx`

The previous Home implementation remains temporarily in the source module only for preserved non-Home route compatibility until Stage 5.5E performs route/action ownership cleanup.

## 10. Validation gate

Draft PR:

`#43 — V3-05.5: Build exact Home experience`

Stage 5.5D is not merged.

At the Stage 5.5D closure snapshot:
- Validate student experience / push — **success**.
- Vercel commit status — **success**.
- Browser Smoke and the broader PR regression family continue as shared branch checks and are consumed again in Stage 5.5G/H.
- No Stage 5.5D-specific code/build blocker remains.

Final pixel-diff/canonical screenshot iteration is deliberately owned by Stage 5.5G; Stage 5.5D closes the desktop runtime composition itself.

## Result

**Stage 5.5D — PASS.**

Stages 5.5A through 5.5D are now complete. The next owning substage is 5.5E, but it is not started by this document.

