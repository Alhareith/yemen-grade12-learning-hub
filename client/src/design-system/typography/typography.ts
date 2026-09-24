export const v3Typography = {
  family: {
    primary: '"IBM Plex Sans Arabic", "Noto Sans Arabic", Tahoma, Arial, sans-serif',
    primaryName: "IBM Plex Sans Arabic",
    fallbackArabic: "Noto Sans Arabic",
  },

  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

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
} as const;

export const v3FontLoadingContract = {
  packageName: "@fontsource/ibm-plex-sans-arabic",
  packageVersion: "5.3.0",
  delivery: "self-hosted-through-vite-bundle",
  requiredWeights: [400, 500, 600, 700],
  externalRuntimeFontCdnAllowed: false,
} as const;

export const v3RtlContract = {
  rootDirection: "rtl",
  rootTextAlign: "start",
  mixedContent: {
    numbers: "ltr-isolate",
    urls: "ltr-isolate",
    code: "ltr-isolate",
    arabicText: "rtl",
  },
  globalIconMirroring: false,
  mathStylesheetBoundary: "client/src/arabic-math.css",
} as const;
