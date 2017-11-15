import {
  REGISTRATION_SUCCESS,
  REGISTRATION_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR
} from "../constants/alertConstants"

export const setRegistrationSuccess = message => ({
  type: REGISTRATION_SUCCESS,
  message
})

export const setRegistrationError = message => ({
  type: REGISTRATION_ERROR,
  message
})

export const setLoginSuccess = message => ({
  type: LOGIN_SUCCESS,
  message
})

export const setLoginError = message => ({
  type: LOGIN_ERROR,
  message
})
