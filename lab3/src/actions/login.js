import axios from "axios"
import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../constants/userConstants"
import setLoginHeader from "../utils/setLoginHeader"

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
})

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
})

export const login = credentials => dispatch =>
  axios.post("/users/login", credentials).then(res => {
    const { token } = res.data
    localStorage.setItem("JWT", token)
    setLoginHeader(token)
    dispatch(userLoggedOut())
  })

export const logout = () => dispatch => {
  localStorage.removeItem("JWT")
  setLoginHeader(false)
  dispatch(userLoggedOut())
}

export const validateToken = token =>
  axios.post("/users/login/validate_token", { token })
