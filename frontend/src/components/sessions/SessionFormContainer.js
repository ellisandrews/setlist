import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import sessionFormImg from './session_form.jpg'
import SignUpForm from './SignUpForm'
import LogInForm from './LogInForm'


const SessionFormContainer = () => {

  const location = useLocation()

  return (
    <Container className="border">
      <Row>
        <Col xs={3}>
          <Image src={sessionFormImg} fluid />
        </Col>
        <Col>
          { location.pathname === '/signup' ? <SignUpForm/> : <LogInForm/>}
        </Col>
      </Row>
    </Container>
  )
}


export default SessionFormContainer
