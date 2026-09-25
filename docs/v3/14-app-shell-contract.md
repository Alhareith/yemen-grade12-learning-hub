# V3 App Shell Contract

Status: **FROZEN AT STAGE 4K**

This document is the canonical contract for the Learning Hub V3 application shell after Stage 4.

If an earlier Stage 4 snapshot conflicts with this file, **this file wins**. `13-stage4-app-shell-boundary.md` remains the historical 4A baseline and rationale.

The migration rule remains:

**Preserve → Isolate → Replace → Verify → Remove Legacy**

---

## 1. Contract scope

Stage 4 freezes the application-level frame shared by product routes:

- typed hash route parsing and generation;
- product-shell versus bypass-route classification;
- application brand/header ownership;
- desktop primary navigation;
- production `MobileBottomNav` integration;
- active-route semantics;
- shell chrome scoping;
- loading/error presentation;
- route focus and scroll lifecycle;
- safe-area-aware mobile bottom navigation geometry;
- responsive shell behavior;
- protected Legacy/fixture bypass behavior;
- production-shell regression and final CI gates.

Stage 4 does **not** freeze feature-specific visual redesigns.

Home, Curriculum, Practice, Resources and Prompt Generator may be redesigned in their owning later stages while preserving this shell contract unless a deliberate contract revision is approved.

---

## 2. Sources of truth

Use this precedence when documents describe different migration moments:

1. `docs/v3/01-architecture.md`
2. `docs/v3/02-legacy-boundary.md`
3. `docs/v3/11-design-system-contract.md`
4. **this Stage 4 App Shell contract**
5. runtime code for exact implementation details
6. earlier stage snapshots as historical evidence

Stage 4 consumes the frozen Stage 3 design system; it does not create a parallel visual system.

---

## 3. Runtime ownership map

| Responsibility | Canonical runtime source |
|---|---|
| top-level composition | `client/src/App.tsx` |
| typed hash routes | `client/src/app/routing.ts` |
| shared primary navigation model | `client/src/app/navigation.ts` |
| shell frame | `client/src/app/AppShell.tsx` |
| shell geometry / mobile slot | `client/src/app/app-shell.css` |
| brand + desktop header | `client/src/app/AppHeader.tsx` |
| header styling | `client/src/app/app-header.css` |
| mobile navigation adapter | `client/src/app/AppMobileNavigation.tsx` |
| route loading/error UI | `client/src/app/AppRouteState.tsx` |
| route state styling | `client/src/app/app-route-state.css` |
| navigation lifecycle | `client/src/app/route-lifecycle.ts` |
| error boundary | `client/src/app/ErrorBoundary.tsx` |
| protected-route assertions | `client/src/app/protected-boundaries.test.ts` |
| hash parsing tests | `client/src/app/routing.test.ts` |

The application layer may coordinate feature entry points but must not absorb feature/domain state.

---

## 4. Canonical route matrix

| Hash | App route | Product AppShell | Contract |
|---|---|---:|---|
| empty/default | `home` | Yes | canonical Home |
| `#curriculum` | `curriculum` | Yes | existing Curriculum feature contained by shell |
| `#prompts` | `prompts` | Yes | existing Prompt Generator exposed as real route |
| `#resources` | `resources` | Yes | existing Resources surface exposed as real route |
| `#practice/<skillId>` | `practice` | Yes | encoded skill context preserved |
| `#exam-pilot` | `exam-pilot` | **No** | protected Legacy bypass |
| `#design-system-preview` | fixture | **No** | hidden engineering bypass |
| `#design-system-primitives` | fixture | **No** | hidden engineering bypass |
| unknown/unsupported | fallback | Yes | safe Home fallback |

Hash routing remains the deployment-compatible routing mechanism.

Stage 4 introduces **no React Router dependency**.

---

## 5. Primary navigation contract

One shared source defines primary navigation:

`client/src/app/navigation.ts`

Exactly five product destinations are frozen:

