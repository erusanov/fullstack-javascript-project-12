import * as yup from 'yup'

const getSignupSchema = t => yup
  .object()
  .shape({
    username: yup
      .string()
      .trim()
      .required(t('required'))
      .min(3, t('usernameConstraints'))
      .max(20, t('usernameConstraints')),
    password: yup
      .string()
      .required(t('required'))
      .min(6, t('passwordConstraints')),
    confirmPassword: yup
      .string()
      .required(t('required'))
      .oneOf([yup.ref('password'), null], t('passwordsMustMatch')),
  })

export {
  getSignupSchema,
}
