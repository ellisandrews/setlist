import React, { Component } from 'react'
import SearchContainer from '../search/SearchContainer'
import SongForm from './SongForm'


class NewSong extends Component {
  
  constructor(props) {
    super(props)

    // All of the data that will be collected in multi-step form
    this.state = {
      step: 1,
      title: '',
      artist: '',
      type: '',
      capo: null,
      notes: '',
      spotify_id: '',
      artwork_url: '',
      sections: []
    }
  }

  handleSpotifyData = trackData => {
    // Store relevant data from spotify in component state for the track that was clicked on.
    const artwork = trackData.album.images.find(image => image.height === 640) || trackData.album.images[0]    
    this.setState(prevState => ({
      step: prevState.step + 1,
      title: trackData.name,
      artist: trackData.artists[0].name,
      spotify_id: trackData.id,
      artwork_url: artwork.url
    }))
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    console.log(this.state)
  }

  renderContent = () => {
    const { step, title, artist, type, capo, notes, spotify_id, artwork_url, sections } = this.state
    const values = { title, artist, type, capo, notes, spotify_id, artwork_url, sections }
    
    switch (step) {
      case 1:
        return <SearchContainer handleSpotifyData={this.handleSpotifyData}/>
      case 2:
        return <SongForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} values={values}/>
    }
  }

  render() {
    return (
      <>
        <h3>New Song</h3>
        {this.renderContent()}
      </>
    )
  }
}


export default NewSong
