import {
  REGISTRATION_SUCCESS,
  REGISTRATION_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR
} from "../constants/alertConstants"

function alert(state = { message: {} }, action = {}) {
  switch (action.type) {
    case REGISTRATION_SUCCESS:
      return {
        type: "registrationSuccess",
        message: action.message
      }
    case REGISTRATION_ERROR:
      return {
        type: "registrationError",
        message: action.message
      }
    case LOGIN_SUCCESS:
      return {
        type: "loginSuccess",
        message: action.message
      }
    case LOGIN_ERROR:
      return {
        type: "loginError",
        message: action.message
      }
    default:
      return state
  }
}

export default alert
