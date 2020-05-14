import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../Home'
import PrivateRoute from '../PrivateRoute'
import SessionFormContainer from '../session/SessionFormContainer'
import SearchContainer from '../search/SearchContainer'
import './layout.css'


const MainDisplay = props => {
  return (
    <div id='main-display'>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path={['/login', '/signup']} component={SessionFormContainer} />
        <PrivateRoute exact path='/songs/new' component={SearchContainer} />
      </Switch>
    </div>
  )
}


export default MainDisplay
