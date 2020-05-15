import React, { Component } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import SongHeader from './SongHeader'


class SongForm extends Component {
  render() {
    // TODO: Destructure props in a single line
    const { handleChange, handleSubmit } = this.props
    const { title, artist, artwork_url, spotify_id } = this.props.values
    return (
      <>
        <SongHeader title={title} artist={artist} artwork_url={artwork_url} spotify_id={spotify_id} />
        
        <Form onSubmit={handleSubmit}>

          <Form.Group as={Row}>
            <Form.Label column sm={2}>Capo</Form.Label>
            <Col sm={10}>
              <Form.Control name="capo" type="number" onChange={handleChange}/>
            </Col>
          </Form.Group>

          <fieldset>
            <Form.Group as={Row} onChange={handleChange}>
              <Form.Label as="legend" column sm={2}>Guitar Type</Form.Label>
              <Col sm={10}>
                <Form.Check type="radio" name="type" label="None" value="none" onChange={handleChange}/>
                <Form.Check type="radio" name="type" label="Acoustic" value="acoustic" onChange={handleChange}/>
                <Form.Check type="radio" name="type" label="Electric" value="electric" onChange={handleChange}/>
              </Col>
            </Form.Group>
          </fieldset>

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
