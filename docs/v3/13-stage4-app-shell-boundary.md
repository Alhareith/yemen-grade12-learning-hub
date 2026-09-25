# V3 Stage 4A — App Shell Baseline & Boundary Lock

> Historical Stage 4A baseline. The final Stage 4 contract is `14-app-shell-contract.md`; closure evidence is in `15-stage4-closure.md`.

Status: **PASS — 4A BOUNDARY LOCKED**

Stage 4 builds the application shell around the existing product without redesigning feature content or removing protected Legacy.

Migration rule:

**Preserve → Isolate → Replace → Verify → Remove Legacy**

---

## 1. Baseline

Repository:

`Alhareith/yemen-grade12-learning-hub`

Stage 4 implementation branch:

`feature/v3-app-shell`

Stage 4 base commit:

`0b5f2416a442225b02d699e5a1be85d16a29bb42`

That commit is the merge commit for PR #40:

`V3-03: Establish design system and visual asset system`

Stage 4 must consume the Stage 3 design system already present on `main`; it must not create a parallel visual system.

---

## 2. Source precedence

When implementation details conflict, use this order:

1. `docs/v3/01-architecture.md`
2. `docs/v3/02-legacy-boundary.md`
3. `docs/v3/11-design-system-contract.md`
4. runtime code
5. earlier stage documents as historical evidence only

The frozen Stage 3 contract wins over earlier Stage 3 snapshots.

---

## 3. Stage 4 purpose

Stage 4 owns the application-level frame shared by migrated product routes:

- V3 page scope boundary;
- application route model;
- hash-route parsing and navigation;
- brand lockup;
- header;
- desktop primary navigation;
- production integration of `MobileBottomNav`;
- shared main-content container;
- shell-level responsive behavior;
- route loading/error presentation where required;
- active navigation state;
- shell-level accessibility and regression validation.

Stage 4 does **not** own feature redesign.

---

## 4. Current runtime baseline

Before Stage 4 implementation:

- `client/src/App.tsx` owns hash parsing, hash-change observation, lazy route loading, route fallbacks and feature selection.
- `client/src/features/home/Home.tsx` also owns a second navigation model through local `view` state, including its own header, desktop tabs and mobile tabs.
- `client/src/app/` currently contains only `ErrorBoundary.tsx`.
- production surfaces still consume legacy/current UI styling through `v2.css` and `polish.css`.
- Stage 3 V3 styles remain isolated beneath `[data-v3-ui]`.
- `#design-system-preview` and `#design-system-primitives` are hidden engineering fixtures.
- `#exam-pilot` remains the protected internal exam route.
- practice currently requires a skill context through `#practice/<skillId>`.

The Stage 4 migration must remove duplicated global shell ownership without moving feature/domain behavior into the application layer.

---

## 5. Canonical route matrix

| Hash / URL state | Application route | V3 product shell | Stage 4 treatment |
|---|---|---:|---|
| empty hash / default | `home` | Yes | canonical Home route |
| `#curriculum` | `curriculum` | Yes | contain existing Curriculum UI; redesign deferred |
| `#prompts` | `prompts` | Yes | expose existing Prompt Generator as a shell route |
| `#resources` | `resources` | Yes | expose existing Resources surface as a shell route |
| `#practice/<skillId>` | `practice` | Yes | preserve encoded skill context and current practice behavior |
| `#exam-pilot` | `exam-pilot` | **No** | protected Legacy bypass |
| `#design-system-preview` | validation fixture | **No** | hidden engineering bypass |
| `#design-system-primitives` | validation fixture | **No** | hidden engineering bypass |
| unknown / unsupported hash | fallback | Yes | preserve current safe fallback to Home unless a later route contract deliberately changes it |

No router dependency is introduced in Stage 4 without a demonstrated need.

Hash routing remains required for GitHub Pages/static deployment compatibility.

---

## 6. Product-shell navigation semantics

### Mobile

The frozen `MobileBottomNav` semantics remain exactly:

