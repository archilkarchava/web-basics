import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import DashboardPage from "./components/DashboardPage"
import RegistrationPage from "./components/RegistrationPage"
import LoginPage from "./components/LoginPage"

import PrivateRoute from "./components/routes/PrivateRoute"
import GuestRoute from "./components/routes/GuestRoute"

const App = ({ isLogged }) => (
  <div>
    <PrivateRoute
      exact
      path="/"
      component={DashboardPage}
      isLogged={isLogged}
    />
    <GuestRoute
      path="/register"
      component={RegistrationPage}
      isLogged={isLogged}
    />
    <GuestRoute path="/login" component={LoginPage} isLogged={isLogged} />
  </div>
)

const mapStateToProps = state => ({
  isLogged: !!state.user.userData.username
})

App.propTypes = {
  isLogged: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(App)
