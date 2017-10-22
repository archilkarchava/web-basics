// src/routes.js
import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Login from './components/Login'
//import NotFound from './components/NotFound';

const Routes = (props) => (
  <BrowserRouter {...props}>
    <div>
      <Route exact path="/" component={Dashboard} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      {/*<Route path="*" component={NotFound} />*/}
    </div>
  </BrowserRouter>
);

export default Routes;