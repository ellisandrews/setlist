import React from 'react'
import { Row, Col, Image, Container } from 'react-bootstrap'


const SongHeader = props => {

  const { artwork_url, title, artist, spotify_id } = props.spotifyTrack

  return (
    <Container id="song-header">
      <Row className="align-items-center">
        <Col xs={2}>
          <Image thumbnail fluid src={artwork_url} alt="album-artwork" />
        </Col>
        <Col xs={5}>
          <h1>{title}</h1>
          <h4>{artist}</h4>
        </Col>
        <Col>
          <iframe title="spotify-preview" src={`https://open.spotify.com/embed/track/${spotify_id}`} width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        </Col>
      </Row>
    </Container>
  )
}


export default SongHeader
