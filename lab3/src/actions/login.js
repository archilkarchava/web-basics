import axios from "axios"
import jwtDecode from "jwt-decode"
import { SET_CURRENT_USER, USER_LOGGED_OUT } from "../constants/userConstants"
import setAuthHeader from "../utils/setAuthHeader"

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
})

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
})

export const login = credentials => dispatch => {
  axios.post("/users/login", credentials).then(res => {
    const { token } = res.data.user
    localStorage.setItem("jwtToken", token)
    setAuthHeader(token)
    dispatch(setCurrentUser(jwtDecode(token)))
  })
}
export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken")
  setAuthHeader(false)
  dispatch(userLoggedOut())
}

export const validateToken = token =>
  axios.post("/users/login/validate_token", { token })
