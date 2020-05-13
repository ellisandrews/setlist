import React from 'react'


const SearchResult = props => {

  const { imgSrc, title, artist } = props

  return (
    <div>
      <img src={imgSrc}/>
      <span style={{paddingLeft: 20}}>{title} - {artist}</span>
    </div>
  )

}


export default SearchResult
