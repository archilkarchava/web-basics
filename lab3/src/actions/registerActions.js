import axios from "axios"
import jwtDecode from "jwt-decode"
import { setRegistrationSuccess, setRegistrationError } from "./alertActions"
import { setCurrentUser } from "./loginActions"

const register = payload => async dispatch => {
  const { data } = await axios.post("users/register", payload)
  const { success, errors } = data
  if (success) {
    const { token } = data.user
    localStorage.setItem("jwtToken", token)
    dispatch(setRegistrationSuccess({ success }))
    dispatch(setCurrentUser(jwtDecode(token)))
  } else {
    dispatch(setRegistrationError(errors))
  }
}
export default register
