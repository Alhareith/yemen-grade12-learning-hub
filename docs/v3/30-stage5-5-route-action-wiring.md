# V3 Stage 5.5E — Route & Action Wiring

Status: **IMPLEMENTED — VALIDATION IN PROGRESS**

Depends on:
- `docs/v3/26-stage5-5-home-boundary.md`
- `docs/v3/27-stage5-5-home-visual-ux-contract.md`
- Stage 4 AppShell route contract

## Canonical Home action contract

Runtime source:
- `client/src/features/home/home-actions.ts`
- `client/src/features/home/home-actions.test.ts`

Mappings:

| Home action | Runtime destination | Semantics |
|---|---|---|
| المنهج | `#curriculum` | canonical Curriculum entry |
| التدريب | `#curriculum` | Stage 4 no-context Training fallback |
| مولد الأوامر | `#prompts` | Prompt Generator product route |
| المصادر | `#resources` | current Resources product route |
| المحاكاة | `#exam-pilot` | truthful protected current simulation |

No generic `#practice` landing route is invented.

Simulation is not added to primary navigation.

## Runtime changes

`HomeExperience.tsx` consumes the centralized action contract rather than duplicating raw hash strings.

The canonical Home no longer renders the old personal developer/profile footer below the Stage 5.5 reference composition.

The existing AppShell remains the sole owner of:
- global Header;
- desktop navigation;
- mobile bottom navigation;
- route lifecycle.

## Route truthfulness

Training:
- Home has no active Practice session context.
- Therefore the Training CTA resolves to Curriculum, exactly matching the frozen Stage 4 fallback contract.

Simulation:
- current runtime remains `#exam-pilot`.
- Stage 5.5 does not claim the deferred external Simulation replacement is already integrated.

Prompt Generator and Resources:
- Home only exposes entry actions.
- domain state remains outside the canonical Home presentation.

## Verification

Dedicated unit tests assert:
- canonical Curriculum / Prompts / Resources / ExamPilot hashes;
- Training fallback resolves to Curriculum;
- no generic fake Practice route is introduced.

## Result gate

Stage 5.5E closes only after the branch build/test verification remains green.
