import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../Home'
import PrivateRoute from '../PrivateRoute'
import SessionFormContainer from '../sessions/SessionFormContainer'
import SongsContainer from '../songs/SongsContainer'
import './layout.css'


const MainDisplay = props => {
  return (
    <div id='main-display'>
      <Switch>
        <Route exact path='/'>
          <Home/>
        </Route>
        <Route exact path={['/login', '/signup']}>
          <SessionFormContainer/>
        </Route>
        <PrivateRoute path='/songs'>
          <SongsContainer/>
        </PrivateRoute>
      </Switch>
    </div>
  )
}


export default MainDisplay
