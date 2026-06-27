# Hero Animation Performance Study

## Summary

The Lighthouse baseline did not show a page-load blocking problem. Mobile had 0 ms TBT and 0 CLS, and desktop was already at 99-100 Performance. The more likely user-facing cause was runtime smoothness: WebGL frame cost on weaker devices plus global scroll/pointer interception.

The fix keeps the TRAFFODATA liquid hero animated and interactive for normal users. The only full `off` cases are accessibility or capability exceptions: `prefers-reduced-motion`, Save-Data, or no WebGL. Mobile/coarse-pointer devices now receive a low animated liquid profile instead of the static fallback.

## How It Was Tested

Production build:

```sh
npm run build
```

The requested `npx vite preview --host 127.0.0.1 --port 4173` path returned HTTP 500 for this Nitro/Vercel output because it looked for `dist/server/server.js`. The working local production preview was:

```sh
npx srvx serve --port 4173 --host 127.0.0.1 \
  --static /Users/seafgamel/Documents/trraficodata/goods-design-studio/.vercel/output/static \
  --entry /Users/seafgamel/Documents/trraficodata/goods-design-studio/.vercel/output/functions/__server.func/index.mjs \
  --prod
```

Lighthouse was run with Brave/Chromium using Lighthouse 12.8.2, three runs per device profile, and median values were used. Reports are saved under:

- `docs/performance/lighthouse/`
- `docs/performance/lighthouse-after/`

## Lighthouse Results

| Profile | Metric      | Before Median | After Median |
| ------- | ----------- | ------------: | -----------: |
| Mobile  | Performance |            86 |           89 |
| Mobile  | FCP         |         2.9 s |        2.8 s |
| Mobile  | LCP         |         3.1 s |        2.8 s |
| Mobile  | Speed Index |         4.6 s |        4.4 s |
| Mobile  | TBT         |          0 ms |         0 ms |
| Mobile  | CLS         |             0 |            0 |
| Desktop | Performance |           100 |          100 |
| Desktop | FCP         |         0.4 s |        0.4 s |
| Desktop | LCP         |         0.4 s |        0.6 s |
| Desktop | Speed Index |         0.7 s |        0.6 s |
| Desktop | TBT         |          0 ms |         0 ms |
| Desktop | CLS         |             0 |            0 |

Lighthouse still reports text compression opportunities because the local preview server is not configured like production edge hosting. That is not a hero animation bottleneck.

## Build Payloads

| Asset                        |                     Before |                      After | Notes                                                        |
| ---------------------------- | -------------------------: | -------------------------: | ------------------------------------------------------------ |
| `styles` client chunk        |  136.37 kB / 21.81 kB gzip |  136.32 kB / 21.80 kB gzip | Essentially unchanged.                                       |
| route `index` client chunk   |   70.43 kB / 27.61 kB gzip |   70.12 kB / 27.48 kB gzip | Slightly smaller.                                            |
| `Landing` client chunk       |  197.47 kB / 63.09 kB gzip |  197.74 kB / 63.13 kB gzip | Small increase from interactive FPS prop wiring.             |
| `LiquidEther` lazy chunk     | 520.61 kB / 131.45 kB gzip | 520.85 kB / 131.50 kB gzip | Still lazy; standard users keep the liquid effect.           |
| `gsap/Observer` client chunk |     9.05 kB / 4.04 kB gzip |    removed from eager flow | Global touch/pointer Observer is no longer imported on load. |
| Main client runtime          | 528.48 kB / 133.50 kB gzip | 528.48 kB / 133.50 kB gzip | Unchanged.                                                   |

## Runtime Findings

Automated DevTools-protocol probes were saved to:

- `docs/performance/runtime-probe-before.json`
- `docs/performance/runtime-probe-webgl-before.json`
- `docs/performance/runtime-probe-after.json`

Headless Brave did not expose WebGL even with WebGL flags, so those probes validated the non-WebGL path and cannot prove GPU frame cost. The after probe showed steady fallback frame timing during idle and pointer movement: 0 frames over 50 ms, p95 near 17 ms, and no recurring long tasks after load. Because Lighthouse had 0 ms TBT and the runtime fallback path was smooth, the highest-confidence fixes were the code paths that directly affect real-device runtime feel:

- The previous quality gate turned the liquid hero off for all mobile/coarse-pointer devices.
- `useSectionScroller()` eagerly imported GSAP Observer and installed a global `touch,pointer` observer with `preventDefault: true`, even on mobile where guided scrolling was disabled.
- The liquid renderer had one frame cap for both idle animation and active pointer/touch interaction.

## Implemented Fixes

- [heroPerformance.ts](/Users/seafgamel/Documents/trraficodata/goods-design-studio/src/components/site/heroPerformance.ts) now returns `low` for mobile/coarse-pointer devices instead of `off`.
- Reduced-motion, Save-Data, and no-WebGL still return `off`.
- Low quality now uses 30fps idle instead of 24fps and keeps the edge glow available.
- [LiquidEther.tsx](/Users/seafgamel/Documents/trraficodata/goods-design-studio/src/components/site/LiquidEther.tsx) now accepts `interactiveMaxFps`.
- The liquid loop uses the cheaper idle cap normally, then temporarily raises the cap after pointer/touch interaction.
- [Landing.tsx](/Users/seafgamel/Documents/trraficodata/goods-design-studio/src/components/site/Landing.tsx) passes the interactive FPS budget into `LiquidEther`.
- `useSectionScroller()` no longer installs the global GSAP `touch,pointer` Observer or imports `gsap/Observer` on load.
- Desktop wheel and keyboard section navigation remain available; GSAP is lazy-loaded on first use.
- [styles.css](/Users/seafgamel/Documents/trraficodata/goods-design-studio/src/styles.css) no longer suppresses the edge glow for the low quality tier.

## Remaining Manual QA

Use Chrome DevTools Performance on real hardware, because headless Chromium could not exercise WebGL here:

- Desktop/laptop: record 15s idle hero and 10s pointer movement; verify no recurring Long Animation Frames attributed to `LiquidEther`.
- Mobile: verify low liquid quality is animated, touch scrolling is native, and no global pointer/touch preventDefault behavior remains.
- CTA hover/click: verify responsiveness and INP below 200 ms.
- Reduced motion: verify no continuous liquid animation.

## References

- Chrome Lighthouse overview: <https://developer.chrome.com/docs/lighthouse/overview>
- Chrome Lighthouse performance scoring: <https://developer.chrome.com/docs/lighthouse/performance/performance-scoring>
- Chrome DevTools Performance panel: <https://developer.chrome.com/docs/devtools/performance>
- MDN animation performance frame budget: <https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Animation_performance_and_frame_rate>
- web.dev animation performance guide: <https://web.dev/articles/animations-guide>
- Chrome Long Animation Frames API: <https://developer.chrome.com/docs/web-platform/long-animation-frames>
