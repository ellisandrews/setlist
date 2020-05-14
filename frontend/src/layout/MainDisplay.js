import React from 'react'
import './layout.css'
import { Switch, Route } from 'react-router-dom'
import Home from '../components/Home'
import PrivateRoute from '../components/PrivateRoute'
import Login from '../components/Login'
import SearchContainer from '../components/SearchContainer'


const MainDisplay = props => {
  return (
    <div id='main-display'>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <PrivateRoute exact path='/songs/new'>
          <SearchContainer />
        </PrivateRoute>
      </Switch>
    </div>
  )
}


export default MainDisplay
