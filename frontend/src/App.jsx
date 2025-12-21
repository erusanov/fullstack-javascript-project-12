import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import { LoginPage } from './components/LoginPage.jsx'
import { ChatPage } from './components/ChatPage.jsx'
import { NotFoundPage } from './components/NotFoundPage.jsx'
import { PrivateRoute } from './components/PrivateRoute.jsx'

const App = () => (
  <Router>
    <Routes>
      <Route
        path="/"
        element={(
          <PrivateRoute>
            <ChatPage />
          </PrivateRoute>
        )}
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
)

export default App
