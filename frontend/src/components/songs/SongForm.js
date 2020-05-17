import React, { Component } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import SongHeader from './SongHeader'


class SongForm extends Component {
  render() {
    const { handleChange, handleSubmit, spotifyData } = this.props
    return (
      <>
        <SongHeader spotifyData={spotifyData} />
        
        <Form onSubmit={handleSubmit}>

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

          {/* Section(s) */}
          

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
