import React, { Component } from 'react'
import Routes from './Routes'
import BrowserRouter from 'react-router-dom/BrowserRouter'

import './App.css'

class App extends Component {
  render () {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </div>
    )
  }
}

export default App
