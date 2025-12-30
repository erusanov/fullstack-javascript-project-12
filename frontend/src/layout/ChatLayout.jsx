const ChatLayout = ({
  channelsTitle,
  addButton,
  channelList,
  messagesHeader,
  messageList,
  messageForm,
}) => (
  <div className="row h-100 bg-white flex-md-row">
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{channelsTitle}</b>
        {addButton}
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channelList}
      </ul>
    </div>
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        {messagesHeader}
        <div className="chat-messages overflow-auto px-5">
          {messageList}
        </div>
        {messageForm}
      </div>
    </div>
  </div>
)

export {
  ChatLayout,
}
