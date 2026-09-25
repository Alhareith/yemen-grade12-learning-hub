# V3 Stage 5.5H — Full Regression & Stage Closure

Status: **PASS — STAGE 5.5 CLOSED, DRAFT PR RETAINED**

Canonical Home contract:

`docs/v3/33-home-contract.md`

Repository:

`Alhareith/yemen-grade12-learning-hub`

Base:

`main @ 098c94e33c51182f455a5e31536805d9f14e0016`

Implementation branch:

`feature/v3-home-experience`

Draft PR:

`#43 — V3-05.5: Build exact Home experience`

Verified runtime/regression head before final closure documentation:

`1ed52ed0ae94de2bb0dcd580ea9d9bd57b1dcd34`

No merge or Ready-for-Review action is authorized by this closure.

---

## 1. Stage status

| Substage | Result |
|---|---|
| 5.5A — Home Baseline & Boundary Lock | PASS |
| 5.5B — Home Visual + UX Contract | PASS |
| 5.5C — Mobile Home Exact Implementation | PASS |
| 5.5D — Desktop Home Exact Implementation | PASS |
| 5.5E — Route & Action Wiring | PASS |
| 5.5F — Component / Asset Fidelity | PASS |
| 5.5G — Responsive + Accessibility + Visual Regression | PASS |
| 5.5H — Full Regression & Closure | PASS |

---

## 2. What changed

Stage 5.5 replaces the canonical legacy Home body with a V3 Home experience aligned to the supplied exact-reference pack.

Delivered:

- reference-aligned Hero;
- prominent Curriculum entry;
- four canonical quick actions;
- truthful current Simulation entry;
- compact Resources/guidance rail;
- distinct mobile and desktop compositions;
- centralized Home route semantics;
- approved production artwork only;
- eight-width Home browser validation;
- canonical screenshot evidence;
- iterative visual-difference correction.

Removed from canonical Home:

- old black/violet Hero;
- default Subject selector as Home context;
- Home-local Subject/Exam flow as primary Home experience;
- floating violet Curriculum CTA;
- personal developer/profile/social footer.

The preserved compatibility host remains available to current Prompt/Resources routes until their owning migration stages.

---

## 3. Exact-reference result

Canonical source images:

- `references/04-mobile-content-only.png`;
- `references/03-desktop-content-only.png`.

Production evidence:

- 390×844;
- 1536×1024.

### Mobile

Final measured sequence:

- Hero: 234px;
- Curriculum: 128px;
- Quick Actions: 132px;
- Simulation: 148.1px;
- Resources: 60px.

At 390/430 the four Quick Actions are one compact row because this is what the canonical reference image actually shows.

360 keeps a 2×2 accessibility fallback.

### Desktop

Final measured canonical geometry:

- Hero: 1280×294;
- middle Curriculum: ~435×215;
- Quick region: ~829×157;
- Simulation: 1280×136;
- Resources: 1280×88.

The final calibration moved the Hero directly beneath the real AppShell, tightened the middle section and matched the reference Simulation rhythm while retaining the frozen 1280px Design System container.

---

## 4. Visual-regression correction history

The dedicated browser workflow intentionally failed during implementation when it found real discrepancies.

### Detected and fixed

1. **1024px Simulation expansion**
   - observed: 331.8px;
   - expected reference range: compact desktop banner;
   - fixed by containing artwork geometry rather than weakening the test.

2. **360px decorative overflow**
   - Hero glow escaped approximately 3px;
   - fixed at the element itself;
   - no global horizontal clipping workaround was introduced.

3. **Mobile vertical density**
   - initial Home body was about 1304px at 390px;
   - canonical image comparison showed the reference is much denser;
   - Hero/Curriculum/Quick/Simulation/Resources were recalibrated;
   - final Home body is about 766px plus shell geometry.

4. **Desktop vertical offset/density**
   - initial Home began 24px too low and middle content was too tall;
   - final desktop starts directly after AppShell and uses reference-like section rhythm.

---

## 5. Visual evidence

Final Home PR validation run:

`36144882837 — V3 Home responsive accessibility visual regression — SUCCESS`

Artifact:

- ID: `10869128209`;
- name: `v3-home-responsive-visual-evidence`;
- SHA-256: `3c9596804cb053915244cfd3db4fec9932c1d85a6cf71b3857ac058d8d6b6927`.

Contains:

- `home-mobile-390x844.png`;
- `home-desktop-1536x1024.png`;
- `home-body-mobile-390.png`;
- `home-body-desktop-1536.png`;
- `home-responsive-report.json`.

Machine-readable comparison summary:

`reports/v3-home-visual-regression.json`

---

## 6. Intentional residual visual differences

Stage 5.5 does **not** treat these as unresolved defects:

### Frozen AppShell

The mock shows presentation search/profile/notification chrome.

Production preserves the real Stage 4 AppShell instead.

### Hero photography

The mock uses a photographic study scene.

The pack contains no approved production Hero photograph.

Production composes the Hero from approved Stage 3 Subject/action assets.

### Simulation photography

