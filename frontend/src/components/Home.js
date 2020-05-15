import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { mapUserToProps } from '../utils'


class Home extends Component {
  
  renderContent = () => {
    const { user, history } = this.props

    if (!!user) {
      return (
        <>
          <p>Welcome, {user.first_name}</p>
         <Button variant='primary' onClick={() => history.push('/songs/new')}>New Song</Button>
        </>
      )
    } else {
      return (
        <>
          <p>Log in to start tracking your songs</p>
         <Button variant='primary' onClick={() => history.push('/login')}>Log In</Button>
        </>
      )
    }
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        {this.renderContent()}
      </div>
    )
  }
}


export default connect(mapUserToProps)(withRouter(Home))
