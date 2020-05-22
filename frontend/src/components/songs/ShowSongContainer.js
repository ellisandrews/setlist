import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { mapSongsToProps } from '../../utils'
import ShowSong from './ShowSong'


const ShowSongContainer = props => {

  const { songs } = props

  // Find the song to display from the URL params
  const { songId } = useParams()
  const song = songs.find(song => song.id === parseInt(songId))
  
  return <ShowSong song={song}/>
}


export default connect(mapSongsToProps)(ShowSongContainer)
