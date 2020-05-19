import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import SearchContainer from '../search/SearchContainer'
import SongFormContainer from './SongFormContainer'
import { addSongAsync } from '../../actions/songs'


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

    const { addSongAsync, history } = this.props

    addSongAsync(
      songData,
      this.state.spotifyTrack,
      songId => { history.push(`/songs/${songId}`) }
    )
  }

  render() {
    return (
      <div id="new-song-container">
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
  { addSongAsync }
)(withRouter(NewSongContainer))
