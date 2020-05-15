import React from 'react'
import { Spinner, Container } from 'react-bootstrap'


const Loading = () => {
  return (
    <Container style={{padding: 100}} className="h-100">
      <Container className="row h-100 justify-content-center align-items-center">
        <Container className="col-4 text-center">
          <Spinner animation="border" variant="dark" /> 
        </Container>
      </Container>
    </Container>
  )
}


export default Loading
