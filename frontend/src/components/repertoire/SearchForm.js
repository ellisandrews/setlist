import React from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'


const SearchForm = props => {
  const { query, handleChange} = props
  return (
    <Container id="search-form">
      <Form.Group as={Row}>
        <Form.Label column sm={2}>Search</Form.Label>
        <Col sm={10}>
          <Form.Control type='text' name='query' placeholder='Search by song title or artist...' value={query} onChange={handleChange}/>
        </Col>
      </Form.Group>
    </Container>
  )
}


export default SearchForm
