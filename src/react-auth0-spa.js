/* eslint-disable */

import React, { useEffect, useState, useContext } from 'react'
import createAuth0Client from '@auth0/auth0-spa-js'

import { pink, blue, yellow } from 'logger'

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname)

export const Auth0Context = React.createContext()
export const useAuth0 = () => useContext(Auth0Context)

let _initOptions
const setInitOptions = options => {
  // blue('setInitOptions: options', options)
  _initOptions = options
}
const getInitOptions = () => {
  // blue('getInitOptions: _initOptions', _initOptions)
  return _initOptions
}

const auth0Client = async caller => {
  // setIsLoading(true)
  let client
  if (!client) {
    try {
      client = await createAuth0Client(getInitOptions())
      // blue('auth0Client: client', client)
    } catch (e) {
      throw new Error('auth0Client ERROR: could not create client', e)
    }
  }

  if (window.location.search.includes('code=')) {
    const { appState } = await client.handleRedirectCallback()
    getOnRedirectCallback()(appState)
  }

  // const isAuth = await client.isAuthenticated()
  // pink('isAuth', isAuth)
  // setIsAuthenticated(isAuth, 'initAuth0')

  // setIsLoading(false)

  return client
}

let _onRedirectCallback
const setOnRedirectCallback = fn => {
  _onRedirectCallback = fn
}
const getOnRedirectCallback = () => {
  return _onRedirectCallback
}

let _popupIsOpen = false
const setPopupIsOpen = bool => {
  _popupIsOpen = bool
}
const getPopupIsOpen = () => {
  return _popupIsOpen
}

let _isLoading = false
const setIsLoading = bool => {
  _isLoading = bool
}
const getIsLoading = () => {
  return _isLoading
}

let _isAuthenticated = false
const setIsAuthenticated = (bool, caller) => {
  blue(`(${caller}) setIsAuthenticated`, `${_isAuthenticated} --> ${bool}`)
  // yellow('setIsAuthenticated')
  _isAuthenticated = bool
}
const getIsAuthenticated = async caller => {
  yellow('getIsAuthenticated')
  // blue(`(${caller}) getIsAuthenticated`, _isAuthenticated)
  const client = await auth0Client('getIsAuthenticated')
  const isAuth = client.isAuthenticated()
  return isAuth
}

export const getTokenSilently = async (...p) => {
  const client = await auth0Client('getTokenSilently')
  return await client.getTokenSilently(...p)
}

export const getUser = async () => {
  const client = await auth0Client('getUser')
  return await client.getUser()
}

export const loginWithPopup = async (params = {}) => {
  setPopupIsOpen(true)
  const client = await auth0Client('loginWithPopup')
  try {
    await client.loginWithPopup(params)
  } catch (error) {
    console.error(error)
  } finally {
    setPopupIsOpen(false)
  }
  setIsAuthenticated(true, 'loginWithPopup')
}

export const handleRedirectCallback = async () => {
  setIsLoading(true)
  const client = await auth0Client('handleRedirectCallback')
  await client.handleRedirectCallback()
  setIsLoading(false)
  setIsAuthenticated(true, 'handleRedirectCallback')
}

export const logout = async (...p) => {
  const client = await auth0Client('logout')
  client.logout(...p)
}

export const loginWithRedirect = async (...p) => {
  const client = await auth0Client('loginWithRedirect')
  client.loginWithRedirect(...p)
}

// ************
// Entry point
// ************

export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  yellow('Auth0Provider')
  if (getIsLoading()) {
    return
  }

  

  const [client, setClient] = useState()
  const [itIsLoading, setItIsLoading] = useState()
  
  setItIsLoading(true)
  setInitOptions(initOptions)

  setOnRedirectCallback(onRedirectCallback)
  useEffect(() => {
    const init = async () => {
      const clientFromInit = await auth0Client('Auth0Provider')
      blue('Auth0Provider typeof clientFromInit', typeof clientFromInit)
      setClient(clientFromInit)
      blue('Auth0Provider: typeof client', typeof client)

      const isAuth = await clientFromInit.isAuthenticated()
      pink('isAuth', isAuth)
      setIsAuthenticated(isAuth, 'useEffect')
    }
    init()
    // eslint-disable-next-line
  }, [])
  return (
    <Auth0Context.Provider
      value={{
        animal: 'cat',
        // isAuthenticated: getIsAuthenticated('Auth0ContextProvider'), // _isAuthenticated,
        isAuthenticated: async () => await getIsAuthenticated(),
        // user,
        // user: getUser(),
        loading: getIsLoading(),
        // popupOpen: _popupIsOpen,
        loginWithPopup: loginWithPopup,
        // handleRedirectCallback,
        // getIdTokenClaims: (...p) => client.getIdTokenClaims(...p),
        // loginWithRedirect: (...p) => client.loginWithRedirect(...p),
        // getTokenWithPopup: (...p) => client.getTokenWithPopup(...p),
        logout: (...p) => client.logout(...p)
      }}
    >
      {children}
    </Auth0Context.Provider>
  )
}
