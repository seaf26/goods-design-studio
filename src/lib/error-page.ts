import { DEFAULT_LOCALE, SUPPORTED_LOCALES, translations, type Locale } from "./i18n";

export function localeFromAcceptLanguage(header: string | null): Locale {
  if (!header) return DEFAULT_LOCALE;

  const requested = header
    .split(",")
    .map((part) => part.trim().split(";")[0]?.toLowerCase().split("-")[0])
    .find((part): part is Locale => SUPPORTED_LOCALES.includes(part as Locale));

  return requested ?? DEFAULT_LOCALE;
}

export function renderErrorPage(locale: Locale = DEFAULT_LOCALE): string {
  const copy = translations[locale] ?? translations[DEFAULT_LOCALE];
  const direction = locale === "ar" ? "rtl" : "ltr";

  return `<!doctype html>
<html lang="${locale}" dir="${direction}">
  <head>
    <meta charset="utf-8" />
    <title>${copy["root.error.title"]}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>${copy["root.error.title"]}</h1>
      <p>${copy["root.error.description"]}</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">${copy["root.error.tryAgain"]}</button>
        <a class="secondary" href="/">${copy["root.goHome"]}</a>
      </div>
    </div>
  </body>
</html>`;
}
