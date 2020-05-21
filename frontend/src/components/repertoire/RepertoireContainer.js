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
      query: '',          // Search query (song title or artist)
      guitarType: '',     // Guitar type filter (Acoustic or Electric)
      orderBy: 'title',   // Property by which to order the results (title, artist, created_at, updated_at)
      ascending: true     // Sort results ascending (true) or descending (false)
    }
  }
  
  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  sortSongs = (property, ascending) => {
    return (song1, song2) => {

      // Handle nested `spotify_track` properties
      if (property === 'title' || property === 'artist') {
        return ( ascending ? 
          song1.spotify_track[property] - song2.spotify_track[property]
            :
          song2.spotify_track[property] - song1.spotify_track[property]
        )
      }

      // Otherwise, handle top-level song properties
      return ( ascending ?
        song1[property] - song2[property]
          :
        song2[property] - song1[property]  
      )
    }
  }

  filterAndSortSongs = () => {
    // Extract data from state by which to filter and order the songs to be displayed
    const { query, guitarType, orderBy, ascending } = this.state

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
    return [...displaySongs].sort(this.sortSongs(orderBy, ascending))
  }

  render() {
    return (
      <div id="repertoire-container">
        <h1>Repertoire</h1>
        <RepertoireSearchContainer searchData={this.state} handleChange={this.handleChange}/>
        <RepertoireDisplay songs={this.filterAndSortSongs()}/>
      </div>
    )
  }
}


export default connect(mapSongsToProps)(RepertoireContainer)
