# V3 Stage 5I — Curriculum Contract & Stage Closure

Status: **PASS — STAGE 5 CLOSED AND READY FOR HUMAN PR REVIEW**

Stage 5 replaces the legacy Curriculum experience with the V3 Curriculum Experience while preserving Curriculum identity/data, current Practice semantics, Prompt Generator behavior, AppShell routing and protected Legacy.

The canonical post-Stage-5 contract is:

`docs/v3/24-curriculum-contract.md`

---

## 1. Baseline and branch

Repository:

`Alhareith/yemen-grade12-learning-hub`

Stage 5 base branch:

`main`

Stage 5 base / Stage 4 merge SHA:

`72f0fe12c2a66ebe61dbe0ddf1af2657b3764ae5`

Implementation branch:

`feature/v3-curriculum-experience`

Draft PR:

`#42 — V3-05: Build curriculum experience`

Validated Stage 5H head before the 5I documentation freeze:

`95bcc99e289828abb39604ec6e6ca3586a50fc4b`

At that head the branch is:

- 27 commits ahead of `main`;
- 0 commits behind `main`;
- mergeable;
- Draft;
- not merged.

---

## 2. Completed substages

- 5A — Curriculum Baseline & UX Boundary Lock
- 5B — Curriculum UX Contract
- 5C — Mobile Curriculum Experience
- 5D — Desktop Curriculum Experience
- 5E — Lesson Detail & Actions
- 5F — Shell Integration & State
- 5G — Responsive + Accessibility
- 5H — Regression & Protected Legacy Verification
- 5I — Curriculum Contract & Stage Closure

---

## 3. Runtime delivered

Stage 5 delivers:

- explicit Subject-first Curriculum entry;
- required Subject → Unit → Lesson hierarchy;
- optional Lesson → Skills refinement;
- truthful `unit-only` states;
- approved V3 Subject artwork;
- scoped V3 Curriculum styling;
- mobile/compact progressive disclosure;
- desktop Curriculum workspace;
- Lesson grouping from verified `groupTitle`;
- Lesson-first detail composition;
- Prompt Generator Lesson action;
- truthful current skill-based Practice action;
- optional/reversible multi-Skill selection;
- one-time Curriculum return after Lesson-launched Practice;
- feature-local focus/state behavior;
- dedicated Curriculum responsive/accessibility validation;
- dedicated Stage 5 protected-data/Legacy diff guard.

---

## 4. Data preserved

Stage 5 does not change:

- Curriculum graph source;
- Curriculum structure source;
- stable Subject/Unit/Lesson/Skill IDs;
- Practice bank;
- Prompt catalogue;
- question data;
- verified taxonomies.

Stage 5 closes against the current data snapshot:

- 13 Subject identities;
- 10 Units;
- 37 verified Lessons;
- 65 verified Skills;
- 2 `lesson-skill` Units;
- 8 `unit-only` Units.

Five Subjects currently have Units and are therefore navigable.

---

## 5. Mobile result

Below 900px, the Curriculum hierarchy uses progressive disclosure.

At canonical mobile `390×844`:

- Subject catalogue uses two columns;
- one current hierarchy panel is dominant;
- local hierarchy back is available;
- fixed AppShell navigation remains separate;
- no horizontal overflow occurs;
- 44px minimum interactive targets are preserved;
- hierarchy focus transfer is visible.

---

## 6. Desktop result

At 900–1199px:

- selected Curriculum uses two workspace regions.

At 1200px+:

- selected Curriculum uses three regions:
  - Units;
  - Lessons;
  - Lesson Detail.

At canonical desktop `1536×1024` the three-region contract is validated.

Skill remains inside Lesson Detail rather than becoming a fourth hierarchy column.

---

## 7. Lesson action result

Prompt explanation is available at Lesson scope.

Optional selected Skill may refine Prompt context.

Current Practice remains skill-based and is shown only when a ready Practice set exists for the resolved Skill.

The UI does not claim the future Lesson-centered Practice engine already exists.

Inherited Subject/Unit Resources are not mislabeled as Lesson/Skill-specific Resources.

---

## 8. Shell/state result

Stage 5 keeps `#curriculum` as the canonical Curriculum route.

Current Practice remains `#practice/<skillId>`.

