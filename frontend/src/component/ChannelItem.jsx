import { useTranslation } from 'react-i18next'
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap'

const ChannelItem = ({
  id,
  name,
  removable,
  variant,
  onSelectChannel,
  onRemoveChannel,
  onRenameChannel,
}) => {
  const { t } = useTranslation()

  const handleRemove = () => onRemoveChannel({ id, name, removable })
  const handleRename = () => onRenameChannel({ id, name, removable })

  return (
    <ButtonGroup className="d-flex dropdown">
      <Button
        variant={variant}
        className="w-100 rounded-0 text-start text-truncate"
        onClick={() => onSelectChannel(id)}
      >
        <span className="me-1">#</span>
        {name}
      </Button>
      {removable && (
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle
            split={true}
            variant={variant}
            className="flex-grow-0"
          >
            <span className="visually-hidden">{t('channelManagement')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleRemove}>{t('remove')}</Dropdown.Item>
            <Dropdown.Item onClick={handleRename}>{t('rename')}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </ButtonGroup>
  )
}

export {
  ChannelItem,
}
