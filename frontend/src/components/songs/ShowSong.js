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

    return (
      <div>
        <h3>Show Song</h3>
        <SongHeader spotifyTrack={song.spotify_track} />
      </div>
    )
  }
}


export default connect(mapSongsToProps)(withRouter(ShowSong))
