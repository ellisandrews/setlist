import React from 'react'
import { Form } from 'react-bootstrap'


const SearchForm = props => {
  const { query, handleSearchChange} = props
  return <Form.Control type='text' placeholder='Search by song title or artist...' value={query} onChange={handleSearchChange}/>
}


export default SearchForm
