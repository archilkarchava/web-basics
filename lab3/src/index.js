import React from "react"
import { render } from "react-dom"
import { BrowserRouter, Route } from "react-router-dom"
import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import jwtDecode from "jwt-decode"
import { composeWithDevTools } from "redux-devtools-extension"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import { createMuiTheme } from "material-ui/styles"
import { blue } from "material-ui/colors/"

import registerServiceWorker from "./registerServiceWorker"
import userReducer from "./reducers/userReducer"
import setAuthHeader from "./utils/setAuthHeader"
import { setCurrentUser } from "./actions/login"
import App from "./App"

import "./css/index.css"

const theme = createMuiTheme({
  palette: {
    primary: blue
  }
})

const store = createStore(
  userReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

if (localStorage.jwtToken) {
  setAuthHeader(localStorage.jwtToken)
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)))
}

render(
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <Provider store={store}>
        <Route component={App} />
      </Provider>
    </BrowserRouter>
  </MuiThemeProvider>,
  document.getElementById("root")
)
registerServiceWorker()
