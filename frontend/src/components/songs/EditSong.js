import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import ErrorAlert from '../layout/ErrorAlert'
import SongForm from './SongForm'
import SongHeader from './SongHeader'
import { updateSongAsync } from '../../actions/songs'


class EditSong extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      showErrors: true,
      errors: []
    }
  }

  handleCancel = () => {
    const abandonChanges = window.confirm('Are you sure you want to abondon changes?')
    if (abandonChanges) {
      const { history, song } = this.props
      history.push(`/songs/${song.id}`)
    }
  }

  handleSubmit = values => {
    const { history, updateSongAsync, song } = this.props
    
    updateSongAsync(
      song.id,
      values,
      songId => { history.push(`/songs/${songId}`) },
      error => { this.setState({ errors: error.messages, showErrors: true }) }  // On failure, update this component state with the error messages to be displayed
    )
  }

  hideErrors = () => {
    this.setState({
      showErrors: false
    })
  }

  render() {
    const { song } = this.props
    const { showErrors, errors } = this.state

    return (
      <div id="edit-song">
        {
          /* Render any errors if desired */
          showErrors && errors.length > 0 ?
          <ErrorAlert errors={errors} hideErrors={this.hideErrors}/>
            :
          null
        }
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
