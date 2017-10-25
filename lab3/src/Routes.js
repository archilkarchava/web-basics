// src/Routes.js
import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Dashboard from './components/Dashboard'
import Register from './components/Register'
import Login from './components/Login'
// import NotFound from './components/NotFound';

const Routes = props => (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route path="/register" component={Register} />
    <Route path="/login" component={Login} />
    {/* <Route path="*" component={NotFound} /> */}
  </Switch>
)

export default Routes
