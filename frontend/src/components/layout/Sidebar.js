import React, { Component } from 'react'
import { Nav, Image } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapUserToProps } from '../../utils'
import { logout } from '../../actions/sessions'
import setlistLogo from '../../SetlistLogo.png'
import './layout.css'


class Sidebar extends Component {
  
  renderHomeItem = () => {
    // TODO: Change this first item to be a clickable app logo instead?
    return (
      <NavLink exact to='/' className='sidebar-link'>
        <Nav.Item>
          <Image style={{maxWidth: '60%'}} rounded src={setlistLogo} alt='setlist logo'></Image>
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
          <NavLink exact to='/songs/new' className='sidebar-link'>
            <Nav.Item>
              <ion-icon name='musical-notes-outline'></ion-icon><br/>
              <span>New Song</span>
            </Nav.Item>
          </NavLink>            
          <NavLink exact to='/repertoire' className='sidebar-link'>
            <Nav.Item>
              <ion-icon name='copy-outline'></ion-icon><br/>
              <span>Repertoire</span>
            </Nav.Item>
          </NavLink>
          <Link to='/' onClick={logout} className='sidebar-link'>
            <Nav.Item>
              <ion-icon name='log-out-outline'></ion-icon><br/>
              <span>Log Out</span>
            </Nav.Item>
          </Link>
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
