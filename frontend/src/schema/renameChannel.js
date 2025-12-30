import * as yup from 'yup'

const getRenameChannelSchema = (t, channelNames) => yup
  .object()
  .shape({
    name: yup
      .string()
      .trim()
      .required(t('required'))
      .min(3, t('usernameConstraints'))
      .max(20, t('usernameConstraints'))
      .notOneOf(channelNames, t('unique')),
  })

export {
  getRenameChannelSchema,
}
