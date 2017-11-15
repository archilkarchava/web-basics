import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import RegistrationForm from "./RegistrationForm"
import register from "../../actions/registerActions"

class RegistrationPage extends Component {
  static propTypes = {
    register: PropTypes.func.isRequired
  }

  submit = data => this.props.register(data)

  render() {
    return (
      <div className="content lightBlueBg">
        <RegistrationForm submit={this.submit} />
      </div>
    )
  }
}

export default connect(null, { register })(RegistrationPage)
