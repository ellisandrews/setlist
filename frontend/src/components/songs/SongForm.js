import React, { Component } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import update from 'immutability-helper'


const sectionFactory = (name = '', chords = '', strumming = '') => ({ name, chords, strumming })


class SongForm extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      guitar_type: '',
      capo: '',
      notes: '',
      sections: [sectionFactory()]  // Songs must have at least one section, so initialize with one
    }
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
          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button onClick={() => this.removeSection(index)}>Remove</Button>
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
        {sections: {$push: [sectionFactory()] }}
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
    
    return (
      <Form onSubmit={event => this.props.handleSubmit(event, this.state)}>

        <h3>General Info</h3>

        {/* Capo */}
        <Form.Group as={Row}>
          <Form.Label column sm={2}>Capo</Form.Label>
          <Col sm={10}>
            <Form.Control name="capo" type="number" onChange={this.handleChange}/>
          </Col>
        </Form.Group>

        {/* Type */}
        <fieldset>
          <Form.Group as={Row} onChange={this.handleChange}>
            <Form.Label as="legend" column sm={2}>Guitar Type</Form.Label>
            <Col sm={10}>
              <Form.Check type="radio" name="guitar_type" label="None" value="" onChange={this.handleChange}/>
              <Form.Check type="radio" name="guitar_type" label="Acoustic" value="Acoustic" onChange={this.handleChange}/>
              <Form.Check type="radio" name="guitar_type" label="Electric" value="Electric" onChange={this.handleChange}/>
            </Col>
          </Form.Group>
        </fieldset>

        <h3>Sections</h3>

        {this.renderSections()}
        <Button onClick={this.addSection}>Add Section</Button>

        <h3>Notes</h3>

        {/* Notes */}
        <Form.Group as={Row}>
          <Form.Label column sm={2}>Notes</Form.Label>
          <Col sm={10}>
            <Form.Control as="textarea" rows="5" name="notes" onChange={this.handleChange}/>
          </Col>
        </Form.Group>

        {/* Submit */}
        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Save</Button>
          </Col>
        </Form.Group>

      </Form>
    )
  }
}


export default SongForm
