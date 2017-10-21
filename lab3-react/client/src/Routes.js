// src/routes.js
import React from 'react';
import { Router, Route, BrowserRouter } from 'react-router-dom';

import App from './App';
import Register from './components/Register';
import Login from './components/Login'
//import NotFound from './components/NotFound';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="/register" component={Register} />
    <Route path="/login" component={Login} />
{/*<Route path="*" component={NotFound} />*/}
  </Router>
);

export default Routes;