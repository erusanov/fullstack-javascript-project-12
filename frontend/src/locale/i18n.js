import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ru from './ru.js'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ru,
    },
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  })

export {
  i18n,
}
