# V3 Stage 5.5B — Home Visual + UX Contract

Status: **PASS — IMPLEMENTATION CONTRACT FROZEN FOR STAGE 5.5**

Depends on:

- `docs/v3/26-stage5-5-home-boundary.md`
- frozen Architecture / Legacy / Design System / AppShell / Curriculum contracts
- `Stage5_5_Home_Exact_Reference_Pack.zip`

Primary visual truth:

- Mobile: `references/04-mobile-content-only.png`
- Desktop: `references/03-desktop-content-only.png`

Presentation-only chrome in the reference is excluded from this contract.

---

## 1. Contract goal

The production Home must reproduce the **Home-body composition, hierarchy, density, spacing rhythm, feature emphasis, typography roles, V3 color language and CTA placement** of the Stage 5.5 reference pack as closely as practical while running inside the frozen Stage 4 AppShell.

This is not permission to “improve” or reorganize the reference.

The target is:

**Exact Home implementation against the reference pack, within frozen product contracts.**

---

## 2. Canonical Home route

Canonical Home remains the default hash route:

- empty hash / default → Home

Home does not create nested application routes.

The global Stage 4 AppShell remains visible around Home.

---

## 3. Section hierarchy

The canonical order is fixed.

### Mobile

1. Hero
2. Curriculum entry
3. Quick actions
4. Simulation
5. Resources / guidance
6. Stage 4 AppShell bottom-navigation footprint

### Desktop

1. Hero
2. Curriculum + Quick Actions middle composition
3. Simulation
4. Resources / guidance
5. quiet product footer only where needed

No section may be moved above Hero.

Simulation must not be reduced to a small quick-action tile.

Resources must not become more visually dominant than Curriculum or Simulation.

---

## 4. Home Hero contract

### Copy

H1:

`ابدأ من حيث تحتاج`

Supporting copy:

`تابع المنهج خطوة بخطوة، افهم الموضوعات الصعبة، تدرّب على المتاح، وقِس تقدمك بثقة.`

Primary CTA:

`ابدأ بالمنهج`

Secondary CTA:

`تدرّب الآن`

### Behavior

- Primary CTA → Curriculum.
- Secondary Training CTA → Stage 4 Training fallback; without Practice context it resolves to Curriculum.
- Home owns no Subject selection.

### Visual role

Hero is the dominant first Home section.

Required characteristics:

- light blue / white V3 surface;
- strong Ink/Navy H1;
- approved artwork integrated into the surface;
- two clear CTAs;
- no black/violet legacy hero;
- no fake AppShell controls.

### Mobile

At `390×844`:

- compact premium composition;
- H1 target role: 28px / 700;
- art and copy both visible;
- no desktop crop;
- target Home-body Hero minimum around 300px without forcing excessive whitespace;
- buttons remain ≥44px.

### Desktop

At `1536×1024`:

- target visual height about 280–310px;
- visual/art region approximately 52%;
- copy region approximately 48%;
- H1 role: 36px / 700;
- body: 16px / 400;
- two CTA controls aligned as a deliberate pair.

---

## 5. Curriculum entry contract

The Curriculum entry is a **single prominent Home card**, not a Subject selector and not a duplicated Curriculum browser.

Title:

`المنهج الدراسي`

Description:

`مواد الصف الثالث الثانوي في مسار واضح ومنظم.`

CTA:

`ادخل إلى المنهج`

Behavior:

→ `#curriculum`

Visual requirements:

- uses approved Curriculum artwork;
- larger visual weight than an individual Quick Action;
- large V3 surface radius;
- clear copy + CTA;
- must not expose Unit/Lesson/Skill state.

### Mobile

- one full-width card;
- artwork roughly 35–45% of composition;
- copy/CTA takes remaining width.

### Desktop

- occupies approximately 34% of the middle composition;
- sits beside Quick Actions rather than above them as a stretched mobile card.

---

## 6. Quick Actions contract

Four actions are shown.

Canonical semantics/order:

1. المنهج
2. التدريب
3. مولد الأوامر
4. المصادر

Descriptions:

### المنهج
`تصفح المواد والوحدات والدروس المعتمدة.`

