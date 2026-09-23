import { Search } from "lucide-react";

import { useI18n } from "@/lib/i18n";

const PREFERRED_SOURCE_URL =
  "https://www.google.com/preferences/source?q=https%3A%2F%2Ftraffodata.com%2F";

export function PreferredSourceLink({ dark = false }: { dark?: boolean }) {
  const { t } = useI18n();

  return (
    <a
      href={PREFERRED_SOURCE_URL}
      target="_blank"
      rel="noreferrer"
      className={
        dark
          ? "inline-flex items-center gap-2 text-[13px] font-semibold text-white/72 transition-colors hover:text-white"
          : "inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--ink)] transition-colors hover:text-primary"
      }
    >
      <Search className="h-4 w-4" />
      {t("blog.preferredSource")}
    </a>
  );
}
