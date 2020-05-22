import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { mapUserToProps } from '../utils'


class Home extends Component {
  
  renderContent = () => {
    const { user } = this.props

    if (!!user) {
      return (
        <>
          <p>Hi, {user.first_name}!</p>
          <LinkContainer to='/songs/new'>
            <Button variant='primary'>New Song</Button>
          </LinkContainer>
        </>
      )
    } else {
      return (
        <>
          <p>Welcome to Setlist!</p>
          <p>Log in to start building your guitar repertoire.</p>
          <LinkContainer to='/login'>
            <Button variant='primary'>Log In</Button>
          </LinkContainer>{' '}
          <LinkContainer to='/signup'>
            <Button variant='primary'>Sign Up</Button>
          </LinkContainer>
        </>
      )
    }
  }

  render() {
    return (
      <div className="vertical-center">
        <Container id="home" className="border">
          <h1>Setlist</h1>
          {this.renderContent()}
        </Container>
      </div>
    )
  }
}


export default connect(mapUserToProps)(Home)
