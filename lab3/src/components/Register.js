import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import axios from 'axios'
// import InputMask from 'react-input-mask';

class Register extends Component {
  styles = {
    errorStyle: {
      textAlign: 'left'
    }
  }

  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,16}$/
  emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
  phoneRegex = /^((8|(\+7))(\d){10,10})$|^((8|(\+7))[-(](\d){3,3}[-)](\d){3,3}[-](\d){2,2}[-](\d){2,2})$/

  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      email: '',
      phone: '',
      errorUsernameMsg: '',
      errorPassMsg: '',
      errorEmailMsg: '',
      errorPhoneMsg: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  usernameValidator () {
    if (this.state.username.length <= 0) {
      this.setState({ errorUsernameMsg: 'Поле обязательно для заполнения.' })
      return false
    } else {
      this.setState({ errorUsernameMsg: '' })
      return true
    }
  }

  passwordValidator () {
    if (!this.passwordRegex.test(this.state.password)) {
      if (!/^[a-zA-Z\d]+$/.test(this.state.password)) {
        this.setState({
          errorPassMsg: 'В пароле могут использоваться только латинские буквы.'
        })
      }
      if (this.state.password.length < 8) {
        this.setState({
          errorPassMsg: 'Пароль должен содержать минимум 8 символов.'
        })
      }
      if (this.state.password.length > 16) {
        this.setState({
          errorPassMsg: 'Пароль не должен содержать больше 16 символов.'
        })
      }
      if (/^[a-z\d]+$/.test(this.state.password)) {
        this.setState({
          errorPassMsg: 'В пароле должна быть как минимум одна заглавная буква.'
        })
      }
      if (/^[A-Z\d]+$/.test(this.state.password)) {
        this.setState({
          errorPassMsg: 'В пароле должна быть как минимум одна прописная буква.'
        })
      }
    } else {
      this.setState({ errorPassMsg: '' })
      return true
    }
    if (this.state.errorPassMsg !== '') {
      return false
    }
  }

  emailValidator () {
    if (!this.emailRegex.test(this.state.email)) {
      this.setState({ errorEmailMsg: 'Введите email в формате *@*.*.' })
      return false
    } else {
      this.setState({ errorEmailMsg: '' })
      return true
    }
  }

  phoneValidator () {
    if (!this.phoneRegex.test(this.state.phone)) {
      this.setState({ errorPhoneMsg: 'Введите телефон по-человечески.' })
      return false
    } else {
      this.setState({ errorPhoneMsg: '' })
      return true
    }
  }

  handleChange (e) {
    e.preventDefault()
    e.persist()
    this.setState(
      { [e.target.name]: e.target.value },
      () => {
        if (e.target.name === 'username') {
          this.usernameValidator()
        }
        if (e.target.name === 'password') {
          this.passwordValidator()
        }
        if (e.target.name === 'email') {
          this.emailValidator()
        }
        if (e.target.name === 'phone') {
          this.phoneValidator()
        }
      },
      () => {}
    )
  }

  handleSubmit (e) {
    e.preventDefault()
    if (
      this.state.username.length > 0 &&
      this.passwordRegex.test(this.state.password) &&
      this.emailRegex.test(this.state.email) &&
      this.phoneRegex.test(this.state.phone)
    ) {
      var payload = {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        phone: this.state.phone
      }
      axios
        .post('/user/register', payload)
        .then(function (response) {
          if (response.status === 200) {
            console.log(response.data)
          } else {
            console.log(response.data, response.status)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    } else if (this.state.username.length === 0) {
      window.alert('Введите имя пользователя!')
    } else if (this.passwordRegex.test(this.state.password)) {
      window.alert(
        'Пароль должен содержать 8-16 символов, строчные и заглавные буквы!'
      )
    } else if (this.emailRegex.test(this.state.email)) {
      window.alert('Email введен неправильно!')
    } else if (this.phoneRegex.test(this.state.phone)) {
      window.alert(
        'Телефон должен начинаться с +7 или 8 и состять из 11 цифр. Допускается ввод через дефисы!'
      )
    }
  }
  render () {
    return (
      <MuiThemeProvider>
        <div className="app-registration">
          <AppBar title="Регистрация" />
          <form method="post" onSubmit={this.handleSubmit}>
            <TextField
              type="text"
              name="username"
              errorText={this.state.errorUsernameMsg}
              errorStyle={this.styles.errorStyle}
              floatingLabelText="Логин"
              onChange={this.handleChange}
            />{' '}
            <br />
            <TextField
              type="password"
              name="password"
              errorText={this.state.errorPassMsg}
              errorStyle={this.styles.errorStyle}
              floatingLabelText="Пароль"
              onChange={this.handleChange}
            />{' '}
            <br />
            <TextField
              type="email"
              name="email"
              errorText={this.state.errorEmailMsg}
              errorStyle={this.styles.errorStyle}
              floatingLabelText="Email"
              onChange={this.handleChange}
            />{' '}
            <br />
            <TextField
              type="tel"
              name="phone"
              errorText={this.state.errorPhoneMsg}
              errorStyle={this.styles.errorStyle}
              floatingLabelText="Телефон"
              onChange={this.handleChange}
            >
              {/* <InputMask mask="+7 (999) 999-99-99" /> */}
            </TextField>{' '}
            <br /> <br />
            <RaisedButton
              type="submit"
              label="Зарегестрироваться"
              primary={true}
            />
          </form>{' '}
          <br />
          <div>
            Уже зарегестрированы? <Link to="/login">Залогиньтесь</Link>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Register
