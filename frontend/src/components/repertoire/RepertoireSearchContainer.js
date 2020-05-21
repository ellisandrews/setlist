import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import SearchForm from './SearchForm'
import Filters from './Filters'


class RepertoireSearchContainer extends Component {
  
  render() {

    const { query, handleSearchChange } = this.props 

    return (
      <Container fluid id="repertoire-search-container">
        <SearchForm query={query} handleSearchChange={handleSearchChange}/>
        <Filters/>
      </Container>
    )
  }
}


export default RepertoireSearchContainer
