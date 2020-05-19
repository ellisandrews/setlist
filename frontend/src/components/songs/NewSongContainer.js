import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import SearchContainer from '../search/SearchContainer'
import SongFormContainer from './SongFormContainer'
import { addSong } from '../../actions/songs'
import { getAuthTokenHeader, backendURL, handleResponse } from '../../utils'


class NewSongContainer extends Component {
  
  constructor(props) {
    super(props)

    // Hold spotify trakc data that will be collected via search and then passed along to the SongForm.
    // Also hold a boolean for whether to display the spotify search bar, or the SongForm
    this.state = {
      displaySearch: true,
      spotifyTrack: {
        spotify_id: '',
        title: '',
        artist: '',
        artwork_url: ''
      }
    }
  }

  handleSpotifyTrack = trackData => {
    // Extract relevant data for the Spotify track that was clicked on in search results.
    const artwork = trackData.album.images.find(image => image.height === 640) || trackData.album.images[0]    
    this.setState({
      displaySearch: false,  // Toggle to now display the SongForm (to which spotifyTrack will be passed)
      spotifyTrack: {
        title: trackData.name,
        artist: trackData.artists[0].name,
        spotify_id: trackData.id,
        artwork_url: artwork.url
      }
    })
  }

  // Form submit action that is specific to creating a new song (must pass spotify data and form data to backend)
  handleSubmit = (event, formData) => {
    event.preventDefault()
    
    // Create new object to hold the song data (independent of the spotifyTrack)
    const songData = {}

    // Rename `sections` to `sections_attributes` which is what the server expects.
    delete Object.assign(songData, formData, { sections_attributes: formData.sections }).sections

    // Add `display_order` attribute to each section. Use the order of the array.
    songData.sections_attributes = songData.sections_attributes.map((section, index) => ({...section, display_order: index + 1}))

    // Prepare the request to the server, including both the song data and the spotify track data
    const req = {
      method: 'POST',
      headers:{
        ...getAuthTokenHeader(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        song: songData,
        spotify_track: this.state.spotifyTrack
      })
    }

    const { addSong, history } = this.props

    const success = song => {
      addSong(song)  // Add the song to redux store
      history.push(`/songs/${song.id}`)  // Redirect to the newly created song's show view
    }

    // Make the request to the backend to create the Song (and the SpotifyTrack if necessary)
    // TODO: What to do on failure?
    fetch(`${backendURL}/songs`, req)
      .then(resp => handleResponse(resp, success))
  }

  render() {
    return (
      <div>
        <h2>New Song</h2>
        {
          this.state.displaySearch ?
          <SearchContainer handleSpotifyTrack={this.handleSpotifyTrack}/>
            :
          <SongFormContainer spotifyTrack={this.state.spotifyTrack} handleSubmit={this.handleSubmit}/>
        }
      </div>
    )
  }
}


export default connect(
  null,
  { addSong }
)(withRouter(NewSongContainer))
