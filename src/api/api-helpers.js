import fetch from 'cross-fetch'
import { getTokenSilently } from 'react-auth0-spa'
import config from 'config'
// eslint-disable-next-line
import { orange, red } from 'logger'
import { redf } from 'logger'

const logRequest = (url, options, headers) => {
  console.group('fetchJson.logRequest')
  orange('url', url)
  orange('options', options)
  orange('headers', headers)
  console.groupEnd()
}

const logResponse = res => {
  const { status, statusText, url } = res
  console.group('fetchJson.logResponse')
  orange('status', status)
  orange('statusText', statusText)
  orange('url', url)
  console.groupEnd()
}

const formatError = (status, statusText, url = '', validationErrors = []) => {
  return {
    status,
    statusText,
    url,
    validationErrors: validationErrors || []
  }
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

const getToken = async () => {
  try {
    return await getTokenSilently()
  } catch (e) {
    const msg = '[api-helpers.getToken] ERROR: error fetching token'
    redf(msg, e)
    throw new Error(msg, e)
  }
}

const checkErrors = async res => {
  logResponse(res)
  const { status, statusText, url } = res

  if (status >= 200 && status < 300) {
    return res.json()
  }

  let validationErrors = []
  if (status === 422) {
    const body = await res.json()
    validationErrors = body.errors
  }

  let err = formatError(status, statusText, url, validationErrors)

  throw err
}

const fetchJson = async (url, options = {}) => {
  try {
    const token = await getToken()

    const headers = {
      ...options.headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }

    const env = process.env.NODE_ENV
    const fullUrl = getFullUri(env, url)

    logRequest(fullUrl, options, headers)

    const res = await fetch(fullUrl, {
      ...options,
      headers
    })

    const chkErr = checkErrors(res)
    return chkErr
  } catch (e) {
    let err

    if (e.message === 'Network request failed') {
      // A network error doesn't have the same format as an error from 
      // the api. However, the action & reducer is expecting the api
      // error format so format it as such
      err = formatError(503, 'Network request failed')
    } else {
      err = e
    }
    throw err
  }
}

export default fetchJson
