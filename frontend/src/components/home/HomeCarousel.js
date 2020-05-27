import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Container, Carousel, Card, Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { mapUserToProps } from '../../utils'

import electricWallpaper from './electric-wallpaper.jpg'
import acousticWallpaper from './acoustic-wallpaper-spotify.jpg'


class HomeCarousel extends Component {

  renderContent = () => {
    return (
      <Carousel className="rounded custom-shadow">
        
        <Carousel.Item>  
          <Card style={{ border: 'none', height: '75vh' }} className="pb-5">
            <Card.Img variant="top" src={electricWallpaper}/>
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
          <Card style={{ border: 'none', height: '75vh' }} className="pb-5">
            <Card.Img variant="top" src={acousticWallpaper}/>
            <Card.Body>
              <Card.Title>Method</Card.Title>
              <Card.Text>
                At it's core, Setlist is a notepad for you to jot down the chords, strumming and sections to songs you learn to play.
                On top of that, Setlist seamlessly integrates with Spotify's Web API so you can listen to tracks natively while you practice or play along.
                You can also embed a youtube video you used to learn a song if your own notes aren't quite cutting it.
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
