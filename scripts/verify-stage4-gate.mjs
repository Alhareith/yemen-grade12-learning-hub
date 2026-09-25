import { execFileSync } from "node:child_process";
import fs from "node:fs";

const stage3Base = "0b5f2416a442225b02d699e5a1be85d16a29bb42";

const protectedPrefixes = [
  "client/src/pages/ExamPilot.tsx",
  "client/src/components/ExamRunner.tsx",
  "client/src/components/ExamResultReport.tsx",
  "client/src/components/LearningDashboard.tsx",
  "client/src/components/ArabicExamTypography.tsx",
  "client/src/exams/session-storage.ts",
  "shared/exams/",
  "client/src/lib/arabic-math.ts",
  "client/src/components/ArabicRichContent.tsx",
  "client/src/arabic-math.css",
  "client/src/design-system/",
];

const changedFiles = execFileSync(
  "git",
  ["diff", "--name-only", `${stage3Base}...HEAD`],
  { encoding: "utf8" },
)
  .split("\n")
  .map((line) => line.trim())
  .filter(Boolean);

const protectedChanges = changedFiles.filter((file) =>
  protectedPrefixes.some((prefix) =>
    prefix.endsWith("/") ? file.startsWith(prefix) : file === prefix,
  ),
);

if (protectedChanges.length > 0) {
  throw new Error(
    [
      "Stage 4 protected/frozen source changed after the Stage 3 baseline:",
      ...protectedChanges.map((file) => `- ${file}`),
    ].join("\n"),
  );
}

const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
const allDependencies = {
  ...(packageJson.dependencies ?? {}),
  ...(packageJson.devDependencies ?? {}),
};

const forbiddenRouterDependencies = Object.keys(allDependencies).filter(
  (name) =>
    name === "react-router" ||
    name === "react-router-dom" ||
    name.startsWith("@tanstack/react-router"),
);

if (forbiddenRouterDependencies.length > 0) {
  throw new Error(
    `Stage 4 must preserve hash routing without a new router dependency: ${forbiddenRouterDependencies.join(", ")}`,
  );
}

const requiredFiles = [
  "client/src/app/AppShell.tsx",
  "client/src/app/AppHeader.tsx",
  "client/src/app/AppMobileNavigation.tsx",
  "client/src/app/navigation.ts",
  "client/src/app/routing.ts",
  "client/src/app/route-lifecycle.ts",
  "client/src/app/protected-boundaries.test.ts",
  ".github/workflows/v3-shell-regression.yml",
];

const missingFiles = requiredFiles.filter((file) => !fs.existsSync(file));
if (missingFiles.length > 0) {
  throw new Error(
    ["Stage 4 required shell/gate files are missing:", ...missingFiles.map((file) => `- ${file}`)].join("\n"),
  );
}

console.log(
  JSON.stringify(
    {
      status: "pass",
      stage3Base,
      changedFileCount: changedFiles.length,
      protectedChanges: [],
      routerDependency: "none",
      requiredFiles: "present",
    },
    null,
    2,
  ),
);
