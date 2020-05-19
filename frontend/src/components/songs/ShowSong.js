import React, { Component } from 'react'
import SongHeader from './SongHeader'


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

  render() {
    
    const { spotify_track, guitar_type, capo, notes } = this.props.song

    return (
      <div id="show-song">
        <SongHeader spotifyTrack={spotify_track}/>

        <div id="setup">
          <h3>Setup</h3>
          <h5>Guitar Type: {guitar_type}</h5>
          <h5>Capo: {capo || 'None'}</h5>
        </div>

        <div id="sections">
          <h3>Sections</h3>
          {this.renderSections()}
        </div>
              
        <div id="notes">
          <h3>Notes</h3>
          <p>{notes}</p>
        </div>

      </div>
    )
  }
}

export default ShowSong
