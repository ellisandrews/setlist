import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { mapSongsToProps } from '../../utils'
import EditSong from './EditSong'


const EditSongContainer = props => {

  const { songs } = props

  // Find the song to display from the URL params
  const { songId } = useParams()
  const song = songs.find(song => song.id === parseInt(songId))
  
  return (
    <div id="edit-song-container">
      <h2>Edit Song</h2>
      <EditSong song={song} />
    </div>
  )
}


export default connect(mapSongsToProps)(EditSongContainer)
