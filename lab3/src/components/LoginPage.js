import React, { Component } from "react"
import { Link } from "react-router-dom"
import {
  Paper,
  Typography,
  Button,
  TextField,
  LinearProgress
} from "material-ui"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { login } from "../actions/loginActions"

import styles from "./StylesMUI/styles"

class LoginPage extends Component {
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

  componentWillReceiveProps(nextProps) {
    if (this.props.message !== nextProps.message) {
      Object.assign(this.state.errors, nextProps.message)
      this.setState({ errors: this.state.errors, loading: false })
    }
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
    const errors = this.validateAll(this.state.data)
    this.setState({ errors })
    if (errors.username === "" && errors.password === "") {
      this.setState({ loading: true })
      this.props.login(this.state.data)
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

  validateAll = data => {
    const errors = {}
    errors.username = this.validateUsername(data)
    errors.password = this.validatePassword(data)
    return errors
  }
  render() {
    const { data, errors, loading } = this.state
    return (
      <div className="lightBlueBg">
        {loading && <LinearProgress color="accent" />}
        <div className="container">
          <Paper elevation={6}>
            <div className="form">
              <Typography type="headline" align="left">
                Вход
              </Typography>
              <form method="post" onSubmit={this.handleSubmit}>
                <TextField
                  label="Логин"
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
                      !loading
                    )
                  }
                >
                  Войти
                </Button>
              </form>
              <br />
              <div>
                Еще не зарегистрированы? <Link to="/register">Регистрация</Link>
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

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  message: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string
  }).isRequired
}

export default connect(mapStateToProps, { login })(LoginPage)