### التدريب
`ابدأ من المنهج للوصول إلى التدريب المتاح.`

### مولد الأوامر
`احصل على أوامر جاهزة تساعدك في الفهم والمذاكرة.`

### المصادر
`كتب وفيديوهات وروابط مفيدة مرتبة للطالب.`

Behavior:

- المنهج → `#curriculum`
- التدريب → Stage 4 Training fallback → Curriculum when no Practice context
- مولد الأوامر → `#prompts`
- المصادر → `#resources`

Visual requirements:

- quieter than Curriculum and Simulation;
- feature-tinted V3 surfaces;
- one functional icon / approved artwork treatment;
- title + short description;
- clear directional affordance;
- no second icon library.

### Mobile

Stage 5.5G browser/reference calibration resolves the pack's written 2×2 note against the canonical visual source:

- 390 / 430 → four compact cards in one row, matching the reference image;
- 360 → 2×2 fallback for readable content and 44px interaction targets;
- 768 compact/tablet → 2×2;
- calibrated gap remains compact;
- RTL visual order preserves the four canonical semantics.

This amendment changes composition only; it does not change the four action semantics or hierarchy.

### Desktop

- four equal cards in one row;
- occupy approximately 66% of the middle composition;
- 16px gap.

---

## 7. Simulation contract

Simulation remains visually strong and full-width.

Current truthful runtime title:

`محاكاة الرياضيات`

Description:

`اختبر مستواك في محاكاة كاملة مع حفظ واستكمال ونتيجة بعد التسليم.`

CTA:

`ابدأ المحاكاة`

Behavior:

→ current protected `#exam-pilot`

Stage 5.5 does not claim external simulation integration.

Visual requirements:

- dark Navy/Primary blue surface;
- approved Simulation artwork;
- Simulation artwork is a visual region, not a functional icon replacement;
- Target icon may appear as a functional cue;
- CTA remains obvious;
- Simulation is not a sixth AppShell primary item.

Optional supporting cues may state only currently truthful capabilities, such as:

- حفظ واستكمال
- نتيجة بعد التسليم
- مراجعة الأخطاء / التوجيه currently supported by runtime

### Mobile

- one full-width banner/card;
- art integrated without covering copy;
- CTA visible before bottom-navigation overlap.

### Desktop

- full-width;
- target height around 125–145px;
- composition: artwork region + central copy + supporting cues/CTA;
- 24px large-surface radius.

---

## 8. Resources / guidance contract

Title:

`مصادر وإرشادات مهمة`

Description:

`وصول سريع إلى الموارد التي تحتاجها أثناء رحلتك الدراسية.`

CTA:

`عرض جميع المصادر`

Behavior:

→ `#resources`

Resources remains visually secondary.

### Mobile

- compact single rail/card;
- no full resource catalogue inside Home.

### Desktop

- low-height full-width rail;
- may contain up to four compact illustrative guidance/resource tiles only when they remain route-neutral and presentation-only;
- all-resources CTA remains visible;
- no subject-specific filtering or catalogue state inside Home.

---

## 9. Footer strategy

Home must not restore the previous personal developer/profile/social footer.

A footer, if present in the Home body, must be:

- product-oriented;
- quiet;
- visually subordinate;
- free of personal-profile promotion;
- unnecessary on mobile when AppShell/navigation already provides closure.

The reference-pack resource/footer rail may serve as the final Home-body section.

---

## 10. Design System usage

Required:

- `[data-v3-ui]` scope;
- V3 tokens;
- IBM Plex Sans Arabic 400/500/600/700 only;
- `v3AssetPaths`;
- `functionalIcons`;
- approved primitives/composites where semantics fit.

Preferred production assets:

- `v3AssetPaths.actions.curriculum`
- `v3AssetPaths.actions.practice`
- `v3AssetPaths.actions.prompts`
- `v3AssetPaths.simulation`
- approved Subject art only when used as decorative visual support

No screenshot or reference crop may be shipped as a production surface.

---

## 11. Locked Home color roles

Use the frozen Design System values:

