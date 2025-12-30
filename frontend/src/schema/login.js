import * as yup from 'yup'

const getLoginSchema = t => yup
  .object()
  .shape({
    username: yup
      .string()
      .required(t('required')),
    password: yup
      .string()
      .required(t('required')),
  })

export {
  getLoginSchema,
}
