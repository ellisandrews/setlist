import React from 'react'
import { Form } from 'react-bootstrap'


const SearchForm = props => {
  const { query, handleChange, handleKeyDown} = props
  return <Form.Control type='text' placeholder='Enter song title or artist...' value={query} onChange={handleChange} onKeyDown={handleKeyDown}/>
}


export default SearchForm
