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
  
    // Create new object to hold the song data due to some data munging to happen
    const songData = {}

    // Rename `sections` to `sections_attributes` which is what the server expects.
    delete Object.assign(songData, formData, { sections_attributes: formData.sections }).sections

    // Add `display_order` attribute to each section. Use the order of the array.
    songData.sections_attributes = songData.sections_attributes.map((section, index) => ({...section, display_order: index + 1}))

    const { history, updateSongAsync, song } = this.props
    
    updateSongAsync(
      song.id,
      songData,
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
