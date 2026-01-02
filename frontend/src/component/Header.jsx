import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Button, Navbar, Container } from 'react-bootstrap'
import { clearAuth } from '../slice'
import { useAuth } from '../hook'

const Header = () => {
  const { t } = useTranslation()
  const { isAuth } = useAuth()
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
          {'Hexlet Chat'}
        </Navbar.Brand>
        {isAuth && (
          <Button onClick={handleLogout}>{t('logout')}</Button>
        )}
      </Container>
    </Navbar>
  )
}

export {
  Header,
}
