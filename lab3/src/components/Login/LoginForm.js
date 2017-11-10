import React, { Component } from "react"
import { Link } from "react-router-dom"
import AppBar from "material-ui/AppBar"
import RaisedButton from "material-ui/RaisedButton"
import TextField from "material-ui/TextField"
import PropTypes from "prop-types"

class LoginForm extends Component {
  static propTypes = {
    submit: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      data: {
        username: "",
        password: ""
      },
      errors: {},
      loading: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

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
      },
      () => {}
    )
  }

  handleSubmit = e => {
    e.preventDefault()
    const errors = this.validate(this.state.data)
    this.setState({ errors })
    if (errors.username === "" && errors.password === "") {
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
    if (!data.password.length > 0) {
      passwordErr = "Поле обязательно для заполнения."
    }
    return passwordErr
  }

  validate = data => {
    const errors = {}
    errors.username = this.validateUsername(data)
    errors.password = this.validatePassword(data)
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
      <div className="app-login">
        <AppBar title="Вход" />
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
          <br /> <br />
          <RaisedButton
            type="submit"
            label="Войти"
            disabled={!(errors.username === "" && errors.password === "")}
            primary
          />
        </form>
        <br />
        <div>
          Еще не зарегистрированы? <Link to="/register">Регистрация</Link>
        </div>
      </div>
    )
  }
}

export default LoginForm
