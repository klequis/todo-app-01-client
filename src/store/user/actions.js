import { SET_USER } from './constants'
import { orange } from 'logger'


export const setUser = (userId) => {
  return {
    type: SET_USER,
    payload: { userId }
  }
}