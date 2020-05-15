import React, { Component } from 'react'
import { ListGroup } from 'react-bootstrap'
import SearchResult from './SearchResult'
import './search.css'


class SearchResults extends Component {

  renderResults = () => {

    const { results, handleSpotifyData } = this.props

    return results.map(result => {

      // Extract the relevant data from the result object
      const artwork_url = result.album.images.find(image => image.height === 64).url
      const title = result.name
      const artist = result.artists[0].name

      return (
        <ListGroup.Item action as='button' onClick={() => handleSpotifyData(result)} key={result.id}>
          <SearchResult artwork_url={artwork_url} title={title} artist={artist} />
        </ListGroup.Item>
      )
    })
  }

  render() {
    return (
      <ListGroup id='search-results'>
        {this.renderResults()}
      </ListGroup>
    )
  }
}


export default SearchResults
