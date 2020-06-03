import React from 'react'
import { Alert } from 'react-bootstrap'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import HomeContainer from '../home/HomeContainer'
import PrivateRoute from '../PrivateRoute'
import RepertoireContainer from '../repertoire/RepertoireContainer'
import SessionFormContainer from '../sessions/SessionFormContainer'
import SongsContainer from '../songs/SongsContainer'
import { mapUserToProps } from '../../utils'
import './layout.css'


const MainDisplay = props => {
  return (
    <div id="main-display" className="bg-grey">
      { props.user && props.user.email === 'johndoe@fake.com' ? <Alert variant="danger">Preview Mode</Alert> : null }
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
        <PrivateRoute path='/repertoire'>
          <RepertoireContainer/>
        </PrivateRoute>
      </Switch>
    </div>
  )
}


export default connect(mapUserToProps)(MainDisplay)
