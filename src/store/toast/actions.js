import { SET_TOAST, CLEAR_TOAST } from './constants'
import shortid from 'shortid'
// import { TOAST_INFO } from 'global-constants'

/**
 *
 * @param {toast} toast object {error, id, level, message}
 */
export const setToast = ({ error, id = shortid.generate(), level, message }) => ({
  type: SET_TOAST,
  payload: { error, id, level, message }
})

export const clearToast = () => ({
  type: CLEAR_TOAST
})
