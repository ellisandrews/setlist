import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapUserToProps } from '../utils'


// A wrapper for <Route> that redirects to the login screen if you're not yet authenticated.
const PrivateRoute = ({ user, children, ...rest }) => {

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !!user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}


export default connect(mapUserToProps)(PrivateRoute)
