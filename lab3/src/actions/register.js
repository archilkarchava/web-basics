import api from "../api"
import { USER_LOGGED_IN } from "../types"

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
})

export const register = data => dispatch =>
  api.register(data).then(user => {
    localStorage.JWT = user.token
    dispatch(userLoggedIn(user))
  })
