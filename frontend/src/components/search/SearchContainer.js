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

  handleKeyPress = event => {

    console.log(event)

    const { results, selectedIndex } = this.state
    
    // Only handle arrow up or down keys, which will navigate the selected item of the results list
    if (event.keyCode === 38 && selectedIndex > 0) {
      this.setState(prevState => ({
        selectedIndex: prevState.selectedIndex - 1
      }))
    } else if (event.keyCode === 40 && selectedIndex < results.length - 1) {
      this.setState( prevState => ({
        selectedIndex: prevState.selectedIndex + 1
      }))
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

  render() {
    const { query, results, selectedIndex } = this.state

    return (
      <Container id="search-container" className="border">
        <SearchHeader/>
        <SearchForm query={query} handleChange={this.handleChange}/>
        <SearchResults results={results} selectedIndex={selectedIndex} handleSpotifyTrack={this.props.handleSpotifyTrack}/>
      </Container>
    )
  }

}


export default SearchContainer
