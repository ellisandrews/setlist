import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { mapSongsToProps } from '../../utils'
import SongHeader from './SongHeader'


class ShowSong extends Component {
  render() {
    const { songs, match } = this.props
    // Find the song to display
    const song = songs.find(song => song.id === parseInt(match.params.songId))
    
    // TODO: This really needs to be handled in the backend. Just doing for now.
    const spotifyData = {
      spotify_id: song.spotify_id,
      title: song.title,
      artist: song.artist,
      artwork_url: song.artwork_url
    }

    return (
      <div>
        <h3>Show Song</h3>
        <SongHeader spotifyData={spotifyData} />
      </div>
    )
  }
}


export default connect(mapSongsToProps)(withRouter(ShowSong))
