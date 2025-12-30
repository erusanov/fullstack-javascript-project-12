import { Card } from 'react-bootstrap'

const AuthLayout = ({ children, footer, title }) => (
  <div className="container-fluid h-100">
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <Card className="shadow-sm">
          <Card.Body className="p-5 row">
            {
              title
                ? (
                    <h1 className="text-center mb-4">
                      {title}
                    </h1>
                  )
                : null
            }
            {children}
          </Card.Body>
          {footer && (
            <Card.Footer className="p-4">
              {footer}
            </Card.Footer>
          )}
        </Card>
      </div>
    </div>
  </div>
)

export {
  AuthLayout,
}
