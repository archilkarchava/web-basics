import React from "react"
import { render } from "react-dom"
import { BrowserRouter, Route } from "react-router-dom"
import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import decode from "jwt-decode"
import { composeWithDevTools } from "redux-devtools-extension"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"

import registerServiceWorker from "./registerServiceWorker"
import userReducer from "./reducers/userReducer"
import setLoginHeader from "./utils/setLoginHeader"
import { userLoggedIn } from "./actions/login"
import App from "./App"

import "./css/index.css"

const store = createStore(
  userReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

if (localStorage.JWT) {
  const payload = decode(localStorage.JWT)
  const user = {
    token: localStorage.JWT,
    username: payload.username,
    email: payload.email,
    phone: payload.phone
  }
  setLoginHeader(localStorage.JWT)
  store.dispatch(userLoggedIn(user))
}

render(
  <MuiThemeProvider>
    <BrowserRouter>
      <Provider store={store}>
        <Route component={App} />
      </Provider>
    </BrowserRouter>
  </MuiThemeProvider>,
  document.getElementById("root")
)
registerServiceWorker()
