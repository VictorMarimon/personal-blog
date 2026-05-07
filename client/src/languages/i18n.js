import 'moment/locale/en-gb'
import 'moment/locale/es'
import i18n from 'i18next'
import moment from 'moment'

import { initReactI18next } from 'react-i18next'

const modules = import.meta.glob('./files/*.js', { eager: true })

const translations = Object.entries(modules).reduce((acc, [path, module]) => {
  const key = path.split('/').pop().replace('.js', '')
  acc[key] = module.default
  return acc
}, {})

const languages = ['en', 'es']

const dictionary = languages.reduce((acc, lang) => {
  acc[lang] = {
    translation: Object.entries(translations).reduce((trans, [key, value]) => {
      trans[key] = value[lang]
      return trans
    }, {})
  }
  return acc
}, {})

const allowedLanguages = Object.keys(dictionary)
const language = localStorage.getItem('language')
const selectedLanguage = allowedLanguages.includes(language) ? language : 'es'

//  Map to moment locales
const localeMap = {
  en: 'en-gb',
  es: 'es'
}

// Helper
const setMomentLocale = (lng) => {
  const target = localeMap[lng] || lng
  const result = moment.locale(target)
  /* console.log(`🌍 Trying to set locale to "${lng}" (mapped: "${target}") -> active: "${result}"`); */
}

// Initialize
setMomentLocale(selectedLanguage)

i18n.use(initReactI18next).init({
  resources: dictionary,
  lng: selectedLanguage,
  fallbackLng: selectedLanguage,
  interpolation: { escapeValue: false },
  parseMissingKeyHandler: (key) => {
    if (key.startsWith('common.error.')) return i18n.t('common.error.unknownError')
    if (key.includes('error.')) return i18n.t(`common.error.${key.split('.').pop()}`)
    if (import.meta.env.VITE_ENVIRONMENT === 'development') return `🔸${key}`
    return ''
  }
})

i18n.on('languageChanged', (lng) => {
  setMomentLocale(lng)
})

export default dictionary
