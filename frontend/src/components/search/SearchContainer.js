import React, { Component } from 'react'
import SearchForm from './SearchForm'
import SearchResults from './SearchResults'
import { backendURL, getAuthTokenHeader, handleResponse } from '../../utils'


class SearchContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      query: '',
      results: []
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
        results: []
      })
      return
    }

    const success = results => {
      this.setState({ results })
    }

    // Make a request to the backend, which hits the Spotify API and returns the results.
    // Then set the state to results, so that they are rendered
    const uri = encodeURI(`${backendURL}/search/tracks?query=${query}`)
    fetch(uri, { headers: getAuthTokenHeader() })
      .then(resp => handleResponse(resp, success))
  }

  render() {
    const { query, results } = this.state

    return (
      <div id='search-container'>
        <SearchForm query={query} handleChange={this.handleChange} />
        <SearchResults results={results} handleSpotifyData={this.props.handleSpotifyData}/>
      </div>
    )
  }

}


export default SearchContainer
