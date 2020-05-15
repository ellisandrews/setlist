import React from 'react'


const SearchResult = props => {

  const { imgSrc, title, artist } = props
  const displayText = `${title} - ${artist}`

  return (
    <div>
      <img style={{maxHeight: 30, maxWidth: 30}} src={imgSrc} alt={`${displayText} album artwork`} />
      <span style={{paddingLeft: 20}}>{displayText}</span>
    </div>
  )

}


export default SearchResult
