import { combineReducers } from "redux"

import user from "./reducers/userReducer"
import alert from "./reducers/alertReducer"

export default combineReducers({
  user,
  alert
})
