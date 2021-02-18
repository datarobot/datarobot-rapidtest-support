// @ts-nocheck
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { format } from 'date-fns';

import { ENABLE_I18N_LOGGING } from 'rt-constants';
import en from 'locales/en/translation.json';
import es from 'locales/es/translation.json';

const numberFormatLocale = (num) => num;

const dateFormatLocale = (date, locale) => {
  if (locale.includes('en')) {
    return format(date, 'MM/dd/yyyy');
  }

  return format(date, 'dd/MM/yyyy');
};

const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
};

const detectionOptions = {
  order: ['navigator', 'localStorage', 'subdomain', 'queryString', 'htmlTag'],
  lookupFromPathIndex: 0,
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug:
      process.env.NODE_ENV !== 'production' && ENABLE_I18N_LOGGING === 'true',
    resources,
    fallbackLng: 'en-US',
    detection: detectionOptions,
    transSupportBasicHtmlNodes: true,
    interpolation: {
      escapeValue: false,
      format: (value, fmt, lng) => {
        if (fmt === 'date') {
          return dateFormatLocale(value, lng);
        }

        if (fmt === 'number') {
          return numberFormatLocale(value);
        }

        return value;
      },
    },
  });

export default i18n;
