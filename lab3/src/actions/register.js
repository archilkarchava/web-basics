import axios from "axios"
import { setCurrentUser } from "./login"

const register = data => dispatch => {
  axios.post("/users/register", data).then(res => {
    console.log(res.data)
    dispatch(setCurrentUser(res.data))
  })
}
export default register
