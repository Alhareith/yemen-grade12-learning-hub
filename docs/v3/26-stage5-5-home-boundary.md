# V3 Stage 5.5A — Home Baseline & Boundary Lock

Status: **PASS — BOUNDARY LOCKED**

Repository: `Alhareith/yemen-grade12-learning-hub`

Branch: `feature/v3-home-experience`

Base branch: `main`

Verified base SHA: `098c94e33c51182f455a5e31536805d9f14e0016`

Stage 5 baseline: PR #42 is merged and `docs/v3/24-curriculum-contract.md` is present on `main`.

Reference pack: `Stage5_5_Home_Exact_Reference_Pack.zip`

Primary visual references:
- `references/04-mobile-content-only.png`
- `references/03-desktop-content-only.png`

The presentation browser/phone chrome is explicitly excluded from Home ownership.

---

## 1. Purpose

Stage 5.5 replaces the legacy Home experience beneath the frozen Stage 4 AppShell with a route-oriented, visually faithful Home experience.

The migration rule remains:

**Preserve → Isolate → Replace → Verify → Remove Legacy**

Stage 5.5A changes no frozen Architecture, Design System, AppShell, Curriculum or protected Legacy contract. It records what Home currently owns, what it is allowed to keep, and what must be removed or delegated during Stage 5.5.

---

## 2. Source precedence

For Stage 5.5:

1. `docs/v3/01-architecture.md`
2. `docs/v3/02-legacy-boundary.md`
3. `docs/v3/11-design-system-contract.md`
4. `docs/v3/14-app-shell-contract.md`
5. `docs/v3/24-curriculum-contract.md`
6. Runtime code
7. Stage 5.5 reference pack for Home-local visual/composition decisions

When a mock visual conflicts with a frozen architecture/shell contract, the frozen contract wins. When the decision is Home-local visual composition, the Stage 5.5 pack wins.

---

## 3. Current Home audit

Current runtime entry:

`client/src/features/home/Home.tsx`

The pre-Stage-5.5 Home currently owns or contains all of the following:

- a Home-local `view` state;
- a default selected Subject (`رياضيات`);
- Subject switching UI;
- Home-local `subjects` subview;
- Home-local `exams` subview;
- Resources filtering and Resources mode state;
- Resources catalogue rendering;
- Prompt Generator rendering through Home;
- Subject-derived Prompt/Resources context;
- an internal developer/profile/social footer;
- Home content styling based on the previous violet/slate composition.

These responsibilities exceed the target Home boundary.

---

## 4. Frozen AppShell boundary

Home must **not** own or recreate:

- global Header;
- desktop primary navigation;
- `MobileBottomNav`;
- route parsing;
- route active-state semantics;
- route focus/scroll lifecycle;
- safe-area/mobile-nav spacer geometry;
- shell loading/error states.

The following remain owned by Stage 4 application code:

- `client/src/App.tsx`
- `client/src/app/AppShell.tsx`
- `client/src/app/AppHeader.tsx`
- `client/src/app/AppMobileNavigation.tsx`
- `client/src/app/navigation.ts`
- `client/src/app/routing.ts`
- `client/src/app/route-lifecycle.ts`

No fake search field, profile avatar, notification bell, browser chrome or phone chrome from the visual mock may be added by Home.

---

## 5. Home ownership after Stage 5.5

The canonical Home feature may own only:

- Home page semantic sections;
- Home-local presentational components;
- Home-local responsive composition;
- approved Home copy;
- approved Home artwork placement;
- route-action callbacks supplied by the application layer;
- truthful entry to the current Simulation route;
- a small product-oriented Home footer/guidance surface if required by the visual contract.

Home must remain domain-light and must not become a state owner for another feature.

---

## 6. Responsibilities removed from Home

### Curriculum

Remove from Home:

- selected Subject state;
- Subject picker;
- Subject/unit/lesson ownership;
- any duplicated Curriculum catalogue.

Canonical destination remains:

`#curriculum`

Curriculum selection and hierarchy remain wholly owned by Stage 5 Curriculum.

### Practice / Training

Home must not own Practice session state or invent a generic Practice landing page.

The Stage 4 Training fallback remains:

**Training without Practice context → Curriculum selection flow.**

