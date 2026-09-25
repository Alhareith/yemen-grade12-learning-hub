# V3 Stage 5H — Regression & Protected Legacy Verification

Status: **PASS — 5H REGRESSION & PROTECTED LEGACY VERIFIED**

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


---

## 11. 5H closure evidence

Final 5H verification head before this documentation-only closure:

`7dbdc5b78d43e0e01a2fca1bb3621e8c6ba4e119`

Current `main` baseline:

`72f0fe12c2a66ebe61dbe0ddf1af2657b3764ae5`

### Protected/data diff result

Stage 5 regression boundary / push:

- run: `36117325802`;
- base: `72f0fe12c2a66ebe61dbe0ddf1af2657b3764ae5`;
- head: `7dbdc5b78d43e0e01a2fca1bb3621e8c6ba4e119`;
- changed protected/data paths: `[]`;
- result: **pass**.

Stage 5 regression boundary / pull_request:

- run: `36117329760`;
- changed protected/data paths: `[]`;
- result: **pass**.

Evidence artifact:

- id: `10855073970`;
- name: `v3-stage5-regression-boundary`;
- SHA-256 digest: `8eb0594450b5315932424d95979f7a38f420d911af5338440354c8680d9559cd`.

### Successful regression families

- Validate student experience / push — `36117325766`;
- Browser smoke test / push — `36117325692`;
- V3 Curriculum responsive accessibility / push — `36117325697`;
- V3 Stage 5 regression boundary / push — `36117325802`;
- Validate student experience / pull_request — `36117329872`;
- Browser smoke test / pull_request — `36117329694`;
- V3 production shell regression — `36117329763`;
- V3 accessibility performance regression — `36117329824`;
- V3 design system visual validation — `36117329762`;
- V3 Curriculum responsive accessibility — `36117329778`;
- V3 Stage 5 regression boundary — `36117329760`;
- Vercel deployment `dpl_59YZfP82QyrMrryL6wbS4qDYLU5W` — **READY**.

The Stage 4 final CI gate remains skipped by design outside `feature/v3-app-shell`.

### Protected runtime result

Browser Smoke confirms the protected runtime remains operational:

- ExamPilot still bypasses AppShell;
- both protected math exam models load;
- MathML and Arabic Math enhancement remain present;
- exam session recovery remains operational;
- Practice still produces unique first/second rounds without tested cross-round repetition;
- Practice diagnostics and deepening Prompt remain operational;
- Hash Router and Curriculum ↔ Practice behavior remain intact.

### Repository result

5H adds only:

- `.github/workflows/v3-stage5-regression.yml`;
- this document;
- the V3 documentation map.

No product Runtime source file is modified by 5H.

**Stage 5H: PASS.**

Stage 5I is not started.


---

## 12. Final 5H harness stabilization and verification

During the documentation-only closure run, the dedicated Curriculum quality workflow exposed a nondeterministic focus assertion.

The feature runtime was unchanged. The instability came from the test using programmatic focus / a fixed one-Tab assumption while asserting `:focus-visible`.

5H corrected the harness to test the real keyboard contract:

1. wait for Lesson-detail focus transfer;
2. traverse the actual Tab order;
3. require the target Skill to be keyboard-reachable;
4. verify its visible focus outline under keyboard modality;
5. activate/deselect it with Space.

No product Runtime source file changed for this correction.

Final fully-green verification head before the final documentation commit:

`afaa30744ecc6a797cb6d84832287567151dc3b2`

Successful checks on that head:

- Validate student experience / push — `36117955406`;
- Browser smoke test / push — `36117955431`;
- V3 Curriculum responsive accessibility / push — `36117955425`;
- V3 Stage 5 regression boundary / push — `36117955427`;
- Validate student experience / pull_request — `36117959579`;
- Browser smoke test / pull_request — `36117959544`;
- V3 production shell regression — `36117959754`;
- V3 accessibility performance regression — `36117959746`;
- V3 design system visual validation — `36117959644`;
- V3 Curriculum responsive accessibility — `36117959613`;
- V3 Stage 5 regression boundary — `36117959595`;
- Vercel deployment `dpl_7MnSue6s5TDQVoZxQ9NHpuiuhNXU` — **READY**.

Final Stage 5 boundary artifact on this verification head:

- id: `10854984937`;
- digest: `7abd073298fb825363190b3f4cd4207b78258a159c68381bb34c44dce27dd2cc`.

Final Curriculum quality artifact:

- id: `10855747606`;
- digest: `d4a6353de5a76aac0ac81588ccfb88f63c669558c579a79b8ded085d1842a7db`.

PR #42 remains Draft, open, mergeable and unmerged.

`main` remains:

`72f0fe12c2a66ebe61dbe0ddf1af2657b3764ae5`.

Stage 5I remains not started.
