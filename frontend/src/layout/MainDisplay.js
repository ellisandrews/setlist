import React from 'react'
import './layout.css'
import { Switch, Route } from 'react-router-dom'
import Home from '../components/Home'
import PrivateRoute from '../components/PrivateRoute'
import SessionFormContainer from '../components/SessionFormContainer'
import SearchContainer from '../components/SearchContainer'


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
