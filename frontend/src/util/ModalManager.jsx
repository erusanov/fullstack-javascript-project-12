import { useSelector } from 'react-redux'
import {
  AddChannelModal,
  RenameChannelModal,
  RemoveChannelModal,
} from '../component'

const modals = {
  addChannel: AddChannelModal,
  renameChannel: RenameChannelModal,
  removeChannel: RemoveChannelModal,
}

const ModalManager = () => {
  const { type } = useSelector(state => state.modals)

  if (!type) {
    return null
  }

  const Component = modals[type]

  return (
    <Component />
  )
}

export {
  ModalManager,
}
