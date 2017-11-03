import React from "react"
import BrowserRouter from "react-router-dom/BrowserRouter"
import Routes from "./Routes"

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </div>
)

export default App
