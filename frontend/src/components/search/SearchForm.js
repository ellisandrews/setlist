import React from 'react'
import { Form } from 'react-bootstrap'


const SearchForm = props => {
  const { query, handleChange} = props
  return <Form.Control type='text' placeholder='Enter song title or artist...' value={query} onChange={handleChange}/>
}


export default SearchForm
