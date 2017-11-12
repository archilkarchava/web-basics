import axios from "axios"
import jwtDecode from "jwt-decode"
import { setCurrentUser } from "./login"

const register = data => dispatch => {
  axios.post("/users/register", data).then(res => {
    const { token } = res.data.user
    localStorage.jwtToken = token
    dispatch(setCurrentUser(jwtDecode(token)))
  })
}
export default register
