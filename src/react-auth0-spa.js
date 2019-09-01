import React, { useEffect, useState, useContext } from 'react'
import createAuth0Client from '@auth0/auth0-spa-js'
<<<<<<< HEAD
import { green } from 'logger';
=======
import { blue } from 'logger'
>>>>>>> dev

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname)

export const Auth0Context = React.createContext()
export const useAuth0 = () => useContext(Auth0Context)

let _initOptions
const setInitOptions = options => {
  _initOptions = options
}
const getInitOptions = () => {
  return _initOptions
}

const getAuth0Client = async () => {
  let client
  if (!client) {
    try {
      client = await createAuth0Client(getInitOptions())
    } catch (e) {
<<<<<<< HEAD
      throw new Error('auth0Client ERROR: could not create client', e)
=======
      // throw new Error('auth0Client ERROR: could not create client', e)
>>>>>>> dev
    }
  }
  return client
}

<<<<<<< HEAD
export const getTokenSilently = async (...p) => {
  const client = await getAuth0Client()
  return await client.getTokenSilently(...p)
=======
// TODO: remove try catch before code complete
export const getTokenSilently = async params => {
  const client = await getAuth0Client()
  try {
    return await client.getTokenSilently(params)
  } catch (e) {
    // console.error('react-auth0-spa.getTokenSilently', e)
  }
>>>>>>> dev
}

export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
<<<<<<< HEAD

  setInitOptions(initOptions)

  const [isAuthenticated, setIsAuthenticated] = useState()
  const [user, setUser] = useState()
  const [auth0Client, setAuth0] = useState()
  const [loading, setLoading] = useState(true)
  const [popupOpen, setPopupOpen] = useState(false)

  useEffect(() => {
    const init = async () => {
      const client = await getAuth0Client('Auth0Provider')
      setAuth0(client)
=======
  setInitOptions(initOptions)

  const [isAuthenticated, setIsAuthenticated] = useState()
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  const [popupOpen, setPopupOpen] = useState(false)

  useEffect(() => {
    const init = async () => {
      const client = await getAuth0Client()
>>>>>>> dev
      if (window.location.search.includes('code=')) {
        const { appState } = await client.handleRedirectCallback()
        onRedirectCallback(appState)
      }
<<<<<<< HEAD

      const isAuthenticated = await client.isAuthenticated()
      setIsAuthenticated(isAuthenticated)

=======
      const isAuthenticated = await client.isAuthenticated()
      setIsAuthenticated(isAuthenticated)
>>>>>>> dev
      if (isAuthenticated) {
        const user = await client.getUser()
        setUser(user)
      }
<<<<<<< HEAD

=======
>>>>>>> dev
      setLoading(false)
    }
    init()
    // eslint-disable-next-line
  }, [])
<<<<<<< HEAD
  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true)
    try {
      await auth0Client.loginWithPopup(params)
=======

  const loginWithPopup = async (params = {}) => {
    blue('loginWithPopup()')
    setPopupOpen(true)
    const client = getAuth0Client()
    try {
      await client.loginWithPopup(...params)
>>>>>>> dev
    } catch (error) {
      console.error(error)
    } finally {
      setPopupOpen(false)
    }
<<<<<<< HEAD
    const user = await auth0Client.getUser()
    setUser(user)
    green('auth0: user', user)
=======
    const user = await client.getUser()
    setUser(user)
    blue('auth0: user', user)
>>>>>>> dev
    setIsAuthenticated(true)
  }

  const handleRedirectCallback = async () => {
<<<<<<< HEAD
    setLoading(true)
    await auth0Client.handleRedirectCallback()
    const user = await auth0Client.getUser()
    setLoading(false)
    setIsAuthenticated(true)
    setUser(user)
=======
    blue('handleRedirectCallback()')
    try {
      setLoading(true)
      const client = getAuth0Client()
      await client.handleRedirectCallback()
      const user = await client.getUser()
      setIsAuthenticated(true)
      setUser(user)
    } catch (e) {
      // console.error('react-auth0-spa.loginWithRedirect', e)
    } finally {
      setLoading(false)
    }
  }

  const loginWithRedirect = async (...params) => {
    blue('loginWithRedirect()')
    blue('params', params)
    try {
      const client = await getAuth0Client()
      await client.loginWithRedirect(...params)
    } catch (e) {
      /*
        you could switch to the sample code and see if you wrap it in a try/catch
        if the same error is reported.
        I really don't think it is coming from my code
      */
      // // console.error('react-auth0-spa.loginWithRedirect', e)
    }
  }

  const logout = async (...params) => {
    blue('logout')
    try {
      const client = await getAuth0Client()
      await client.logout(...params)
    } catch (e) {
      // console.error('react-auth0-spa.logout', e)
    }
>>>>>>> dev
  }

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
<<<<<<< HEAD
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        // getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        logout: (...p) => auth0Client.logout(...p)
=======
        // new
        loginWithRedirect,
        logout
        // old
        // loginWithRedirect: (...p) => auth0.loginWithRedirect(...p),
        // loginWithRedirect: (...p) => getAuth0Client.loginWithRedirect(...p),
        // getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        // logout: (...p) => auth0Client.logout(...p)
        // unused
        // getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        // getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
>>>>>>> dev
      }}
    >
      {children}
    </Auth0Context.Provider>
  )
}
