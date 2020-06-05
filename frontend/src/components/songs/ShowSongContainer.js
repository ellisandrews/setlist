import React from 'react'
import { connect } from 'react-redux'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { mapSongsToProps } from '../../utils'
import ShowSong from './ShowSong'
import NotFound from '../NotFound'


const ShowSongContainer = props => {

  const { songs } = props

  // Find the song to display from the URL params
  const { songId } = useParams()
  const song = songs.find(song => song.id === parseInt(songId))
  
  // Render the song if it's found in redux store. 
  // If the song isn't found, it either doesn't exist or it belongs to a different user.
  if ( !!song ) {
    return (
      <Container id="show-song-container" className="py-1">
        <ShowSong song={song}/>
      </Container>
    )
  } else {
    return <NotFound/>
  }
}


export default connect(mapSongsToProps)(ShowSongContainer)
