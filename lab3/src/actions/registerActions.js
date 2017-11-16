import axios from "axios"
import { setRegistrationSuccess, setRegistrationError } from "./alertActions"

const register = payload => async dispatch => {
  const { data } = await axios.post("users/register", payload)
  const { success, errors } = data
  if (success) {
    const { token } = data.user
    localStorage.setItem("jwtToken", token)
    dispatch(setRegistrationSuccess(success))
  } else {
    dispatch(setRegistrationError(errors))
  }
}
export default register
