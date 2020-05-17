import React, { Component } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import update from 'immutability-helper'
import SongHeader from './SongHeader'


const sectionFactory = (name = '', chords = '', strumming = '') => ({ name, chords, strumming })


class SongForm extends Component {
  
  constructor(props) {
    super(props)

    // Songs must have at least one section, so initialize with one
    this.state = {
      sections: [sectionFactory()]
    }
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
    return this.state.sections.map((section, index) => {
      return (
        <div>
          <h5>Section {index + 1}</h5>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>Name</Form.Label>
            <Col sm={10}>
              <Form.Control name="name" type="text" placeholder="Intro" value={section.name} onChange={event => this.handleSectionChange(event, index)}/>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>Chords</Form.Label>
            <Col sm={10}>
              <Form.Control name="chords" type="text" placeholder="Em C G D" value={section.chords} onChange={event => this.handleSectionChange(event, index)}/>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>Strumming</Form.Label>
            <Col sm={10}>
              <Form.Control name="strumming" type="text" placeholder="D DU UDU" value={section.strumming} onChange={event => this.handleSectionChange(event, index)}/>
            </Col>
          </Form.Group>
        </div>
      )
    })
    
  }

  render() {

    const { handleChange, handleSubmit, spotifyData } = this.props
    return (
      <>
        <SongHeader spotifyData={spotifyData} />
        
        <Form onSubmit={handleSubmit}>

          <h3>General Info</h3>

          {/* Capo */}
          <Form.Group as={Row}>
            <Form.Label column sm={2}>Capo</Form.Label>
            <Col sm={10}>
              <Form.Control name="capo" type="number" onChange={handleChange}/>
            </Col>
          </Form.Group>

          {/* Type */}
          <fieldset>
            <Form.Group as={Row} onChange={handleChange}>
              <Form.Label as="legend" column sm={2}>Guitar Type</Form.Label>
              <Col sm={10}>
                <Form.Check type="radio" name="type" label="None" value="" onChange={handleChange}/>
                <Form.Check type="radio" name="type" label="Acoustic" value="Acoustic" onChange={handleChange}/>
                <Form.Check type="radio" name="type" label="Electric" value="Electric" onChange={handleChange}/>
              </Col>
            </Form.Group>
          </fieldset>

          <h3>Sections</h3>

          {/* Section(s) */}
          {this.renderSections()}

          <h3>Notes</h3>

          {/* Notes */}
          <Form.Group as={Row}>
            <Form.Label column sm={2}>Notes</Form.Label>
            <Col sm={10}>
              <Form.Control as="textarea" rows="5" name="notes" onChange={handleChange}/>
            </Col>
          </Form.Group>

          {/* Submit */}
          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit">Save</Button>
            </Col>
          </Form.Group>

        </Form>
      
      </>
    )
  }
}


export default SongForm
