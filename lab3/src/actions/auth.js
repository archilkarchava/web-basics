import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../types"
import api from "../api"
import setAuthorizationHeader from "../setAuthHeader"

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
})

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
})

export const login = credentials => dispatch =>
  api.login(credentials).then(user => {
    localStorage.JWT = user.token
    setAuthorizationHeader(user.token)
    dispatch(userLoggedIn(user))
  })

export const logout = () => dispatch => {
  localStorage.removeItem("JWT")
  setAuthorizationHeader()
  dispatch(userLoggedOut())
}

export const validateToken = token => () => api.user.validateToken(token)
