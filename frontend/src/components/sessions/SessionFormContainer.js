import React from 'react'
import { Container, Row, Col, Image, Card } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import sessionFormImg from './session_form.jpg'
import SignUpForm from './SignUpForm'
import LogInForm from './LogInForm'
import './sessions.css'


const SessionFormContainer = () => {

  const location = useLocation()
  const showSignup = location.pathname === '/signup'

  return (
    <div className="vertical-center">
      <Container style={{maxWidth: '50%'}} className="bg-white custom-shadow px-0">
        <Card style={{border: 'none'}}>
          <Row className="align-items-center">
            <Image className="col-sm-5" src={sessionFormImg}/>
            <Col sm={7}>
              { showSignup ? <SignUpForm/> : <LogInForm/> }
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  )
}


export default SessionFormContainer
