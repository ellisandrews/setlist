import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import ErrorAlert from '../layout/ErrorAlert'
import SearchContainer from '../search/SearchContainer'
import SongForm from './SongForm'
import SongHeader from './SongHeader'
import { addSongAsync } from '../../actions/songs'


class NewSongContainer extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      displaySearch: true,  // A boolean for whether to display the spotify search bar, or the SongForm
      spotifyTrack: this.spotifyTrackFactory(),  // spotify track data that will be collected via search and then passed along to the SongForm
      showErrors: true,  // By default, show an alert if there are errors
      errors: []  // Any errors returned from the backend during song creation
    }
  }

  spotifyTrackFactory = (spotify_id='', title='', artist='', artwork_url='') => {
    return { spotify_id, title, artist, artwork_url }
  }

  handleSpotifyTrack = trackData => {
    // Extract relevant data for the Spotify track that was clicked on in search results.
    const artwork = trackData.album.images.find(image => image.height === 640) || trackData.album.images[0]    
    this.setState({
      displaySearch: false,  // Toggle to now display the SongForm (to which spotifyTrack will be passed)
      spotifyTrack: this.spotifyTrackFactory(trackData.id, trackData.name, trackData.artists[0].name, artwork.url)
    })
  }

  handleCancel = () => {
    const abandonChanges = window.confirm('Are you sure you want to abondon changes?')
    if (abandonChanges) {
      this.props.history.push(`/repertoire`)
    }
  }

  // Form submit action that is specific to creating a new song (must pass spotify data and form data to backend)
  handleSubmit = (event, formData) => {
    event.preventDefault()
    
    const { addSongAsync, history } = this.props

    addSongAsync(
      formData,
      this.state.spotifyTrack,
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

    const { displaySearch, spotifyTrack, showErrors, errors } = this.state

    return (
      <div id="new-song-container" className="py-1">

        {
          /* Render any errors if desired */
          showErrors && errors.length > 0 ?
          <ErrorAlert errors={errors} hideErrors={this.hideErrors}/>
            :
          null
        }

        { /* Conditionally display the spotify search or the song form */
          displaySearch ?
          <SearchContainer handleSpotifyTrack={this.handleSpotifyTrack}/>
            :
          <Container id="new-song" className="p-0">
            <SongHeader spotifyTrack={spotifyTrack}/>
            <SongForm handleCancel={this.handleCancel} handleSubmit={this.handleSubmit} />
          </Container>
        }

      </div>
    )
  }
}


export default connect(
  null,
  { addSongAsync }
)(withRouter(NewSongContainer))
