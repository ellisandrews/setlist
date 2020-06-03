import React, { Component } from 'react'
import { Nav, Image } from 'react-bootstrap'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapUserToProps } from '../../utils'
import { login, logout } from '../../actions/sessions'
import setlistLogo from '../../SetlistLogo.png'
import './layout.css'


class Sidebar extends Component {
  
  previewLogin = () => {
    // Log in the read-only preview user
    const { history, login } = this.props
    login(
      { email: 'johndoe@fake.com', password: 'password'}, 
      () => history.push('/repertoire')
    )
  }

  renderNavItems = () => {

    const { user, logout } = this.props

    // Session-dependent nav links
    if ( !user ) {
      return (
        <>
          <NavLink exact to='/login' className='sidebar-link'>
            <Nav.Item>
              <ion-icon name='log-in-outline'></ion-icon><br/>
              <span>Log In</span>
            </Nav.Item>
          </NavLink>
          <NavLink exact to='/signup' className='sidebar-link'>
            <Nav.Item>
              <ion-icon name='person-add-outline'></ion-icon><br/>
              <span>Sign Up</span>
            </Nav.Item>
          </NavLink>
          <Link onClick={this.previewLogin} className='sidebar-link'>
            <Nav.Item>
              <ion-icon name='desktop-outline'></ion-icon><br/>
              <span>Preview</span>
            </Nav.Item>
          </Link>
        </>
      )
    } else {
      return (
        <>
          <NavLink exact to='/repertoire' className='sidebar-link'>
            <Nav.Item>
              <ion-icon name='copy-outline'></ion-icon><br/>
              <span>Repertoire</span>
            </Nav.Item>
          </NavLink>
          <NavLink exact to='/songs/new' className='sidebar-link'>
            <Nav.Item>
              <ion-icon name='musical-notes-outline'></ion-icon><br/>
              <span>New Song</span>
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

        {/* Home icon link (always viewable) */}
        <NavLink exact to='/' className='sidebar-link'>
          <Nav.Item>
            <Image style={{maxWidth: '60%'}} rounded src={setlistLogo} alt='setlist logo'></Image>
          </Nav.Item>
        </NavLink>

        {/* Session-dependent links */}
        {this.renderNavItems()}
      </Nav>
    )
  }
}


export default connect(
  mapUserToProps,
  { login, logout }
)(withRouter(Sidebar))
