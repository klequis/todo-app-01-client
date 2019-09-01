import { combineReducers } from 'redux'
import { todosReducer } from './todo/reducers'
import { requestsReducer } from './requests/reducers'
import { toastReducer } from './toast/reducers'
import { validationErrorsReducer } from './validation/reducers'
<<<<<<< HEAD
=======
import { userReducer } from './user/reducers'
>>>>>>> dev


const rootReducer = combineReducers({
  todos: todosReducer,
  requests: requestsReducer,
  toast: toastReducer,
<<<<<<< HEAD
  validationErrors: validationErrorsReducer
=======
  validationErrors: validationErrorsReducer,
  userId: userReducer
>>>>>>> dev
})

export default rootReducer
