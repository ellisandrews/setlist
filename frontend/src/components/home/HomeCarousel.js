import React, { Component } from 'react'
import { Container, Carousel, Card } from 'react-bootstrap'
import { SocialIcon } from 'react-social-icons'
import electricWallpaper from './electric-wallpaper.jpg'
import acousticWallpaper from './acoustic-wallpaper-spotify.jpg'
import headstockWallpaper from './headstock-wallpaper.jpg'


class HomeCarousel extends Component {

  renderContent = () => {
    return (
      <Carousel className="rounded custom-shadow" interval={8000}>
        
        <Carousel.Item>  
          <Card style={{ border: 'none', height: '75vh' }} className="pb-5">
            <Card.Img variant="top" src={electricWallpaper}/>
            <Card.Body>
              <h3>Mission</h3>
              <Card.Text>
                As guitarists, we love covering songs by our favorite artists.
                When we bounce around from one jam to another, however, it's often easy to forget what we've learned in the past.
                Setlist was built to help us revisist those tunes we may have forgotten, without starting from scratch!
              </Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Item>

        <Carousel.Item>
          <Card style={{ border: 'none', height: '75vh' }} className="pb-5">
            <Card.Img variant="top" src={acousticWallpaper}/>
            <Card.Body>
              <h3>Method</h3>
              <Card.Text>
                At it's core, Setlist is a notepad for you to jot down the chords, strumming and sections for songs you learn to play.
                On top of that, Setlist seamlessly integrates with Spotify's Web API so you can listen to tracks natively while you practice or play along.
                You can also embed a youtube video you used to learn a song if your own notes aren't quite cutting it.
              </Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Item>

        <Carousel.Item>
          <Card style={{ border: 'none', height: '75vh' }} className="pb-5">
            <Card.Img variant="top" src={headstockWallpaper}/>
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
      <Container id="home-carousel" className="my-3 p-0" style={{maxWidth: '55vw'}}>
        {this.renderContent()}
      </Container>
    )
  }
}


export default HomeCarousel
