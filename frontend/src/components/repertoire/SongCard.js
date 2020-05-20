import React, { Component } from 'react'
import { Button, Card } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


class SongCard extends Component {
  
  render() {

    const { id, spotify_track: { title, artist, artwork_url } } = this.props.song

    return (
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={artwork_url} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{artist}</Card.Text>
          <LinkContainer to={`/songs/${id}`}>
            <Button variant="primary">View</Button>
          </LinkContainer>
        </Card.Body>
      </Card>
    )
  }
}


export default SongCard
