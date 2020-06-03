import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Container, Form } from 'react-bootstrap'
import { login } from '../../actions/sessions'


class LogInForm extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
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

    // Grab `history` and `location` for managing login redirects, and the `login` action creator
    const { history, location, login } = this.props

    // Grab path where user was redirected from to the login page. Default to the homepage.
    // Note destructuring, so `from` variable will be an object with top-level key of `pathname` regardless.
    const { from } = location.state || { from: { pathname: '/' } }

    // Call the login action creator with a callback to send the user to the homepage after successful login
    login(
      this.state,
      () => history.replace(from)
    )
  }
  
  render() {

    return (
      <Container className="col-10 text-center">
        <h1 className="session-form-header">Log In</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Control required type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange}/>
          </Form.Group>
          <Form.Group>
            <Form.Control required type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange}/>
          </Form.Group>
          <Container className="mx-auto text-center">
            <Button variant="dark" type="submit">Submit</Button>
          </Container>
        </Form>
        <p style={{paddingTop: 20, fontSize: "smaller"}}>Don't have an account? <Link style={{color: 'grey'}} to="/signup">Sign Up</Link></p>
      </Container>
    )
  }
}


export default connect(
  null, 
  { login }
)(withRouter(LogInForm))
