# V3 Stage 5.5 — Pre-Merge Review

Status: **PASS — NO OPEN MERGE BLOCKER**

Review scope:

- PR #43
- branch `feature/v3-home-experience`
- base `main @ 098c94e33c51182f455a5e31536805d9f14e0016`
- reviewed runtime head `9f925443f056e4cdb7c71c950be215b0a9aa0c85`

This review does not authorize merge or Ready for Review. The PR remains Draft until explicit human approval.

---

## 1. Branch / base review

- PR is open.
- PR is Draft.
- PR is mergeable.
- PR is not merged.
- branch is ahead of `main`.
- branch is behind `main` by 0 commits.
- merge base remains the Stage 5 merged baseline.

No rebase/update-from-main blocker exists at review time.

---

## 2. Diff boundary review

Reviewed changed runtime areas:

- `client/src/App.tsx`
- `client/src/features/home/Home.tsx`
- `client/src/features/home/HomeExperience.tsx`
- `client/src/features/home/home-actions.ts`
- `client/src/features/home/home-actions.test.ts`
- `client/src/features/home/home-experience.css`
- Home/browser CI workflows

No protected Curriculum, Practice bank, Prompt catalogue, Arabic Math, ExamPilot runtime, exam session storage or `shared/exams/**` file is modified.

Final Stage 5 protected-boundary artifact:

- workflow run: `36147058586`
- artifact ID: `10869431776`
- digest: `sha256:5b33521b4d0b3d47db001bb90a225b04fa0953591a7c371de32cd07ef6f308b3`

Result:

`changed: []`

---

## 3. Pre-merge findings

### Finding A — Home-specific contrast gap

Severity before fix: **merge blocker**

The Home browser workflow already verified:

- touch targets;
- focus;
- reduced motion;
- image loading / alt;
- RTL;
- route semantics;
- responsive geometry;
- overflow.

However, Home-specific small-text contrast was not independently guarded.

Review found these original combinations could fall below 4.5:1:

- 56% Ink secondary text on light surfaces;
- 58% Ink Resources copy;
- 67% Ink on the lightest Quick Action tones;
- white text against the bright endpoint of the previous Primary Bright → Primary button gradient.

Fix applied:

- small secondary copy calibrated to 72% Ink where required;
- existing 68% Curriculum copy retained where its light-surface ratio already passes;
- primary CTA gradient changed to Primary → Primary Strong;
- Home CI now calculates and guards the contrast contract.

The final Home browser report records:

`contrast: pass`

for all eight required widths.

Status: **FIXED**

### Finding B — unreachable legacy Home source

Severity before fix: **maintainability / future-regression risk**

After Stage 5.5 switched the canonical Home body to `HomeExperience`:

- `HomeView` was no longer referenced;
- `ExamsView` could only be reached through the dead `HomeView` path;
- supporting `GuideStep` / `ActionRow` source therefore remained unreachable.

Fix applied:

- removed unreachable legacy Home source;
- retained live Prompt / Resources compatibility behavior;
- retained live Subject selection used by current Resources compatibility flow;
- no live route semantics changed.

Status: **FIXED**

---

## 4. CSS / Design System review

Verified:

- all Home selectors remain under `[data-v3-ui]`;
- no global `:root`, `body` or `html` override;
- no `!important`;
- no global `overflow-x: hidden` defect-hiding workaround;
- shared `--v3-*` tokens remain the source of brand/system values;
- frozen 1280px container contract remains unchanged;
- AppShell remains the sole global Header/navigation owner.

Result: **PASS**

---

## 5. Route semantics review

Canonical Home actions remain:

- Curriculum → `#curriculum`
- Training → `#curriculum` no-context fallback
- Prompt Generator → `#prompts`
- Resources → `#resources`
- Simulation → `#exam-pilot`

No fake generic `#practice` route was introduced.

Simulation remains outside primary navigation.

Result: **PASS**

---

## 6. Runtime/build review

Final reviewed runtime head passed:

- TypeScript check;
- 36 test files;
- 158 tests;
- production Vite build.

Home route unit tests:

- 3 / 3 PASS.

The build retains code splitting for Curriculum, Practice, ExamPilot and Design System fixtures.

Result: **PASS**

---

## 7. Browser / responsive / accessibility review

Final reviewed runtime head passed:

- Browser smoke;
- Home responsive/accessibility/visual regression;
- Curriculum responsive/accessibility;
- V3 accessibility/performance;
- V3 Design System visual validation;
- V3 production shell regression;
- V3 Stage 5 protected boundary.

Home visual workflow:

- run `36147058335`
- artifact `10869941605`
- digest `sha256:013377e549e7131d236348c15a04f85726f2dd534443728b60e3d7ef2b6d4646`

Required widths:

`360 / 390 / 430 / 768 / 1024 / 1280 / 1440 / 1536`

All pass:

- responsive composition;
- no horizontal overflow;
- ≥44px actions;
- route semantics;
- RTL;
- image loading / alt;
- visible focus;
- reduced motion;
- contrast guard.

Result: **PASS**

---

## 8. Deployment review

Vercel status for reviewed runtime head:

**SUCCESS**

No deployment blocker found.

Result: **PASS**

---

## 9. Remaining intentional differences from mock reference

These remain accepted by frozen contracts, not unresolved defects:

1. production uses the real frozen Stage 4 AppShell rather than mock Header/profile/search chrome;
2. Hero uses approved V3 production artwork because the pack contains no approved production Hero photograph;
3. Simulation uses the approved Stage 3 Simulation WebP;
4. desktop Home retains the frozen 1280px V3 maximum content container.

---

## 10. Merge recommendation

Technical pre-merge result:

**NO OPEN MERGE BLOCKER FOUND.**

The PR may proceed to the human review/merge gate when explicitly requested.

Until then:

- keep PR #43 Draft;
- do not mark Ready for Review;
- do not merge;
- do not begin Stage 6 from this review alone.
