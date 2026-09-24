# Learning Hub V3 — Baseline

## 1. Purpose

هذه الوثيقة تثبت الحالة المرجعية للمشروع قبل بدء إعادة هيكلة Learning Hub V3.

يجب عدم تعديل أو حذف الأنظمة القديمة أثناء الهجرة إلا بعد وجود بديل V3 تم التحقق منه واختباره.

---

## 2. Repository

- Repository: `Alhareith/yemen-grade12-learning-hub`
- Default branch: `main`
- Baseline commit: `3953454393a042d1472abe471c4a581136723ed5`
- Recovery tag: `pre-v3-restructure`
- Baseline commit title: `Graduate combinations into independent skill practice`
- Baseline commit date: `2026-09-11`

---

## 3. Local Environment

- Operating system: Windows
- Node.js: `v24.13.1`
- pnpm: `10.4.1`
- Package manager declared by project: `pnpm@10.4.1`

---

## 4. Current Technology Stack

### Frontend

- React `19.2.1`
- React DOM `19.2.1`
- TypeScript `5.6.3`
- Vite `7.1.7`
- Tailwind CSS `4.1.14`
- Lucide React

### Testing and Tooling

- Vitest `2.1.4`
- Prettier `3.6.2`
- TypeScript static checking
- GitHub Actions
- GitHub Pages deployment

---

## 5. Current Application Structure

The existing application currently contains:

- Home experience
- Curriculum navigation
- Skill-based practice
- Practice question banks
- Practice diagnostics
- Exam/simulation implementation
- Result reporting
- Prompt generator
- External resource catalog
- Arabic mathematics rendering
- Local session/state logic

Current application routing is primarily hash-based.

Current top-level routes include:

- Home
- Curriculum
- Practice
- Exam pilot

---

## 6. Existing Domain Foundations

The repository already contains reusable domain logic that must be protected during migration.

### Curriculum

Located primarily under:

`shared/curriculum/`

Current hierarchy supports:

`Subject → Unit → Lesson → Skill`

### Practice

Located primarily under:

`shared/practice/`

Current implementation includes:

- Practice question models
- Practice sets
- Question verification
- Practice engine
- Practice evidence
- Practice diagnostics

### Exams

Located primarily under:

`shared/exams/`

Some of this code is specific to full exam simulation, while other parts may later be reusable for generic quiz sessions, scoring, recovery, or analytics.

No exam-domain code should be deleted until this distinction is reviewed.

---

## 7. Baseline Verification

Before V3 restructuring:

- Dependency installation: PASS
- Local development server: PASS
- TypeScript check: PASS
- Automated tests: PASS
- Production build: PASS
- GitHub Pages deployment at baseline commit: PASS
- Recovery tag created: PASS

Baseline command:

`pnpm verify`

Recovery tag:

`pre-v3-restructure`

---

## 8. Protected Assets During Migration

The following must not be silently lost, renamed, or semantically changed during migration:

- Existing curriculum identifiers
- Existing curriculum relationships
- Verified mathematics questions
- Correct answers
- Question explanations
- Existing provenance information
- Practice evidence
- Practice diagnostics
- Session behavior that is still required
- Arabic mathematical rendering
- Existing automated tests
- CI workflows

Any intentional change to one of these requires explicit migration work and verification.

---

## 9. V3 Product Direction

The target V3 product will focus on:

`Subject → Unit → Lesson → Practice → Result → Analytics`

Question practice will eventually become lesson-centered rather than requiring every imported question to have a skill classification.

For future question data:

- `subjectId` is required
- `unitId` is required
- `lessonId` is the primary classification target
- skill classification may remain optional
- tags may remain optional

Future question JSON files will represent complete source models, not one JSON file per lesson.

Raw JSON files will be treated as source input and will not become the runtime database directly.

The future intended flow is:

`Raw JSON → Adapter → Mapping → Validation → Canonical Question Bank`

---

## 10. Resource Direction

V3 will retain only:

- YouTube resources
- Telegram channel references

Telegram channels must not be opened directly from the product.

Other legacy external resource categories will be removed only after the V3 replacement is complete.

---

## 11. Full Exam Simulation

Full exam model simulation will become an external product/site.

The Learning Hub homepage must provide a clear and prominent entry point to that external simulation site.

The old internal simulation implementation must not be deleted during Stage 0.

---

## 12. Future Multiplayer Direction

Interactive practice with friends through an invite link, room, or local connectivity is a future feature.

It is not part of the current V3 implementation.

The V3 architecture should avoid tightly coupling:

- question selection
- quiz session state
- scoring
- user interface

so multiplayer can be added later without rewriting the question bank.

---

## 13. Migration Safety Rules

1. No big-bang rewrite.
2. No deletion before replacement verification.
3. Existing behavior remains available while the replacement is developed.
4. Each migration stage must have explicit PASS/FAIL criteria.
5. Every major migration is performed through a dedicated branch and pull request.
6. `main` remains the stable integration branch.
7. Raw imported JSON must remain unchanged.
8. Unmapped questions must never silently enter student practice.
9. Question answers must never be changed automatically during migration.
10. V3 UI work must not rewrite domain logic unless the migration stage explicitly requires it.

---

## 14. Recovery Procedure

The permanent pre-V3 recovery point is:

`pre-v3-restructure`

Baseline commit:

`3953454393a042d1472abe471c4a581136723ed5`

This tag represents the stable project before V3 restructuring begins.

Do not move or recreate this tag later.

---

## 15. Stage 0 Status

`IN PROGRESS`

Stage 0 becomes `PASS` only after:

- Baseline verification succeeds.
- This document is committed.
- The branch is pushed.
- CI succeeds.
- The documentation change is merged without functional changes.
- `main` remains operational after the merge.