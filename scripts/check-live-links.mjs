import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const sourceFiles = [
  "client/src/data/richCatalog.ts",
  "client/src/data/unitExpansions.ts",
];
const reportDir = path.join(root, "reports");
const maxConcurrent = 8;

const isConfirmedDead = (status) => status === 404 || status === 410;
const isReachable = (status) => (status >= 200 && status < 400) || [401, 403, 405].includes(status);

async function fetchStatus(url, method) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);
  try {
    const response = await fetch(url, {
      method,
      redirect: "follow",
      headers: method === "GET"
        ? { Range: "bytes=0-0", "User-Agent": "YemenGrade12LinkVerifier/1.0" }
        : { "User-Agent": "YemenGrade12LinkVerifier/1.0" },
      signal: controller.signal,
    });
    return { status: response.status, finalUrl: response.url };
  } catch (error) {
    return { status: 0, error: error instanceof Error ? error.message : String(error) };
  } finally {
    clearTimeout(timeout);
  }
}

async function verify(url) {
  const head = await fetchStatus(url, "HEAD");
  if (head.status !== 405 && head.status !== 0) return { url, ...head, method: "HEAD" };
  const get = await fetchStatus(url, "GET");
  return { url, ...get, method: "GET" };
}

async function runWithLimit(items, action) {
  const results = [];
  const queue = [...items];
  const workers = Array.from({ length: Math.min(maxConcurrent, items.length) }, async () => {
    while (queue.length) {
      const item = queue.shift();
      if (item) results.push(await action(item));
    }
  });
  await Promise.all(workers);
  return results.sort((a, b) => a.url.localeCompare(b.url));
}

const contents = await Promise.all(sourceFiles.map((file) => fs.readFile(path.join(root, file), "utf8")));
const urls = [...new Set(contents.flatMap((content) => [...content.matchAll(/https?:\/\/[^"'`\s]+/g)].map((match) => match[0])))];
const results = await runWithLimit(urls, verify);
const report = {
  checkedAt: new Date().toISOString(),
  rules: {
    keep: "كل استجابة 2xx أو 3xx أو 401 أو 403 أو 405، وكذلك الاستجابات غير الحاسمة.",
    remove: "فقط الاستجابة 404 أو 410 التي تثبت أن الرابط معطل أو أزيل.",
  },
  total: results.length,
  reachable: results.filter((result) => isReachable(result.status)),
  confirmedDead: results.filter((result) => isConfirmedDead(result.status)),
  uncertain: results.filter((result) => !isReachable(result.status) && !isConfirmedDead(result.status)),
};

await fs.mkdir(reportDir, { recursive: true });
await fs.writeFile(path.join(reportDir, "link-audit.json"), JSON.stringify(report, null, 2), "utf8");
console.log(JSON.stringify({
  total: report.total,
  reachable: report.reachable.length,
  confirmedDead: report.confirmedDead.length,
  uncertain: report.uncertain.length,
  dead: report.confirmedDead.map((result) => result.url),
}, null, 2));
