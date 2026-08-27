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

const getDictionary = (lang: Language): LocaleTranslations => lang === "TR" ? tr : en;

export const useLanguageStore = create<LanguageState>((set, get) => ({
  lang: "EN",
  t: en,
  isTransitioning: false,
  setLanguage: (lang: Language) => set({ lang, t: getDictionary(lang) }),
  toggleLanguage: () => get().setLanguage(get().lang === "EN" ? "TR" : "EN"),
  setIsTransitioning: (status: boolean) => set({ isTransitioning: status }),
}));