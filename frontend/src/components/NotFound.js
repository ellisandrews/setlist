import React, { Component } from 'react'
import { Container, Image } from 'react-bootstrap'
import setlistLogo from '../SetlistLogo.png'


class NotFound extends Component {
  
  render() {
    return (
      <Container className="py-1">
        <h4 className="m-5">We couldn't find that page.</h4>
        <Image style={{maxWidth: '25%'}} src={setlistLogo} alt="setlist-logo" />
        <h6 className="m-5">Is your amp plugged in?</h6>
      </Container>
    )
  }

}


export default NotFound
