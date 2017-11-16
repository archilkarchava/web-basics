import React from "react"
import PropTypes from "prop-types"
import { AppBar, Toolbar, Button } from "material-ui"
import { connect } from "react-redux"
import * as actions from "./../actions/loginActions"
import styles from "./StylesMUI/styles"

const Dashboard = ({ logout, userData }) => (
  <div>
    <AppBar position="static">
      <Toolbar>
        <Button style={styles.flex} color="contrast" onClick={() => logout()}>
          Выйти
        </Button>
      </Toolbar>
    </AppBar>
    <div>
      <p>Добро пожаловать {userData.username}</p>
      <p>Ваш Email: {userData.email}</p>
      <p>Ваш номер телефона: {userData.phone}</p>
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

export default connect(mapStateToProps, { logout: actions.logout })(Dashboard)
