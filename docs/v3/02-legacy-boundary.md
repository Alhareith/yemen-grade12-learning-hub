# V3 Stage 2C — Legacy Boundary Review

## Purpose

This document records the legacy boundary before any exam-specific code is removed or replaced.

Stage 2C is a classification and isolation review.

It does not authorize deletion.

Migration rule:

Preserve → Isolate → Replace → Verify → Remove Legacy

---

## 1. Legacy Exam UI

The following files belong primarily to the current in-site exam simulation:

- `client/src/pages/ExamPilot.tsx`
- `client/src/components/ExamRunner.tsx`
- `client/src/components/ExamResultReport.tsx`
- `client/src/components/LearningDashboard.tsx`
- `client/src/components/ArabicExamTypography.tsx`

Status:

**Preserve as legacy during migration.**

These files remain operational until the external simulation replacement and dependent V3 flows are verified.

They must not be deleted merely for repository cleanup.

---

## 2. Exam Client Support

Current exam persistence support:

- `client/src/exams/session-storage.ts`

This implementation is tied to the current exam session lifecycle and storage contract.

Status:

**Legacy-specific implementation, preserve for now.**

Useful recovery and integrity ideas may inform future practice persistence, but the file itself is not automatically promoted into the V3 practice architecture.

---

## 3. Shared Exam Domain — Review Required

The `shared/exams` directory must not be deleted as one block.

Files currently under review include:

- `exam-model.ts`
- `question-model.ts`
- `session-engine.ts`
- `result-report.ts`
- `learning-dashboard.ts`
- `remediation.ts`

Each file must be judged by responsibility rather than folder name.

---

## 4. Protected Reusable Concepts

### `question-model.ts`

Contains question and rich-content concepts used beyond the legacy exam UI.

`RichContent` is already consumed by current non-exam UI such as practice rendering.

Status:

**Protected dependency. Do not delete or move casually.**

Future V3 question architecture may replace or generalize its ownership, but only after the canonical question model exists.

### `session-engine.ts`

Contains useful session concepts such as:

- session identity
- selected question state
- answers
- progress
- timing
- submission
- integrity-oriented state transitions

Status:

**Potentially reusable concepts. Preserve.**

Do not directly treat the current exam session contract as the final V3 practice session contract.

### `result-report.ts`

Contains useful scoring/result concepts.

Status:

**Potentially reusable concepts. Preserve pending V3 results architecture.**

---

## 5. Exam-Specific Analytical Logic

### `learning-dashboard.ts`

Current logic is strongly coupled to the existing exam result structure and current skill/domain mapping.

Status:

**Exam-specific for now.**

It is not the final V3 Analytics architecture.

### `remediation.ts`

Current remediation logic depends on existing exam reports, skill IDs and exam-oriented diagnostic assumptions.

Status:

**Exam-specific for now.**

Useful ideas may be reused later, but the file is not the V3 remediation contract.

---

## 6. Arabic Rendering Boundary

`client/src/lib/arabic-math.ts` has already been separated from the exam directory because it serves more than the legacy simulation.

Status:

**Shared client utility. Keep outside legacy exam ownership.**

`ArabicRichContent.tsx` remains a shared renderer for now.

`ArabicExamTypography.tsx` remains exam-specific legacy compatibility code.

---

## 7. Legacy Removal Rule

No legacy exam file may be removed simply because a new folder structure exists.

Removal requires all applicable conditions:

1. A replacement exists.
2. The replacement is verified.
3. No protected data or rendering behavior is lost.
4. No active runtime route depends on the legacy code.
5. Tests and browser smoke pass.
6. Any reusable concepts have already been extracted or intentionally replaced.

---

## 8. Current Decision

For Stage 2C:

- Preserve current exam runtime.
- Do not redesign the exam.
- Do not delete `shared/exams`.
- Do not move exam files merely for cosmetic organization.
- Keep reusable cross-feature utilities outside legacy ownership.
- Record reusable concepts for later V3 stages.
- Defer actual removal to Stage 12 — Legacy Cleanup.

---

## 9. Stage 2C Classification

| Area | Classification | Current Action |
|---|---|---|
| ExamPilot | Legacy exam UI | Preserve |
| ExamRunner | Legacy exam UI | Preserve |
| ExamResultReport | Legacy exam UI | Preserve |
| LearningDashboard UI | Legacy exam UI | Preserve |
| ArabicExamTypography | Legacy compatibility | Preserve |
| session-storage | Exam-specific support | Preserve |
| question-model | Protected / potentially reusable | Preserve |
| session-engine | Reusable concepts | Preserve |
| result-report | Reusable concepts | Preserve |
| learning-dashboard domain | Exam-specific analytics | Preserve |
| remediation | Exam-specific diagnostic logic | Preserve |
| arabic-math client utility | Shared utility | Already isolated |

---

## 10. Exit Direction

Stage 2C does not remove legacy code.

Its purpose is to make the boundary explicit so later stages can build replacements without accidentally deleting working or reusable behavior.

Actual legacy deletion belongs to Stage 12 after replacement and verification.