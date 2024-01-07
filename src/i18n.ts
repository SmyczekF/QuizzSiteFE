import i18n from "i18next";
import i18nBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

const getSavedLanguage = () => {
  return localStorage.getItem("language") || "en";
};

i18n
  .use(i18nBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    lng: getSavedLanguage(),
    ns: ["app"],
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: `${process.env.REACT_APP_API_URL}translations/{{ns}}/{{lng}}`,
    },
  });

i18n.on('languageChanged', (lang) => {
  localStorage.setItem("language", lang);
});

export default i18n;