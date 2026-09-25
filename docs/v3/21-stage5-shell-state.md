# V3 Stage 5F — Shell Integration & State

Status: **PASS — 5F SHELL INTEGRATION & STATE IMPLEMENTED**

Stage 5F closes the real feature-to-shell lifecycle gap revealed by the completed Curriculum implementation.

It does not add a new Curriculum route, deep-link scheme, persistence layer, router dependency, or App-owned Curriculum domain state.

## 1. Integration finding

Stage 5E can launch the current skill-based Practice route from Lesson Detail.

Before 5F:

`Lesson Detail → #practice/<skillId> → العودة إلى المنهج`

returned to a newly mounted Curriculum Explorer at Subject selection.

That loses the immediate learning context even though Practice was launched from a known Lesson.

This is a route-lifecycle integration problem, not a reason to move Curriculum IDs into AppShell.

## 2. One-time return contract

When Practice is launched from Curriculum Lesson Detail, Curriculum stores a one-time in-memory return context:

- `subjectId`;
- `unitId`;
- `lessonId`;
- active `skillId`.

Returning from Practice to canonical `#curriculum` consumes that context and restores the Lesson Detail.

The context is consumed once.

After it is consumed, leaving Curriculum and entering it normally starts from Subject selection again.

## 3. Ownership boundary

Return state lives in:

`client/src/features/curriculum/curriculum-return-state.ts`

The App layer does not store or interpret Subject/Unit/Lesson/Skill IDs.

App only participates in route lifecycle by cancelling a pending Curriculum return when the student exits Practice to a different primary destination.

This preserves the Stage 4 rule:

> application layer may coordinate feature entry points but must not absorb feature/domain state.

## 4. Fresh-entry behavior remains frozen

5F does not introduce persistent Curriculum state.

A fresh `#curriculum` entry still starts with explicit Subject choice.

The return context:

- is not written to `localStorage`;
- is not written to `sessionStorage`;
- is not encoded into the hash;
- does not survive a full page refresh;
- does not create a browser-session Curriculum bookmark.

This keeps the Stage 5B fresh-entry contract intact.

## 5. Cancellation behavior

If a pending Practice return exists but the student leaves Practice for:

- Home;
- Prompt Generator;
- Resources / More;
- another non-Curriculum product destination;

the pending Curriculum return is cancelled.

A later normal Curriculum entry therefore cannot unexpectedly resurrect stale Lesson context.

Direct Practice hashes with no Curriculum launch context remain unaffected.

## 6. Same-route behavior

Selecting the already-active Curriculum primary navigation item continues to use the Stage 4 shell lifecycle behavior:

- focus/reset viewport;
- do not erase feature-owned Subject/Unit/Lesson selection.

Curriculum-local back/change-subject controls remain the way to move up the hierarchy.

## 7. Routing boundary

Canonical hashes remain unchanged:

- `#curriculum`;
- `#practice/<skillId>`.

No React Router dependency is added.

No Subject/Unit/Lesson deep-link hashes are introduced.

## 8. Verification

Unit coverage verifies:

- prepared return context is consumed exactly once;
- cancellation removes pending state;
- stored context is copied rather than retaining a mutable caller reference.

Browser Smoke verifies:

1. launch Practice from a single-Skill Lesson;
2. complete the existing Practice flow;
3. use the Practice “العودة إلى المنهج” action;
4. canonical hash is still `#curriculum`;
5. launching Lesson Detail is restored;
6. normal later Curriculum entry is fresh;
7. launch Practice from a multi-Skill Lesson;
8. leave Practice to Home instead of Curriculum;
9. later Curriculum entry begins at Subjects, proving stale return state was cancelled.

## 9. Files owned by 5F

- `client/src/features/curriculum/curriculum-return-state.ts`;
- `client/src/features/curriculum/curriculum-return-state.test.ts`;
- `client/src/features/curriculum/CurriculumExplorer.tsx`;
- `client/src/App.tsx`;
- `.github/workflows/browser-smoke.yml`;
- this document;
- V3 documentation map.

## 10. Deferred

5F does not implement:

- persistent Curriculum state;
- Curriculum deep links;
- JSON/question infrastructure;
- Lesson-centered Practice Engine;
- Analytics;
- Resources integration;
- external Simulation integration;
- Stage 5G accessibility/responsive closure work.

## 11. Acceptance

5F becomes PASS only when:

- `pnpm verify` is green;
- the new return/cancellation tests pass;
- Browser Smoke proves resume-on-return and fresh normal re-entry;
- V3 visual/accessibility regressions remain green;
- AppShell regression remains green;
- Vercel preview is READY;
- protected Legacy is untouched.

Stage 5G is not started.


---

## 12. 5F closure evidence

Final 5F runtime head before this documentation-only closure:

`14331a697f0d163494be1111da72528a6add91dd`

Successful checks:

- Validate student experience / push — `36115504229`;
- Browser smoke test / push — `36115504265`;
- Validate student experience / pull_request — `36115510377`;
- Browser smoke test / pull_request — `36115510416`;
- V3 design system visual validation — `36115510560`;
- V3 accessibility performance regression — `36115510198`;
- V3 production shell regression — `36115510182`;
- Vercel commit status — **success**.

The Stage 4 final CI gate remains skipped by design outside `feature/v3-app-shell`.

No protected Legacy file changed.

**Stage 5F: PASS.**

Stage 5G is not started.
