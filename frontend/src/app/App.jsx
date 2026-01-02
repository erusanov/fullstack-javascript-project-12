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
import { PrivateOutlet } from '../util'
import store from './store.js'
import rollbar from './rollbar.js'
import { AppLayout } from '../layout'

const ROUTES = {
  CHAT: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  OTHER: '*',
}

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
          <Router>
            <Suspense
              fallback={<div>Loading...</div>}
            >
              <Routes>
                <Route element={<AppLayout />}>
                  <Route element={<PrivateOutlet />}>
                    <Route
                      path={ROUTES.CHAT}
                      element={(
                        <ChatPage />
                      )}
                    />
                  </Route>
                  <Route
                    path={ROUTES.LOGIN}
                    element={<LoginPage />}
                  />
                  <Route
                    path={ROUTES.SIGNUP}
                    element={<SignupPage />}
                  />
                  <Route
                    path={ROUTES.OTHER}
                    element={<NotFoundPage />}
                  />
                </Route>
              </Routes>
            </Suspense>
          </Router>
          <ToastContainer />
        </ReduxProvider>
      </ErrorBoundary>
    </RollbarProvider>
  </React.StrictMode>
)

export default App
