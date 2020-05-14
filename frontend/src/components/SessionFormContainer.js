import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import sessionFormImg from './session_form.jpg'
import SignUpForm from './SignUpForm'
import LogInForm from './LogInForm'


const SessionFormContainer = props => {

  const path = props.location.pathname

  return (
    <Container className="border vertical-center">
      <Row>
        <Col xs={3}>
          <Image src={sessionFormImg} fluid />
        </Col>
        <Col>
          {
            path === '/signup' ?
            <SignUpForm/>
              :
            <LogInForm/>
          }
        </Col>
      </Row>
    </Container>
  )
}


export default SessionFormContainer