1. الرئيسية
2. المنهج
3. التدريب
4. مولد الأوامر
5. المزيد

The desktop header and mobile bottom navigation consume the same item model so labels/icons/meaning cannot silently diverge.

### Route semantics

- الرئيسية → Home
- المنهج → Curriculum
- التدريب → current Practice route when Practice context exists
- التدريب without Practice context → Curriculum selection flow
- مولد الأوامر → `#prompts`
- المزيد → `#resources` during this migration stage

The Training item must not invent a general Practice landing page.

Full Exam Simulation is **not** a sixth primary-navigation item.

---

## 6. Header and brand contract

The application shell owns one global product header.

Required behavior:

- approved Stage 3 brand asset via `v3AssetPaths.brand`;
- IBM Plex Sans Arabic through the V3 shell visual scope;
- semantic Lucide functional icons only;
- route-driven active state;
- accessible primary navigation landmark;
- minimum 44px interactive targets;
- visible focus;
- desktop navigation visible at `900px+`;
- no duplicate Home-owned global header.

Home feature content must not recreate an application-level header/navigation model.

---

## 7. MobileBottomNav contract

Production must reuse the frozen Stage 3 `MobileBottomNav` composite.

Required behavior:

- exactly five destinations;
- visible labels;
- 20px functional icons as defined by the component contract;
- one route-driven `aria-current="page"`;
- fixed at viewport bottom below 900px;
- hidden at `900px+`;
- height locked to `--v3-bottom-nav-height`;
- safe-area inset included;
- document-flow spacer reserves the fixed navigation footprint so content is not covered.

Both mobile slot and spacer are hidden at desktop composition width.

---

## 8. V3 scope and feature isolation

The AppShell owns the product frame, but Stage 4 deliberately keeps legacy/current feature content outside broad V3 descendant styling until each feature is migrated.

V3 visual rules remain scoped under `[data-v3-ui]` for shell-owned chrome and route states.

This prevents V3 typography/styles from leaking into:

- protected ExamPilot;
- Arabic Math;
- current unmigrated feature content.

Do not reinterpret Stage 4 as authorization to wrap protected Legacy or every existing feature inside global V3 typography.

Do not:

- promote V3 tokens to `:root`;
- rewrite `v2.css` or `polish.css` globally as a migration shortcut;
- add a second icon system;
- globally mirror icons;
- use global `overflow-x: hidden` to conceal layout defects.

---

## 9. Loading and error lifecycle

Route-level lazy states use the V3 `AppRouteLoading` presentation.

Requirements:

- accessible busy/live semantics;
- no legacy violet loading identity;
- reduced-motion mode disables spinner animation.

Feature-level failures inside the product shell:

- render a safe V3 error state in the content outlet;
- keep shell header/navigation available;
- expose retry/home recovery actions;
- do not expose raw stack traces to end users;
- reset the feature boundary when the route changes.

Fatal/bypass failures may use the standalone error presentation.

---

## 10. Navigation lifecycle

Product-route transitions centralize lifecycle behavior in `route-lifecycle.ts`.

Required behavior:

- focus `#app-content` after product route changes;
- reset scroll to the top;
- use smooth scrolling only when reduced motion is not requested;
- use `auto` under `prefers-reduced-motion: reduce`;
- selecting the already-active primary route may reset its viewport;
- Skip Link focuses `#app-content` without mutating the Hash Router.

The Skip Link must never turn `#app-content` into an application route.

---

## 11. Feature containment contract

Stage 4 removed duplicated global shell ownership from Home.

Canonical shell routes now expose:

- Home;
- Prompt Generator;
- Resources;
- Curriculum;
- Practice.

Home-local subviews that are not product routes may remain feature-local.

Shell integration must not move these responsibilities into App:

- curriculum selection;
- question selection;
- practice session state;
- scoring;
- diagnostics;
- prompt generation logic;
- resource catalog rules;
- exam session storage;
- Arabic Math rendering.

---

## 12. Protected Legacy and fixture boundary

The following remain protected:

