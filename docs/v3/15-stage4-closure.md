# V3 Stage 4K — App Shell Closure

Status: **CLOSURE CANDIDATE — READY FOR HUMAN PR REVIEW**

Stage 4 establishes the production application shell around the existing Learning Hub without redesigning protected feature content or removing Legacy.

The canonical post-Stage-4 contract is:

\`docs/v3/14-app-shell-contract.md\`

---

## 1. Baseline and branch

Repository:

\`Alhareith/yemen-grade12-learning-hub\`

Base branch:

\`main\`

Stage 4 base / Stage 3 merge SHA:

\`0b5f2416a442225b02d699e5a1be85d16a29bb42\`

Implementation branch:

\`feature/v3-app-shell\`

Draft PR:

\`#41 — V3-04: Build application shell\`

Validated runtime/CI head before the 4K documentation freeze:

\`36e58deeb1867a08f3a2e6db3d2d45d9bbc88de8\`

At that head the branch was:

- 18 commits ahead of \`main\`;
- 0 commits behind \`main\`;
- mergeable;
- still Draft;
- not merged.

---

## 2. Completed substages

Actual execution order:

- 4A — Baseline & App-Shell Boundary Lock
- 4B — Hash Routing Extraction
- 4C — V3 Shell Foundation
- 4D — Brand Lockup + Header + Desktop Navigation
- 4F — Feature Containment & Home Shell De-duplication
- 4E — MobileBottomNav Production Integration
- 4G — Loading, Error & Navigation Lifecycle
- 4H — Protected Legacy / Fixture Verification
- 4I — Responsive + Accessibility + Shell Regression Harness
- 4J — Full Regression & CI Gate
- 4K — App Shell Contract & Stage Closure

### Why 4F preceded 4E

4F was intentionally executed before 4E after 4D exposed a real integration dependency: Prompt Generator and Resources still lived behind Home-local state.

Creating the frozen five-item mobile navigation first would have produced destinations whose hashes were recognized but whose content ownership was not yet truthful.

4F promoted \`#prompts\` and \`#resources\` to real shell routes and removed Home-owned global navigation first. 4E then connected the five production destinations without dead or misleading navigation.

The scope was not expanded; only execution order changed.

---

## 3. Runtime delivered

Stage 4 delivered:

- typed application hash route model;
- deterministic practice hash encoding/decoding;
- product-shell/bypass-route classification;
- production \`AppShell\`;
- approved brand lockup;
- one shell-owned global header;
- route-driven desktop navigation;
- shared five-destination primary-navigation model;
- reused Stage 3 \`MobileBottomNav\`;
- safe-area-aware bottom navigation and content spacer;
- truthful Prompt Generator and Resources routes;
- removal of Home-owned duplicate global header/mobile tabs;
- V3 route loading state;
- safe production error states without stack-trace exposure;
- route focus/scroll lifecycle with reduced-motion support;
- Hash Router-safe Skip Link;
- protected Legacy/fixture runtime assertions;
- production AppShell responsive/accessibility regression harness;
- Stage 4 final CI gate.

---

## 4. Canonical product routes

Product shell:

- default / empty hash → Home
- \`#curriculum\` → Curriculum
- \`#prompts\` → Prompt Generator
- \`#resources\` → Resources
- \`#practice/<skillId>\` → Practice

Protected bypass:

- \`#exam-pilot\`
- \`#design-system-preview\`
- \`#design-system-primitives\`

Unknown hashes preserve safe fallback to Home.

No router dependency was added.

---

## 5. Navigation closure

Primary navigation is frozen to:

1. الرئيسية
2. المنهج
3. التدريب
4. مولد الأوامر
5. المزيد

Desktop and mobile consume one shared navigation model.

Training behavior:

- active Practice context → Practice remains active;
- no Practice context → route toward Curriculum;
- no fake general Practice landing was introduced.

Mobile navigation:

- reused existing Design System composite;
- active state uses \`aria-current="page"\`;
- safe-area handled;
- content spacing reserved;
- hidden at \`900px+\`.

Desktop navigation:

- visible at \`900px+\`;
- route-driven;
- shell-owned.

---

## 6. Lifecycle closure

Stage 4 replaced the old route-loading presentation with V3 route states.

Verified behavior:

- route transition focuses \`#app-content\`;
- route transition resets scroll;
- normal mode may use smooth scrolling;
- reduced-motion mode uses automatic scrolling;
- Skip Link focuses content without changing application hash;
- feature error state keeps production shell chrome available;
- route change resets feature error boundary;
- raw error stack traces are not shown to end users.

---

## 7. Protected Legacy closure

Stage 4 did not modify protected Legacy or frozen Design System runtime source relative to the Stage 3 baseline.

Final 4J gate reported no protected/frozen changes.

Protected verification covers:

- ExamPilot shell bypass;
- no product Header/MobileBottomNav inside ExamPilot;
- model 1 MathML;
- Arabic Math enhancement;
- exam session persistence and recovery;
- model 2;
- Practice two-round no-repeat behavior;
- Design System composite preview bypass;
- Design System primitives preview bypass.

No Legacy removal occurred.

---

## 8. Responsive and accessibility closure

Production AppShell harness validates:

\`360 / 390 / 430 / 768 / 1024 / 1280 / 1440 / 1536\`

Canonical evidence:

- \`v3-shell-mobile-390x844.png\`
- \`v3-shell-desktop-1536x1024.png\`
- \`v3-shell-regression-report.json\`

Validated shell behavior includes:

- one AppShell;
- one AppHeader;
- one shell content outlet;
- RTL/lang semantics;
- one visible main landmark;
- one visible primary navigation landmark;
- brand asset loading;
- shell touch targets ≥44px;
- mobile/desktop navigation cutoff;
- active-route state;
- safe bottom spacing;
- no horizontal overflow;
- keyboard Skip Link behavior;
- canonical route matrix on mobile and desktop;
- no request/page/console errors.

---

## 9. Final CI evidence at pre-freeze head

Head:

\`36e58deeb1867a08f3a2e6db3d2d45d9bbc88de8\`

Successful final runs:

- Stage 4 Final CI Gate / push — \`36078142877\`
- Stage 4 Final CI Gate / pull_request — \`36078148816\`
- Validate student experience / push — \`36078142813\`
- Validate student experience / pull_request — \`36078148869\`
- Browser smoke / push — \`36078142821\`
- Browser smoke / pull_request — \`36078148799\`
- Production shell regression / push — \`36078142818\`
- Production shell regression / pull_request — \`36078148806\`
- V3 accessibility performance regression / pull_request — \`36078148862\`
- V3 design system visual validation / pull_request — \`36078148881\`
- Vercel commit status — **success**

The final CI gate itself verifies:

- protected/frozen boundary diff;
- no new router dependency;
- required Stage 4 files;
- \`pnpm verify\`;
- GitHub Pages static build mode.

---

## 10. Key implementation commits

- \`28725f9a...\` — lock Stage 4A boundary
- \`c86766d4...\` — extract hash route model
- \`3a66af51...\` — route model tests
- \`3354d348...\` — App consumes extracted routing
- \`3e12fb2e...\` — isolated V3 AppShell foundation
- \`7fe6ac5b...\` — brand/header/desktop navigation
- \`80f51c27...\` — feature containment / Home de-duplication
- \`778d73c9...\` — production MobileBottomNav
- \`aa0b5f09...\` — fixed nav height contract
- \`a6535ca7...\` — loading/error/navigation lifecycle
- \`53d63926...\` — protected boundary verification
- \`ce500d33...\` — final protected exam verification shape
- \`38852a9d...\` — production shell responsive regression
- \`c7b38a07...\` — Stage 4 final CI gate
- \`36e58dee...\` — scope Stage 4 gate to Stage 4 branch

Intermediate verification-only commits remain visible in Git history.

---

## 11. Closure acceptance criteria

- [x] Stage 4 started from the exact Stage 3 merge SHA.
- [x] Typed hash routing extracted without adding a router dependency.
- [x] Product AppShell established.
- [x] V3 styling remains scoped and does not leak into protected Legacy.
- [x] Approved brand asset is used.
- [x] One global product header owns application navigation.
- [x] Desktop navigation is route-driven.
- [x] Existing MobileBottomNav is reused.
- [x] Five primary destinations are truthful and functional.
- [x] Prompt Generator and Resources have canonical routes.
- [x] Home duplicate global shell chrome is removed.
- [x] Fixed mobile navigation does not cover content.
- [x] Mobile navigation is hidden at 900px+.
- [x] Loading/error presentation is integrated.
- [x] Reduced motion and route focus lifecycle are preserved.
- [x] Skip Link is Hash Router-safe.
- [x] ExamPilot remains a protected bypass.
- [x] Arabic Math remains protected.
- [x] Exam session recovery remains functional.
- [x] Design System fixtures remain isolated.
- [x] Production shell passes all eight responsive widths.
- [x] Canonical mobile/desktop evidence is generated.
- [x] Accessibility and touch-target checks pass.
- [x] Browser smoke remains green.
- [x] V3 visual/accessibility workflows remain green.
- [x] GitHub Pages/static build remains green.
- [x] Vercel remains green.
- [x] Protected Legacy/frozen Design System source diff is zero.
- [x] Final Stage 4 CI gate passes.
- [x] No merge to \`main\` was performed automatically.

---

## 12. Deferred work remains deferred

Stage 4 does not claim completion of:

- Home feature redesign;
- Curriculum feature redesign;
- final Practice redesign;
- Analytics;
- final Resources/Telegram UX;
- external Simulation integration;
- JSON curriculum infrastructure;
- question-bank import/migration;
- Backend/Auth/Database/CMS;
- protected Legacy removal.

These require their own owning stages and regression evidence.

---

## 13. Handoff

Later stages must consume:

1. \`docs/v3/11-design-system-contract.md\`
2. \`docs/v3/14-app-shell-contract.md\`

They must not recreate a parallel shell or navigation model.

The Stage 4 branch is ready for human PR review after this documentation freeze is verified.

PR #41 remains Draft until an explicit human decision changes that state.

Merge to \`main\` remains an explicit human approval gate.
