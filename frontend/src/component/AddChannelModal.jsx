import { useContext, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { Button, Form } from 'react-bootstrap'
import { closeModal } from '../slice'
import { SocketContext } from '../context'
import { getAddChannelSchema } from '../schema'
import { profanityFilter } from '../util'
import { Modal } from '.'

const AddChannelModal = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { createChannel } = useContext(SocketContext)
  const channels = useSelector(({ channels: { channels } }) => channels)
  const validationSchema = getAddChannelSchema(t, channels.map(({ name }) => name))

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      const cleanedName = profanityFilter.clean(values.name.trim())

      createChannel(
        { name: cleanedName },
        (response) => {
          if (response.status === 'ok') {
            toast.success(t('channelCreated'))

            dispatch(closeModal())
          }

          setSubmitting(false)
        })
    },
  })

  const handleCancel = useCallback(() => dispatch(closeModal()), [dispatch])

  return (
    <Modal title={t('addChannel')}>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Form.Control
            className="mb-2"
            name="name"
            id="new_channel_name"
            onChange={formik.handleChange}
            value={formik.values.name}
            isInvalid={formik.errors.name && formik.touched.name}
            disabled={formik.isSubmitting}
            autoFocus={true}
          />
          <Form.Label
            htmlFor="new_channel_name"
            visuallyHidden={true}
          >
            {t('channelName')}
          </Form.Label>
          <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button
            variant="secondary"
            type="button"
            onClick={handleCancel}
            className="me-2"
            disabled={formik.isSubmitting}
          >
            {t('cancel')}
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={formik.isSubmitting}
          >
            {t('confirm')}
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export {
  AddChannelModal,
}
