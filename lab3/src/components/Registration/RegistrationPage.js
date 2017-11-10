import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
/* import axios from "axios" */
import RegistrationForm from "./RegistrationForm"
import register from "../../actions/register"

class RegistrationPage extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    register: PropTypes.func.isRequired
  }

  submit = data => this.props.register(data)

  render() {
    return (
      <div>
        <RegistrationForm submit={this.submit} />
      </div>
    )
  }
}

export default connect(null, { register })(RegistrationPage)
