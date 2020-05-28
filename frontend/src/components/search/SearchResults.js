import React, { Component } from 'react'
import { ListGroup, Image } from 'react-bootstrap'
import './search.css'


class SearchResults extends Component {

  renderResults = () => {

    const { results, selectedIndex, handleMouseEnter, handleSpotifyTrack } = this.props

    return results.map( (result, index) => {

      // Extract the relevant data from the result object
      const artwork_url = result.album.images.find(image => image.height === 64).url
      const title = result.name
      const artist = result.artists[0].name
      const displayText = `${title} - ${artist}`

      return (
        <div className="search-result" key={result.id} onMouseEnter={() => handleMouseEnter(index)}>
          <ListGroup.Item active={index === selectedIndex} action as='button' onClick={() => handleSpotifyTrack(result)}>
            <Image rounded src={artwork_url} alt={`${displayText} album artwork`} />
            <span style={{paddingLeft: 20}}>{displayText}</span>
          </ListGroup.Item>
        </div>
      )
    })
  }

  render() {
    return (
      <ListGroup id="search-results" variant="flush">
        {this.renderResults()}
      </ListGroup>
    )
  }
}


export default SearchResults
