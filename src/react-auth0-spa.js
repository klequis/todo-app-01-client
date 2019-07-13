import React, { useState, useEffect, useContext } from 'react'
import createAuth0Client from '@auth0/auth0-spa-js'

import { green } from 'logger'

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname)

export const Auth0Context = React.createContext()
export const useAuth0 = () => useContext(Auth0Context)

let _initOptions
let _onRedirectCallback
let _isAuthenticated = false
let _popupIsOpen = false
let _loading = true

const initAuth0 = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const client = await getAuth0Client()
      if (window.location.search.includes('code=')) {
        const { appState } = await client.handleRedirectCallback()
        _onRedirectCallback(appState)
      }
      _isAuthenticated = await client.isAuthenticated()
      green('_isAuthenticated', _isAuthenticated)
      _loading = false
      resolve(client)
    } catch (e) {
      throw new Error('initAuth0 ERROR', e)
    }
  })
}

const getAuth0Client = () => {
  return new Promise(async (resolve, reject) => {
    let client
    if (!client) {
      try {
        client = await createAuth0Client(_initOptions)
        resolve(client)
      } catch (e) {
        reject(new Error('getAuth0Client Error', e))
      }
    }
  })
}

export const getTokenSilently = async (...p) => {
  const client = await getAuth0Client()
  return await client.getTokenSilently(...p)
}

export const getUser = async () => {
  const client = await getAuth0Client()
  return await client.getUser()
}

export const loginWithPopup = async (params = {}) => {
  _popupIsOpen = true
  const client = await getAuth0Client()
  try {
    await client.loginWithPopup(params)
  } catch (error) {
    console.error(error)
  } finally {
    _popupIsOpen = false
  }
  _isAuthenticated = true
}

export const handleRedirectCallback = async () => {
  _loading = true
  const client = await getAuth0Client()
  await client.handleRedirectCallback()
  _loading = false
  _isAuthenticated = true
}

export const logout = async (...p) => {
  const client = await getAuth0Client()
  client.logout(...p)
}

export const loginWithRedirect = async (...p) => {
  const client = await getAuth0Client()
  client.loginWithRedirect(...p)
}

export const isAuthenticated = () => {
  return _isAuthenticated
}

// ************
// Entry point
// ************
export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [client, setClient] = useState()
  _initOptions = initOptions
  _onRedirectCallback = onRedirectCallback

  green(1)
  useEffect(() => {
    (async () => {
      const clientFromInit = await initAuth0()
      setClient(clientFromInit)
      green('** client **', client)
    })()
    // eslint-disable-next-line
  }, [])


  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated: _isAuthenticated,
        // user,
        user: getUser(),
        loading: _loading,
        popupOpen: _popupIsOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p) => client.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => client.loginWithRedirect(...p),
        getTokenWithPopup: (...p) => client.getTokenWithPopup(...p),
        logout: (...p) => client.logout(...p)
      }}
    >
      {children}
    </Auth0Context.Provider>
  )
}
