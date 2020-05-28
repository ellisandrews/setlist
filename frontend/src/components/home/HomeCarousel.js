import React, { Component } from 'react'
import { Container, Carousel, Card } from 'react-bootstrap'
import { SocialIcon } from 'react-social-icons'
import missionImage from './mission-image.jpg'
import methodImage from './method-image.jpg'
import aboutImage from './about-image.jpg'


class HomeCarousel extends Component {

  renderContent = () => {
    return (
      <Carousel className="rounded custom-shadow" interval={8000}>
        
        <Carousel.Item>  
          <Card style={{ border: 'none', height: '75vh' }} className="pb-5">
            <Card.Img variant="top" src={missionImage}/>
            <Card.Body>
              <h3>Mission</h3>
              <Card.Text>
                As guitarists, we love covering songs by our favorite artists.
                When we bounce around from one jam to another, however, it's often easy to forget what we've learned in the past.
                Setlist was built to help us revisit those tunes we may have forgotten, without starting from scratch!
              </Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Item>

        <Carousel.Item>
          <Card style={{ border: 'none', height: '75vh' }} className="pb-5">
            <Card.Img variant="top" src={methodImage}/>
            <Card.Body>
              <h3>Method</h3>
              <Card.Text>
                At it's core, Setlist is a notepad for jotting down sections, chords, and strumming for the songs you learn to play.
                On top of that, Setlist seamlessly integrates with <a style={{color: '#1DB954'}} href="https://developer.spotify.com/documentation/web-api/">Spotify's Web API</a> so you can listen to tracks natively while you practice or play along.
                You can also embed a youtube video if your own notes aren't quite cutting it.
              </Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Item>

        <Carousel.Item>
          <Card style={{ border: 'none', height: '75vh' }} className="pb-5">
            <Card.Img variant="top" src={aboutImage}/>
            <Card.Body>
              <h3>About</h3>
              <Card.Text>
                <p>
                  Setlist is just for fun! It is not affiliated with Spotify and was made for individual enjoyment.<br/>
                  Created by Ellis Andrews.
                </p>
                <Container id="social-icons">
                  <SocialIcon url="https://github.com/ellisandrews/setlist" bgColor="black" style={{ height: 40, width: 40 }}/>{' '}
                  <SocialIcon url="https://www.linkedin.com/in/ellis-andrews-b08528102" style={{ height: 40, width: 40 }}/>{' '}
                  <SocialIcon url="https://medium.com/@ellisandrews1" style={{ height: 40, width: 40 }} />{' '}
                </Container>
              </Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Item>

      </Carousel>
    )
  }

  render() {
    return (
      <Container id="home-carousel" className="my-3 p-0">
        {this.renderContent()}
      </Container>
    )
  }
}


export default HomeCarousel
