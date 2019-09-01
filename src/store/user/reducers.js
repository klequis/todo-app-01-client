import { SET_USER } from './constants'

<<<<<<< HEAD
export const toastReducer = (state = null, { type, payload }) => {
=======
export const userReducer = (state = null, { type, payload }) => {
>>>>>>> dev
  switch (type) {
    case SET_USER:
      return payload.userId
    default:
      return state
  }
}
