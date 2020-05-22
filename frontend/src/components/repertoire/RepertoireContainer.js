import React, { Component } from 'react'
import RepertoireDisplay from './RepertoireDisplay'
import RepertoireHeader from './RepertoireHeader'
import { mapSongsToProps } from '../../utils'
import { connect } from 'react-redux'
import './repertoire.css'


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

    console.log(property, ascending)

    return (song1, song2) => {

      let operand1
      let operand2

      if (property === 'title' || property === 'artist') {
        operand1 = song1.spotify_track[property]
        operand2 = song2.spotify_track[property]
      } else {
        operand1 = song1[property]
        operand2 = song2[property]
      }

      let comparisonResult

      if ( operand1 < operand2 ) {
        comparisonResult = -1
      } else if ( operand1 > operand2 ) {
        comparisonResult = 1
      } else {
        comparisonResult = 0
      }

      return ascending ? comparisonResult : comparisonResult * -1
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
    return displaySongs.sort(this.sortSongs(orderBy, ascending))
  }

  render() {
    return (
      <div id="repertoire-container">
        <h1>Repertoire</h1>
        <RepertoireHeader searchData={this.state} handleChange={this.handleChange}/>
        <RepertoireDisplay songs={this.filterAndSortSongs()}/>
      </div>
    )
  }
}


export default connect(mapSongsToProps)(RepertoireContainer)
