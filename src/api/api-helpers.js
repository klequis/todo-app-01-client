import fetch from 'cross-fetch'
import { getTokenSilently } from 'react-auth0-spa'
import config from 'config'

// eslint-disable-next-line
import { orange, red } from 'logger'

// const logRequest = (url, options, headers) => {
//   console.group('fetchJson')
//   orange('url', url)
//   orange('options', options)
//   orange('headers', headers)
//   console.groupEnd()
// }

const stripLeadingForwardSlash = (path) => {
  const r = path.startsWith('/') ? path.substring(1) : path
  return r
}

const getFullUri = (nodeEnv, route) => {
  let r
  if (nodeEnv === 'production') {
    red('WARN next line not tested')
    // Removed hard-coded apiRoot and replaced with value from config
    r = `${config.api.apiRootUriDev}${stripLeadingForwardSlash(route)}`
  } else {
    r = `${config.api.apiRootUriDev}${stripLeadingForwardSlash(route)}`
  }
  return r
}

export const fetchJson = async (url, options = {}) => {
  let token
  try {
    token = await getTokenSilently()
  } catch (e) {
    red('fetchJson ERROR', e)
    throw new Error('fetchJson ERROR', e)
  }
  

  let headers = {
    ...options.headers,
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
  // logRequest(url, options, headers)
  const env = process.env.NODE_ENV
  const r1 = await fetch(getFullUri(env, url), {
    ...options,
    headers,
  })

  orange('api-htlpers: r1', r1)

  const { status } = r1

  if (status >= 200 && status < 300) {
    const successReturn = await r1.json()
    orange('successReturn', successReturn)
    return await successReturn
  } else {
    const body = await r1.json()
    const validationErrors = body.errors
    orange('validationErrors', validationErrors)
    orange('r1.status', r1.status)
    const err = {
      status: r1.status,
      statusText: r1.statusText,
      url: r1.url,
      errors: validationErrors || []
    }
    throw err
  }
    
}

export default { fetchJson }

// export const fetchJson = (url, options = {}) => {
//   let headers = {
//     ...options.headers,
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//   }
//   logRequest(url, options, headers)
//   return (
//     fetch(url, {
//       ...options,
//       headers,
//     }).then(res => {
//       const { status } = res
//       if (status >= 200 && status < 300) {
//         return res.json()
//       } else {
//         const err = {
//           status: res.status,
//           statusText: res.statusText,
//           url: res.url,
//         }
//         throw err
//       }
//     })
//   )
// }
