import React from 'react'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import EditSongContainer from './EditSongContainer'
import NewSongContainer from './NewSongContainer'
import ShowSongContainer from './ShowSongContainer'
import './songs.css'


const SongsContainer = () => {

  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route exact path={path}>
        <Redirect to='/repertoire'/>
      </Route>
      <Route exact path={`${path}/new`}>
        <NewSongContainer/>
      </Route>
      <Route exact path={`${path}/:songId`}>
        <ShowSongContainer/>
      </Route>
      <Route exact path={`${path}/:songId/edit`}>
        <EditSongContainer/>
      </Route>
    </Switch>
  )
}


export default SongsContainer
