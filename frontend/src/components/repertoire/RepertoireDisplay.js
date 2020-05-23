import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import SongCard from './SongCard'


class RepertoireDisplay extends Component {
  
  renderSongCards = () => {

    const { songs } = this.props

    // If there are no songs yet, display that information
    if (!songs || songs.length === 0) {
      return (
        <Container>
          <p>No songs to display.</p>
          <p>Refine your search, or create a <Link to="/songs/new">new song</Link>.</p>
        </Container>
      )
    }

    // Render a SongCard for each of the user's songs
    return songs.map(song => {
      return (
        <Col md="auto" className="mb-3" key={song.id}>
          <SongCard song={song}/>
        </Col>
      )
    })
  }
  
  render() {
    return (
      <Container id="repertoire-display" fluid className="mt-4 border">
        <Row className="justify-content-center">
          {this.renderSongCards()}
        </Row>
      </Container>
    )
  }
}


export default RepertoireDisplay
