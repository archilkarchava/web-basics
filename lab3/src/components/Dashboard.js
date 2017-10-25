import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import Toggle from 'material-ui/Toggle'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class LoggedMenu extends Component {
  static muiName = 'FlatButton'
  render () {
    return (
      <div>
        <FlatButton {...this.props} label="Выйти" />
      </div>
    )
  }
}

class NotLoggedMenu extends Component {
  static muiName = 'FlatButton'
  render () {
    return (
      <div>
        <FlatButton
          containerElement={<Link to="/login" />}
          {...this.props}
          label="Вход"
        />
        <FlatButton
          containerElement={<Link to="/register" />}
          {...this.props}
          label="Регистрация"
        />
      </div>
    )
  }
}

class Dashboard extends Component {
  state = {
    logged: false
  }

  handleChange = (e, logged) => {
    this.setState({ logged: logged })
  }

  render () {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title={this.state.logged ? 'Личный кабинет' : ''}
            iconElementRight={
              this.state.logged ? <LoggedMenu /> : <NotLoggedMenu />
            }
          />
          <Toggle
            label="Logged"
            defaultToggled={false}
            onToggle={this.handleChange}
            labelPosition="right"
            style={{ margin: 20 }}
          />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Dashboard
