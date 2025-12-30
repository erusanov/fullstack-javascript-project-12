import { MessageItem } from '.'

const MessageList = ({ messages }) => (
  <>
    {messages.map(({ id, username, body }) => (
      <MessageItem
        key={id}
        username={username}
        body={body}
      />
    ))}
  </>
)

export {
  MessageList,
}
