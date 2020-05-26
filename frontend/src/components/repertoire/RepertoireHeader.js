import React, { Component } from 'react'
import { Container, Form, Row, ToggleButton, ToggleButtonGroup, Col } from 'react-bootstrap'


class RepertoireHeader extends Component {
  
  mockChangeEvent = (name, value) => {
    // The `onChange` function callback for `ToggleButtonGroup` accepts the value instead of an event for some reason.
    // To get around this, we will mock the event to be processed, and then process it as normal.
    const mockEvent = {
      target: {
        name,
        value
      }
    }
    this.props.handleChange(mockEvent)
  }

  render() {
    
    const { searchData: { query, guitarType, orderBy, ascending }, handleChange } = this.props
    
    return (
      <Container id="repertoire-header" className="py-3 my-4 bg-white custom-shadow rounded">
        <h1>Repertoire</h1>
        <Row className="py-1">
          <Col>
            <Form.Group>
              <p>Search Songs</p>
              <Form.Control type='text' name='query' placeholder='Search by song title or artist...' value={query} onChange={handleChange}/>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <p>Guitar Type</p>
              <ToggleButtonGroup type="radio" name="guitarType" defaultValue={guitarType} onChange={value => this.mockChangeEvent('guitarType', value)}>
                <ToggleButton value="">Any</ToggleButton>
                <ToggleButton value="Acoustic">Acoustic</ToggleButton>
                <ToggleButton value="Electric">Electric</ToggleButton>
              </ToggleButtonGroup>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <p>Order By</p>
              <ToggleButtonGroup type="radio" name="orderBy" defaultValue={orderBy} onChange={value => this.mockChangeEvent('orderBy', value)}>
                <ToggleButton value="title">Title</ToggleButton>
                <ToggleButton value="artist">Artist</ToggleButton>
              </ToggleButtonGroup>{' '}
              <Form.Switch inline id="order-switch" label={ ascending ? 'Ascending' : 'Descending' } onChange={() => this.mockChangeEvent('ascending', !ascending)} />
            </Form.Group>
          </Col>
        </Row>
      </Container>
    )
  }
}


export default RepertoireHeader
