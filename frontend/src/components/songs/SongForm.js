import React, { Component } from 'react'
import { Button, Form, Row, Col, Container } from 'react-bootstrap'
import update from 'immutability-helper'


class SongForm extends Component {
  
  constructor(props) {
    super(props)

    // Initialze state with either the provided song's or a new song's data
    const initialSong = props.song || this.songFactory()
    const { guitar_type, capo, strumming, sections, youtube_id, notes } = initialSong

    this.state = {
      guitar_type,
      capo,
      strumming,
      sections,
      youtube_id,
      notes,
    }
  }
  
  sectionFactory = (name='', chords='') => {
    return { name, chords }
  }

  songFactory = (guitar_type='', capo='', strumming='', sections=[ this.sectionFactory() ], youtube_id='', notes='') => {
    return { guitar_type, capo, strumming, sections, youtube_id, notes }
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleSectionChange = (event, index) => {
    
    const { name, value } = event.target
    
    // Update the state for the section at the correct index of the sections array. 
    // Use immutability helper to simplify the update while not mutating the state.
    this.setState(prevState => {
      // Update the prevState's section key at the specified index 
      return update(
        prevState, 
        { sections: { [index]: { [name]: {$set: value} } }}
      )
    })
  }

  renderSections = () => {

    const { sections } = this.state

    // If there are no sections, display the button to add one
    if ( sections.length === 0 ) {
      return (
        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button size="sm" onClick={this.addSection}>Add Section</Button>
          </Col>
        </Form.Group>
      )
    }

    // Display all sections
    return sections.map((section, index) => {
      return (
        <div key={index}>
          <h5 className="text-muted">Section {index + 1}</h5>
          <Form.Group as={Row}>
            <Form.Label column sm={2} className="right-label text-muted">Name</Form.Label>
            <Col sm={4}>
              <Form.Control name="name" type="text" placeholder="e.g. Chorus" value={section.name} onChange={event => this.handleSectionChange(event, index)}/>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2} className="right-label text-muted">Chords</Form.Label>
            <Col sm={6}>
              <Form.Control name="chords" type="text" placeholder="e.g. Em C G D" value={section.chords} onChange={event => this.handleSectionChange(event, index)}/>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button variant="danger" size="sm" onClick={() => this.removeSection(index)}>Remove</Button>{' '}
              {/* Last section gets the "Add Section" button too */}
              { index === sections.length - 1 ? <Button size="sm" onClick={this.addSection}>Add Section</Button> : null }
            </Col>
          </Form.Group>
        </div>
      )
    })
  }

  addSection = () => {
    // Update the state to show another section. Use immutability helper to simplify the update while not mutating the state.
    this.setState(prevState => {
      return update(
        prevState, 
        {sections: {$push: [this.sectionFactory()] }}
      )
    })
  }

  removeSection = index => {
    // Update the state to remove the section at position `index`
    this.setState(prevState => {
      return {
        sections: prevState.sections.filter((section, i) => i !== index)
      }
    })
  }

  render() {
    
    const { handleCancel, handleSubmit } = this.props
    const { guitar_type, capo, strumming, notes, youtube_id } = this.state

    return (

      <Container className="bg-white custom-shadow rounded" style={{marginBottom: '5vh', paddingLeft: '3vw'}}>
        <Form onSubmit={event => handleSubmit(event, this.state)}>

          {/* --- SONG INFO --- */}
          <h3 className="form-heading" style={{paddingTop: '3vh'}}>Song Info</h3>

          {/* Guitar Type */}
          <fieldset>
            <Form.Group as={Row} onChange={this.handleChange}>
              <Form.Label as="legend" column sm={2} className="right-label text-muted">Guitar</Form.Label>
              <Col>
                <Form.Check inline type="radio" name="guitar_type" label="Any" value="" checked={!guitar_type} onChange={this.handleChange}/>
                <Form.Check inline type="radio" name="guitar_type" label="Acoustic" value="Acoustic" checked={guitar_type === 'Acoustic'} onChange={this.handleChange}/>
                <Form.Check inline type="radio" name="guitar_type" label="Electric" value="Electric" checked={guitar_type === 'Electric'} onChange={this.handleChange}/>
              </Col>
            </Form.Group>
          </fieldset>

          {/* Capo */}
          <Form.Group as={Row}>
            <Form.Label column sm={2} className="right-label text-muted">Capo</Form.Label>
            <Col sm={1}>
              <Form.Control name="capo" type="number" value={capo} onChange={this.handleChange}/>
            </Col>
          </Form.Group>

          {/* Strumming */}
          <Form.Group as={Row}>
            <Form.Label column sm={2} className="right-label text-muted">Strumming</Form.Label>
            <Col sm={5}>
              <Form.Control name="strumming" type="text" placeholder="e.g. D DU UDU" value={strumming} onChange={this.handleChange}/>
            </Col>
          </Form.Group>

          {/* --- SECTIONS --- */}
          <h3 className="form-heading">Sections</h3>
          {this.renderSections()}
          
          {/* --- RESOURCES --- */}
          <h3 className="form-heading">Resources</h3>
          {/* Youtube */}
          <Form.Group as={Row}>
            <Form.Label column sm={2} className="right-label text-muted">YouTube ID</Form.Label>
            <Col sm={5}>
              <Form.Control name="youtube_id" type="text" placeholder="e.g. 3_yOc3VDU5I" value={youtube_id} onChange={this.handleChange}/>
              <Form.Text className="text-muted">Ex: https://www.youtube.com/watch?v=<b>3_yOc3VDU5I</b></Form.Text>
            </Col>
          </Form.Group>

          {/* Notes */}
          <Form.Group as={Row}>
            <Form.Label column sm={2} className="right-label text-muted">Notes</Form.Label>
            <Col sm={9}>
              <Form.Control as="textarea" rows="5" placeholder="Song notes..." name="notes" value={notes} onChange={this.handleChange}/>
            </Col>
          </Form.Group>

          {/* --- SUBMISSION --- */}
          <Form.Group as={Row} style={{marginTop: '5vh', marginBottom: '5vh', textAlign: 'center'}}>
            <Col style={{marginBottom: '5vh'}}>
              <Button variant="secondary" onClick={handleCancel}>Cancel</Button>{' '}
              <Button type="submit">Save</Button>
            </Col>
          </Form.Group>

        </Form>
      </Container>
    )
  }
}


export default SongForm
