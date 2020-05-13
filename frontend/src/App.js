import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Sidebar from './layout/Sidebar'
import MainDisplay from './layout/MainDisplay'


const App = () => {
  return (
    <Router>
      <Sidebar/>
      <MainDisplay/>
    </Router>  
  )
}


export default App
