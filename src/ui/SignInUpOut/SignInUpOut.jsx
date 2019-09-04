import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useAuth0 } from 'react-auth0-spa'
import { setUser } from 'store/user/actions'
import { getUserId } from 'store/user/selectors'

// eslint-disable-next-line
import { green } from 'logger'

const styles = {
  wrapper: {
    display: 'flex'
  },
  button: {
    margin: '0 10px'
  }
}

const SignInUpOut = props => {
  const {
    isAuthenticated,
    logout,
    loginWithRedirect,
    user
  } = useAuth0()
  green('user', user)
  const { setUser } = props
  // green('typeof loginWithPopup', typeof loginWithPopup)
  // green('typeof logout', typeof logout)
  // green('typeof isAuthenticated', typeof isAuthenticated)
  // green('typeof isLoading', typeof isLoading)

  useEffect(() => {
    // TODO: this does nothing?
    const validateUser = async () => {
      // if (user) {
      //   green('is not loading')
      //   const { 'https://klequis-todo.tk/uuid': uid } = user
      //   setUser(uid)
      // } else {
      //   loginWithRedirect({})
      // }
      if (isAuthenticated) {
        const { 'https://klequis-todo.tk/uuid': uid } = user
        setUser(uid)
      }
    }
    validateUser()
  }, [user, setUser])

  

  

  return (
    <div>
      {!isAuthenticated && (
        <div>
          <h1>Welcome to your todos</h1>
          <h2>To see your todos ...</h2>
          <button style={styles.button} onClick={handleLoginClick}>
            Sign In
          </button>
        </div>
      )}
      {isAuthenticated && (
        <div>
          <button style={styles.button} onClick={handleLogoutClick}>
            Sign Out
          </button>
        </div>
      )}
    </div>
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
)(SignInUpOut)
