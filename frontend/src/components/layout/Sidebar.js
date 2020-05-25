import React, { Component } from 'react'
import { Nav } from 'react-bootstrap'
import { connect } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { mapUserToProps } from '../../utils'
import { logout } from '../../actions/sessions'
import './layout.css'


class Sidebar extends Component {
  
  renderHomeItem = () => {
    // TODO: Change this first item to be a clickable app logo instead?
    return (
      <LinkContainer exact to='/'>
        <Nav.Item as='button' className='border sidebar-link'>              
          <ion-icon name='home-outline'></ion-icon><br/>
          <span>Home</span>
        </Nav.Item>
      </LinkContainer>
    )
  }

  renderNavItems = () => {

    const { user, logout } = this.props

    // Render navbar links if the user is logged in
    if ( !!user ) {
      return (
        <>
          <LinkContainer to='/songs/new'>
            <Nav.Item as='button' className='border sidebar-link'>              
              <ion-icon name='musical-notes-outline'></ion-icon><br/>
              <span>New Song</span>
            </Nav.Item>
          </LinkContainer>
          <LinkContainer to='/repertoire'>
            <Nav.Item as='button' className='border sidebar-link'>              
              <ion-icon name='copy-outline'></ion-icon><br/>
              <span>Repertoire</span>
            </Nav.Item>
          </LinkContainer>
          <Nav.Item as='button' className='border sidebar-link' onClick={logout}>              
            <ion-icon name='log-out-outline'></ion-icon><br/>
            <span>Log Out</span>
          </Nav.Item>
        </>
      )
    }
  }
  
  render() {
    return (
      <Nav className='flex-column' id='sidebar-nav'>
        {this.renderHomeItem()}
        {this.renderNavItems()}
      </Nav>
    )
  }
}


export default connect(
  mapUserToProps,
  { logout }
)(Sidebar)
