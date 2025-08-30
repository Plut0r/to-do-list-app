"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: Theme;
  updateTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

export default function ThemeManager({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system");

  const applyTheme = (current: Theme) => {
    const root = document.documentElement;
    let resolved: "light" | "dark";

    if (current === "dark") {
      resolved = "dark";
    } else if (current === "light") {
      resolved = "light";
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      resolved = prefersDark ? "dark" : "light";
    }

    if (resolved === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("3d-to-do-theme") as Theme | null;
    const initial = stored ?? "system";
    setTheme(initial);
    applyTheme(initial);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = () => {
      if (!localStorage.getItem("3d-to-do-theme")) {
        applyTheme("system");
      }
    };
    media.addEventListener("change", handleSystemChange);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "3d-to-do-theme") {
        const newValue = e.newValue as Theme;
        setTheme(newValue ?? "system");
        applyTheme(newValue ?? "system");
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      media.removeEventListener("change", handleSystemChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const updateTheme = (newTheme: Theme) => {
    if (newTheme === "system") {
      localStorage.removeItem("3d-to-do-theme");
    } else {
      localStorage.setItem("3d-to-do-theme", newTheme);
    }
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}