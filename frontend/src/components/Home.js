import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapUserToProps } from '../utils'


class Home extends Component {
  render() {
    
    const { user } = this.props
    
    return (
      <div>
        <h1>Home</h1>
        {
          !!user ?
          <p>Welcome, {user.first_name}</p>
          :
          <p>Not logged in.</p>
        }
      </div>
    )
  }
}


export default connect(mapUserToProps)(Home)
