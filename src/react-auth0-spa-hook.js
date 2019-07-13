import React, { useState, useEffect, useContext } from 'react'
import createAuth0Client from '@auth0/auth0-spa-js'
import { green } from 'logger'
import { isEmpty } from 'ramda'

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname)

export const Auth0Context = React.createContext()
export const useAuth0 = () => useContext(Auth0Context)

let _initOptions

// THIS NEEDS TO BE A PROMISE !!
// const auth0Client = async (initOptions) => {
//   let client
//   if (!client) {
//     try {
//       client = await createAuth0Client(initOptions)
//       console.log('client', client)
//     } catch (e) {
//       throw new Error('Unable to connect to Auth0')
//     }
//   }
  
  
//   return client
// }



const getAuth0Client = () => {
  green('** getAuth0Client: initOptions', _initOptions)
  
  return new Promise(async (resolve, reject) => {
    let client
    if (!client)  {
      try {
        client = await createAuth0Client(_initOptions)
        // green('client', client)
        // console.log('client', client)
        resolve(client)
      } catch (e) {
        reject(new Error('getAuth0Client Error', e))
      }
    }
  })
}

// export const getTokenSilently = (...p) => getAuth0Client.getTokenSilently(...p)

export const getTokenSilently = async (...p) => {
  const client = await getAuth0Client()
  return await client.getTokenSilently(...p)
}
export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState()
  const [user, setUser] = useState()
  const [auth0Client, setAuth0] = useState()
  const [loading, setLoading] = useState(true)
  const [popupOpen, setPopupOpen] = useState(false)

  useEffect(() => {
    const initAuth0 = async () => {
      _initOptions = initOptions
      const client = await getAuth0Client(initOptions)
      setAuth0(client)
      if (window.location.search.includes('code=')) {
        // const { appState } = await auth0FromHook.handleRedirectCallback()
        const {
          appState
        } = await client.handleRedirectCallback()
        onRedirectCallback(appState)
      }
      const isAuthenticated = await client.isAuthenticated()
      setIsAuthenticated(isAuthenticated)

      if (isAuthenticated) {
        const user = await client.getUser()
        setUser(user)
      }

      setLoading(false)
    }
    initAuth0()
    // eslint-disable-next-line
  }, [])

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true)
    try {
      await auth0Client.loginWithPopup(params)
    } catch (error) {
      console.error(error)
    } finally {
      setPopupOpen(false)
    }
    const user = await auth0Client.getUser()
    setUser(user)
    setIsAuthenticated(true)
  }

  const handleRedirectCallback = async () => {
    setLoading(true)
    await auth0Client.handleRedirectCallback()
    const user = await auth0Client.getUser()
    setLoading(false)
    setIsAuthenticated(true)
    setUser(user)
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
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        logout: (...p) => auth0Client.logout(...p)
      }}
    >
      {children}
    </Auth0Context.Provider>
  )
}
