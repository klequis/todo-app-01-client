import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useAuth0 } from 'react-auth0-spa'
import { setUser } from 'store/user/actions'
import { getUserId } from 'store/user/selectors'

const Login = ({ setUser }) => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0()

  useEffect(() => {
      if (isAuthenticated) {
        const { 'https://klequis-todo.tk/uuid': uid } = user
        setUser(uid)
      }
  }, [isAuthenticated, user, setUser])

  const handleLoginClick = () => {
    loginWithRedirect({})
  }
  const handleLogoutClick = () => {
    logout({
      returnTo: window.location.origin
    })
  }
  return (
    <>
      {isAuthenticated ? (
        <div>
          <button onClick={handleLogoutClick}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Welcome to your todos</h1>
          <h2>To see your todos ...</h2>
          <button onClick={handleLoginClick}>Login</button>
        </div>
      )}
    </>
  )
}

const mstp = state => {
  return {
    userId: getUserId(state)
  }
}

const actions = { setUser }

export default connect(
  mstp,
  actions
)(Login)

