import { useState } from 'react'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { Form, Button, FloatingLabel } from 'react-bootstrap'
import { setAuth } from '../slice'
import { AuthLayout } from '../layout'
import { getLoginSchema } from '../schema'
import avatar from '../assets/avatar-DIE1AEpS.jpg'
import { Header } from '../component'

const LoginPage = () => {
  const { t } = useTranslation()
  const [authError, setAuthError] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const validationSchema = getLoginSchema(t)

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema,
    onSubmit: async (values) => {
      setAuthError(null)

      try {
        const { data } = await axios.post('/api/v1/login', values)

        dispatch(setAuth({ token: data.token, username: values.username }))

        navigate('/')
      }
      catch (error) {
        if (
          error.isAxiosError
          && error.response.status === 401
        ) {
          setAuthError(t('loginFailed'))

          return
        }

        throw error
      }
    },
  })

  return (
    <div className="d-flex flex-column h-100">
      <Header />

      <AuthLayout
        footer={(
          <div className="text-center">
            <span>{t('noAccount')}</span>
            <Link
              to="/signup"
            >
              {t('signupLink')}
            </Link>
          </div>
        )}
      >
        <div
          className="col-12 col-md-6 d-flex align-items-center justify-content-center"
        >
          <img
            src={avatar}
            className="rounded-circle"
            alt={t('login')}
          />
        </div>
        <Form
          onSubmit={formik.handleSubmit}
          className="col-12 col-md-6 mt-3 mt-md-0"
        >
          <h1
            className="text-center mb-4"
          >
            {t('login')}
          </h1>
          <FloatingLabel
            controlId="username"
            label={t('yourNickname')}
            className="mb-3"
          >
            <Form.Control
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              isInvalid={formik.errors.username || authError}
              disabled={formik.isSubmitting}
              autoFocus
            />
            <Form.Control.Feedback
              type="invalid"
            >
              {formik.errors.username}
            </Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel
            controlId="password"
            label={t('password')}
            className="mb-4"
          >
            <Form.Control
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              isInvalid={formik.errors.password || authError}
              disabled={formik.isSubmitting}
            />
            <Form.Control.Feedback
              type="invalid"
            >
              {formik.errors.password || authError}
            </Form.Control.Feedback>
          </FloatingLabel>
          <Button
            type="submit"
            variant="outline-primary"
            className="w-100 mb-3"
            disabled={formik.isSubmitting}
          >
            {t('login')}
          </Button>
        </Form>
      </AuthLayout>
    </div>
  )
}

export default LoginPage
