import React from 'react'
import { Container } from 'react-bootstrap'
import { Switch, Route } from 'react-router-dom'
import Home from '../Home'
import PrivateRoute from '../PrivateRoute'
import RepertoireContainer from '../repertoire/RepertoireContainer'
import SessionFormContainer from '../sessions/SessionFormContainer'
import SongsContainer from '../songs/SongsContainer'
import './layout.css'


const MainDisplay = () => {
  return (
    <Container id='main-display'>
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
        <PrivateRoute path='/repertoire'>
          <RepertoireContainer/>
        </PrivateRoute>
      </Switch>
    </Container>
  )
}


export default MainDisplay
