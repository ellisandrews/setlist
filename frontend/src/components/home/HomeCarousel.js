import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Container, Carousel, Card, Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { mapUserToProps } from '../../utils'

import guitarWallpaper from './guitar-wallpaper-long.jpg'


class HomeCarousel extends Component {

  renderContent = () => {
    return (
      <Carousel className="rounded custom-shadow">
        
        <Carousel.Item>  
          <Card style={{ border: 'none' }} className="pb-5">
            <Card.Img variant="top" src={guitarWallpaper}/>
            <Card.Body>
              <Card.Title>Mission</Card.Title>
              <Card.Text>
                As guitarists, we love covering songs by our favorite artists.
                As we bounce around from one jam to another, however, it's often easy to forget what we've learned in the past.
                That's why I've created Setlist, a tool for you to revisist your favorite songs and remember how <i>you</i> play them!
              </Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Item>

        <Carousel.Item>
          <Card style={{ border: 'none' }} className="pb-5">
            <Card.Img variant="top" src={guitarWallpaper}/>
            <Card.Body>
              <Card.Title>Mission</Card.Title>
              <Card.Text>
                As guitarists, we love covering songs by our favorite artists.
                As we bounce around from one jam to another, however, it's often easy to forget what we've learned in the past.
                That's why I've created Setlist, a tool for you to revisist your favorite songs and remember how <i>you</i> play them!
              </Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Item>

      </Carousel>
    )
  }

  render() {
    return (
      <Container id="home-carousel" className="my-3 p-0" style={{maxWidth: '55vw'}}>
        {this.renderContent()}
      </Container>
    )
  }
}


export default connect(mapUserToProps)(HomeCarousel)
