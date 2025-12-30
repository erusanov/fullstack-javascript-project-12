import { ChannelItem } from '.'

const ChannelList = ({
  channels,
  currentChannelId,
  onSelectChannel,
  onRemoveChannel,
  onRenameChannel,
}) => (
  <>
    {channels.map(({ id, name, removable }) => (
      <li
        key={id}
        className="nav-item w-100"
      >
        <ChannelItem
          id={id}
          name={name}
          removable={removable}
          variant={id === currentChannelId ? 'secondary' : 'light'}
          onSelectChannel={onSelectChannel}
          onRemoveChannel={onRemoveChannel}
          onRenameChannel={onRenameChannel}
        />
      </li>
    ))}
  </>
)

export {
  ChannelList,
}
