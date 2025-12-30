import { useCallback, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { Button, Form } from 'react-bootstrap'
import { profanityFilter } from '../util'
import { closeModal } from '../slice'
import { SocketContext } from '../context'
import { getRenameChannelSchema } from '../schema'
import { Modal } from '.'

const RenameChannelModal = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { renameChannel } = useContext(SocketContext)
  const { item: channel } = useSelector(({ modals }) => modals)
  const channels = useSelector(({ channels: { channels } }) => channels)
  const validationSchema = getRenameChannelSchema(t, channels.map(({ name }) => name))

  const formik = useFormik({
    initialValues: { name: channel.name },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      const cleanedName = profanityFilter.clean(values.name.trim())

      renameChannel({ id: channel.id, name: cleanedName }, (response) => {
        if (response.status === 'ok') {
          dispatch(closeModal())

          toast.success(t('channelRenamed'))
        }

        setSubmitting(false)
      })
    },
  })

  const handleCancel = useCallback(() => dispatch(closeModal()), [dispatch])

  return (
    <Modal title={t('renameChannelModal')}>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Form.Control
            className="mb-2"
            name="name"
            id="channel_name"
            onChange={formik.handleChange}
            value={formik.values.name}
            isInvalid={formik.errors.name && formik.touched.name}
            disabled={formik.isSubmitting}
            autoFocus
          />
          <Form.Label
            htmlFor="channel_name"
            visuallyHidden
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
  RenameChannelModal,
}
