# V3 Post-Merge Curriculum UI Adjustment

Status: **implementation patch — validation pending**

Baseline:

- branch was created from `main @ 09f2bba983fd6bd5b5f180c9767789b108440807`;
- before PR creation the patch baseline was refreshed to the then-latest `main`, including merged PR #44;
- includes merged Stage 5 Curriculum PR #42 and merged Stage 5.5 Home PR #43;
- implementation branch: `fix/v3-curriculum-page-polish`.

## Scope

This patch changes presentation and discoverability on the existing `#curriculum` route only. It does not begin Stage 6 and does not change Curriculum data, stable IDs, Practice data, Prompt data, routing architecture, ExamPilot, Arabic Math, or protected Legacy.

## Subject index

The Subject index now renders all current `curriculumGraph.subjects`.

- Subjects with one or more Units remain actionable.
- Subjects with zero Units remain visible and non-navigable.
- Pending Subjects show `قيد الإضافة` and `الوحدات قيد الإضافة`.
- No fake Unit/Lesson counts are created.
- Search matches the real Subject title.
- Filter states are `الكل`, `متاح الآن`, and `قيد الإضافة`.

## Simulation banner

The supplied WebP asset is stored at:

`client/src/design-system/assets/simulation/curriculum-exam-banner.webp`

Runtime access is centralized through `v3AssetPaths.curriculum.examSimulationBanner`.

The banner copy is:

`جرّب محاكاة لنماذج الاختبارات الوزارية`

The banner is intentionally non-navigational because no new official external Simulation destination is introduced by this patch.

## AppShell

The existing AppHeader remains the sole global header and becomes sticky through AppShell chrome styling. No duplicate header is created. The sticky shell remains in normal flow so initial page content is not covered.

## Validation contract

The Curriculum browser workflow is extended to guard:

- all 13 Subjects;
- five currently actionable Subjects;
- eight currently pending Subjects;
- pending non-navigation truthfulness;
- Subject search;
- Subject availability filter;
- packaged WebP loading;
- sticky AppHeader behavior;
- responsive Subject columns;
- no horizontal overflow;
- existing hierarchy/focus/accessibility behavior.

Canonical viewport evidence remains `390×844` and `1536×1024`, with the existing eight-width responsive sweep retained.

## Human gate

This patch must stop at a Draft PR.

It does not authorize:

- Ready for Review;
- merge to `main`;
- Stage 6 work;
- protected Legacy changes.
