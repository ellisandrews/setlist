import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { setLoggedInUser } from './actions/sessions'
import { setSongs } from './actions/songs'
import Error from './components/Error'
import Loading from './components/Loading'
import Sidebar from './components/layout/Sidebar'
import MainDisplay from './components/layout/MainDisplay'
import { backendURL, getAuthToken, getAuthTokenHeader, handleResponse, mapUserToProps } from './utils'


class App extends Component {
  
  constructor(props) {
    super(props)
    
    this.state = {
      loading: true,
      backendError: null
    }
  }

  componentDidMount() {
    // Attempt user auth if there is *NOT* a logged in user in redux store state but there *IS* a JWT in localStorage.
    // In this (and only this) case we will attempt to authenticate the user behind the scenes with the JWT to persist their session.
    const attemptAuth = !!( !this.props.user && getAuthToken() )
    
    // Ping the backend to make sure it is up and running (important for Heroku deployment due to sleeping).
    // If the ping was successful, attempt user auth if applicable. If it was not successful, render the error.
    fetch(`${backendURL}/ping`)
      .then(resp => resp.json())
      .then(json => {
        if (json.status === 'ok') {
          attemptAuth ? this.authenticateUser() : this.setState({ loading: false })
        } else {
          this.setState({backendError: json})
        }
      })
  }

  authenticateUser() {
    // Attempt to log in a user with an existing JWT 
    const req = {
      method: 'GET',
      headers: getAuthTokenHeader()
    }
    
    const { setLoggedInUser, setSongs } = this.props

    const success = userData => {
      setLoggedInUser(userData.user)
      setSongs(userData.songs)
      this.setState({loading: false})
    }

    // In case of an auth failure here, the user will just be redirected to the login page
    const failure = () => {
      this.setState({loading: false})
    }

    // Make the request to the backend to try to authenticate the user.
    fetch(`${backendURL}/current_user`, req)
      .then(resp => handleResponse(resp, success, failure))
  }

  conditionallyRender() {
    // Decide what to render based on component state.
    const { loading, backendError } = this.state

    let componentToRender
    
    if ( backendError ) {
      componentToRender = <Error message={backendError.exception}></Error>
    } else if ( loading ) {
      componentToRender = <Loading header="Awaiting Backend Server" message="This could take up to a minute for Heroku..." />
    } else {
      componentToRender = <Fragment>
                            <Sidebar/>
                            <MainDisplay/>
                          </Fragment>
    }
  
    return componentToRender
  }

  render() {
    return (
      <Router>
        {this.conditionallyRender()}
      </Router>  
    )
  }
}


export default connect(
  mapUserToProps,
  { setLoggedInUser, setSongs }
)(App)
