import { Formik, Field, Form } from 'formik'

const LoginPage = () => (
  <div>
    <h1>Login</h1>
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={(values) => {
        console.log(values)
      }}
    >
      <Form>
        <div>
          <label htmlFor="username">Username</label>
          <Field id="username" name="username" placeholder="Username" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Field id="password" name="password" type="password" placeholder="Password" />
        </div>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  </div>
)

export {
  LoginPage,
}
