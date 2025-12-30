import { useTranslation } from 'react-i18next'

const MessageHeader = ({ channelName, messagesCount }) => {
  const { t } = useTranslation()

  return (
    <div className="g-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>{`# ${channelName}`}</b>
      </p>
      <span
        className="text-muted"
      >
        {t('messages.count', { count: messagesCount })}
      </span>
    </div>
  )
}

export {
  MessageHeader,
}
