import React, { Component } from 'react'
import SearchForm from './SearchForm'
import SearchResults from './SearchResults'


class SearchConatiner extends Component {

  constructor() {
    super()

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

    // Make a request to the backend, which hits the Spotify API and returns the results.
    // Then set the state to results, so that they are rendered
    // TODO: Don't hard-code backend URL. Also, catch errors.
    const uri = encodeURI(`http://localhost:3000/api/v1/search/tracks?query=${query}`)
    fetch(uri)
      .then(resp => resp.json())
      .then(results => {
        this.setState({
          results: results
        })
      })
  }

  render() {

    const { query, results } = this.state

    return (
      <div id="search-container">
        <h1>New Song</h1>
        <SearchForm query={query} handleChange={this.handleChange} />
        <SearchResults results={results}/>
      </div>
    )
  }

}


export default SearchConatiner
