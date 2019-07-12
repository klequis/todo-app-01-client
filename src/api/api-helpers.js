import fetch from 'cross-fetch'
import { getTokenSilently } from 'react-auth0-spa'

// eslint-disable-next-line
import { orange } from 'logger'

// const logRequest = (url, options, headers) => {
//   console.group('fetchJson')
//   orange('url', url)
//   orange('options', options)
//   orange('headers', headers)
//   console.groupEnd()
// }

export const fetchJson = async (url, options = {}) => {
  let token
  try {
    token = await getTokenSilently()
    orange('token', token)
  } catch (e) {
    console.log('fetchJson ERROR', e)
  }
  

  let headers = {
    ...options.headers,
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
  // logRequest(url, options, headers)

  const r1 = await fetch(url, {
    ...options,
    headers,
  })

  const { status } = r1

  if (status >= 200 && status < 300) {
    return await r1.json()
  } else {
    const err = {
      status: r1.status,
      statusText: r1.statusText,
      url: r1.url,
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
