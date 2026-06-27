import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";

const tempDir = await mkdtemp(join(tmpdir(), "traffodata-og-"));
const entry = join(tempDir, "entry.ts");
const outfile = join(tempDir, "seo.mjs");

try {
  await writeFile(entry, `export { getCairoOgImage, BRAND_ASSETS } from "${process.cwd()}/src/components/site/seo.ts";\n`);

  await build({
    entryPoints: [entry],
    outfile,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    external: ["./workData"],
    logLevel: "silent",
  });

  const { getCairoOgImage, BRAND_ASSETS } = await import(pathToFileURL(outfile).href);

  assert.equal(BRAND_ASSETS.og, "/brand/traffodata-og-cairo-light.png");
  assert.equal(getCairoOgImage(new Date("2026-06-27T03:59:00Z")), "/brand/traffodata-og-cairo-dark.png");
  assert.equal(getCairoOgImage(new Date("2026-06-27T04:00:00Z")), "/brand/traffodata-og-cairo-light.png");
  assert.equal(getCairoOgImage(new Date("2026-06-27T14:59:00Z")), "/brand/traffodata-og-cairo-light.png");
  assert.equal(getCairoOgImage(new Date("2026-06-27T15:00:00Z")), "/brand/traffodata-og-cairo-dark.png");

  console.log("Cairo OG schedule verified");
} finally {
  await rm(tempDir, { recursive: true, force: true });
}