Therefore Home training actions resolve to Curriculum until a concrete Practice context exists elsewhere.

### Prompt Generator

Home may expose a Prompt Generator entry only.

It must not own:

- Prompt construction logic;
- Prompt catalogue logic;
- subject/unit selection for Prompt Generator;
- Prompt feature rendering as Home-local state.

Canonical route remains:

`#prompts`

### Resources

Home may expose a Resources entry and compact guidance copy only.

It must not own:

- resource catalogue filtering;
- resource mode;
- subject-specific resource selection;
- resource list rendering logic.

Canonical route remains:

`#resources`

Final Resources redesign is outside Stage 5.5.

### Simulation

Home may expose a visually prominent Simulation entry.

Current truthful runtime remains the protected internal Mathematics simulation:

`#exam-pilot`

Stage 5.5 must not claim the future external simulation is already integrated and must not turn Simulation into a sixth primary navigation item.

---

## 7. Legacy Home elements disposition

| Current element | Stage 5.5 decision |
|---|---|
| Home-local `view` state | Replace for canonical Home; product routes are application routes |
| default selected Subject | Remove |
| Subject selector/subview | Remove from Home |
| Prompt feature rendered inside Home | Delegate to Prompt route |
| Resources filter/mode inside Home | Delegate/preserve outside canonical Home |
| Exams local subview | Remove from canonical Home; Simulation CTA routes directly |
| old violet/slate Hero | Replace |
| old “كيف تستخدم الموقع؟” block | Replace with reference hierarchy |
| developer profile/social block | Remove from Home experience |
| global Header/Nav | Preserve unchanged |
| AppShell mobile spacer/nav | Preserve unchanged |
| Stage 5 Curriculum | Preserve unchanged |
| protected ExamPilot | Preserve unchanged |

---

## 8. Design System boundary

Stage 5.5 consumes the frozen Stage 3 system:

- `v3AssetPaths`;
- `functionalIcons`;
- approved IBM Plex Sans Arabic weights 400/500/600/700;
- V3 tokens;
- approved primitives/composites where their semantics fit.

Home-local components may be created under:

`client/src/features/home/`

They must be scoped beneath `[data-v3-ui]` and may not introduce a parallel token/icon system.

Approved production artwork must be reused before any new asset is considered.

---

## 9. Protected Legacy boundary

Stage 5.5 does not rewrite/delete:

- `client/src/pages/ExamPilot.tsx`;
- `client/src/components/ExamRunner.tsx`;
- `client/src/components/ExamResultReport.tsx`;
- `client/src/components/LearningDashboard.tsx`;
- `client/src/components/ArabicExamTypography.tsx`;
- `client/src/exams/session-storage.ts`;
- `shared/exams/**`;
- `client/src/lib/arabic-math.ts`;
- `client/src/components/ArabicRichContent.tsx`;
- `client/src/arabic-math.css`;
- verified question/practice evidence;
- Stage 5 Curriculum data and stable IDs.

---

## 10. Stage 5.5A replacement boundary

The Home replacement is accepted only if it can be implemented without:

- changing frozen AppShell geometry;
- changing the primary five navigation semantics;
- introducing a new router;
- duplicating Curriculum UI;
- moving Prompt/Resources domain state into Home;
- deleting protected Legacy;
- expanding into Stage 6 JSON/question infrastructure.

The Stage 5.5 reference pack is the visual truth for the Home body only.

---

## 11. Stage 5.5A exit criteria

- [x] Stage 5 merge confirmed live on `main`.
- [x] Stage 3, Stage 4 and Stage 5 frozen contracts read.
- [x] dedicated `feature/v3-home-experience` branch exists.
- [x] current Home ownership audited.
- [x] selected Subject ownership marked for removal.
- [x] Home-local Subject/Exam subviews marked for removal.
- [x] Prompt/Resources domain ownership marked for delegation.
- [x] Training fallback preserved.
- [x] current Simulation truth preserved.
- [x] AppShell ownership explicitly protected.
- [x] protected Legacy explicitly protected.
- [x] reference-pack role explicitly frozen.

## Result

**Stage 5.5A — PASS.**

The implementation may proceed to Stage 5.5B only under this boundary.
