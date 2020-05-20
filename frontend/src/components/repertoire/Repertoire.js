import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import SongCard from './SongCard'
import { mapSongsToProps } from '../../utils'


class Repertoire extends Component {
  
  renderSongCards = () => {
    return this.props.songs.map(song => {
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
