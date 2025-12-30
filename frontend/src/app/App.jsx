import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'

import {
  Provider as ReduxProvider,
} from 'react-redux'

import {
  Provider as RollbarProvider,
  ErrorBoundary,
} from '@rollbar/react'

import React, { Suspense, lazy } from 'react'
import { ToastContainer } from 'react-toastify'
import { PrivateRoute } from '../util'
import store from './store.js'
import SocketProvider from '../provider/SocketProvider.jsx'
import rollbar from './rollbar.js'
import 'react-toastify/dist/ReactToastify.css'

const ChatPage = lazy(() => import('../page/ChatPage.jsx'))
const LoginPage = lazy(() => import('../page/LoginPage.jsx'))
const SignupPage = lazy(() => import('../page/SignupPage.jsx'))
const NotFoundPage = lazy(() => import('../page/NotFoundPage.jsx'))

const App = () => (
  <React.StrictMode>
    <RollbarProvider
      instance={rollbar}
    >
      <ErrorBoundary>
        <ReduxProvider
          store={store}
        >
          <SocketProvider>
            <Router>
              <Suspense
                fallback={<div>Loading...</div>}
              >
                <Routes>
                  <Route
                    path="/"
                    element={(
                      <PrivateRoute>
                        <ChatPage />
                      </PrivateRoute>
                    )}
                  />
                  <Route
                    path="/login"
                    element={<LoginPage />}
                  />
                  <Route
                    path="/signup"
                    element={<SignupPage />}
                  />
                  <Route
                    path="*"
                    element={<NotFoundPage />}
                  />
                </Routes>
              </Suspense>
            </Router>
            <ToastContainer />
          </SocketProvider>
        </ReduxProvider>
      </ErrorBoundary>
    </RollbarProvider>
  </React.StrictMode>
)

export default App
