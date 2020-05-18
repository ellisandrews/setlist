import React, { Component } from 'react'
import SearchContainer from '../search/SearchContainer'
import SongFormContainer from './SongFormContainer'
import { getAuthTokenHeader, backendURL } from '../../utils'


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

    // TODO: Standardize with rest of project.
    // On success should:
    //     1. Redirect the user to the newly created song's show page
    //     2. Add the song to the redux store of the user's songs
    fetch(`${backendURL}/songs`, req)
    .then(resp => resp.json())
    .then(song => console.log('Data returned:', song))
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


export default NewSong
