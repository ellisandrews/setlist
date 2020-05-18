import React from 'react'
import SongForm from './SongForm'
import SongHeader from './SongHeader'


const SongFormContainer = props => {
  const { spotifyData, handleSubmit } = props
  return (
    <div>
      <SongHeader spotifyData={spotifyData} />
      <SongForm handleSubmit={handleSubmit} />
    </div>
  )
}


export default SongFormContainer
