import React from "react"
import PropTypes from "prop-types"
import { AppBar, FlatButton } from "material-ui"
import { connect } from "react-redux"
import * as actions from "../../actions/login"

const TopNavigation = ({ user, logout }) => (
  <AppBar
    title={user.username}
    iconElementRight={<FlatButton onClick={() => logout()} label="Выйти" />}
  />
)

TopNavigation.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired
  }).isRequired,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, { logout: actions.logout })(
  TopNavigation
)
