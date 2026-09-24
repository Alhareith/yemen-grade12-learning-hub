# V3 Stage 2 — Repository Restructure

## Purpose

Stage 2 reorganizes repository ownership and boundaries without redesigning the product or changing the intended student experience.

The migration follows the V3 architecture principle:

Preserve → Isolate → Replace → Verify → Remove Legacy

---

## Completed Work

### 2A — Feature Ownership

Primary product interfaces now have explicit feature ownership:

- `features/home`
- `features/curriculum`
- `features/practice`
- `features/prompts`

The files were moved without redesigning their runtime behavior.

### 2B — Application and Support Boundaries

Application-wide infrastructure and shared client utilities were separated from generic component ownership.

Completed boundaries include:

- `app/ErrorBoundary.tsx`
- `lib/arabic-math.ts`

`ArabicRichContent.tsx` remains a shared compatibility renderer until the future canonical question architecture replaces its current dependency safely.

### 2C — Legacy Boundary Review

The existing in-site exam simulation was explicitly classified as migration-era legacy.

It remains preserved until replacement and verification.

`shared/exams` was not bulk deleted because it contains both exam-specific behavior and concepts that may be reused later.

See:

- `docs/v3/02-legacy-boundary.md`

### 2D — Structural Regression Verification

The repository restructure passed structural regression checks including:

- feature ownership
- application boundaries
- legacy preservation
- stale-path detection
- TypeScript validation
- automated tests
- production build
- combined `pnpm verify`
- critical workflow preservation
- synchronization with `main`
- permanent recovery-tag verification

---

## Runtime Policy

Stage 2 is structural.

It does not intentionally introduce:

- a visual redesign
- a new router
- a backend
- authentication
- JSON question infrastructure
- the new lesson-centered practice engine
- the new analytics system
- removal of the legacy exam runtime

Those belong to later V3 stages.

---

## Final Repository Direction

The client now has the beginning of the intended V3 boundaries:

    client/src/
    ├── app/
    ├── components/
    ├── features/
    │   ├── curriculum/
    │   ├── home/
    │   ├── practice/
    │   └── prompts/
    ├── lib/
    ├── data/
    └── ...

This is intentionally incremental.

The complete target architecture will continue to emerge in later stages rather than through a Big-Bang migration.

---

## Protected State

The following remain protected:

- stable curriculum IDs
- verified question content
- correct answers
- explanations
- provenance
- Arabic mathematical rendering
- tests
- practice seed behavior
- diagnostics
- static deployment behavior
- GitHub Pages compatibility
- migration-era exam functionality until replacement

The permanent recovery tag remains:

`pre-v3-restructure`

and must continue pointing to:

`3953454393a042d1472abe471c4a581136723ed5`

---

## Stage 2 Exit Criteria

Stage 2 is PASS when:

- 2A Feature Ownership is PASS.
- 2B Application & Support Boundaries is PASS.
- 2C Legacy Boundary Review is PASS.
- 2D Structural Regression Verification is PASS.
- `pnpm verify` passes.
- GitHub CI passes.
- Browser Smoke passes.
- the Stage 2 pull request is merged into `main`.
- the recovery tag remains unchanged.

Status:

**PASS after this closure change is merged through the Stage 2 pull request with required checks passing.**

---

## Next Stage

Stage 3 — Design System & Visual Asset System

Stage 3 is where visual redesign begins.

Repository restructuring is complete before visual-system work starts.