import { TODO_CREATE_KEY, TODOS_READ_KEY } from './constants'
// import { blue, green } from 'logger'
export function todosReducer(
  state = [],
  action
) {
  // blue('payload', payload)
  // blue('type', type)
  // blue('action', action)
  switch (action.type) {
    case TODOS_READ_KEY:
      return action.payload
    case TODO_CREATE_KEY:
      return [...state, action.payload[0]]
    default:
      return state
  }
}
