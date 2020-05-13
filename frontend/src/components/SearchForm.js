import React from 'react'
import { Form } from 'react-bootstrap'


const SearchForm = props => {
  const { query, handleChange} = props
  return <Form.Control type="text" placeholder="Search for a song" value={query} onChange={handleChange}/>
}


export default SearchForm
