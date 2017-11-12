import React from "react"
import PropTypes from "prop-types"
import { AppBar, Toolbar, Typography, Button } from "material-ui"
import { connect } from "react-redux"
import * as actions from "../../actions/login"

const Dashboard = ({ logout, userData }) => (
  <div>
    <AppBar position="static">
      <Toolbar>
        <Typography
          type="title"
          color="inherit"
          style={{
            flex: 1
          }}
        >
          Личный кабинет
        </Typography>
        <Button color="contrast" onClick={() => logout()}>
          Выйти
        </Button>
      </Toolbar>
    </AppBar>
    <div>
      <p>{userData.username}</p>
      <p>{userData.email}</p>
      <p>{userData.phone}</p>
    </div>
  </div>
)

const mapStateToProps = state => ({
  userData: state.user,
  isLogged: !!state.user.username
})

Dashboard.propTypes = {
  userData: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string
  }).isRequired,
  logout: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { logout: actions.logout })(Dashboard)
