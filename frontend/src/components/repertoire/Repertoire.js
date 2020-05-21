import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import SongCard from './SongCard'
import { mapSongsToProps } from '../../utils'


class Repertoire extends Component {
  
  renderSongCards = () => {

    const { songs } = this.props

    // If there are no songs yet, display that information
    if (!songs || songs.length === 0) {
      return (
        <Container className="justify-content-center">
          <p>You haven't logged any songs yet!</p>
          <p>Once created, songs will show up here. Create a <Link to="/songs/new">new song</Link> to get started.</p>
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
      <div id="repertoire">
        <Container fluid className="mt-4">
          <Row className="justify-content-left">
            {this.renderSongCards()}
          </Row>
        </Container>      
      </div>
    )
  }
}


export default connect(mapSongsToProps)(Repertoire)
