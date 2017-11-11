import React from "react"
import { Route } from "react-router-dom"
import PropTypes from "prop-types"

import DashboardPage from "./components/Dashboard/DashboardPage"
import RegistrationPage from "./components/Registration/RegistrationPage"
import LoginPage from "./components/Login/LoginPage"
import PrivateRoute from "./components/routes/PrivateRoute"

const App = () => (
  <div>
    <Route exact path="/" component={DashboardPage} />
    <Route path="/register" component={RegistrationPage} />
    <Route path="/login" component={LoginPage} />
  </div>
)

export default App
