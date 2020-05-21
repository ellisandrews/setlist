import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import SearchForm from './SearchForm'
import Filters from './Filters'


class RepertoireSearchContainer extends Component {
  
  render() {

    const { searchData: { query, guitarType, orderBy, ascending }, handleChange } = this.props 

    return (
      <Container fluid id="repertoire-search-container">
        <SearchForm query={query} handleChange={handleChange}/>
        <Filters guitarType={guitarType} orderBy={orderBy} ascending={ascending} handleChange={handleChange}/>
      </Container>
    )
  }
}


export default RepertoireSearchContainer
