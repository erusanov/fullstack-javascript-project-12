import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Formik, Field, Form } from 'formik'
import { Button } from 'react-bootstrap'
import { profanityFilter } from '../util'
import { SocketContext } from '../context'

const MessageForm = () => {
  const { t } = useTranslation()
  const { username } = useSelector(state => state.auth)
  const { currentChannelId } = useSelector(state => state.channels)
  const { sendMessage } = useContext(SocketContext)

  return (
    <div
      className="mt-auto px-5 py-3"
    >
      <Formik
        initialValues={{ body: '' }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const cleanedMessage = profanityFilter.clean(values.body)

          const message = {
            body: cleanedMessage,
            channelId: currentChannelId,
            username,
          }

          sendMessage(message, (response) => {
            if (response.status === 'ok') {
              resetForm()
            }

            setSubmitting(false)
          })
        }}
      >
        {({ isSubmitting, values, handleChange }) => (
          <Form
            className="py-1 border rounded-2"
          >
            <div
              className="input-group has-validation"
            >
              <Field
                name="body"
                aria-label="Новое сообщение"
                placeholder={t('enterMessage')}
                className="border-0 p-0 ps-2 form-control"
                value={values.body}
                onChange={handleChange}
                disabled={isSubmitting}
                autoFocus
              />
              <Button
                type="submit"
                variant=""
                disabled={isSubmitting || !values.body}
                className="btn-group-vertical"
              >
                <i className="bi bi-arrow-right-square fs-5 lh-1"></i>
                <span className="visually-hidden">{t('sendMessage')}</span>
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export {
  MessageForm,
}
