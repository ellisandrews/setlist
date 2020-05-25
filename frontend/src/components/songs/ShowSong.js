import React, { Component } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'
import YouTube from 'react-youtube'
import SongHeader from './SongHeader'
import { deleteSongAsync } from '../../actions/songs'


class ShowSong extends Component {
  
  renderSections = () => {
    const { sections } = this.props.song

    return sections.map((section, index) => {
      const sectionNumber = index + 1
      return (
        <Row className="my-3" key={sectionNumber}>
          <Col xs={2}>{section.name}</Col>
          <Col>{section.chords}</Col>
        </Row>
      )
    })
  }

  handleDeleteClick = () => {
    // Ask the user if they really want to delete the song
    const proceed = window.confirm('Are you sure you want to permanently delete this song?')
    if (proceed) {
      const { history, song, deleteSongAsync } = this.props
      deleteSongAsync(
        song.id, 
        () => { history.push('/repertoire') }
      )
    }
  }

  render() {
    
    const { id, guitar_type, capo, strumming, youtube_id, notes, spotify_track } = this.props.song

    return (
      <Container id="show-song">
        
        <SongHeader spotifyTrack={spotify_track}/>

        <Container id="song-info" className="border bg-white" style={{marginBottom: '5vh'}}>
          
          {/* --- SONG INFO --- */}
          <h3 className="form-heading">Song Info</h3>
          <Row className="py-1">
            <Col xs={2}>Guitar Type</Col>
            <Col>{guitar_type || 'Any'}</Col>
          </Row>
          <Row className="py-1">
            <Col xs={2}>Capo</Col>
            <Col>{capo || 'None'}</Col>
          </Row>
          <Row className="py-1">
            <Col xs={2}>Strumming</Col>
            <Col>{strumming || ''}</Col>
          </Row>
          
          {/* --- SECTIONS --- */}
          <h3 className="form-heading">Sections</h3>
          {this.renderSections()}

          {/* --- RESOURCES --- */}
          <h3 className="form-heading">Resources</h3>
          <Row className="py-1">
            <Col xs={2}>YouTube</Col>
            <Col>{ youtube_id ? <YouTube videoId={youtube_id} /> : 'None' }</Col>
          </Row>
          <Row className="py-1">
            <Col xs={2}>Notes</Col>
            <Col>{notes || ''}</Col>
          </Row>

          {/* --- SUBMISSION --- */}
          <div style={{marginTop: '5vh', marginBottom: '5vh', textAlign: 'center'}}>
            <LinkContainer to={`/songs/${id}/edit`}>
              <Button variant="primary">Edit</Button>
            </LinkContainer>{' '}
            <Button variant="danger" onClick={this.handleDeleteClick}>Delete</Button>
          </div>

        </Container>

      </Container>
    )
  }
}


export default connect(
  null,
  { deleteSongAsync }
)(withRouter(ShowSong))
