import { SET_USER } from './constants'

export const toastReducer = (state = null, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return payload.userId
    default:
      return state
  }
}
