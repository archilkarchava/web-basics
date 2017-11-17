import React from "react"
import PropTypes from "prop-types"
import { AppBar, Toolbar, Button, Card, Typography } from "material-ui"
import { connect } from "react-redux"
import { logout as logoutAction } from "./../actions/loginActions"
import styles from "./StylesMUI/styles"

const Dashboard = ({ logout, userData }) => (
  <div>
    <AppBar position="static">
      <Toolbar>
        <Typography type="title" color="inherit">
          Добро пожаловать {userData.username}
        </Typography>
        <Button
          style={styles.alignRight}
          color="contrast"
          onClick={() => logout()}
        >
          Выйти
        </Button>
      </Toolbar>
    </AppBar>
    <div className="container">
      <div className="marginBottom">
        <Typography type="headline">Ваш Email: {userData.email}</Typography>
        <Typography type="headline">
          Ваш номер телефона: {userData.phone}
        </Typography>
      </div>
    </div>
  </div>
)

const mapStateToProps = state => ({
  userData: state.user.userData
})

Dashboard.propTypes = {
  userData: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string
  }).isRequired,
  logout: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { logout: logoutAction })(Dashboard)
