import React, { Component } from 'react'
import { Nav } from 'react-bootstrap'
import { connect } from 'react-redux'
import './layout.css'
import { mapUserToProps } from '../utils'


class Sidebar extends Component {
  
  renderNavItems = () => {
    // Render navbar links if the user is logged in
    if ( !!this.props.user ) {
      return (
        <>
          <Nav.Item className="border">
            <Nav.Link className="sidebar-link" href="/songs/new" eventKey="new-song">
              <ion-icon name="musical-notes-outline"></ion-icon><br/>
              <span>New Song</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="border">
            <Nav.Link className="sidebar-link" href="/songs" eventKey="repertoire">
              <ion-icon name="copy-outline"></ion-icon><br/>
              <span>Repertoire</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="border">
            <Nav.Link className="sidebar-link" href="/songs" eventKey="log-out">
              <ion-icon name="log-out-outline"></ion-icon><br/>
              <span>Log Out</span>
            </Nav.Link>
          </Nav.Item>
        </>
      )
    }
  }
  
  render() {
    return (
      <Nav className="flex-column border" id="sidebar-nav">
        {/* TODO: Change this first item to app logo? */}
        <Nav.Item className="border">
          <Nav.Link className="sidebar-link" href="/" eventKey="home">
            <ion-icon name="home-outline"></ion-icon><br/>
            <span>Home</span>
          </Nav.Link>
        </Nav.Item>
        {this.renderNavItems()}
      </Nav>
    )
  }
}


export default connect(mapUserToProps)(Sidebar)
