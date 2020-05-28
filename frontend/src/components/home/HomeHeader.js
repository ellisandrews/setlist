import React, { Component } from 'react'
import { Container } from 'react-bootstrap'


class HomeHeader extends Component {
  render() {
    return (
      <Container id="home-header" className="bg-white custom-shadow rounded py-2 my-4">
        <h1 style={{fontSize: 50, fontWeight: 900}}> S e t l i s t</h1>
      </Container>
    )
  }
}

export default HomeHeader
