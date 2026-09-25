# V3 Stage 5H — Regression & Protected Legacy Verification

Status: **IMPLEMENTATION CANDIDATE — CI PENDING**

Stage 5H verifies that the completed Curriculum work remains isolated from protected Legacy, preserved data and deployment/runtime contracts.

It is a regression-proofing stage, not a new Curriculum design stage.

## 1. Baseline

Stage 5H starts from the completed 5G head:

`1d08d76c2b9efd0457f8a540fc258c95e421fe58`

The Stage 5 branch is:

`feature/v3-curriculum-experience`

The active Pull Request remains Draft.

No merge or Ready-for-Review transition is authorized by 5H.

## 2. Repository diff audit

Before adding 5H verification, the complete Stage 5 branch diff against current `main` contained only:

- Curriculum feature/runtime files;
- Curriculum-local CSS;
- one AppShell integration change in `client/src/App.tsx`;
- Browser Smoke coverage;
- the dedicated Curriculum quality workflow;
- Stage 5 documentation.

None of the protected Legacy or preserved data files were present in the diff.

## 3. Protected Legacy boundary

5H treats the following as immutable during Stage 5:

- `client/src/pages/ExamPilot.tsx`;
- `client/src/components/ExamRunner.tsx`;
- `client/src/components/ExamResultReport.tsx`;
- `client/src/components/LearningDashboard.tsx`;
- `client/src/components/ArabicExamTypography.tsx`;
- `client/src/components/ArabicRichContent.tsx`;
- `client/src/exams/session-storage.ts`;
- `client/src/lib/arabic-math.ts`;
- `client/src/arabic-math.css`;
- `shared/exams/**`.

This preserves the Stage 2/Stage 4 legacy contract until Stage 12 cleanup.

## 4. Preserved data boundary

Stage 5 is UI/experience work and must not silently mutate the data foundations reserved for later stages.

5H therefore also protects:

- `client/src/data/curriculum.ts`;
- `client/src/data/curriculumStructure.ts`;
- `client/src/data/practiceBank.ts`;
- `client/src/data/promptCatalog.ts`.

This ensures:

- verified Curriculum IDs/data are unchanged;
- current Practice question data is unchanged;
- current Prompt catalogue is unchanged;
- Stage 6/7/8 work has not been pulled into Stage 5.

## 5. New Stage 5 regression guard

5H adds:

`.github/workflows/v3-stage5-regression.yml`

The workflow compares the checked-out Stage 5 snapshot against `origin/main`.

It fails if any protected Legacy or preserved-data path differs.

The guard runs on:

- the Stage 5 feature branch;
- Pull Requests;
- `main`;
- manual dispatch.

The resulting evidence file is:

`v3-stage5-protected-boundary-report.json`.

## 6. Runtime regression families

5H relies on the existing independent runtime regressions rather than duplicating them:

### Browser Smoke

Protects:

- current Practice session;
- stable Practice question IDs;
- five unique questions per round;
- no repetition across the two tested rounds;
- diagnostics;
- deepening Prompt;
- Curriculum ↔ Practice return behavior;
- ExamPilot protected-shell bypass;
- both protected exam models;
- MathML / Arabic Math enhancement;
- exam session persistence/recovery;
- RTL exam rendering.

### Production AppShell regression

Protects:

- Hash Router;
- canonical product routes;
- navigation active states;
- protected route architecture;
- shell responsiveness;
- skip-link/focus lifecycle.

### V3 quality and Curriculum quality

Protect:

- responsive layout;
- accessibility;
- reduced motion;
- touch targets;
- visual composition;
- Curriculum-specific eight-width contract.

## 7. Static deployment regression

The Stage 5 regression guard additionally runs:

`GITHUB_ACTIONS=true pnpm build`

This explicitly verifies GitHub Pages/static build mode.

The normal `pnpm verify` continues to verify typecheck, tests and production build.

No history router or server-only dependency is introduced.

## 8. Arabic Math regression

The workflow retains direct stylesheet contract checks for:

- `.arabic-math-wrap math`;
- `"STIX Two Math"`;
- `unicode-bidi: isolate`.

Runtime Browser Smoke independently confirms MathML and Arabic enhancement in ExamPilot.

## 9. Scope exclusions

5H does not:

- redesign Curriculum UI;
- modify protected Legacy;
- modify Curriculum data;
- modify question data;
- modify Prompt catalogue;
- replace Practice;
- implement Analytics;
- integrate final Resources;
- clean up Legacy;
- start Stage 5I.

## 10. Acceptance

5H becomes PASS only when:

- Stage 5 protected/data diff guard is green;
- protected/data report contains zero changed paths;
- `pnpm verify` is green;
- GitHub Pages/static build mode is green;
- Browser Smoke is green;
- Production AppShell regression is green;
- V3 visual validation is green;
- V3 accessibility/performance is green;
- V3 Curriculum responsive/accessibility is green;
- Vercel deployment is READY;
- PR remains Draft and unmerged;
- protected Legacy remains untouched.

Stage 5I is not started.
