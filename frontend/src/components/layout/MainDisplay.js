import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomeContainer from '../home/HomeContainer'
import PrivateRoute from '../PrivateRoute'
import RepertoireContainer from '../repertoire/RepertoireContainer'
import SessionFormContainer from '../sessions/SessionFormContainer'
import SongsContainer from '../songs/SongsContainer'
import './layout.css'


const MainDisplay = () => {
  return (
    <div id="main-display" className="bg-grey">
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


export default MainDisplay
