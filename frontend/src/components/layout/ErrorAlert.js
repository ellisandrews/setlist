import React from 'react'
import { Container, Alert, Row, Col } from 'react-bootstrap'


const ErrorAlert = props => {

  const { errors, hideErrors } = props

  return (
    <Container style={{ top: 20, right: 20, zIndex: 999 }} className="position-fixed">
      <Row>
        <Col xs={8}></Col>
        <Col xs={4}>
          <Alert variant="danger" dismissible onClose={hideErrors} style={{textAlign: 'left'}}>
            <p><b>Error</b></p>
            <ul>
              { errors.map(error => <li>{error}</li>) }
            </ul>
          </Alert>
        </Col>
      </Row>
    </Container>
  )
}


export default ErrorAlert
