import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'


class SongCard extends Component {
  
  render() {

    const { id, spotify_track: { title, artist, artwork_url } } = this.props.song

    return (
      <Link to={`/songs/${id}`} style={{ color: 'inherit', textDecoration: 'inherit'}} >
        <Card style={{ width: '16rem', border: 'none' }} className="text-center h-100 custom-shadow">
          <Card.Img variant="top" src={artwork_url} />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text className="text-muted">{artist}</Card.Text>
          </Card.Body>
        </Card>      
      </Link>
    )
  }
}


export default SongCard
