import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Sidebar from './Sidebar.js'
import Display from './Display.js'
import './layout.css'


const Layout = props => {
  return (
    <Container fluid id="layout-container">
      <Row id="layout-row">
        <Col xs={2} id="sidebar-column">      
          <Sidebar/>
        </Col>
        <Col xs={10}>
          <Display/>
        </Col> 
      </Row>
    </Container>
  )
}


export default Layout
