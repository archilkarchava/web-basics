import axios from "axios"
import { userLoggedIn } from "./login"

const register = data => dispatch => {
  axios.post("/users/register", data).then(res => {
    console.log(res.data)
    dispatch(userLoggedIn(res.data))
  })
}
export default register
