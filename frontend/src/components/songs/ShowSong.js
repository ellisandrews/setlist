import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import SongHeader from './SongHeader'
import { deleteSongAsync } from '../../actions/songs'


class ShowSong extends Component {
  
  renderSections = () => {
    const { sections } = this.props.song

    return sections.map((section, index) => {
      const sectionNumber = index + 1
      return (
        <div id={`section-${sectionNumber}`} key={sectionNumber}>
          <h4>Section {sectionNumber}</h4>
          <h5>{section.name}</h5>
          <h6>Chords: {section.chords}</h6>
          <h6>Strumming: {section.strumming}</h6>
        </div>
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
        () => { history.push('/songs') }
      )
    }
  }

  render() {
    
    const { id, spotify_track, guitar_type, capo, notes } = this.props.song

    return (
      <div id="show-song">
        
        <SongHeader spotifyTrack={spotify_track}/>

        <div id="setup">
          <h3>Setup</h3>
          <h5>Guitar Type: {guitar_type || 'Any'}</h5>
          <h5>Capo: {capo || 'None'}</h5>
        </div>

        <div id="sections">
          <h3>Sections</h3>
          {this.renderSections()}
        </div>
              
        <div id="notes">
          <h3>Notes</h3>
          <p>{notes || 'None'}</p>
        </div>

        <Button variant="primary" href={`/songs/${id}/edit`}>Edit</Button>{' '}
        <Button variant="danger" onClick={this.handleDeleteClick}>Delete</Button>

      </div>
    )
  }
}


export default connect(
  null,
  { deleteSongAsync }
)(withRouter(ShowSong))
