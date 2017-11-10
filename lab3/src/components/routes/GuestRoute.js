import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Route, Redirect } from "react-router-dom"

const UserRoute = ({ isLogged, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !isLogged ? <Component {...props} /> : <Redirect to="/" />}
  />
)

UserRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isLogged: !!state.user.token
})

export default connect(mapStateToProps)(UserRoute)