No new router dependency or Subject/Unit/Lesson deep links are introduced.

Lesson-launched Practice can return once to the launching Lesson through feature-owned in-memory context.

A refresh or later normal Curriculum entry remains fresh.

---

## 9. Accessibility and responsive evidence

Dedicated Curriculum validation covers:

`360 / 390 / 430 / 768 / 1024 / 1280 / 1440 / 1536`

It verifies:

- RTL / Arabic semantics;
- one H1;
- accessible control names;
- image alt behavior;
- keyboard activation;
- focus transfer;
- visible focus;
- 44×44px targets;
- non-color selected state;
- reduced motion;
- text contrast;
- no horizontal overflow;
- truthful `unit-only` behavior.

Canonical screenshots are generated for:

- `390×844`;
- `1536×1024`.

---

## 10. Protected Legacy and regression result

The Stage 5 regression boundary compares the branch directly against `main`.

Protected Legacy/data changed paths:

`[]`

Protected behavior remains covered for:

- ExamPilot bypass;
- both protected exam models;
- Arabic Math / MathML enhancement;
- exam session recovery;
- current Practice;
- repeated Practice rounds;
- diagnostics;
- deepening Prompt;
- Hash Routing;
- AppShell;
- GitHub Pages/static build;
- Vercel deployment.

---

## 11. Stage 5 branch delta before closure docs

The Stage 5 branch diff from its Stage 4 base contains 17 files before the 5I documentation freeze:

Runtime/integration:

- `client/src/App.tsx`;
- `client/src/features/curriculum/CurriculumExplorer.tsx`;
- `client/src/features/curriculum/curriculum-explorer.css`;
- `client/src/features/curriculum/curriculum-return-state.ts`;
- `client/src/features/curriculum/curriculum-return-state.test.ts`.

Validation:

- `.github/workflows/browser-smoke.yml`;
- `.github/workflows/v3-curriculum-quality.yml`;
- `.github/workflows/v3-stage5-regression.yml`.

Documentation:

- Stage 5 files 16–23;
- `docs/v3/README.md`.

Protected Legacy/data paths are absent from this diff.

---

## 12. Deliberately deferred

Stage 5 does not claim completion of:

- JSON Infrastructure;
- raw-source adapters;
- canonical question-bank generation;
- existing-question migration;
- Lesson-centered Practice Engine;
- Analytics;
- final Resources/Telegram integration;
- external Simulation integration;
- Backend/Auth/Database/CMS/Cloud Sync;
- protected Legacy cleanup.

These remain later owning stages.

---

## 13. Stage 6 handoff

Stage 6 should begin from the merged Stage 5 contract, not from the old Curriculum implementation assumptions.

The handoff is:

**Stable Curriculum hierarchy/IDs/UI contract**
→ **JSON Infrastructure**
→ **Question migration**
→ **Lesson-centered Practice Engine**

Stage 6 must preserve:

- stable Curriculum IDs;
- `lessonId` as the required future Student-ready question relation;
- optional Skill classification;
- raw-source isolation;
- no direct Raw JSON consumption by UI;
- current Stage 5 experience until an equivalent data-source migration is verified.

---

## 14. Closure acceptance criteria

- [x] Stage 5 started from the exact Stage 4 merge SHA.
- [x] Stage 5 branch is 0 commits behind `main` at closure preparation.
- [x] Subject → Unit → Lesson is the required Curriculum hierarchy.
- [x] Skill is optional inside Lesson.
- [x] Stable Curriculum IDs are preserved.
- [x] `unit-only` data remains truthful without invented Lessons.
- [x] Mobile progressive disclosure is implemented.
- [x] Desktop two-/three-region composition is implemented.
- [x] Lesson detail/action hierarchy is implemented.
- [x] Prompt Generator remains a separate feature.
- [x] Current Practice remains skill-based and truthful.
- [x] Resources remain independent from Curriculum integrity.
- [x] Curriculum ↔ Practice one-time return behavior is verified.
- [x] Eight responsive widths are verified.
- [x] Canonical mobile/desktop evidence is generated.
- [x] Keyboard/focus/reduced-motion/touch/contrast checks pass.
- [x] Protected Legacy/data diff guard passes.
- [x] Browser Smoke remains green.
- [x] Production AppShell regression remains green.
- [x] V3 visual validation remains green.
- [x] V3 accessibility/performance remains green.
- [x] GitHub Pages/static build remains green.
- [x] Vercel remains green.
- [x] No Backend/Auth/Database/CMS work was introduced.
- [x] No protected Legacy cleanup was performed.
- [x] No merge to `main` was performed automatically.
- [x] 5I documentation freeze CI is green.

