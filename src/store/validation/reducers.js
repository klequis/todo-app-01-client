import { CLEAR_VALIDATION_ERRORS, SET_VALIDATION_ERRORS } from './constants'
// import { merge } from 'ramda'
import { blue } from 'logger'

export function validationErrorsReducer(state = [], action) {
  switch (action.type) {
    case CLEAR_VALIDATION_ERRORS:
      // return merge(state, {
      //   [action.requestKey]: { status: REQUEST_PENDING, error: null }
      // })
      return state
    case SET_VALIDATION_ERRORS:
      blue('validation: state', state)
      blue('validation: payload.errors', action.payload.errors)
      // return merge(state, {
      //   [action.requestKey]: { status: REQUEST_SUCCESS, error: null }
      // })
      const o = action.payload.errors
      return o
    default:
      return state
  }
}
