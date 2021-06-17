const prismicLangMap = {
  ru: "ru",
  en: "en-gb",
  uz: "uz-uz"
};

export function resolveLang(lang) {
  return prismicLangMap[lang];
}
