import React from 'react'
import { Container, Form } from 'react-bootstrap'


const SearchForm = props => {
  const { query, handleChange} = props
  return (
    <Container id="search-form">
      <p>Search for a song by title or artist</p>
      <Form.Control type='text' name='query' placeholder='Search by song title or artist...' value={query} onChange={handleChange}/>
    </Container>
  )
}


export default SearchForm
