import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
<<<<<<< HEAD
import rootReducer from './root-reducer'
=======
import rootReducer from '../reducers'
>>>>>>> dev

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk)
)

export default configureStore
