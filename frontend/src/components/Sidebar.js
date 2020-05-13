import React from 'react';
import { Nav } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import './Sidebar.css'


const Sidebar = props => {

  return (
    <div id="sidebar">
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
          <Nav.Link className="sidebar-link" href="songs" eventKey="repertoire">
            <ion-icon name="copy-outline"></ion-icon><br/>
            <span>Repertoire</span>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
    
  )


  // REPLAYIFY
  // <div className="App-navigation">
  //   <Link className="app-icon" to="/app">
  //     <img src={require('../../assets/images/replayify-icon.png')} alt="Replayify" />
  //   </Link>
  //   <NavLink activeClassName="active" className="App-navigation__link" to="/top-artists">
  //     <span className="icon ion-android-star-outline" />
  //     <span className="navigation__label">Top Artists</span>
  //   </NavLink>
  //   <NavLink activeClassName="active" className="App-navigation__link" to="/top-tracks">
  //     <span className="icon ion-android-favorite-outline" />
  //     <span className="navigation__label">Top Tracks</span>
  //   </NavLink>
  //   <NavLink activeClassName="active" className="App-navigation__link" to="/recently-played">
  //     <span className="icon ion-android-time" />
  //     <span className="navigation__label">Recent</span>
  //   </NavLink>
  // </div>
  
  // return (
  //   <Nav className="flex-column">
  //     <Nav.Item>
  //       <Nav.Link href="/home">Active</Nav.Link>
  //     </Nav.Item>
  //     <Nav.Item>
  //       <Nav.Link eventKey="link-1">Link</Nav.Link>
  //     </Nav.Item>
  //     <Nav.Item>
  //       <Nav.Link eventKey="link-2">Link</Nav.Link>
  //     </Nav.Item>
  //     <Nav.Item>
  //       <Nav.Link eventKey="disabled" disabled>Disabled</Nav.Link>
  //     </Nav.Item>
  //   </Nav>
  // )
}


export default withRouter(Sidebar)
