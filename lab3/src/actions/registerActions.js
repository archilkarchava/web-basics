import axios from "axios"
import jwtDecode from "jwt-decode"
import _ from "lodash"
import { setCurrentUser } from "./loginActions"
import { setRegistrationSuccess, setRegistrationError } from "./alertActions"

const register = data => dispatch => {
  axios.post("/users/register", data).then(res => {
    if (!_.isEmpty(res.data.user)) {
      const { token } = res.data.user
      localStorage.setItem("jwtToken", token)
      dispatch(setCurrentUser(jwtDecode(token)))
      dispatch(setRegistrationSuccess(res.data.success))
    } else {
      dispatch(setRegistrationError(res.data.errors))
    }
  })
}
export default register
