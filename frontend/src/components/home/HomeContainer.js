import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import HomeHeader from './HomeHeader'
import HomeCarousel from './HomeCarousel'


class HomeContainer extends Component {
  render() {
    return (
      <Container id="home-container" className="py-1" style={{maxWidth: '55vw'}}>
        <HomeHeader/>
        <HomeCarousel/>
      </Container>
    )
  }
}

export default HomeContainer
