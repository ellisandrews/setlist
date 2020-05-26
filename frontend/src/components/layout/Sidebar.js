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
      <Nav.Item className='sidebar-link'>              
        <NavLink to='/'>
          <ion-icon name='home-outline'></ion-icon><br/>
          <span>Home</span>
        </NavLink>
      </Nav.Item>
    )
  }

  renderNavItems = () => {

    const { user, logout } = this.props

    // Render navbar links if the user is logged in
    if ( !!user ) {
      return (
        <>
          <Nav.Item className='sidebar-link'>
            <NavLink to='/songs/new'>
              <ion-icon name='musical-notes-outline'></ion-icon><br/>
              <span>New Song</span>
            </NavLink>            
          </Nav.Item>
          <Nav.Item className='sidebar-link'>
            <NavLink to='/repertoire'>
              <ion-icon name='copy-outline'></ion-icon><br/>
              <span>Repertoire</span>
            </NavLink>
          </Nav.Item>
          <Nav.Item className='sidebar-link' onClick={logout}>
            <NavLink to='/' onClick={logout}>
              <ion-icon name='log-out-outline'></ion-icon><br/>
              <span>Log Out</span>
            </NavLink>
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
