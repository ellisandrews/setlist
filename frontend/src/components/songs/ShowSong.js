import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
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
          <h5>{section.name}</h5>
          <h6>Chords: {section.chords}</h6>
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
        () => { history.push('/repertoire') }
      )
    }
  }

  render() {
    
    const { id, guitar_type, capo, strumming, notes, spotify_track } = this.props.song

    return (
      <div id="show-song">
        
        <SongHeader spotifyTrack={spotify_track}/>

        <div id="song-info">
          <h3>Song Info</h3>
          <h5>Guitar Type: {guitar_type || 'Any'}</h5>
          <h5>Capo: {capo || 'None'}</h5>
          <h5>Strumming: {strumming || 'None'}</h5>
          <h5>Notes: {notes || 'None'}</h5>
        </div>

        <div id="sections">
          <h3>Sections</h3>
          {this.renderSections()}
        </div>

        <LinkContainer to={`/songs/${id}/edit`}>
          <Button variant="primary">Edit</Button>
        </LinkContainer>{' '}
        <Button variant="danger" onClick={this.handleDeleteClick}>Delete</Button>

      </div>
    )
  }
}


export default connect(
  null,
  { deleteSongAsync }
)(withRouter(ShowSong))
