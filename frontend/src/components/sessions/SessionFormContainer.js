import React from 'react'
import { Container, Row, Col, Image, Card } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import sessionFormImg from './session_form.jpg'
import SignUpForm from './SignUpForm'
import LogInForm from './LogInForm'
import './sessions.css'


const SessionFormContainer = () => {

  const location = useLocation()

  return (
    <div className="vertical-center">
      <Container style={{maxWidth: '65%'}} className="bg-white custom-shadow px-0">
        <Card style={{border: 'none'}}>
          <Row className="align-items-center">
            <Image className="col-md-5" src={sessionFormImg}/>
            <Col md={7}>
              { location.pathname === '/signup' ? <SignUpForm/> : <LogInForm/> }
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  )


  // return (
  //   <div className="vertical-center">
  //     <Container style={{width: '65%'}} className="bg-white custom-shadow">
  //       <Row className="align-items-center">
  //         <Col xs={5} className="pl-0">
  //           <Image fluid src={sessionFormImg} alt="session-form-image"/>
  //         </Col>
  //         <Col>
  //           { location.pathname === '/signup' ? <SignUpForm/> : <LogInForm/> }
  //         </Col>
  //       </Row>      
  //     </Container>
  //   </div>
  // )
}


export default SessionFormContainer
