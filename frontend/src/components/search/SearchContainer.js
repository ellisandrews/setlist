import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import SearchHeader from './SearchHeader'
import SearchForm from './SearchForm'
import SearchResults from './SearchResults'
import { backendURL, getAuthTokenHeader, handleResponse } from '../../utils'


class SearchContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      query: '',
      results: [],
      selectedIndex: 0,  // Index of results array that is currently selected
    }
  }

  handleKeyDown = event => {

    const { results, selectedIndex } = this.state
    
    const keyCode = event.keyCode

    // Prevent cursor from going to start/end of input box (we want to scroll instead) for arrow up/down
    if ( keyCode === 38 || keyCode === 40 ) {
      event.preventDefault()     
    }

    switch ( keyCode ) {
      
      // Arrow up key
      case 38:
        if ( selectedIndex > 0 ) {
          this.setState(prevState => ({
            selectedIndex: prevState.selectedIndex - 1
          }))
        }
        break

      // Arrow down key
      case 40:
        if ( selectedIndex < results.length - 1 ) {
          this.setState( prevState => ({
            selectedIndex: prevState.selectedIndex + 1
          }))
        }
        break

      // Enter key
      case 13:
        this.props.handleSpotifyTrack(results[selectedIndex])
        break

      default:
        return
    }
  }

  handleChange = event => {
    
    const query = event.target.value
    
    // Update the state so that the field is writeable for the user
    this.setState({
      query: query
    })

    // If there is no query string, set the results back to empty array and return.
    if (!query) {
      this.setState({
        results: [],
        selectedIndex: 0
      })
      return
    }

    const success = results => {
      this.setState({
        results,
        selectedIndex: 0  // When the results change, set the selectedIndex back to 0
      })
    }

    // Make a request to the backend, which hits the Spotify API and returns the results.
    // Then set the state to results, so that they are rendered
    const uri = encodeURI(`${backendURL}/search/tracks?query=${query}`)
    fetch(uri, { headers: getAuthTokenHeader() })
      .then(resp => handleResponse(resp, success))
  }

  handleMouseEnter = resultIndex => {
    // When a user hovers over a result, set the selectedIndex to that result
    this.setState({
      selectedIndex: resultIndex
    })
  }

  render() {
    const { query, results, selectedIndex } = this.state

    return (
      <Container id="search-container" className="bg-white custom-shadow rounded my-4 pb-3">
        <SearchHeader/>
        <SearchForm query={query} handleChange={this.handleChange} handleKeyDown={this.handleKeyDown}/>
        <SearchResults results={results} selectedIndex={selectedIndex} handleMouseEnter={this.handleMouseEnter} handleSpotifyTrack={this.props.handleSpotifyTrack}/>
      </Container>
    )
  }

}


export default SearchContainer
