import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Cache from 'i18next-localstorage-cache';
import en from './en.json';
import el from './el.json';

const i18n = i18next
	.use(Cache)
	.use(LanguageDetector)
	.init({
		interpolation: {
			escapeValue: false
		},
		resources: { en, el },
		fallbackLng: 'en'
	});

export default i18n;
