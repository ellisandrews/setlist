import React from 'react'
import { Image, Container } from 'react-bootstrap'
import spotifyIcon from './spotify_icon.png'


const SearchHeader = () => {
  return (
    <div id="search-header">
      <h1 className="py-3">New Song</h1>
      <Container id="spotify-logo">
        <Image fluid src={spotifyIcon} alt="spotify-logo" />
      </Container>
      <p>Search Spotify for a song to add to your repertoire.</p>
    </div>
  )
}


export default SearchHeader
