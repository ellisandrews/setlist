import React, { Component } from 'react'
import SearchContainer from '../search/SearchContainer'
import SongForm from './SongForm'


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

  render() {
    return (
      <>
        <h3>New Song</h3>
        {
          this.state.displaySearch ?
          <SearchContainer handleSpotifyData={this.handleSpotifyData}/>
            :
          <SongForm spotifyData={this.state.spotifyData}/>
        }
      </>
    )
  }
}


export default NewSong
