import { Button } from 'react-bootstrap'

const AddButton = ({ onClick }) => (
  <Button
    id="add_button"
    className="p-0 text-primary btn-group-vertical"
    variant=""
    onClick={onClick}
  >
    <i className="bi bi-plus-square fs-5 lh-1"></i>
    <span className="visually-hidden">+</span>
  </Button>
)

export {
  AddButton,
}
