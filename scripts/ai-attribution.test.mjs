import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";

const tempDir = await mkdtemp(join(tmpdir(), "traffodata-ai-referral-"));

try {
  const entry = join(tempDir, "entry.ts");
  const outfile = join(tempDir, "analytics.mjs");
  await writeFile(
    entry,
    `export { classifyAiSource, resolveAiAttribution } from "${process.cwd()}/src/lib/siteAnalytics.ts";\n`,
  );
  await build({
    entryPoints: [entry],
    outfile,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const { classifyAiSource, resolveAiAttribution } = await import(pathToFileURL(outfile).href);

  assert.equal(typeof classifyAiSource, "function", "AI traffic needs a source classifier.");
  assert.equal(classifyAiSource("https://chatgpt.com/c/example"), "chatgpt");
  assert.equal(classifyAiSource("https://chat.openai.com/c/example"), "chatgpt");
  assert.equal(classifyAiSource("https://www.perplexity.ai/search/example"), "perplexity");
  assert.equal(classifyAiSource("https://gemini.google.com/app/example"), "gemini");
  assert.equal(classifyAiSource("https://copilot.microsoft.com/chats/example"), "copilot");
  assert.equal(classifyAiSource("", "?utm_source=claude"), "claude");
  assert.equal(classifyAiSource("https://evil-chatgpt.com/"), null);
  assert.equal(classifyAiSource("https://www.google.com/search?q=software"), null);
  assert.equal(classifyAiSource("not-a-url"), null);
  assert.equal(classifyAiSource(""), null);

  assert.equal(typeof resolveAiAttribution, "function", "AI attribution needs visit boundaries.");
  const now = Date.UTC(2026, 8, 26, 12);
  const previous = { source: "chatgpt", startedAt: now - 60_000 };
  assert.deepEqual(
    resolveAiAttribution(previous, "https://chatgpt.com/c/new", "", now, "https://traffodata.com"),
    { attribution: { source: "chatgpt", startedAt: now }, isNewVisit: true },
    "A second external referral should count as a new visit even from the same assistant.",
  );
  assert.deepEqual(
    resolveAiAttribution(
      previous,
      "https://traffodata.com/work",
      "",
      now,
      "https://traffodata.com",
    ),
    { attribution: previous, isNewVisit: false },
    "Internal navigation should retain recent source attribution.",
  );
  assert.deepEqual(
    resolveAiAttribution(previous, "", "", now, "https://traffodata.com"),
    { attribution: null, isNewVisit: false },
    "A direct return must clear an earlier assistant source.",
  );
  assert.deepEqual(
    resolveAiAttribution(
      previous,
      "https://www.google.com/search?q=software",
      "",
      now,
      "https://traffodata.com",
    ),
    { attribution: null, isNewVisit: false },
    "A search return must clear an earlier assistant source.",
  );
  assert.deepEqual(
    resolveAiAttribution(
      previous,
      "https://traffodata.com/work",
      "",
      now + 31 * 60_000,
      "https://traffodata.com",
    ),
    { attribution: null, isNewVisit: false },
    "Attribution should expire after 30 minutes.",
  );

  console.log("AI source classification and visit attribution verified");
} finally {
  await rm(tempDir, { recursive: true, force: true });
}
