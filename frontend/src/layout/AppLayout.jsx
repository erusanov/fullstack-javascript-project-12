import { Outlet } from 'react-router-dom'
import { Header } from '../component/Header.jsx'

const AppLayout = () => (
  <div className="d-flex flex-column h-100">
    <Header />
    <Outlet />
  </div>
)

export {
  AppLayout,
}
