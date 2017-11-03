import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import RegistrationForm from "../forms/RegistrationForm"
import { register } from "../../actions/register"

class RegistrationPage extends React.Component {
  submit = data =>
    this.props.register(data).then(() => this.props.history.push("/"))

  render() {
    return (
      <div>
        <RegistrationForm submit={this.submit} />
      </div>
    )
  }
}

RegistrationPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  register: PropTypes.func.isRequired
}

export default connect(null, { register })(RegistrationPage)
