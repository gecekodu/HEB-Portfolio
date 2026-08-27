import { create } from "zustand";
import { en, LocaleTranslations } from "../locales/en";
import { tr } from "../locales/tr";

export type Language = "EN" | "TR";

interface LanguageState {
  lang: Language;
  t: LocaleTranslations;
  isTransitioning: boolean;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  setIsTransitioning: (status: boolean) => void;
}

const getInitialLanguage = (): Language => {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("app_lang") as Language | null;
      if (stored === "EN" || stored === "TR") return stored;
      const browserLang = navigator.language?.toLowerCase() || "";
      return browserLang.startsWith("tr") ? "TR" : "EN";
    } catch {
      return "EN";
    }
  }
  return "EN";
};

const getDictionary = (lang: Language): LocaleTranslations => {
  return lang === "TR" ? tr : en;
};

export const useLanguageStore = create<LanguageState>((set, get) => {
  const initialLang = "EN"; // Safe SSR default

  return {
    lang: initialLang,
    t: en,
    isTransitioning: false,
    setLanguage: (lang: Language) => {
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("app_lang", lang);
        } catch {}
      }
      set({ lang, t: getDictionary(lang) });
    },
    toggleLanguage: () => {
      const nextLang: Language = get().lang === "EN" ? "TR" : "EN";
      get().setLanguage(nextLang);
    },
    setIsTransitioning: (status: boolean) => set({ isTransitioning: status }),
  };
});

// Initialize on client mount
if (typeof window !== "undefined") {
  const detected = getInitialLanguage();
  useLanguageStore.setState({
    lang: detected,
    t: getDictionary(detected),
  });
}
