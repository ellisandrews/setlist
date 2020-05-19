import React from 'react'
import { Row, Col, Image } from 'react-bootstrap'


const SongHeader = props => {

  const { artwork_url, title, artist, spotify_id } = props.spotifyTrack

  return (
    <div id="song-header">
      <Row>
        <Col xs={4}>
          <Image thumbnail fluid src={artwork_url} alt="album-artwork" />
        </Col>
        <Col>
          <h3>{title}</h3>
          <h4>{artist}</h4>
          <iframe title="spotify-preview" src={`https://open.spotify.com/embed/track/${spotify_id}`} width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>        </Col>
      </Row>
    </div>
  )
}


export default SongHeader
