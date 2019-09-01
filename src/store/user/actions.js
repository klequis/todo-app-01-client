import { SET_USER } from './constants'
import { orange } from 'logger'


export const setUser = (userId) => {
  orange('setUser: userId', userId)
  return {
    type: SET_USER,
    payload: { userId }
  }
}