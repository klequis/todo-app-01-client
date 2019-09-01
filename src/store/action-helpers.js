// eslint-disable-next-line
import { red } from '../logger'
import {
  requestPending,
  requestSuccess,
  requestFailed
} from './requests/actions'
// eslint-disable-next-line
import { pink } from 'logger'

export const logError = (err, key) => {
  red(`actions.logError(key:${key})`, err)
}

<<<<<<< HEAD

// console.group()
// pink('request', request)
// pink('key', key)
// pink('start', start)
// pink('success', success)
// pink('failure', failure)
// console.groupEnd()

// ACTIVE
=======
>>>>>>> dev
export const createRequestThunk = ({
  request,
  key,
  start = [],
  success = [],
  failure = []
}) => {
  
  return (...args) => async dispatch => {
    pink(`${key}`)  
    const requestKey = typeof key === 'function' ? key(...args) : key
    start.map(async actionCreator => {
      await dispatch(actionCreator())
    })
    await dispatch(requestPending(requestKey))
    
    try {
      const data = await request(...args)
      // await dispatch(requestSuccess(requestKey))
      success.map(async actionCreator => {
        dispatch(requestSuccess(requestKey))
        await dispatch(actionCreator(data))
      })
    } catch (e) {
      // await dispatch(requestFailed(e, requestKey))
      return failure.map(async actionCreator => {
        dispatch(requestFailed(e, requestKey))
        await dispatch(actionCreator(e))
      })
    }
  }
}


// ORIG
// export const createRequestThunk = ({
//   request,
//   key,
//   start = [],
//   success = [],
//   failure = []
// }) => {
//   return (...args) => async dispatch => {
//     const requestKey = typeof key === 'function' ? key(...args) : key
//     start.map(async actionCreator => {
//       await dispatch(actionCreator())
//     })
//     await dispatch(requestPending(requestKey))
//     try {
//       const data = await request(...args)
//       await dispatch(requestSuccess(requestKey))
//       success.map(async actionCreator => {
//         await dispatch(actionCreator(data))
//         dispatch(requestSuccess(requestKey))
//       })
//     } catch (e) {

//       await dispatch(requestFailed(e, requestKey))
//       failure.map(async actionCreator => {
//         await dispatch(actionCreator(e))
//         dispatch(requestFailed(e, requestKey))
//       })
//     }
//   }
// }
