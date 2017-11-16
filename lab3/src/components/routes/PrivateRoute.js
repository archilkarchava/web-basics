import React from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"

const PrivateRoute = ({ component: Component, isLogged, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLogged ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
)

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired
}

export default PrivateRoute
