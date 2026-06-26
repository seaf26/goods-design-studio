export type HeroQuality = "off" | "low" | "medium" | "high";

export interface HeroQualityInput {
  prefersReducedMotion: boolean;
  saveData: boolean;
  coarsePointer: boolean;
  width: number;
  height: number;
  dpr: number;
  hardwareConcurrency?: number;
  deviceMemory?: number;
  webglSupported: boolean;
}

export interface HeroLiquidSettings {
  enabled: boolean;
  maxPixelRatio: number;
  maxFps: number;
  interactiveMaxFps: number;
  resolution: number;
  iterationsPoisson: number;
  iterationsViscous: number;
  mouseForce: number;
  cursorSize: number;
  hoverForce: number;
  hoverOrbit: number;
  autoSpeed: number;
  autoIntensity: number;
  textBlur: boolean;
  edgeGlow: boolean;
}

export function resolveHeroQuality(input: HeroQualityInput): HeroQuality {
  if (input.prefersReducedMotion || input.saveData || !input.webglSupported) return "off";

  const isMobileViewport = input.width < 768 || input.coarsePointer;
  if (isMobileViewport) return "low";

  const cores = input.hardwareConcurrency ?? 4;
  const memory = input.deviceMemory ?? 4;
  const isWeakLaptop = cores <= 4 || memory <= 4;
  if (isWeakLaptop) return "low";

  const isExpensiveDisplay = input.dpr >= 1.75 || input.width * input.height > 2_400_000;
  if (isExpensiveDisplay) return "medium";

  return "high";
}

export function getHeroLiquidSettings(quality: HeroQuality): HeroLiquidSettings {
  switch (quality) {
    case "high":
      return {
        enabled: true,
        maxPixelRatio: 1.5,
        maxFps: 45,
        interactiveMaxFps: 60,
        resolution: 0.42,
        iterationsPoisson: 22,
        iterationsViscous: 16,
        mouseForce: 42,
        cursorSize: 280,
        hoverForce: 0.44,
        hoverOrbit: 0.038,
        autoSpeed: 0.62,
        autoIntensity: 3.8,
        textBlur: true,
        edgeGlow: true,
      };
    case "medium":
      return {
        enabled: true,
        maxPixelRatio: 1.25,
        maxFps: 30,
        interactiveMaxFps: 60,
        resolution: 0.34,
        iterationsPoisson: 16,
        iterationsViscous: 12,
        mouseForce: 30,
        cursorSize: 238,
        hoverForce: 0.28,
        hoverOrbit: 0.026,
        autoSpeed: 0.46,
        autoIntensity: 2.6,
        textBlur: false,
        edgeGlow: true,
      };
    case "low":
      return {
        enabled: true,
        maxPixelRatio: 1,
        maxFps: 30,
        interactiveMaxFps: 45,
        resolution: 0.26,
        iterationsPoisson: 12,
        iterationsViscous: 8,
        mouseForce: 22,
        cursorSize: 192,
        hoverForce: 0.16,
        hoverOrbit: 0.018,
        autoSpeed: 0.34,
        autoIntensity: 1.8,
        textBlur: false,
        edgeGlow: false,
      };
    case "off":
    default:
      return {
        enabled: false,
        maxPixelRatio: 1,
        maxFps: 0,
        interactiveMaxFps: 0,
        resolution: 0,
        iterationsPoisson: 0,
        iterationsViscous: 0,
        mouseForce: 0,
        cursorSize: 0,
        hoverForce: 0,
        hoverOrbit: 0,
        autoSpeed: 0,
        autoIntensity: 0,
        textBlur: false,
        edgeGlow: false,
      };
  }
}
