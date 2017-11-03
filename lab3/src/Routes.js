// src/Routes.js
import React from "react"
import { Route, Switch } from "react-router-dom"

import Dashboard from "./components/pages/Dashboard"
import Register from "./components/pages/RegistrationPage"
import Login from "./components/pages/Login"
// import NotFound from './components/NotFound';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route path="/register" component={Register} />
    <Route path="/login" component={Login} />
    {/* <Route path="*" component={NotFound} /> */}
  </Switch>
)

export default Routes
