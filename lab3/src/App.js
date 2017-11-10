import React from "react"
import { connect } from "react-redux"
import { Route } from "react-router-dom"
import PropTypes from "prop-types"

import DashboardPage from "./components/Dashboard/DashboardPage"
import RegistrationPage from "./components/Registration/RegistrationPage"
import LoginPage from "./components/Login/LoginPage"
import TopNavigation from "./components/Navigation/TopNavigation"
import UserRoute from "./components/routes/UserRoute"
import GuestRoute from "./components/routes/GuestRoute"

const App = ({ location, isLogged }) => (
  <div>
    {isLogged && <TopNavigation />}
    <UserRoute location={location} exact path="/" component={DashboardPage} />
    <GuestRoute
      location={location}
      path="/register"
      component={RegistrationPage}
    />
    <GuestRoute location={location} path="/login" component={LoginPage} />
  </div>
)

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isLogged: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isLogged: !!state.user
})

export default connect(mapStateToProps)(App)
