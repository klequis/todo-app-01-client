import { SET_TOAST, CLEAR_TOAST } from './constants'
import { blue } from 'logger'
export const toastReducer = (state = null, { type, payload }) => {
  switch (type) {
    case SET_TOAST:
      return payload
    case CLEAR_TOAST:
      blue('clear toast called')
      return null
    default:
      return state
  }
}
