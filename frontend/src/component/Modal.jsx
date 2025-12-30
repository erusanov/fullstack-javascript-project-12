import { Modal as BootstrapModal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { closeModal } from '../slice'
import { useCallback } from 'react'

const Modal = ({ title, children }) => {
  const dispatch = useDispatch()
  const handleClose = useCallback(() => dispatch(closeModal()), [dispatch])

  return (
    <BootstrapModal
      show
      onHide={handleClose}
      centered
    >
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>{title}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        {children}
      </BootstrapModal.Body>
    </BootstrapModal>
  )
}

export {
  Modal,
}