1. الرئيسية
2. المنهج
3. التدريب
4. مولد الأوامر
5. المزيد

Stage 4 must reuse the existing `MobileBottomNav` component instead of building a duplicate.

Transitional route meaning:

- الرئيسية → Home
- المنهج → Curriculum
- التدريب → current practice context when one exists; otherwise route the student toward Curriculum rather than inventing a fake Practice landing page
- مولد الأوامر → Prompt Generator
- المزيد → Resources during Stage 4

### Desktop

Desktop primary navigation is shell-owned and route-driven.

It must not reproduce the current Home-local navigation state model.

Exact visual composition belongs to the App Shell implementation, but it must consume the frozen Stage 3 tokens, typography, icon semantics and responsive boundaries.

---

## 7. Simulation boundary

Full Exam Simulation is not a sixth mobile navigation item.

The architecture remains:

- prominent Simulation entry in product content, especially Home;
- future full simulation destination is external and centrally configured;
- the current `#exam-pilot` route remains protected until the external replacement is verified;
- Stage 4 must not delete, redesign or silently wrap the internal exam in V3 typography/styles.

External simulation integration is deferred to the later Resources / External Simulation stage.

---

## 8. V3 integration boundary

A migrated product shell must live below:

```tsx
<div data-v3-ui dir="rtl">
  ...
</div>
```

Stage 4 may consume:

- `tokens/tokens.css`
- `typography/typography.css`
- approved IBM Plex Sans Arabic package weights
- `icons/icon-system.ts`
- existing primitives
- existing composites
- approved assets through `asset-paths.ts`

Stage 4 must not:

- promote V3 tokens to `:root`;
- rewrite `v2.css` or `polish.css` globally as a migration shortcut;
- introduce a second icon library;
- replace approved subject/brand artwork;
- globally mirror icons;
- create duplicate primitives/composites merely for visual variation.

The protected Arabic Math boundary remains outside V3 UI-font overrides.

---

## 9. Shell-owned responsibilities

The application layer may own:

- parsing the current hash into a typed application route;
- generating navigation targets;
- observing hash changes;
- top-level lazy route composition;
- shell header/navigation;
- active route state;
- shell container geometry;
- route-level loading fallback;
- shell-level error fallback/presentation;
- navigation scroll policy;
- protected route bypass decisions.

The application layer must not own:

- curriculum selection state;
- prompt generation logic;
- practice session state;
- scoring;
- diagnostics;
- question selection;
- resource catalog rules;
- exam session storage;
- Arabic Math rendering.

---

## 10. Feature UI explicitly deferred

Stage 4 must not become the implementation stage for:

- Home content redesign;
- Curriculum V3 feature redesign;
- JSON Curriculum Infrastructure;
- canonical question-bank import;
- existing-question migration;
- lesson-centered Practice Engine;
- Analytics;
- final Resources UI/Telegram behavior;
- external Simulation integration;
- Backend/Auth/Database/CMS.

Feature-local changes are allowed only when required to remove duplicated global shell ownership or connect an existing feature to the canonical shell route.

---

## 11. Protected Legacy

The following remain protected during Stage 4:

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

Stage 4 must also preserve:

- stable curriculum/question IDs;
- question content/provenance;
- current practice/session behavior;
- diagnostics;
- Arabic Math;
- GitHub Pages;
- hash routing;
- existing tests and browser smoke behavior.

No protected Legacy removal is authorized by this document.

---

## 12. Expected Stage 4 code-touch zones

Primary intended ownership:

- `client/src/App.tsx`
- `client/src/app/`
- Stage 4 shell-local CSS
- shell-specific tests/validation
- minimal containment edits in current feature entry components where needed

Conditional only:

- `client/src/features/home/Home.tsx`
- `client/src/features/curriculum/CurriculumExplorer.tsx`
- `client/src/features/practice/SkillPractice.tsx`
- `client/src/features/prompts/PromptLibrary.tsx`

