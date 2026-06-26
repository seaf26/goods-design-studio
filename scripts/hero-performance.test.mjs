import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

async function loadHeroPerformanceModule() {
  const sourceUrl = new URL("../src/components/site/heroPerformance.ts", import.meta.url);
  const source = readFileSync(sourceUrl, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
    },
  });
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`;
  return import(moduleUrl);
}

const baseInput = {
  prefersReducedMotion: false,
  saveData: false,
  coarsePointer: false,
  width: 1440,
  height: 900,
  dpr: 1,
  hardwareConcurrency: 8,
  deviceMemory: 8,
  webglSupported: true,
};

test("disables liquid hero for reduced motion, save-data, or no WebGL", async () => {
  const { resolveHeroQuality } = await loadHeroPerformanceModule();

  assert.equal(resolveHeroQuality({ ...baseInput, prefersReducedMotion: true }), "off");
  assert.equal(resolveHeroQuality({ ...baseInput, saveData: true }), "off");
  assert.equal(resolveHeroQuality({ ...baseInput, webglSupported: false }), "off");
});

test("keeps mobile/coarse pointers on low animated liquid quality", async () => {
  const { resolveHeroQuality } = await loadHeroPerformanceModule();

  assert.equal(
    resolveHeroQuality({ ...baseInput, width: 390, height: 844, dpr: 3, coarsePointer: true }),
    "low",
  );
});

test("uses low/medium/high quality tiers for laptop and desktop capability", async () => {
  const { resolveHeroQuality, getHeroLiquidSettings } = await loadHeroPerformanceModule();

  assert.equal(
    resolveHeroQuality({ ...baseInput, hardwareConcurrency: 4, deviceMemory: 4 }),
    "low",
  );
  assert.equal(
    resolveHeroQuality({ ...baseInput, dpr: 2, hardwareConcurrency: 6, deviceMemory: 8 }),
    "medium",
  );
  assert.equal(resolveHeroQuality(baseInput), "high");

  assert.equal(getHeroLiquidSettings("off").enabled, false);
  assert.deepEqual(
    {
      maxPixelRatio: getHeroLiquidSettings("low").maxPixelRatio,
      maxFps: getHeroLiquidSettings("low").maxFps,
      iterationsPoisson: getHeroLiquidSettings("low").iterationsPoisson,
    },
    { maxPixelRatio: 1, maxFps: 30, iterationsPoisson: 12 },
  );
  assert.equal(getHeroLiquidSettings("high").enabled, true);
  assert.equal(getHeroLiquidSettings("high").iterationsPoisson < 32, true);
});
