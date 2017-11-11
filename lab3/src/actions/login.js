import axios from "axios"
import jwtDecode from "jwt-decode"
import { SET_CURRENT_USER } from "../constants/userConstants"
import setLoginHeader from "../utils/setLoginHeader"

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
})

export const login = credentials => dispatch => {
  axios.post("/users/login", credentials).then(res => {
    const { token } = res.data
    localStorage.setItem("jwtToken", token)
    setLoginHeader(token)
    dispatch(setCurrentUser(jwtDecode(token)))
  })
}
export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken")
  setLoginHeader(false)
  dispatch(setCurrentUser({}))
}

export const validateToken = token =>
  axios.post("/users/login/validate_token", { token })