The mock shows photographic classroom/exam artwork.

Production uses the approved Stage 3 Simulation WebP.

### Desktop canvas width

The mock presentation is visually wider.

Production preserves the frozen `1280px` maximum content container.

These are contract-driven differences; copying mock chrome or inventing unapproved artwork would produce a less correct implementation.

---

## 7. Full regression evidence

Verified against runtime/regression head:

`1ed52ed0ae94de2bb0dcd580ea9d9bd57b1dcd34`

Successful Pull Request checks:

- Validate student experience — `36144882835` — SUCCESS;
- Browser smoke test — `36144883015` — SUCCESS;
- V3 Home responsive accessibility visual regression — `36144882837` — SUCCESS;
- V3 Curriculum responsive accessibility — `36144883200` — SUCCESS;
- V3 accessibility performance regression — `36144883020` — SUCCESS;
- V3 design system visual validation — `36144883042` — SUCCESS;
- V3 production shell regression — `36144882897` — SUCCESS;
- V3 Stage 5 regression boundary — `36144883171` — SUCCESS.

Stage 4 final CI gate:

- `36144883147` — SKIPPED by its intentional branch scoping.

Vercel:

- commit status — SUCCESS.

### Browser Smoke contract update

Browser Smoke initially failed because it still asserted the removed legacy personal Home footer and Home-local Subject/Exam subviews.

The smoke test was updated to assert the new Stage 5.5 Home contract:

- Stage 5.5 H1;
- no personal footer;
- exact Home href semantics;
- frozen five-item AppShell navigation.

The updated smoke then passed.

---

## 8. Static build / GitHub Pages

The successful Stage 5 regression workflow includes:

- `pnpm verify`;
- GitHub Pages static build mode using `GITHUB_ACTIONS=true pnpm build`.

Therefore Stage 5.5 preserves:

- Vite static output;
- Hash Routing;
- GitHub Pages compatibility;
- Vercel compatibility.

---

## 9. Protected Legacy

Protected-boundary workflow:

`36144883171`

Artifact:

- ID: `10869177878`;
- SHA-256: `45be7e767c2a3a5aef97f71222dfc1e493c131460da950980c1a15df6f341b88`.

Protected report result:

`changed: []`

Protected Legacy includes:

- ExamPilot;
- ExamRunner;
- ExamResultReport;
- LearningDashboard;
- ArabicExamTypography;
- ArabicRichContent;
- exam session storage;
- Arabic Math;
- `shared/exams/**`.

Preserved data includes:

- Curriculum graph;
- Curriculum structure;
- Practice bank;
- Prompt catalogue.

All remain unchanged relative to the Stage 5 merged baseline.

---

## 10. Stage 5 / Curriculum

Stage 5 Curriculum remains intact.

Regression confirms:

- Subject-first entry;
- Unit/Lesson flow;
- optional Skill behavior;
- truthful Practice availability;
- one-time Curriculum ↔ Practice return;
- unit-only truthfulness;
- responsive/accessibility contract.

Stage 5.5 does not duplicate or redefine Curriculum.

---

## 11. Prompt / Resources / Practice / ExamPilot

Verified:

- Prompt Generator remains functional;
- Resources route remains functional;
- Training no-context fallback remains Curriculum;
- current skill-based Practice remains functional;
- repeated Practice rounds remain protected;
- ExamPilot remains outside AppShell;
- both current Mathematics models remain available;
- exam session recovery remains functional;
- Arabic Math enhancement remains functional.

---

## 12. Acceptance checklist

- [x] Stage 5 baseline verified before implementation.
- [x] Home boundary documented.
- [x] Home visual/UX contract documented.
- [x] Mobile reference implementation delivered.
- [x] Desktop reference implementation delivered.
- [x] Home action semantics centralized and tested.
- [x] Approved assets used; no invented production image derivative.
- [x] Eight responsive widths verified.
- [x] Canonical screenshots produced.
- [x] Reference comparison performed using overlay/diff + zone geometry.
- [x] Real responsive defects found and fixed.
- [x] Accessibility checks pass.
- [x] Reduced motion passes.
- [x] No horizontal overflow workaround.
- [x] AppShell remains frozen.
- [x] Curriculum remains frozen.
- [x] Protected Legacy/data changed paths are empty.
- [x] Browser Smoke passes against the new Home contract.
- [x] Design System visual validation passes.
- [x] accessibility/performance regression passes.
- [x] production shell regression passes.
- [x] Curriculum regression passes.
- [x] `pnpm verify` passes.
- [x] GitHub Pages static build mode passes.
- [x] Vercel status passes.
- [x] PR remains Draft.
- [x] PR remains unmerged.

---

## 13. Human gate

PR #43 must remain Draft until explicit human instruction changes it.

This closure does **not** authorize:

- Ready for Review;
- merge to `main`;
- Stage 6 work;
- protected Legacy deletion.

---

## Final result

**Stage 5.5 — Home Experience: PASS.**

The Home is now reference-aligned to a high practical degree within the frozen AppShell, Design System, approved-asset and 1280px-container constraints.
