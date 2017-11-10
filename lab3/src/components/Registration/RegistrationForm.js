import React, { Component } from "react"
import { Link } from "react-router-dom"
import AppBar from "material-ui/AppBar"
import RaisedButton from "material-ui/RaisedButton"
import TextField from "material-ui/TextField"
import PropTypes from "prop-types"
// import InputMask from 'react-input-mask';

class RegistrationForm extends Component {
  static propTypes = {
    submit: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      data: {
        username: "",
        password: "",
        email: "",
        phone: ""
      },
      errors: {},
      loading: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,16}$/
  emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
  phoneRegex = /^((8|(\+7))(\d){10,10})$|^((8|(\+7))[-(](\d){3,3}[-)](\d){3,3}[-](\d){2,2}[-](\d){2,2})$/

  handleChange = e => {
    e.preventDefault()
    e.persist()
    this.setState(
      {
        data: { ...this.state.data, [e.target.name]: e.target.value }
      },
      () => {
        if (e.target.name === "username") {
          const usernameErr = this.validateUsername(this.state.data)
          this.setState({
            errors: { ...this.state.errors, username: usernameErr }
          })
        }
        if (e.target.name === "password") {
          const passwordErr = this.validatePassword(this.state.data)
          this.setState({
            errors: { ...this.state.errors, password: passwordErr }
          })
        }
        if (e.target.name === "email") {
          const emailErr = this.validateEmail(this.state.data)
          this.setState({
            errors: { ...this.state.errors, email: emailErr }
          })
        }
        if (e.target.name === "phone") {
          const phoneErr = this.validatePhone(this.state.data)
          this.setState({
            errors: { ...this.state.errors, phone: phoneErr }
          })
        }
      },
      () => {}
    )
  }

  handleSubmit = e => {
    e.preventDefault()
    const errors = this.validate(this.state.data)
    this.setState({ errors })
    if (
      errors.username === "" &&
      errors.password === "" &&
      errors.email === "" &&
      errors.phone === ""
    ) {
      this.setState({ loading: true })
      this.props.submit(this.state.data)
    }
  }

  validateUsername = data => {
    let usernameErr = ""
    if (!data.username.length > 0) {
      usernameErr = "Поле обязательно для заполнения."
    }
    return usernameErr
  }

  validatePassword = data => {
    let passwordErr = ""
    if (!this.passwordRegex.test(data.password)) {
      if (!/^[a-zA-Z\d]+$/.test(data.password)) {
        passwordErr = "В пароле могут использоваться только латинские буквы."
      }
      if (data.password.length < 8) {
        passwordErr = "Пароль должен содержать минимум 8 символов."
      }
      if (data.password.length > 16) {
        passwordErr = "Пароль не должен содержать больше 16 символов."
      }
      if (/^[a-z\d]+$/.test(data.password)) {
        passwordErr = "В пароле должна быть как минимум одна заглавная буква."
      }
      if (/^[A-Z\d]+$/.test(data.password)) {
        passwordErr = "В пароле должна быть как минимум одна прописная буква."
      }
    }
    return passwordErr
  }

  validateEmail = data => {
    let emailErr = ""
    if (!this.emailRegex.test(data.email))
      emailErr = "Введите email в формате *@*.*."
    return emailErr
  }

  validatePhone = data => {
    let phoneErr = ""
    if (!this.phoneRegex.test(data.phone)) {
      phoneErr = "Введите телефон по-человечески."
    }
    return phoneErr
  }

  validate = data => {
    const errors = {}
    errors.username = this.validateUsername(data)
    errors.password = this.validatePassword(data)
    errors.email = this.validateEmail(data)
    errors.phone = this.validatePhone(data)
    return errors
  }
  styles = {
    errorStyle: {
      textAlign: "left"
    }
  }
  render() {
    const { errors, loading } = this.state

    return (
      <div className="app-registration">
        <AppBar title="Регистрация" />
        <form method="post" onSubmit={this.handleSubmit}>
          <TextField
            type="text"
            name="username"
            errorText={errors.username}
            errorStyle={this.styles.errorStyle}
            floatingLabelText="Логин"
            onChange={this.handleChange}
          />
          <br />
          <TextField
            type="password"
            name="password"
            errorText={errors.password}
            errorStyle={this.styles.errorStyle}
            floatingLabelText="Пароль"
            onChange={this.handleChange}
          />
          <br />
          <TextField
            type="email"
            name="email"
            errorText={errors.email}
            errorStyle={this.styles.errorStyle}
            floatingLabelText="Email"
            onChange={this.handleChange}
          />
          <br />
          <TextField
            type="tel"
            name="phone"
            errorText={errors.phone}
            errorStyle={this.styles.errorStyle}
            floatingLabelText="Телефон"
            onChange={this.handleChange}
          >
            {/* <InputMask mask="+7 (999) 999-99-99" /> */}
          </TextField>
          <br /> <br />
          <RaisedButton
            type="submit"
            label="Зарегистрироваться"
            disabled={
              !(
                errors.username === "" &&
                errors.password === "" &&
                errors.email === "" &&
                errors.phone === ""
              )
            }
            primary
          />
        </form>
        <br />
        <div>
          Уже зарегистрированы? <Link to="/login">Залогиньтесь</Link>
        </div>
      </div>
    )
  }
}

export default RegistrationForm
