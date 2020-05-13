import React, { Component } from 'react'
import { ListGroup } from 'react-bootstrap'
import SearchResult from './SearchResult'


class SearchResults extends Component {
  
  // TODO! This should really render the new song form with result data pre-popped somehow (redux?)
  handleClick = result => {
    console.log(result)
  }

  renderResults = () => {
    return this.props.results.map(result => {

      // Extract the relevant data from the result object
      const imgSrc = result.album.images.find(image => image.height === 64).url
      const title = result.name
      const artist = result.artists[0].name

      return (
        <ListGroup.Item action as="button" onClick={() => this.handleClick(result)}>
          <SearchResult imgSrc={imgSrc} title={title} artist={artist} />
        </ListGroup.Item>
      )
    })
  }

  render() {
    return (
      <ListGroup>
        {this.renderResults()}
      </ListGroup>
    )
  }
}


export default SearchResults
