import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import SearchContainer from '../search/SearchContainer'
import SongFormContainer from './SongFormContainer'
import { addSong } from '../../actions/songs'
import { getAuthTokenHeader, backendURL, handleResponse } from '../../utils'


class NewSong extends Component {
  
  constructor(props) {
    super(props)

    // Hold spotify data that will be collected via search and then passed along to the SongForm.
    // Also hold a boolean for whether to display the spotify search bar, or the SongForm
    this.state = {
      displaySearch: true,
      spotifyData: {
        spotify_id: '',
        title: '',
        artist: '',
        artwork_url: ''
      }
    }
  }

  handleSpotifyData = trackData => {
    // Extract relevant data for the Spotify track that was clicked on in search results.
    const artwork = trackData.album.images.find(image => image.height === 640) || trackData.album.images[0]    
    this.setState({
      displaySearch: false,  // Toggle to now display the SongForm (to which spotifyData will be passed)
      spotifyData: {
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
    
    // Create new object to aggregate spotify and user-entered form data to be sent to the server
    const songData = {}

    // Aggregate the spotify and form data, renaming `sections` to `sections_attributes` which is what the server expects
    delete Object.assign(songData, this.state.spotifyData, formData, { sections_attributes: formData.sections }).sections

    // Each section needs to have a `display_order` attribute at time of submit. Use the order of the array.
    songData.sections_attributes = songData.sections_attributes.map((section, index) => ({...section, display_order: index + 1}))

    const req = {
      method: 'POST',
      headers:{
        ...getAuthTokenHeader(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        song: songData
      })
    }

    const { addSong, history } = this.props

    const success = song => {
      addSong(song)  // Add the song to redux store
      history.push(`/songs/${song.id}`)  // Redirect to the newly created song's show view
    }

    // TODO: What to do on failure?
    fetch(`${backendURL}/songs`, req)
      .then(resp => handleResponse(resp, success))
  }

  render() {
    return (
      <div>
        <h3>New Song</h3>
        {
          this.state.displaySearch ?
          <SearchContainer handleSpotifyData={this.handleSpotifyData}/>
            :
          <SongFormContainer spotifyData={this.state.spotifyData} handleSubmit={this.handleSubmit}/>
        }
      </div>
    )
  }
}


export default connect(
  null,
  { addSong }
)(withRouter(NewSong))
