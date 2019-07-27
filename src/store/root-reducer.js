import { combineReducers } from 'redux'
import { todosReducer } from './todo/reducers'
import { requestsReducer } from './requests/reducers'
import { toastReducer } from './toast/reducers'


const rootReducer = combineReducers({
  todos: todosReducer,
  requests: requestsReducer,
  toast: toastReducer
})

export default rootReducer
