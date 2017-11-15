import axios from "axios"
import jwtDecode from "jwt-decode"
import _ from "lodash"
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

export const login = credentials => dispatch => {
  axios.post("/users/login", credentials).then(res => {
    if (!_.isEmpty(res.data.user)) {
      const { token } = res.data.user
      localStorage.setItem("jwtToken", token)
      setAuthHeader(token)
      dispatch(setCurrentUser(jwtDecode(token)))
      dispatch(setLoginSuccess(res.data.success))
    } else {
      dispatch(setLoginError(res.data.errors.global))
    }
  })
}
export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken")
  setAuthHeader(false)
  dispatch(userLoggedOut())
}
