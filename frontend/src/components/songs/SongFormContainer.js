import React from 'react'
import SongForm from './SongForm'
import SongHeader from './SongHeader'


const SongFormContainer = props => {
  const { spotifyTrack, handleSubmit } = props
  return (
    <div id="song-form-container">
      <SongHeader spotifyTrack={spotifyTrack} />
      <SongForm handleSubmit={handleSubmit} />
    </div>
  )
}


export default SongFormContainer
