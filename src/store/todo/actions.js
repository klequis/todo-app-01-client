import {
  TODO_CREATE_KEY,
  TODOS_CREATE_REQUEST_KEY,
  TODOS_DELETE_REQUEST_KEY,
  TODOS_READ_KEY,
  TODOS_READ_BY_ID_REQUEST_KEY,
  TODOS_READ_REQUEST_KEY,
  TODOS_UPDATE_REQUEST_KEY
} from './constants'

import {
  setToast,
} from 'store/toast/actions'

import {
  setValidationErrors
} from 'store/validation/actions'

import { createRequestThunk } from '../action-helpers'
import api from 'api'
import { TOAST_WARN /*, TOAST_INFO */ } from 'global-constants'

// eslint-disable-next-line
import { purple, green, red } from 'logger'


const logApiError = (e) => {
  purple('logApiError: e', e)

  return {
    type: 'API_ERROR',
    errors: e  
  }
}

export const todoAdd = newTodo => {
  return {
    type: TODO_CREATE_KEY,
    payload: newTodo
  }
}

// Read
export const todosRead = todos => {
  return {
    type: TODOS_READ_KEY,
    payload: todos
  }
}

export const todosReadRequest = createRequestThunk({
  request: api.todos.read,
  key: TODOS_READ_REQUEST_KEY,
  success: [todosRead],
  failure: [e => setToast({error: e, message: 'Could not get todos', level: TOAST_WARN})]
})

export const todosReadByIdRequest = createRequestThunk({
  request: api.todos.readById,
  key: TODOS_READ_BY_ID_REQUEST_KEY,
  success: [todosRead],
  failure: [logApiError]
})

// Create
export const todoCreateRequest = createRequestThunk({
  request: api.todos.create,
  key: TODOS_CREATE_REQUEST_KEY,
  success: [todosReadRequest],
  failure: [setValidationErrors]
})

// Delete
export const todoDeleteRequest = createRequestThunk({
  request: api.todos.delete,
  key: TODOS_DELETE_REQUEST_KEY,
  success: [todosReadRequest],
  failure: [logApiError]
})

// Update
export const todoUpdateRequest = createRequestThunk({
  request: api.todos.update,
  key: TODOS_UPDATE_REQUEST_KEY,
  success: [todosReadRequest],
  failure: [logApiError]
})
