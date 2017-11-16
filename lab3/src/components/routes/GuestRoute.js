import React from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"

const GuestRoute = ({ component: Component, isLogged, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLogged ? <Redirect to="/" /> : <Component {...props} />
    }
  />
)

GuestRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired
}

export default GuestRoute
