import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import SongForm from './SongForm'
import SongHeader from './SongHeader'
import { updateSongAsync } from '../../actions/songs'


class EditSong extends Component {
  
  handleCancel = () => {
    const abandonChanges = window.confirm('Are you sure you want to abondon changes?')
    if (abandonChanges) {
      const { history, song } = this.props
      history.push(`/songs/${song.id}`)
    }
  }

  handleSubmit = (event, formData) => {
    event.preventDefault()
  
    const { history, updateSongAsync, song } = this.props
    
    updateSongAsync(
      song.id,
      formData,
      songId => { history.push(`/songs/${songId}`) }
    )
  }

  render() {
    const { song } = this.props
    return (
      <div id="edit-song">
        <SongHeader spotifyTrack={song.spotify_track}/>
        <SongForm song={song} handleCancel={this.handleCancel} handleSubmit={this.handleSubmit}/>
      </div>
    )
  }
}


export default connect(
  null,
  { updateSongAsync }
)(withRouter(EditSong))
