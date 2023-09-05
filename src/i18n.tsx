import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    returnEmptyString: false,
    debug: false,
    fallbackLng: 'ja',
    react: {
      useSuspense: false
    }
  });

//TODO: date-fnsで以下を書き直すこと
// i18n.services.formatter.add('DATE_LONG', (value, lng, _options) => {
//   return DateTime.fromJSDate(value).setLocale(lng).toLocaleString(DateTime.DATE_HUGE)
// });

export default i18n;