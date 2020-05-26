import React, { Component } from 'react'
import { Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapUserToProps } from '../../utils'
import { logout } from '../../actions/sessions'
import './layout.css'


class Sidebar extends Component {
  
  renderHomeItem = () => {
    // TODO: Change this first item to be a clickable app logo instead?
    return (
      <NavLink to='/'>
        <Nav.Item className='sidebar-link'>              
          <ion-icon name='home-outline'></ion-icon><br/>
          <span>Home</span>
        </Nav.Item>
      </NavLink>
    )
  }

  renderNavItems = () => {

    const { user, logout } = this.props

    // Render navbar links if the user is logged in
    if ( !!user ) {
      return (
        <>
          <NavLink to='/songs/new'>
            <Nav.Item className='sidebar-link'>
              <ion-icon name='musical-notes-outline'></ion-icon><br/>
              <span>New Song</span>
            </Nav.Item>
          </NavLink>            
          <NavLink to='/repertoire'>
            <Nav.Item className='sidebar-link'>
              <ion-icon name='copy-outline'></ion-icon><br/>
              <span>Repertoire</span>
            </Nav.Item>
          </NavLink>
          <NavLink to='/' onClick={logout}>
            <Nav.Item className='sidebar-link' onClick={logout}>
              <ion-icon name='log-out-outline'></ion-icon><br/>
              <span>Log Out</span>
            </Nav.Item>
          </NavLink>
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