- `client/src/pages/ExamPilot.tsx`
- `client/src/components/ExamRunner.tsx`
- `client/src/components/ExamResultReport.tsx`
- `client/src/components/LearningDashboard.tsx`
- `client/src/components/ArabicExamTypography.tsx`
- `client/src/exams/session-storage.ts`
- `shared/exams/`
- `shared/exams/question-model.ts`
- `client/src/lib/arabic-math.ts`
- `client/src/components/ArabicRichContent.tsx`
- `client/src/arabic-math.css`

Engineering fixtures also remain isolated:

- `#design-system-preview`
- `#design-system-primitives`

Runtime verification must preserve:

- ExamPilot outside AppShell/Header/MobileBottomNav;
- Arabic Math MathML/enhancement behavior;
- exam session recovery;
- Practice session/repeated-round behavior;
- Design System fixture independence.

Stage 4 does not authorize protected Legacy removal.

---

## 13. Responsive contract

Required production-shell widths:

`360 / 390 / 430 / 768 / 1024 / 1280 / 1440 / 1536`

Canonical evidence:

- Mobile: `390×844`
- Desktop: `1536×1024`

Shell composition:

- below 900px → mobile primary navigation;
- 900px+ → desktop primary navigation;
- mobile header baseline 58px;
- desktop header baseline 72px;
- interactive shell controls ≥44px;
- no horizontal overflow;
- one visible active destination;
- one visible primary navigation landmark.

The Stage 3 responsive/token breakpoints remain authoritative for broader design-system behavior.

---

## 14. Validation and CI contract

Stage 4 closure requires all of these regression families to remain green:

- `pnpm verify`
- Validate student experience
- Browser smoke test
- V3 design system visual validation
- V3 accessibility performance regression
- V3 production shell regression
- GitHub Pages/static build mode
- Vercel commit status

Stage 4-specific workflows:

- `.github/workflows/v3-shell-regression.yml`
- `.github/workflows/v3-stage4-gate.yml`

Final gate script:

- `scripts/verify-stage4-gate.mjs`

The Stage 4 final gate checks:

- protected Legacy unchanged from Stage 3 base;
- frozen Design System source unchanged from Stage 3 base;
- no new router dependency;
- required shell/gate files exist;
- full `pnpm verify`;
- GitHub Pages static build mode.

The final gate is intentionally scoped to the Stage 4 branch/PR and must not become an accidental permanent blocker for later migration stages.

---

## 15. Preserved deployment rules

Stage 4 preserves:

- Vite static output;
- GitHub Pages compatibility;
- hash routing;
- direct product hash loading;
- Vercel build compatibility.

Do not replace hash routing with history routing unless a later architecture decision also updates static deployment behavior and regression evidence.

---

## 16. Deferred work

Stage 4 does not implement:

- Home content redesign;
- Curriculum V3 redesign;
- lesson-centered Practice Engine redesign;
- Analytics;
- final Resources/Telegram UX;
- external Simulation integration;
- JSON Curriculum Infrastructure;
- question-bank import/migration;
- Backend/Auth/Database/CMS;
- protected Legacy removal.

These remain owned by later stages.

---

## 17. Change-control rule

After Stage 4K, do not silently change:

- route matrix;
- five primary-navigation semantics;
- Training fallback behavior;
- AppShell/bypass classification;
- desktop/mobile navigation cutoff;
- safe-area/spacer behavior;
- route focus/scroll policy;
- protected Legacy bypass;
- fixture bypass;
- hash-routing deployment contract.

A later change requires:

1. an owning-stage requirement;
2. runtime change;
3. matching regression update;
4. contract update when the change is intended to become permanent.

---

## 18. Stage 4 freeze rule

At Stage 4K:

- the App Shell contract is frozen;
- later stages consume the shell rather than recreate it;
- feature migrations may replace feature-local UI beneath the shell;
- protected Legacy remains isolated until verified replacement exists;
- Stage 4 validation remains closure evidence;
- merge to `main` remains an explicit human approval gate.
