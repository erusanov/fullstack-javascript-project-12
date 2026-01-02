import { useState } from 'react'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Form, Button, FloatingLabel } from 'react-bootstrap'
import { setAuth, useSignupMutation } from '../slice'
import { AuthLayout } from '../layout'
import { getSignupSchema } from '../schema'
import avatar from '../assets/avatar_1-D7Cot-zE.jpg'

const SignupPage = () => {
  const { t } = useTranslation()
  const [signupError, setSignupError] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const validationSchema = getSignupSchema(t)
  const [signup] = useSignupMutation()

  const formik = useFormik({
    initialValues: { username: '', password: '', confirmPassword: '' },
    validationSchema,
    onSubmit: async (values) => {
      setSignupError(null)

      try {
        const data = await signup({ username: values.username, password: values.password }).unwrap()

        dispatch(setAuth({ token: data.token, username: data.username }))

        navigate('/')
      }
      catch (error) {
        if (error.status === 409) {
          setSignupError(t('userExists'))

          return
        }

        throw error
      }
    },
  })

  return (
    <>
      <AuthLayout>
        <div
          className="col-12 col-md-6 d-flex align-items-center justify-content-center"
        >
          <img
            src={avatar}
            className="rounded-circle"
            alt={t('signup')}
          />
        </div>
        <Form
          onSubmit={formik.handleSubmit}
          className="col-12 col-md-6 mt-3 mt-md-0"
        >
          <h1
            className="text-center mb-4"
          >
            {t('signupPageTitle')}
          </h1>
          <FloatingLabel
            controlId="username"
            label={t('username')}
            className="mb-3"
          >
            <Form.Control
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              isInvalid={formik.errors.username || signupError}
              disabled={formik.isSubmitting}
            />
            <Form.Control.Feedback
              type="invalid"
            >
              {formik.errors.username || signupError}
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
              isInvalid={formik.errors.password}
              disabled={formik.isSubmitting}
            />
            <Form.Control.Feedback
              type="invalid"
            >
              {formik.errors.password}
            </Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel
            controlId="confirmPassword"
            label={t('passwordConfirmation')}
            className="mb-4"
          >
            <Form.Control
              type="password"
              name="confirmPassword"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              isInvalid={formik.errors.confirmPassword}
              disabled={formik.isSubmitting}
            />
            <Form.Control.Feedback
              type="invalid"
            >
              {formik.errors.confirmPassword}
            </Form.Control.Feedback>
          </FloatingLabel>
          <Button
            type="submit"
            variant="outline-primary"
            className="w-100 mb-3"
            disabled={formik.isSubmitting}
          >
            {t('signup')}
          </Button>
        </Form>
      </AuthLayout>
    </>
  )
}

export default SignupPage
