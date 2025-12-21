import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import { LoginPage } from './components/LoginPage.jsx'
import { ChatPage } from './components/ChatPage.jsx'
import { NotFoundPage } from './components/NotFoundPage.jsx'

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<ChatPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
)

export default App
