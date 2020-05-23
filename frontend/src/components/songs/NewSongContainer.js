import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import SearchContainer from '../search/SearchContainer'
import SongForm from './SongForm'
import SongHeader from './SongHeader'
import { addSongAsync } from '../../actions/songs'


class NewSongContainer extends Component {
  
  constructor(props) {
    super(props)

    // Hold spotify trakc data that will be collected via search and then passed along to the SongForm.
    // Also hold a boolean for whether to display the spotify search bar, or the SongForm
    this.state = {
      displaySearch: true,
      spotifyTrack: this.spotifyTrackFactory()
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
      songId => { history.push(`/songs/${songId}`) }
    )
  }

  render() {
    return (
      <div id="new-song-container" className="border">
        {
          this.state.displaySearch ?
          <SearchContainer handleSpotifyTrack={this.handleSpotifyTrack}/>
            :
          <div id="new-song" className="border">
            <SongHeader spotifyTrack={this.state.spotifyTrack}/>
            <SongForm handleCancel={this.handleCancel} handleSubmit={this.handleSubmit} />
          </div>
        }
      </div>
    )
  }
}


export default connect(
  null,
  { addSongAsync }
)(withRouter(NewSongContainer))
