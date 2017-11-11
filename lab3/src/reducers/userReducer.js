import { isEmpty } from "lodash"
import { SET_CURRENT_USER } from "../constants/userConstants"

const initialState = {
  isLogged: false,
  user: {}
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isLogged: !isEmpty(action.user),
        user: action.user
      }
    default:
      return state
  }
}
