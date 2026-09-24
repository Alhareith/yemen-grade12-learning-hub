# V3 Stage 3E — Functional Icon System

Status: **LOCKED FOR STAGE 3E**

This document standardizes functional icons for Learning Hub V3. It does not redesign feature screens and it does not replace subject illustrations.

## 1. Source of truth

- Library: `lucide-react` (already installed).
- Runtime semantic map: `client/src/design-system/icons/icon-system.ts`.
- Subject illustrations, simulation artwork, quick-action artwork, and the brand mark are **visual assets**, not functional icons.
- Do not introduce a second general-purpose icon library unless a later visual comparison proves a concrete gap.

## 2. Core visual rules

| Rule | Locked value |
|---|---|
| Default stroke | 2 |
| Active stroke | 2.25 |
| XS | 16 px |
| SM | 18 px |
| MD | 20 px |
| LG | 24 px |
| Default style | Lucide outline |
| Filled icons | Not used by default |
| Icon-only target | minimum 44×44 px at the control level |

Do not size ordinary functional icons above 24 px to imitate illustrations. Illustrations stay in the asset system.

## 3. RTL direction contract

RTL is semantic, not a blanket CSS flip.

| Meaning | Glyph in Arabic RTL |
|---|---|
| Back / return | `ArrowRight` |
| Forward / drill in | `ChevronLeft` |
| Previous | `ChevronRight` |
| Next | `ChevronLeft` |
| Expand | `ChevronDown` |
| Collapse | `ChevronUp` |
| External link | `ExternalLink` unchanged |

Never apply `scaleX(-1)` globally to the icon system. The semantic map already chooses the correct directional glyph. This supports the Stage 3 requirement that RTL cover icon direction, arrows, ordering, controls, mobile navigation, and responsive mirroring rather than only `direction: rtl`. 

## 4. Screen map

### App shell / header

| Use case | Semantic key | Lucide |
|---|---|---|
| Mobile menu | `navigation.menu` | Menu |
| Return/back | `navigation.back` | ArrowRight |
| Search | `action.search` | Search |
| Home navigation | `navigation.home` | Home |

The brand mark is an image asset and must not be replaced by `BookOpen` or another Lucide icon.

### Home

| Use case | Semantic key | Lucide |
|---|---|---|
| Home bottom-nav item | `navigation.home` | Home |
| Prompt Generator | `content.prompts` | Sparkles |
| Practice | `content.practice` | Dumbbell |
| Curriculum | `content.curriculum` | BookOpen |
| Resources | `content.resources` | BookOpenCheck |
| External simulation | `content.simulation` | Target |
| Enter/open row | `navigation.forward` | ChevronLeft |
| External destination | `action.external` | ExternalLink |

Subject cards must use their production illustrations from Stage 3D. Do not use Sigma, Atom, FlaskConical, Dna, Languages, Type, or similar Lucide glyphs as V3 subject artwork.

### Curriculum

| Use case | Semantic key | Lucide |
|---|---|---|
| Back to shell | `navigation.back` | ArrowRight |
| Curriculum context | `content.curriculum` | BookOpen |
| Curriculum map/path | `content.curriculumMap` | Layers3 |
| Subjects / units collection | `content.subjects` | Library |
| Search | `action.search` | Search |
| Open subject/card | `navigation.forward` | ChevronLeft |
| Expand unit | `navigation.expand` | ChevronDown |
| Collapse unit | `navigation.collapse` | ChevronUp |
| Copy learning command | `action.copy` | Copy |
| Copied confirmation | `action.copied` | Check |
| Practice skill | `content.practice` | Dumbbell |
| YouTube resource | `content.video` | PlayCircle |
| Other external resource | `action.external` | ExternalLink |

The new product rule that only genuinely lesson-related YouTube resources are attached to lessons is a feature/data rule for later stages; 3E only defines the visual icon semantics.

### Prompt Generator

| Use case | Semantic key | Lucide |
|---|---|---|
| Generator identity | `content.prompts` | Sparkles |
| Back | `navigation.back` | ArrowRight |
| Paste | `action.paste` | ClipboardPaste |
| Clear | `action.clear` | Eraser |
| Copy | `action.clipboard` / `action.copy` | Clipboard / Copy |
| Copied | `action.copied` | Check |
| Forward/open prompt | `navigation.forward` | ChevronLeft |

The product language is **Prompt Generator / مولد الأوامر**. These icons must not imply an in-site AI assistant.

### Practice

| Use case | Semantic key | Lucide |
|---|---|---|
| Practice identity/start | `content.practice` | Dumbbell |
| Back to curriculum | `navigation.back` | ArrowRight |
| Correct | `status.success` | CheckCircle2 |
| Incorrect | `status.error` | XCircle |
| Next question | `navigation.next` | ChevronLeft |
| Retry/new round | `action.retry` | RotateCcw |
| Copy deepening prompt | `action.copy` | Copy |

