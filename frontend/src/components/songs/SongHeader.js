import React from 'react'
import { Row, Col, Image, Container } from 'react-bootstrap'


const SongHeader = props => {

  const { artwork_url, title, artist, spotify_id } = props.spotifyTrack

  return (
    <Container id="song-header" className="border">
      <Row className="align-items-center">
        
        <Col>
          <Row className="align-items-center">
            <Col xs={4}>
              <Image thumbnail fluid src={artwork_url} alt="album-artwork"/>
            </Col>
            <Col style={{textAlign: 'left'}}>
              <h1>{title}</h1>
              <h4>{artist}</h4>
            </Col>
          </Row>
        </Col>
          
        <Col>
          <iframe title="spotify-preview" src={`https://open.spotify.com/embed/track/${spotify_id}`} width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        </Col>

      </Row>
    </Container>
  )
}


export default SongHeader
