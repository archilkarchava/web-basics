import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import LoginForm from "./LoginForm"
import { login } from "../../actions/loginActions"

class LoginPage extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired
  }

  submit = data => this.props.login(data)

  render() {
    return (
      <div className="content lightBlueBg">
        <LoginForm submit={this.submit} />
      </div>
    )
  }
}

export default connect(null, { login })(LoginPage)