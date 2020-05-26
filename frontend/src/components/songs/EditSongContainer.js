import React from 'react'
import { connect } from 'react-redux'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { mapSongsToProps } from '../../utils'
import EditSong from './EditSong'


const EditSongContainer = props => {

  const { songs } = props

  // Find the song to display from the URL params
  const { songId } = useParams()
  const song = songs.find(song => song.id === parseInt(songId))
  
  return (
    <Container id="show-song-container" className="py-1">
      <EditSong song={song}/>
    </Container>
  )
}


export default connect(mapSongsToProps)(EditSongContainer)
