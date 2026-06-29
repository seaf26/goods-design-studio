import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ThemeMode = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

const themeStorageKey = "traffodata:theme";
const modes: ThemeMode[] = ["light", "dark", "system"];

type ThemeContextValue = {
  themeMode: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setThemeMode: (mode: ThemeMode) => void;
  cycleThemeMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function isThemeMode(value: string | null): value is ThemeMode {
  return modes.includes(value as ThemeMode);
}

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getInitialThemeMode(): ThemeMode {
  if (typeof window === "undefined") return "system";
  const stored = window.localStorage.getItem(themeStorageKey);
  return isThemeMode(stored) ? stored : "system";
}

function resolveTheme(mode: ThemeMode): ResolvedTheme {
  return mode === "system" ? getSystemTheme() : mode;
}

function applyTheme(mode: ThemeMode, resolvedTheme: ResolvedTheme) {
  const root = document.documentElement;
  document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
  root.dataset.theme = mode;
  root.dataset.resolvedTheme = resolvedTheme;
  root.style.colorScheme = resolvedTheme;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(getInitialThemeMode);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
    resolveTheme(getInitialThemeMode()),
  );

  useEffect(() => {
    const update = () => {
      const nextResolvedTheme = resolveTheme(themeMode);
      setResolvedTheme(nextResolvedTheme);
      applyTheme(themeMode, nextResolvedTheme);
      window.localStorage.setItem(themeStorageKey, themeMode);
    };

    update();

    if (themeMode !== "system") return undefined;

    const query = window.matchMedia("(prefers-color-scheme: dark)");
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [themeMode]);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
  }, []);

  const cycleThemeMode = useCallback(() => {
    setThemeModeState((current) => {
      const index = modes.indexOf(current);
      return modes[(index + 1) % modes.length];
    });
  }, []);

  const value = useMemo(
    () => ({ themeMode, resolvedTheme, setThemeMode, cycleThemeMode }),
    [cycleThemeMode, resolvedTheme, setThemeMode, themeMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}
