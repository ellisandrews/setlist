import React, { Component } from 'react'
import { Form, Row, ToggleButton, ToggleButtonGroup, Col } from 'react-bootstrap'


class Filters extends Component {
  
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
    const { guitarType, orderBy, ascending } = this.props
    return (
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Guitar Type</Form.Label>
              <ToggleButtonGroup type="radio" name="guitarType" defaultValue={guitarType} onChange={value => this.mockChangeEvent('guitarType', value)}>
                <ToggleButton value="">Any</ToggleButton>
                <ToggleButton value="Acoustic">Acoustic</ToggleButton>
                <ToggleButton value="Electric">Electric</ToggleButton>
              </ToggleButtonGroup>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Order By</Form.Label>
              <ToggleButtonGroup type="radio" name="orderBy" defaultValue={orderBy} onChange={value => this.mockChangeEvent('orderBy', value)}>
                <ToggleButton value="title">Title</ToggleButton>
                <ToggleButton value="artist">Artist</ToggleButton>
              </ToggleButtonGroup>{' '}
              <Form.Switch inline id="order-switch" label={ ascending ? 'Ascending' : 'Descending' } onChange={() => this.mockChangeEvent('ascending', !ascending)} />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    )
  }
}


export default Filters
