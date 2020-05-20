import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'


class SongCard extends Component {
  
  render() {

    const { id, spotify_track: { title, artist, artwork_url } } = this.props.song

    return (
      <Link to={`/songs/${id}`} style={{ color: 'inherit', textDecoration: 'inherit'}} >
        <Card style={{ width: '15rem' }} className="text-center">
          <Card.Img variant="top" src={artwork_url} />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle>{artist}</Card.Subtitle>
          </Card.Body>
        </Card>      
      </Link>
    )
  }
}


export default SongCard
