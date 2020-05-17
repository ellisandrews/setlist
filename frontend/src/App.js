import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import MainDisplay from './components/layout/MainDisplay'
import { backendURL, getAuthToken, getAuthTokenHeader, handleResponse, mapUserToProps } from './utils'
import { setLoggedInUser } from './actions/sessions'
import Loading from './components/Loading'


class App extends Component {
  
  constructor(props) {
    super(props)
    
    // Set loading to true if there is *NOT* a logged in user in redux store state but there *IS* a JWT in localStorage.
    // In this (and only this) case we will attempt to authenticate the user behind the scenes with the JWT to persist their session.
    this.state = {
      loading: !!(!props.user && getAuthToken())
    }
  }
  
  componentDidMount() {
    // Run async logic to try to log in a user with an existing JWT only if applicable
    if (this.state.loading) {
      
      const req = {
        method: 'GET',
        headers: getAuthTokenHeader()
      }
      
      const success = userData => {
        this.props.setLoggedInUser(userData.user)
      }

      // Fall back on the generic API failure of `handleResponse`. Set loading to `false` regardless of success or failure.
      fetch(`${backendURL}/current_user`, req)
        .then(resp => handleResponse(resp, success))
        .finally(() => { this.setState({ loading: false })})
    }
  }

  render() {
    return (
      <Router>
      {
        this.state.loading ?
            <Loading />
          :
          <>
            <Sidebar/>
            <MainDisplay/>
          </>
      }
      </Router>  
    )
  }
}


export default connect(
  mapUserToProps,
  { setLoggedInUser }
)(App)
