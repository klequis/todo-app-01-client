import { SET_USER } from './constants'
<<<<<<< HEAD


export const setUser = (userId) => {
=======
import { orange } from 'logger'


export const setUser = (userId) => {
  orange('setUser: userId', userId)
>>>>>>> dev
  return {
    type: SET_USER,
    payload: { userId }
  }
}