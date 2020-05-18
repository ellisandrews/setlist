import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import MainDisplay from './components/layout/MainDisplay'
import { backendURL, getAuthToken, getAuthTokenHeader, handleResponse, mapUserToProps } from './utils'
import { setLoggedInUser } from './actions/sessions'
import { setSongs } from './actions/songs'
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
      
      const { setLoggedInUser, setSongs } = this.props

      const success = userData => {
        setLoggedInUser(userData.user)
        setSongs(userData.songs)
        this.setState({ loading: false })
      }

      const failure = () => {
        // An error in this case simply means we failed to authenticate the user. They will be redirected to the /login page.
        this.setState({ loading: false })
      }

      // Make the request to the backend to try to authenticate the user.
      fetch(`${backendURL}/current_user`, req)
        .then(resp => handleResponse(resp, success, failure))
        .catch(error => { console.log(error) })
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
  { setLoggedInUser, setSongs }
)(App)
