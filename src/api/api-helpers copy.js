import fetch from 'cross-fetch'
import { getTokenSilently } from 'react-auth0-spa'
import config from 'config'
// eslint-disable-next-line
import { orange, red } from 'logger'

const logRequest = (url, options, headers) => {
  console.group('fetchJson')
  orange('url', url)
  orange('options', options)
  orange('headers', headers)
  console.groupEnd()
}

const stripLeadingForwardSlash = path => {
  const r = path.startsWith('/') ? path.substring(1) : path
  return r
}

const getFullUri = (nodeEnv, route) => {
  let r
  if (nodeEnv === 'production') {
    red('WARN next line not tested')
    r = `${config.api.apiRootUrlProd}${stripLeadingForwardSlash(route)}`
  } else {
    r = `${config.api.apiRootUriDev}${stripLeadingForwardSlash(route)}`
  }
  return r
}

export const fetchJson = async (url, options = {}) => {

  const token = await getTokenSilently()
  // orange('token', token)

  let headers = {
    ...options.headers,
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }

  const env = process.env.NODE_ENV
  const fullUrl = getFullUri(env, url)

  logRequest(fullUrl, options, headers)

  const r1 = await fetch(fullUrl, {
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