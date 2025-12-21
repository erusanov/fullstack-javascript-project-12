import { useState } from 'react'
import { Formik, Field, Form } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { setToken } from '../slices/authSlice'

const LoginPage = () => {
  const [authError, setAuthError] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, { setSubmitting }) => {
          setAuthError(null)
          try {
            const { data } = await axios.post('/api/v1/login', values)
            dispatch(setToken(data.token))
            navigate('/')
          } catch (error) {
            setSubmitting(false)
            if (error.isAxiosError && error.response.status === 401) {
              setAuthError('Invalid username or password')
              return
            }
            throw error
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="username">Username</label>
              <Field id="username" name="username" placeholder="Username" disabled={isSubmitting} />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field id="password" name="password" type="password" placeholder="Password" disabled={isSubmitting} />
            </div>
            {authError && <div>{authError}</div>}
            <button type="submit" disabled={isSubmitting}>Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export {
  LoginPage,
}
