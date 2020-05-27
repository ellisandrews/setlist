import React from 'react'
import { Row, Col, Image, Container } from 'react-bootstrap'


const SongHeader = props => {

  const { artwork_url, title, artist, spotify_id } = props.spotifyTrack

  return (
    <Container id="song-header" className="bg-white custom-shadow rounded py-2" style={{paddingLeft: '3vw'}}>
      <Row className="align-items-center my-3">
        
        <Col>
          <Row className="align-items-center">
            <Col xs={4}>
              <Image rounded fluid src={artwork_url} alt="album-artwork"/>
            </Col>
            <Col style={{textAlign: 'left'}}>
              <h2>{title}</h2>
              <h4 className="text-muted">{artist}</h4>
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
