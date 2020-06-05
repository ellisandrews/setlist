import React from 'react'
import { Alert } from 'react-bootstrap'
import { Switch, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import HomeContainer from '../home/HomeContainer'
import PrivateRoute from '../PrivateRoute'
import RepertoireContainer from '../repertoire/RepertoireContainer'
import SessionFormContainer from '../sessions/SessionFormContainer'
import SongsContainer from '../songs/SongsContainer'
import { logout } from '../../actions/sessions'
import { mapUserToProps } from '../../utils'
import './layout.css'
import NotFound from '../NotFound'


const MainDisplay = props => {
  return (
    <div id="main-display" className="bg-grey">
      
      { /* Render sticky preview mode alert banner if logged in as the preview user */
        props.user && props.user.email === 'johndoe@fake.com' ? 
        <Alert variant="info" style={{ top: 0, zIndex: 999 }} className="position-sticky">
          Preview Mode | <Link to='/' onClick={props.logout} style={{color: 'inherit', fontWeight: 700}}>Log out</Link> to exit
        </Alert> 
          : 
          null 
      }

      {/* Switch for top-level routes */}
      <Switch>
        <Route exact path='/'>
          <HomeContainer/>
        </Route>
        <Route exact path={['/login', '/signup']}>
          <SessionFormContainer/>
        </Route>
        <PrivateRoute path='/songs'>
          <SongsContainer/>
        </PrivateRoute>
        <PrivateRoute exact path='/repertoire'>
          <RepertoireContainer/>
        </PrivateRoute>
        <Route path="*">
          <NotFound/>
        </Route>
      </Switch>

    </div>
  )
}


export default connect(
  mapUserToProps,
  { logout }
)(MainDisplay)
