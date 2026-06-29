import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import { BlurText } from "@/components/site/BlurText";
import {
  iconLinks,
  navigationJsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from "@/components/site/seo";
import { DEFAULT_LOCALE, I18nProvider, useI18n } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

const preferenceScript = `
(() => {
  try {
    const root = document.documentElement;
    const theme = localStorage.getItem("traffodata:theme") || "system";
    const locale = localStorage.getItem("traffodata:locale") || "${DEFAULT_LOCALE}";
    const dark = theme === "dark" || (theme === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
    root.classList.toggle("dark", dark);
    root.dataset.theme = theme;
    root.dataset.resolvedTheme = dark ? "dark" : "light";
    root.dataset.locale = locale;
    root.lang = locale;
    root.dir = locale === "ar" ? "rtl" : "ltr";
    root.style.colorScheme = dark ? "dark" : "light";
  } catch {}
})();
`;

function NotFoundComponent() {
  const { t } = useI18n();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <BlurText
          as="h1"
          text={t("root.notFound.code")}
          className="text-7xl font-bold text-foreground"
        />
        <BlurText
          as="h2"
          text={t("root.notFound.title")}
          className="mt-4 text-xl font-semibold text-foreground"
        />
        <p className="mt-2 text-sm text-muted-foreground">{t("root.notFound.description")}</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("root.goHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const { t } = useI18n();
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <BlurText
          as="h1"
          text={t("root.error.title")}
          className="text-xl font-semibold tracking-tight text-foreground"
        />
        <p className="mt-2 text-sm text-muted-foreground">{t("root.error.description")}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            {t("root.error.tryAgain")}
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
          >
            {t("root.goHome")}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => {
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { "script:ld+json": organizationJsonLd() },
        { "script:ld+json": websiteJsonLd() },
        { "script:ld+json": navigationJsonLd() },
      ],
      links: [{ rel: "stylesheet", href: appCss }, ...iconLinks()],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html
      lang={DEFAULT_LOCALE}
      dir="ltr"
      data-theme="system"
      data-locale={DEFAULT_LOCALE}
      suppressHydrationWarning
    >
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html:
              "html,body{background:#fff;color:#000}html.dark,html.dark body{background:#000;color:#fff}body{margin:0}",
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: preferenceScript }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <I18nProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </ThemeProvider>
    </I18nProvider>
  );
}
