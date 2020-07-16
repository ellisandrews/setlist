import React from 'react'
import { Container } from 'react-bootstrap'


const Error = ({message}) => {
  return (
    <Container className="h-100 py-5">
      <Container className="row h-100 justify-content-center align-items-center">
        <Container className="text-center">
          <h3 className="py-2">Oops! Something went wrong.</h3>
          <h6 className="py-2">{message}</h6>
        </Container>
      </Container>
    </Container>
  )
}


export default Error
