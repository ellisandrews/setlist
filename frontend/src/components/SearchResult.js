import React from 'react'


const SearchResult = props => {

  const { imgSrc, title, artist } = props

  return (
    <div>
      <img style={{maxHeight: 30, maxWidth: 30}} src={imgSrc}/>
      <span style={{paddingLeft: 20}}>{title} - {artist}</span>
    </div>
  )

}


export default SearchResult
