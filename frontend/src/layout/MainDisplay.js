import React from 'react'
import SearchContainer from '../components/SearchContainer'
import './layout.css'
import { Switch, Route } from 'react-router-dom'
import Home from '../components/Home'
import PrivateRoute from '../components/PrivateRoute'
import SearchConatiner from '../components/SearchContainer'
import Login from '../components/Login'


const MainDisplay = props => {
  return (
    <div id="main-display">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <PrivateRoute exact path="/songs/new">
          <SearchConatiner />
        </PrivateRoute>
      </Switch>
    </div>
  )
}


export default MainDisplay