Changes to conditional files must be limited to shell integration or navigation contracts unless a later stage explicitly owns the feature behavior.

Frozen `client/src/design-system/` code is reuse-first. A modification requires a demonstrated defect or missing generic capability, with contract and regression evidence updated together.

---

## 13. Regression risks to guard

Stage 4 must explicitly guard against:

1. V3 CSS leaking into protected Legacy or Arabic Math.
2. breaking direct hash loading on GitHub Pages.
3. breaking `#practice/<encodedSkillId>` decoding.
4. duplicate headers/mobile navigation after Home containment.
5. moving feature/domain state into App Shell.
6. covering mobile content with the fixed bottom navigation.
7. inventing a Practice landing page outside its owning stage.
8. converting hidden validation fixtures into product navigation.
9. removing access to the protected internal exam.
10. reintroducing violet or arbitrary hard-coded visual tokens into new V3 shell code.
11. hiding layout defects through global overflow or `!important` patches.
12. regressions in existing prompt, curriculum, practice, diagnostics, exam, RTL or static-build behavior.

---

## 14. Stage 4 validation targets

Responsive widths:

`360 / 390 / 430 / 768 / 1024 / 1280 / 1440 / 1536`

Canonical production-shell evidence later in Stage 4:

- mobile: `390×844`
- desktop: `1536×1024`

Existing Stage 3 validation fixtures remain independent and must continue to pass.

Required regression families throughout Stage 4:

- `pnpm verify`
- Validate student experience
- Browser smoke test
- V3 design system visual validation
- V3 accessibility performance regression
- Stage 4-specific shell validation once introduced
- GitHub Pages/static build

---

## 15. Incremental implementation rule

Stage 4 is not a Big Bang rewrite.

Implementation order after 4A:

1. extract hash routing;
2. establish V3 shell foundation;
3. add brand/header/desktop navigation;
4. integrate existing mobile bottom navigation;
5. contain existing features and remove duplicated global shell ownership;
6. normalize loading/error/navigation lifecycle;
7. verify Legacy and fixtures;
8. add production-shell responsive/accessibility regression;
9. run full CI gate;
10. freeze Stage 4 contract and closure evidence.

Each logical group receives its own commit and verification.

No merge to `main` occurs without explicit human approval.

---

## 16. Stage 4A Definition of Done

Stage 4A is PASS only when:

- Stage 4 branch exists from the exact Stage 3 merge SHA;
- this boundary/route matrix is committed without runtime changes;
- scope, deferred feature UI, protected Legacy and Design System reuse rules are explicit;
- baseline `pnpm verify` passes on the Stage 4 branch;
- baseline Browser Smoke passes on the Stage 4 branch;
- no production runtime behavior has changed.

Only then may Stage 4B — Hash Routing Extraction begin after explicit approval.


---

## 17. Stage 4A Closure Evidence

Stage 4A completed without a runtime code change.

Branch lineage:

- base: `0b5f2416a442225b02d699e5a1be85d16a29bb42`
- first Stage 4A commit: `28725f9a85b408db637b15fbedb30fef305a52ac`
- Draft PR: `#41 — V3-04: Build application shell`

Baseline validation on the Stage 4 branch:

- Validate student experience / push: **success** — run `36069650168`
- Browser smoke test / push: **success** — run `36069650162`
- Validate student experience / pull_request: **success** — run `36069674599`
- Browser smoke test / pull_request: **success** — run `36069674564`
- V3 design system visual validation / pull_request: **success** — run `36069674585`
- V3 accessibility performance regression / pull_request: **success** — run `36069674571`
- Vercel commit status: **success**

The first Stage 4A compare against the Stage 3 merge base contained exactly one added file:

`docs/v3/13-stage4-app-shell-boundary.md`

No runtime source, Design System source, Legacy source, curriculum/question data, workflow or deployment configuration was modified in 4A.

**Stage 4A: PASS.**

Stage 4B remains blocked on explicit human approval.
