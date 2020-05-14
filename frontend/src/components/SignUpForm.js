import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Container, Form } from 'react-bootstrap'
import { signup } from '../actions/sessions'


class SignUpForm extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      password_confirmation: ''
    }
  }

  handleInputChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    });
  }

  handleSubmit = event => {
    // Prevent default form submission
    event.preventDefault()

    // Grab `history` for managing login redirects, and the `sigup` action creator
    const { history, signup } = this.props

    // Call the signup action creator with a callback to send the user to the homepage after success
    signup(
      this.state.email,
      this.state.password,
      this.state.password_confirmation,
      () => history.push('/')
    )
  }
  
  render() {

    return (
      <Container className="col-4 text-center">
        <h1>Sign Up</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Control type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange}/>
          </Form.Group>
          <Form.Group>
            <Form.Control type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange}/>
          </Form.Group>
          <Form.Group>
            <Form.Control type="password" name="password_confirmation" placeholder="Password Confirmation" value={this.state.password_confirmation} onChange={this.handleInputChange}/>
          </Form.Group>
          <Container className="mx-auto text-center">
            <Button variant="primary" type="submit">Submit</Button>
          </Container>
        </Form>
        <p style={{paddingTop: 20, fontSize: "smaller"}}>Already have an account? <Link to="/login">Log In</Link></p>
      </Container>
    )
  }
}


export default connect(
  null, 
  { signup }
)(withRouter(SignUpForm))
