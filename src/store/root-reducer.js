import { combineReducers } from 'redux'
import { todosReducer } from './todo/reducers'
import { requestsReducer } from './requests/reducers'
import { toastReducer } from './toast/reducers'
import { validationErrorsReducer } from './validation/reducers'


const rootReducer = combineReducers({
  todos: todosReducer,
  requests: requestsReducer,
  toast: toastReducer,
  validationErrors: validationErrorsReducer
})

export default rootReducer
