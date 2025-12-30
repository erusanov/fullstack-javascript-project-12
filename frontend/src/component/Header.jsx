import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Button, Navbar, Container } from 'react-bootstrap'
import { clearAuth } from '../slice'

const Header = () => {
  const { t } = useTranslation()
  const { token } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(clearAuth())
    navigate('/login')
  }

  return (
    <Navbar
      bg="white"
      expand="lg"
      className="shadow-sm"
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
        >
          {t('hexletChat')}
        </Navbar.Brand>
        {token && (
          <Button onClick={handleLogout}>{t('logout')}</Button>
        )}
      </Container>
    </Navbar>
  )
}

export {
  Header,
}
