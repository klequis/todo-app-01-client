import { purple } from 'logger'

import { SET_FIELD_VALUE, CLEAR_FIELD_VALUE } from './constants'

export const setFieldValue = (field, value) => {
  // purple('setValidationErrors.errors: e', e.errors)
  return {
    type: SET_FIELD_VALUE,
    payload: { field, value }
  }
}

export const clearFieldValue = () => {
  return {
    type: CLEAR_FIELD_VALUE
  }
}

// so you need to create reducer that will merge based on field name
// if field exists it will replace the value
// if field does not exist it will create it
// ramda merge is perfect for that