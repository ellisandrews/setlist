import React from 'react'
import { Spinner, Container } from 'react-bootstrap'


const Loading = ({header, message}) => {
  return (
    <Container className="h-100 py-5">
      <Container className="row h-100 justify-content-center align-items-center">
        <Container className="text-center">
          <h3 className="py-2">{header}</h3>
          <h6 className="py-2">{message}</h6>
          <div className="py-2">
            <Spinner animation="border" variant="dark"/>
          </div>
        </Container>
      </Container>
    </Container>
  )
}


export default Loading
