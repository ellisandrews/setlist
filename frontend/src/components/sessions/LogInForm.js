import React, { Component } from 'react'
import { Formik } from 'formik'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Container, Form } from 'react-bootstrap'
import { login } from '../../actions/sessions'


class LogInForm extends Component {
  
  handleSubmit = (values, { setSubmitting, setStatus, resetForm }) => {

    // Grab `history` and `location` for managing login redirects, and the `login` action creator
    const { history, location, login } = this.props

    // Grab path where user was redirected from to the login page. Default to the homepage.
    // Note destructuring, so `from` variable will be an object with top-level key of `pathname` regardless.
    const { from } = location.state || { from: { pathname: '/' } }

    // Call the login action creator. Render an error from the server on failure or redirect on success.
    login(
      values,
      error => {
        resetForm()
        setStatus({ generalError: error.status >= 500 ? error.error : error.message }) 
        setSubmitting(false)
      },
      () => { history.replace(from) }
    )
  }
  
  render() {

    // TODO: Upon submission, dump server errors back here somewhere!!
    // e.g. <Form.Control.Feedback type="invalid">{errors.general}</Form.Control.Feedback>

    return (
      <Container className="col-10 text-center">
        <h1 className="session-form-header">Log In</h1>

        {/* Begin form, controlled by Formik */}
        <Formik 
          initialValues={{ email: '', password: '' }}
          onSubmit={this.handleSubmit}
        >
        {
          ({
            handleSubmit,
            handleChange,
            values,
            status  // This is where generalError from the backend will get passed (in the sumbit handler)
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              { status && status.generalError && <p style={{color: 'red'}}>{status.generalError}</p> }
              <Form.Group>
                <Form.Control type="email" name="email" placeholder="Email" value={values.email} onChange={handleChange}/>
              </Form.Group>
              <Form.Group>
                <Form.Control type="password" name="password" placeholder="Password" value={values.password} onChange={handleChange}/>
              </Form.Group>
              <Container className="mx-auto text-center">
                <Button variant="dark" type="submit">Submit</Button>
              </Container>
            </Form>
          )
        }
        </Formik>  
        
        <p style={{paddingTop: 20, fontSize: "smaller"}}>Don't have an account? <Link style={{color: 'grey'}} to="/signup">Sign Up</Link></p>
      
      </Container>
    )
  }
}


export default connect(
  null, 
  { login }
)(withRouter(LogInForm))
