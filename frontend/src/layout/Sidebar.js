import React from 'react';
import { Nav } from 'react-bootstrap'
import './layout.css'


const Sidebar = () => {
  return (
    <Nav className="flex-column border" id="sidebar-nav">
      <Nav.Item className="border">
        <Nav.Link className="sidebar-link" href="/" eventKey="home">
          <ion-icon name="home-outline"></ion-icon><br/>
          <span>Home</span>
        </Nav.Link>
      </Nav.Item>
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
    </Nav>
  )
}


export default Sidebar