### Resources

| Use case | Semantic key | Lucide |
|---|---|---|
| Resources section | `content.resources` | BookOpenCheck |
| Document/book | `content.document` | FileText |
| Questions/tests | `content.questions` | FileQuestion |
| YouTube | `content.video` | PlayCircle |
| Telegram | `content.telegram` | Send |
| External opening | `action.external` | ExternalLink |
| Expand group | `navigation.expand` | ChevronDown |

Brand/service marks such as YouTube or Telegram may later use their official brand mark if the visual reference requires it. That exception must remain separate from the Lucide functional system.

### External Simulation entry

| Use case | Semantic key | Lucide |
|---|---|---|
| Simulation identity | `content.simulation` | Target |
| Open external simulation | `action.external` | ExternalLink |
| Forward CTA | `navigation.forward` | ChevronLeft |

The simulation illustration from Stage 3D remains the dominant artwork. `Target` is only a small functional/context icon.

### Mobile bottom navigation

The target V3 bottom navigation uses functional Lucide icons only.

| Item | Semantic key |
|---|---|
| Home | `navigation.home` |
| Prompt Generator | `content.prompts` |
| Practice | `content.practice` |
| Curriculum | `content.curriculum` |
| Resources | `content.resources` |

Rules:
- 20 px icon target.
- Default stroke 2; active stroke 2.25.
- Active state changes color/stroke, not glyph.
- Never replace a navigation icon with a subject illustration.
- Label stays visible; icon alone is not the navigation affordance.

## 5. Status and feedback

| State | Semantic key | Icon |
|---|---|---|
| Success/correct | `status.success` | CheckCircle2 |
| Error/incorrect | `status.error` | XCircle |
| Warning | `status.warning` | AlertTriangle |
| Help/unknown/unanswered | `status.help` | CircleHelp |
| Verified | `status.verified` | ShieldCheck |
| Blocked/unavailable | `status.blocked` | ShieldAlert |

Status color is semantic and independent of the royal-blue brand:
- success → green/emerald family
- error → rose/red family
- warning → amber family
- neutral/help → ink/slate family

Do not recolor success/error to primary blue just to match the brand.

## 6. Exam runtime compatibility boundary

The existing internal exam runtime remains legacy/protected during Stage 3. Its current icons such as Grid2X2, Flag, Clock3, TimerOff, ChevronRight/Left, ShieldCheck, and status icons are **documented compatibility uses**, not a request to visually migrate the exam now.

Semantic mappings available for future migration:
- question grid → `content.questionGrid`
- flag/review → `content.flag`
- timed → `content.timed`
- untimed → `content.untimed`
- verified → `status.verified`
- blocked → `status.blocked`

## 7. Placement rules

- Text + leading icon in RTL: icon appears on the **right/start** when it identifies the action or section.
- Forward affordance: directional chevron appears on the **left/end**.
- Back affordance: ArrowRight appears with the return label.
- ExternalLink appears next to the external action/label; it does not replace the label.
- Status icon appears next to the status text and never as the sole communication of success/error.
- Search icon sits inside the search control on the RTL-appropriate start side unless the reference composition proves otherwise.
- Icons inherit color from the control unless a semantic status color is required.

## 8. Prohibited patterns

Do not:
- use subject Lucide glyphs as V3 subject illustrations;
- mix Lucide with another generic outline library;
- globally mirror all icons with CSS;
- use several different glyphs for the same semantic action;
- increase icon size to compensate for weak hierarchy;
- use icons without text for ambiguous actions;
- hard-code arbitrary stroke widths per screen;
- put feature-specific business logic in the icon system.

## 9. Current-to-V3 migration notes

Current UI contains repeated direct imports such as `ChevronLeft`, `ArrowRight`, `Copy`, `Target`, `Sparkles`, and subject glyphs. Stage 3E does **not** rewrite those feature files. Later migration stages should consume the semantic contract as each feature is rebuilt.

The notable current mismatch is subject representation: Home currently maps subjects to Sigma/Atom/FlaskConical/Dna/etc. V3 must use Stage 3D production illustrations instead.

## 10. Stage 3E acceptance criteria

- One general functional library: Lucide.
- Semantic map exists in code.
- Four icon sizes only.
- Two stroke weights only.
- RTL directional behavior documented and centralized.
- Screen/use-case map documented.
- Subject illustrations explicitly excluded.
- Status semantics remain independent from brand color.
- Legacy exam icon usage documented but not migrated.
- No feature screen restyled in 3E.
