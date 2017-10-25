import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import Switch from 'material-ui/Switch'

class LoggedMenu extends Component {
  static muiName = 'Button'
  render () {
    return (
      <div>
        <Button {...this.props}>Выйти</Button>
      </div>
    )
  }
}

class NotLoggedMenu extends Component {
  static muiName = 'Button'
  render () {
    return (
      <div>
        <Button
          containerElement={<Link to="/login" />}
          {...this.props}
        >
          Вход
        </Button>
        <Button
          containerElement={<Link to="/register" />}
          {...this.props}
          label=""
        >
          Регистрация
        </Button>
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

  styles = theme => ({
    root: {
      marginTop: theme.spacing.unit * 3,
      width: '100%'
    },
    flex: {
      flex: 1
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20
    }
  });

  render () {
    return (
      <div className={this.root}>
        {/* <AppBar
          title={this.state.logged ? 'Личный кабинет' : ''}
          iconElementRight={
            this.state.logged ? <LoggedMenu /> : <NotLoggedMenu />
          }
        /> */}
        <AppBar position="static" color="default">
          <Toolbar>
            <IconButton className={this.menuButton} color="contrast" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={this.flex}>
              Личный кабинет
            </Typography>
            <Button color="contrast" href="/login">Вход</Button>
            <Button color="contrast" href="/register">Регистрация</Button>
          </Toolbar>
        </AppBar>
        {/* <Switch
          onChange={this.handleChange('logged')}
        >
          Logged
        </Switch> */}
      </div>
    )
  }
}

export default Dashboard
