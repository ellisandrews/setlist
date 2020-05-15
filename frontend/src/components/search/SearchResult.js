import React from 'react'
import { Image } from 'react-bootstrap'


const SearchResult = props => {

  const { artwork_url, title, artist } = props
  const displayText = `${title} - ${artist}`

  return (
    <div>
      <Image rounded fluid src={artwork_url} alt={`${displayText} album artwork`} />
      <span style={{paddingLeft: 20}}>{displayText}</span>
    </div>
  )

}


export default SearchResult
