import React, { Component } from 'react'
import SearchForm from './SearchForm'
import Filters from './Filters'


class RepertoireHeader extends Component {
  
  render() {

    const { searchData: { query, guitarType, orderBy, ascending }, handleChange } = this.props 

    return (
      <div id="repertoire-header">
        <SearchForm query={query} handleChange={handleChange}/>
        <Filters guitarType={guitarType} orderBy={orderBy} ascending={ascending} handleChange={handleChange}/>
      </div>
    )
  }
}


export default RepertoireHeader
