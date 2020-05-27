import React, { Component } from 'react'
import { Container } from 'react-bootstrap'


class HomeHeader extends Component {
  render() {
    return (
      <Container id="home-header" className="bg-white custom-shadow rounded py-2 my-4">
        <h1>Welcome to Setlist!</h1>
      </Container>
    )
  }
}

export default HomeHeader
