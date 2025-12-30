import axios from 'axios'
import { toast } from 'react-toastify'
import { i18n } from '../locale'

const BASE_URL = '/api/v1'

const api = axios
  .create({
    baseURL: BASE_URL,
  })

api
  .interceptors
  .request
  .use((config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  })

api
  .interceptors
  .response
  .use(
    response => response,
    ({ isAxiosError, message }) => {
      if (
        isAxiosError
        && message === 'Network Error'
      ) {
        toast.error(i18n.t('networkError'))
      }

      return Promise
        .reject(message)
    },
  )

export {
  api,
}
