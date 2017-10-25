import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import axios from 'axios'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit (e) {
    e.preventDefault()
    if (this.state.username.length > 0) {
      if (this.state.password.length > 0) {
        var payload = {
          username: this.state.username,
          password: this.state.password
        }
        axios
          .post('/user/login', payload)
          .then(function (response) {
            if (response.status === 200) {
              console.log(response.data)
            } else {
              console.log('Ошибка. Извини!', response.status)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      } else {
        window.alert('Введите пароль!')
      }
    } else {
      window.alert('Введите имя пользователя')
    }
  }
  render () {
    return (
      <MuiThemeProvider>
        <div className="app-login">
          <AppBar position="static" color="default">
            <Toolbar>
              <Typography type="title" color="inherit">
                Вход
              </Typography>
            </Toolbar>
          </AppBar>
          <form method="post" onSubmit={this.handleSubmit}>
            <TextField
              type="text"
              name="username"
              floatingLabelText="Логин"
              onChange={this.handleChange}
            />{' '}
            <br />
            <TextField
              type="password"
              name="password"
              floatingLabelText="Пароль"
              onChange={this.handleChange}
            />{' '}
            <br /> <br />
            <Button raised type="submit" color="primary">
              Войти
            </Button>
          </form>{' '}
          <br />
          <div>
            Еще не зарегестрированы? <Link to="/register">Регистрация</Link>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Login
