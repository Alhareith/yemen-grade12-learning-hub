import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const verifiedDir = path.join(root, "research", "exams", "2025-agp-verified");
const manifest = JSON.parse(fs.readFileSync(path.join(verifiedDir, "manifest.json"), "utf8"));
const answerIndex = JSON.parse(
  fs.readFileSync(path.join(root, "research", "exams", "2025-agp-answer-index.json"), "utf8"),
);

const errors = [];
let verifiedTotal = 0;
let reviewTotal = 0;
let slotTotal = 0;

for (const entry of manifest.transcribedModels) {
  const filePath = path.join(verifiedDir, entry.file);
  if (!fs.existsSync(filePath)) {
    errors.push(`Missing transcription file: ${entry.file}`);
    continue;
  }

  const doc = JSON.parse(fs.readFileSync(filePath, "utf8"));
  if (doc.model !== entry.model) errors.push(`${entry.file}: model mismatch`);
  if (!Array.isArray(doc.questions) || doc.questions.length !== 40) {
    errors.push(`${entry.file}: expected 40 question slots, got ${doc.questions?.length ?? "none"}`);
    continue;
  }

  const sourceModel = answerIndex.models.find((item) => item.model === entry.model);
  if (!sourceModel) {
    errors.push(`${entry.file}: model ${entry.model} missing from answer index`);
    continue;
  }

  const seen = new Set();
  let verified = 0;
  let review = 0;

  for (const question of doc.questions) {
    if (!Number.isInteger(question.question) || question.question < 1 || question.question > 40) {
      errors.push(`${entry.file}: invalid question number ${question.question}`);
      continue;
    }
    if (seen.has(question.question)) errors.push(`${entry.file}: duplicate question ${question.question}`);
    seen.add(question.question);

    const expectedKey = question.question <= 20
      ? sourceModel.rawAnswers1to20[question.question - 1]
      : sourceModel.rawAnswers21to40[question.question - 21];
    if (question.officialKey !== expectedKey) {
      errors.push(
        `${entry.file} q${question.question}: officialKey=${question.officialKey}, answer index=${expectedKey}`,
      );
    }

    if (question.status === "verified") {
      verified += 1;
      if (typeof question.stem !== "string" || question.stem.trim().length === 0) {
        errors.push(`${entry.file} q${question.question}: verified question must have non-empty stem`);
      }
      if (typeof question.officialAnswer !== "string" || question.officialAnswer.trim().length === 0) {
        errors.push(`${entry.file} q${question.question}: verified question must have officialAnswer`);
      }
    } else if (question.status === "needs-visual-review") {
      review += 1;
      if (question.stem !== null) {
        errors.push(`${entry.file} q${question.question}: needs-visual-review must keep stem=null`);
      }
    } else if (question.status !== "source-anomaly") {
      errors.push(`${entry.file} q${question.question}: unsupported status ${question.status}`);
    }
  }

  if (seen.size !== 40) errors.push(`${entry.file}: question numbers are not exactly 1..40`);
  if (verified !== entry.verifiedTextQuestions) {
    errors.push(`${entry.file}: manifest verified=${entry.verifiedTextQuestions}, actual=${verified}`);
  }
  if (review !== entry.needsVisualReview) {
    errors.push(`${entry.file}: manifest review=${entry.needsVisualReview}, actual=${review}`);
  }

  verifiedTotal += verified;
  reviewTotal += review;
  slotTotal += doc.questions.length;
}

if (slotTotal !== manifest.progress.structuredQuestionSlots) {
  errors.push(`manifest structuredQuestionSlots=${manifest.progress.structuredQuestionSlots}, actual=${slotTotal}`);
}
if (verifiedTotal !== manifest.progress.verifiedTextQuestions) {
  errors.push(`manifest verifiedTextQuestions=${manifest.progress.verifiedTextQuestions}, actual=${verifiedTotal}`);
}
if (reviewTotal !== manifest.progress.remainingStructuredSlotsNeedingVisualReview) {
  errors.push(
    `manifest remainingStructuredSlotsNeedingVisualReview=${manifest.progress.remainingStructuredSlotsNeedingVisualReview}, actual=${reviewTotal}`,
  );
}

if (errors.length > 0) {
  console.error("AGP verified transcription validation FAILED:\n" + errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(
  `AGP verified transcription validation PASS: ${manifest.transcribedModels.length} models, ${slotTotal} slots, ${verifiedTotal} verified texts, ${reviewTotal} awaiting visual review.`,
);
