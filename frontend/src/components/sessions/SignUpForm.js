import React, { Component } from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Container, Form } from 'react-bootstrap'
import { signup } from '../../actions/sessions'


class SignUpForm extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  }

  handleSubmit = values => {
    // Grab `history` for managing login redirects, and the `sigup` action creator
    const { history, signup } = this.props

    // Call the signup action creator with a callback to send the user to the homepage after success
    signup(
      values,
      () => history.push('/')
    )
  }
  
  render() {

    return (
      <Container className="col-10 text-center my-3">
        <h1 className="session-form-header">Sign Up</h1>
        
        <Formik
          initialValues={{first_name: '', last_name: '', email: '', password: '', password_confirmation: ''}}
          validationSchema={object({
            first_name: string().required('Required'),
            last_name: string().required('Required'),
            email: string().required('Required').email('Invalid email address'),
            password: string().required('Required').min(8, 'Must be at least 8 characters'),
            password_confirmation: string().required('Required').min(8, 'Must be at least 8 characters')
          })}
          onSubmit={this.handleSubmit}
        >
        {
          ({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            touched
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control required type="text" name="first_name" placeholder="First Name" value={values.first_name} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.first_name && !!errors.first_name}/>
                <Form.Control.Feedback type="invalid">{errors.first_name}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Control required type="text" name="last_name" placeholder="Last Name" value={values.last_name} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.last_name && !!errors.last_name}/>
                <Form.Control.Feedback type="invalid">{errors.last_name}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Control required type="email" name="email" placeholder="Email" value={values.email} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.email && !!errors.email}/>
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Control required type="password" name="password" placeholder="Password" value={values.password} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.password && !!errors.password}/>
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Control required type="password" name="password_confirmation" placeholder="Password Confirmation" value={values.password_confirmation} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.password_confirmation && !!errors.password_confirmation}/>
                <Form.Control.Feedback type="invalid">{errors.password_confirmation}</Form.Control.Feedback>
              </Form.Group>
              <Container className="mx-auto text-center">
                <Button variant="dark" type="submit">Submit</Button>
              </Container>
            </Form>
          )
        }
        </Formik>
        <p style={{paddingTop: 20, fontSize: "smaller"}}>Already have an account? <Link style={{color: 'grey'}} to="/login">Log In</Link></p>
      </Container>
    )
  }
}


export default connect(
  null, 
  { signup }
)(withRouter(SignUpForm))
