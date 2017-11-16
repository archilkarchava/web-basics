import axios from "axios"
import jwtDecode from "jwt-decode"
import { SET_CURRENT_USER, USER_LOGGED_OUT } from "../constants/userConstants"
import { setLoginSuccess, setLoginError } from "./alertActions"
import setAuthHeader from "../utils/setAuthHeader"

export const setCurrentUser = userData => ({
  type: SET_CURRENT_USER,
  userData
})

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
})

export const login = credentials => async dispatch => {
  const { data } = await axios.post("users/login", credentials)
  const { success, errors } = data
  if (success) {
    const { token } = data.user
    localStorage.setItem("jwtToken", token)
    setAuthHeader(token)
    dispatch(setCurrentUser(jwtDecode(token)))
    dispatch(setLoginSuccess({ success }))
  } else {
    dispatch(setLoginError(errors))
  }
}
export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken")
  setAuthHeader(false)
  dispatch(userLoggedOut())
}
