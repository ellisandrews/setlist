import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import sessionFormImg from './session_form.jpg'
import SignUpForm from './SignUpForm'
import LogInForm from './LogInForm'
import './sessions.css'


const SessionFormContainer = () => {

  const location = useLocation()

  return (
    <div className="vertical-center">
      <Container id="session-form-container" className="bg-white custom-shadow rounded">
        <Row className="align-items-center h-100">
         <Col className="h-100" style={{paddingLeft: 0}}>
            <Image src={sessionFormImg} alt="session-form-image" className="h-100"/>
          </Col>
          <Col>
            { location.pathname === '/signup' ? <SignUpForm/> : <LogInForm/>}
          </Col>
        </Row>
      </Container>
    </div>
    
  )
}


export default SessionFormContainer
