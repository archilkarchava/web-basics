import { SET_CURRENT_USER, USER_LOGGED_OUT } from "../constants/userConstants"

export default (state = { user: {} }, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        user: action.user
      }
    case USER_LOGGED_OUT:
      return {
        user: {}
      }
    default:
      return state
  }
}
