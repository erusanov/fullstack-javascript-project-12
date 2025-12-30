import { useCallback, useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { Button } from 'react-bootstrap'
import { closeModal } from '../slice'
import { SocketContext } from '../context'
import { Modal } from '.'

const RemoveChannelModal = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { removeChannel } = useContext(SocketContext)
  const { item: channel } = useSelector(state => state.modals)
  const [isSubmitting, setSubmitting] = useState(false)

  const handleRemove = () => {
    setSubmitting(true)
    removeChannel(channel.id, (response) => {
      if (response.status === 'ok') {
        dispatch(closeModal())
        toast.success(t('channelRemoved'))
      }
      setSubmitting(false)
    })
  }

  const handleCancel = useCallback(() => dispatch(closeModal()), [dispatch])

  return (
    <Modal title={t('removeChannelModal')}>
      <p className="lead">{t('areYouSure')}</p>
      <div className="d-flex justify-content-end">
        <Button
          variant="secondary"
          type="button"
          onClick={handleCancel}
          className="me-2"
          disabled={isSubmitting}
        >
          {t('cancel')}
        </Button>
        <Button
          variant="danger"
          type="button"
          onClick={handleRemove}
          disabled={isSubmitting}
        >
          {t('remove')}
        </Button>
      </div>
    </Modal>
  )
}

export {
  RemoveChannelModal,
}
