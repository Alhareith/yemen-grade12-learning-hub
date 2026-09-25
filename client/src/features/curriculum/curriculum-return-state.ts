export type CurriculumReturnContext = {
  subjectId: string;
  unitId: string;
  lessonId: string;
  skillId: string;
};

let pendingReturnContext: CurriculumReturnContext | null = null;

/**
 * Keeps only the one-time in-memory context needed to return from the current
 * skill-based Practice route to the Lesson that launched it.
 *
 * This deliberately does not use localStorage/sessionStorage or a Curriculum
 * deep-link hash. A refresh therefore remains a fresh Curriculum entry.
 */
export function prepareCurriculumReturnAfterPractice(
  context: CurriculumReturnContext,
) {
  pendingReturnContext = { ...context };
}

export function consumeCurriculumReturnAfterPractice() {
  if (!pendingReturnContext) return null;

  const context = pendingReturnContext;
  pendingReturnContext = null;
  return context;
}

export function cancelCurriculumReturnAfterPractice() {
  pendingReturnContext = null;
}
