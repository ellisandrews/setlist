import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import EditSongContainer from './EditSongContainer'
import NewSongContainer from './NewSongContainer'
import ShowSongContainer from './ShowSongContainer'


const SongsContainer = () => {

  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route exact path={path}>
        <h3>Songs</h3>
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
