import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { ModalManager } from '../util'
import { ChatLayout } from '../layout'

import {
  MessageForm,
  MessageList,
  MessageHeader,
  ChannelList,
  AddButton,
} from '../component'

import {
  openModal,
  setCurrentChannel,
  useGetDataQuery,
} from '../slice'
import SocketProvider from '../provider/SocketProvider.jsx'

const ChatPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { error, isLoading } = useGetDataQuery()

  useEffect(() => {
    if (error) {
      toast.error(t('networkError'))
      console.error('Failed to fetch data', error)
    }
  }, [error, t])

  const { channels, currentChannelId } = useSelector(state => state.channels)
  const messages = useSelector(state => state.messages.messages)

  const handleAddChannel = () => {
    dispatch(openModal({ type: 'addChannel' }))
  }

  const handleSelectChannel = (id) => {
    dispatch(setCurrentChannel(id))
  }

  const handleRemoveChannel = (channel) => {
    dispatch(openModal({ type: 'removeChannel', item: channel }))
  }

  const handleRenameChannel = (channel) => {
    dispatch(openModal({ type: 'renameChannel', item: channel }))
  }

  const currentChannel = channels.find(channel => channel.id === currentChannelId)
  const currentChannelMessages = messages.filter(message => message.channelId === currentChannelId)

  if (isLoading) {
    return <div>{t('loading')}</div>
  }

  return (
    <SocketProvider>
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <ChatLayout
          channelsTitle={t('channels')}
          addButton={(
            <AddButton
              onClick={handleAddChannel}
            />
          )}
          channelList={(
            <ChannelList
              channels={channels}
              currentChannelId={currentChannelId}
              onSelectChannel={handleSelectChannel}
              onRemoveChannel={handleRemoveChannel}
              onRenameChannel={handleRenameChannel}
            />
          )}
          messagesHeader={(
            <MessageHeader
              channelName={currentChannel?.name}
              messagesCount={currentChannelMessages.length}
            />
          )}
          messageList={(
            <MessageList
              messages={currentChannelMessages}
            />
          )}
          messageForm={<MessageForm />}
        />
        <ModalManager />
      </div>
    </SocketProvider>
  )
}

export default ChatPage
