import React, { Component } from 'react'
import RepertoireDisplay from './RepertoireDisplay'
import RepertoireSearchContainer from './RepertoireSearchContainer'
import { mapSongsToProps } from '../../utils'
import { connect } from 'react-redux'


class RepertoireContainer extends Component {
  
  constructor(props) {
    super(props)
    // Hold array of songs to be displayed. Initialize the final array with all songs from redux without processing.
    this.state = {
      query: '',          // Search query (optional)
      guitarType: null,   // Filter on type of guitar (optional)
      orderBy: 'title',   // created_at, updated_at, title, artist, etc.
    }
  }
  
  handleSearchChange = event => {
    this.setState({
      query: event.target.value,
    })
  }

  sortSongs = property => {
    return (song1, song2) => {

      // Handle nested `spotify_track` properties
      if (property === 'title' || property === 'artist') {
        return song1.spotify_track[property] - song2.spotify_track[property]
      }

      // Otherwise, handle top-level song properties
      return song1[property] - song2[property]
    }
  }

  filterAndSortSongs = () => {
    
    const { query, guitarType, orderBy } = this.state

    // Start with all songs in redux store
    let displaySongs = this.props.songs
    
    // First, apply guitarType filter (if applicable)
    if (!!guitarType) {
      displaySongs = displaySongs.filter(song => song.guitar_type === guitarType)
    }

    // Second, apply search query filter (if applicable)
    if (!!query) {
      const regex = new RegExp(query, 'i')  // Case insensitive
      // Match on title or artist
      displaySongs = displaySongs.filter(
        song => regex.test(song.spotify_track.title) || regex.test(song.spotify_track.artist)
      )
    }

    // Last, order the filtered songs and return them
    return [...displaySongs].sort(this.sortSongs(orderBy))
  }

  render() {

    return (
      <div id="repertoire-container">
        <h1>Repertoire</h1>
        <RepertoireSearchContainer query={this.state.query} handleSearchChange={this.handleSearchChange}/>
        <RepertoireDisplay songs={this.filterAndSortSongs()}/>
      </div>
    )
  }
}


export default connect(mapSongsToProps)(RepertoireContainer)
