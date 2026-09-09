import { createContext, useContext, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import translations from "../i18n/translations";

const LanguageContext = createContext(null);

function resolvePath(obj, path) {
  return path.split(".").reduce((acc, part) => (acc == null ? acc : acc[part]), obj);
}

function interpolate(str, vars) {
  if (!vars) return str;
  return Object.keys(vars).reduce(
    (acc, key) => acc.replace(new RegExp(`{${key}}`, "g"), vars[key]),
    str
  );
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useLocalStorage("ff_language", "uz");

  const value = useMemo(() => {
    const dict = translations[language] || translations.uz;

    const t = (key, vars) => {
      const result = resolvePath(dict, key) ?? resolvePath(translations.uz, key);
      if (result == null) return key;
      if (typeof result === "string") return interpolate(result, vars);
      return result;
    };

    return { language, setLanguage, t };
  }, [language, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
