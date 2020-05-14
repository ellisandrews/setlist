import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'


class Login extends Component {
  render() {

    // Grab history and location for managing login redirects
    const { history, location } = this.props

    // Grab path where user was redirected from to the login page. Default to the homepage.
    // Note destructuring, so `from` variable will be an object with top-level key of `pathname` regardless.
    const { from } = location.state || { from: { pathname: '/' } }

    // Callback function to be passed to authentication submit to redirect the user back to the page they were trying to access.
    const callback = () => {
      history.replace(from)
    }

    return (
      <div>
        <h1>Log In</h1>
      </div>
    )
  }
}


export default withRouter(Login)
