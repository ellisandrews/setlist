import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import EditSong from './EditSong'
import NewSong from './NewSong'
import ShowSong from './ShowSong'


const SongsContainer = props => {

  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route exact path={path}>
        <h3>Songs</h3>
      </Route>
      <Route exact path={`${path}/new`}>
        <NewSong/>
      </Route>
      <Route exact path={`${path}/:songId`}>
        <ShowSong/>
      </Route>
      <Route exact path={`${path}/:songId/edit`}>
        <EditSong/>
      </Route>
    </Switch>
  )
}


export default SongsContainer
