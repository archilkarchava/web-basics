import { SET_CURRENT_USER, USER_LOGGED_OUT } from "../constants/userConstants"

export default (state = { userData: {} }, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        userData: action.userData
      }
    case USER_LOGGED_OUT:
      return {
        userData: {}
      }
    default:
      return state
  }
}
