export const v3Tokens = {
  color: {
    primary: "#0B4FBF",
    primaryStrong: "#073EA5",
    primaryBright: "#287BEB",
    navy: "#0A1A74",
    ink: "#0F2A68",
    page: "#F7FBFF",
    pageBlue: "#E8F3FE",
    card: "#FFFFFF",
    border: "#D8E8F7",
    search: "#F3F8FE",
    prompts: "#F0EBFD",
    practice: "#E9FAF1",
    curriculum: "#E8F3FE",
    simulation: "#FEEFD3",
    subject: {
      math: "#E1F0FE",
      physics: "#F8EEFD",
      chemistry: "#FDF6E8",
      biology: "#E6FAF1",
      arabic: "#FCEBF2",
      english: "#EAF4FF",
      islamic: "#E9FAF1",
      social: "#F6EDFA",
    },
    semantic: {
      success: "#059669",
      successSurface: "#ECFDF5",
      error: "#E11D48",
      errorSurface: "#FFF1F2",
      warning: "#D97706",
      warningSurface: "#FFFBEB",
    },
  },

  spacing: {
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    14: 56,
  },

  radius: {
    control: 10,
    button: 12,
    medium: 14,
    card: 18,
    surface: 24,
    pill: 999,
  },

  shadow: {
    card: "0 8px 24px rgba(15, 42, 104, 0.08)",
    raised: "0 12px 32px rgba(15, 42, 104, 0.10)",
    insetSoft: "inset 0 0 0 1px rgba(37, 99, 235, 0.08)",
  },

  control: {
    mobileHeight: 44,
    desktopButtonHeight: 46,
    searchHeight: 44,
    touchTarget: 44,
  },

  typography: {
    mobile: {
      h1: { size: 28, lineHeight: 1.25, weight: 700 },
      h2: { size: 22, lineHeight: 1.3, weight: 700 },
      h3: { size: 17, lineHeight: 1.35, weight: 600 },
      body: { size: 14, lineHeight: 1.75, weight: 400 },
      meta: { size: 12, lineHeight: 1.6, weight: 500 },
      button: { size: 14, lineHeight: 1.2, weight: 600 },
    },
    desktop: {
      h1: { size: 36, lineHeight: 1.25, weight: 700 },
      h2: { size: 27, lineHeight: 1.3, weight: 700 },
      h3: { size: 20, lineHeight: 1.35, weight: 600 },
      body: { size: 16, lineHeight: 1.75, weight: 400 },
      meta: { size: 13, lineHeight: 1.6, weight: 500 },
      button: { size: 16, lineHeight: 1.2, weight: 600 },
    },
  },

  layout: {
    containerMax: 1280,
    breakpoints: {
      mobile: 640,
      desktop: 900,
      wide: 1200,
    },
    mobile: {
      contentPadding: 14,
      headerHeight: 58,
      sectionGap: 16,
      gridGap: 10,
      subjectColumns: 2,
      simulationMinHeight: 138,
      bottomNavHeight: 64,
    },
    desktop: {
      contentPadding: 24,
      headerHeight: 72,
      sectionGap: 24,
      gridGap: 16,
      subjectColumns: 4,
      simulationMinHeight: 108,
    },
    curriculumSubjectCard: {
      radius: 18,
      visualAspectRatio: 1.35,
    },
  },
} as const;

export type V3Tokens = typeof v3Tokens;

/**
 * Values intentionally not locked yet:
 * - hero exact height
 * - illustration rendered sizes
 * - curriculum sidebar width
 * - exact button gradient recipe
 * - feature-specific card heights
 */
export const v3TokenDeferredDecisions = [
  "hero-height",
  "illustration-rendered-size",
  "curriculum-sidebar-width",
  "button-gradient",
  "feature-card-height",
] as const;
