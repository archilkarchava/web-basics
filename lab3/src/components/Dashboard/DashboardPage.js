import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { AppBar, Toolbar, Typography, Button } from "material-ui"
import { connect } from "react-redux"
import * as actions from "../../actions/login"

const Dashboard = ({ isLogged, logout }) => (
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
        {isLogged ? (
          <Button onClick={() => logout()}>Выйти</Button>
        ) : (
          <div>
            <Button color="contrast" component={Link} to="/login">
              Войти
            </Button>
            <Button color="contrast" component={Link} to="/register">
              Зарегистрироваться
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  </div>
)

const mapStateToProps = state => ({
  isLogged: !!state.user.token
})

Dashboard.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { logout: actions.logout })(Dashboard)