- page: `#F7FBFF`
- page blue: `#E8F3FE`
- card: `#FFFFFF`
- border: `#D8E8F7`
- ink: `#0F2A68`
- navy: `#0A1A74`
- primary: `#0B4FBF`
- primary strong: `#073EA5`
- primary bright: `#287BEB`
- prompts: `#F0EBFD`
- practice: `#E9FAF1`
- curriculum: `#E8F3FE`
- simulation accent: `#FEEFD3`

Home must not reintroduce violet as its primary brand identity.

---

## 12. Geometry and rhythm

Frozen shared Home targets:

- max container: 1280px
- mobile content padding: 14px
- desktop content padding: 24px
- mobile section gap: 16px
- desktop section gap: 24px
- mobile quick-grid gap: 10px
- desktop grid gap: 16px
- card radius: 18px
- large surface radius: 24px
- button radius: 12px
- touch target minimum: 44px

No global `overflow-x: hidden`.

No fixed height may clip Arabic content.

---

## 13. Responsive composition

Validation widths remain:

`360 / 390 / 430 / 768 / 1024 / 1280 / 1440 / 1536`

Composition boundaries:

- <640px → mobile
- 640–899px → compact/tablet
- 900px+ → desktop
- 1200px+ → wide reference range

AppShell mobile navigation remains active below 900px.

Home does not introduce a conflicting shell breakpoint.

---

## 14. Accessibility

Required:

- Arabic `lang="ar"` and RTL semantics;
- one logical H1 on Home;
- semantic sections/headings;
- buttons/links with accessible names;
- ≥44px interactive targets;
- visible keyboard focus;
- no color-only action meaning;
- contrast aligned with V3 contract;
- reduced-motion support;
- decorative artwork uses empty alt where visible copy already carries meaning;
- no horizontal overflow.

---

## 15. Performance

Required:

- zero new runtime dependency for Home layout;
- CSS Grid/Flex for composition;
- no animation library;
- no carousel;
- no video background;
- no remote runtime image dependency;
- approved WebP reused;
- image geometry reserved via dimensions/aspect ratio;
- Hero artwork loading intentional;
- below-fold artwork lazy where appropriate;
- DOM remains shallow.

A new Home-specific artwork is allowed only if approved assets cannot produce the required composition and must be documented separately.

---

## 16. Visual matching priorities

Fix deviations in this order:

1. section order / overall composition;
2. container widths and section heights;
3. whitespace and card proportions;
4. typography roles;
5. artwork size/crop/object-position;
6. borders, radii and shadows;
7. icon size and CTA alignment.

Allowed variance:

- font rasterization;
- generated artwork crop;
- 1–3px browser differences;
- truthful copy corrections.

Not allowed:

- wrong hierarchy;
- missing artwork;
- wrong breakpoint composition;
- screenshot-as-background;
- fake shell chrome.

---

## 17. Stage 5.5C implementation target

Mobile implementation is accepted for progression to Desktop only when the production Home at the canonical mobile composition follows:

- Hero;
- prominent Curriculum entry;
- 2×2 Quick Actions;
- full-width Simulation;
- compact Resources;
- preserved AppShell bottom navigation.

The target reference is `390×844`.

---

## 18. Stage 5.5D implementation target

Desktop implementation is accepted when the production Home at the canonical desktop composition follows:

- Hero art/copy split;
- Curriculum ≈34% + Quick Actions ≈66%;
- full-width Simulation;
- quiet Resources rail;
- AppShell desktop navigation untouched.

The target reference is `1536×1024`.

---

## 19. Stage 5.5B exit criteria

- [x] section hierarchy frozen.
- [x] exact Home copy roles frozen.
- [x] route semantics frozen.
- [x] mobile composition frozen.
- [x] desktop composition frozen.
- [x] Simulation truth frozen to current runtime.
- [x] Resources remains secondary and domain-free.
- [x] AppShell excluded from Home composition.
- [x] V3 Design System asset/token rules frozen.
- [x] responsive/accessibility/performance requirements frozen.
- [x] visual matching priorities frozen.

## Result

**Stage 5.5B — PASS.**

Stage 5.5C may now implement the canonical mobile Home against this contract.
