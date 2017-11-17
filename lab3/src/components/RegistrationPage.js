import React, { Component } from "react"
import { Link } from "react-router-dom"
import {
  Typography,
  Paper,
  Button,
  TextField,
  LinearProgress
} from "material-ui"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import register from "../actions/registerActions"
import styles from "./StylesMUI/styles"

class RegistrationPage extends Component {
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
  componentWillReceiveProps(nextProps) {
    if (this.props.message !== nextProps.message) {
      const { errors } = this.state
      Object.assign(errors, nextProps.message)
      this.setState({ errors })
      this.setState({ loading: false })
    }
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
      this.props.register(this.state.data)
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
  render() {
    const { data, errors, loading } = this.state

    return (
      <div className="content lightBlueBg">
        {loading && <LinearProgress color="accent" />}
        <div className="container">
          <Paper elevation={6}>
            <div className="form">
              <Typography type="headline" align="left">
                Регистрация
              </Typography>
              <form method="post" onSubmit={this.handleSubmit}>
                <TextField
                  label="Имя пользователя"
                  name="username"
                  value={data.username}
                  error={!!errors.username}
                  helperText={errors.username}
                  onChange={this.handleChange}
                  style={styles.TextField}
                  margin="normal"
                />
                <br />
                <TextField
                  label="Пароль"
                  type="password"
                  name="password"
                  value={data.password}
                  error={!!errors.password}
                  helperText={errors.password}
                  onChange={this.handleChange}
                  style={styles.TextField}
                  margin="normal"
                />
                <br />
                <TextField
                  label="Email"
                  type="email"
                  name="email"
                  value={data.email}
                  error={!!errors.email}
                  helperText={errors.email}
                  onChange={this.handleChange}
                  style={styles.TextField}
                  margin="normal"
                />
                <br />
                <TextField
                  label="Телефон"
                  type="phone"
                  name="phone"
                  value={data.phone}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  onChange={this.handleChange}
                  style={styles.TextField}
                  margin="normal"
                />
                <br /> <br />
                <Button
                  raised
                  color="primary"
                  type="submit"
                  style={styles.Button}
                  disabled={
                    !(
                      errors.username === "" &&
                      errors.password === "" &&
                      errors.email === "" &&
                      errors.phone === "" &&
                      !loading
                    )
                  }
                >
                  Зарегистрироваться
                </Button>
              </form>
              <br />
              <div>
                Уже зарегистрированы? <Link to="/login">Войти</Link>
              </div>
            </div>
          </Paper>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  message: state.alert.message
})

RegistrationPage.propTypes = {
  register: PropTypes.func.isRequired,
  message: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string
  }).isRequired
}

export default connect(mapStateToProps, { register })(RegistrationPage)
