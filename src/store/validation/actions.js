import { purple } from 'logger'

import {
  CLEAR_VALIDATION_ERRORS,
  SET_VALIDATION_ERRORS
} from './constants'

export const setValidationErrors = (e) => {
  purple('setValidationErrors.errors: e', e.errors)
  return {
    type: SET_VALIDATION_ERRORS,
    payload: { errors: e.errors }
  }
}

export const clearErrors = () => {
  return {
    type: CLEAR_VALIDATION_ERRORS
  }
}