---

## 15. Human gates

PR #42 remains Draft unless the user explicitly requests Ready for Review.

Merge to `main` remains an explicit human approval gate.

Stage 6 must not begin merely because Stage 5 closure documentation exists; it begins only after the project chooses the next stage and establishes its baseline from the correct merged `main`.

Stage 5I documentation freeze is verified. Stage 5 is closed and ready for human PR review; merge remains a human approval gate.


---

## 16. 5I closure verification evidence

5I contract/closure candidate commit:

`08d79b90add05d3f30def80f310f74c1e962612c`

At that candidate:

- branch was 28 commits ahead of `main`;
- branch was 0 commits behind `main`;
- PR #42 remained Draft, open, mergeable and unmerged;
- Stage 5 diff contained 19 files;
- no protected Legacy or preserved Curriculum/Practice/Prompt data path changed.

Successful checks:

- Validate student experience / push — `36126544019`;
- Browser smoke test / push — `36126543779`;
- V3 Curriculum responsive accessibility / push — `36126544130`;
- V3 Stage 5 regression boundary / push — `36126544008`;
- Validate student experience / pull_request — `36126548721`;
- Browser smoke test / pull_request — `36126548744`;
- V3 production shell regression — `36126548839`;
- V3 accessibility performance regression — `36126548787`;
- V3 design system visual validation — `36126548745`;
- V3 Curriculum responsive accessibility — `36126548711`;
- V3 Stage 5 regression boundary — `36126548804`;
- Vercel deployment `dpl_3v3Gf1mdZQdAGbDgXm81SnxqAHBT` — **READY**.

Stage 4 final CI gate is skipped by design because it is intentionally scoped to `feature/v3-app-shell`.

### Final Stage 5 evidence artifacts

Protected-boundary artifact:

- id: `10859928575`;
- name: `v3-stage5-regression-boundary`;
- SHA-256 digest: `65b618ec52da0b14afee8fbe4b6a57ac0febb5b621dcb111c03f1ccc5aa2ef5b`.

Curriculum responsive/accessibility artifact:

- id: `10860505550`;
- name: `v3-curriculum-responsive-accessibility`;
- SHA-256 digest: `e1bcce918e24ea320c5d091067fdc79e48a38ca470cb7c1ebe5101c98ea65cae`.

The Curriculum artifact contains the canonical `390×844` and `1536×1024` screenshots plus the eight-width validation report.

### Final canonical contract

Post-Stage-5 Curriculum work must consume:

`docs/v3/24-curriculum-contract.md`

Stage 5 snapshots 16–23 remain historical evidence and do not override the frozen contract.

### Stage result

**Stage 5 — Curriculum Experience: PASS.**

PR #42 remains Draft until explicit human approval changes that state.

No merge to `main` has been performed.

Stage 6 has not started.


---

## 17. Pre-merge review hardening

A final manual PR review identified a future-expansion risk: the Stage 5 Subject catalogue initially had visual mappings only for the five Subjects that currently own Units.

The data model already contains 13 stable Subject identities. If a later data stage added verified Units to one of the remaining Subjects, the old rendering guard could have filtered that Subject out because no visual mapping existed.

Stage 5 was hardened before merge:

- visual mapping was extracted to `client/src/features/curriculum/subject-visuals.ts`;
- all 13 current stable Subject identities now have an approved visual-family mapping;
- Arabic-language Subjects use the approved Arabic visual family;
- Islamic Subjects use the approved Islamic visual family;
- navigability remains controlled only by verified Unit presence;
- a dedicated unit test fails if any current Curriculum Subject lacks visual coverage.

This change does not add Units, Lessons, Skills, questions or new Curriculum destinations. It only guarantees that later verified data can surface an existing stable Subject without being silently hidden by the presentation layer.
