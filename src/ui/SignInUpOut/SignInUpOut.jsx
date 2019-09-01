import React, { useEffect } from 'react'
<<<<<<< HEAD
import { useAuth0 } from 'react-auth0-spa'
=======
import { connect } from 'react-redux'
import { useAuth0 } from 'react-auth0-spa'
import { setUser } from 'store/user/actions'
import { getUserId } from 'store/user/selectors'

>>>>>>> dev
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

<<<<<<< HEAD
const SignInUpOut = () => {
  const { isAuthenticated, logout, loginWithRedirect, user } = useAuth0()

=======
const SignInUpOut = (props) => {
  const { isAuthenticated, logout, loginWithRedirect, user } = useAuth0()
  green('props', props)
  const { setUser } = props
>>>>>>> dev
  // green('typeof loginWithPopup', typeof loginWithPopup)
  // green('typeof logout', typeof logout)
  // green('typeof isAuthenticated', typeof isAuthenticated)
  // green('typeof isLoading', typeof isLoading)

<<<<<<< HEAD
=======

  useEffect(() => {
    // TODO: this does nothing?
    const validateUser = async () => {
      const uid = user['https://klequis-todo.tk/uuid']
      setUser(uid)
    }
    validateUser()
  }, [user, setUser])

>>>>>>> dev
  const handleLogoutClick = () => {
    logout({
      returnTo: window.location.origin
    })
  }

  const handleLoginClick = () => {
    loginWithRedirect({})
  }

<<<<<<< HEAD
  useEffect(() => {
    // TODO: this does nothing?
    const validateUser = async () => {

    }
    validateUser()
  }, [user])
=======
  
>>>>>>> dev
  
  green('SignInUpOut: user', user)
  return (
    <div>
      {!isAuthenticated && (
        <button style={styles.button} onClick={handleLoginClick}>
          Sign In
        </button>
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

<<<<<<< HEAD
export default SignInUpOut
=======
const mstp = state => {
  return {
    userId: getUserId(state)
  }
}

const actions = { setUser }
export default connect(mstp, actions)(SignInUpOut)
>>>>>>> dev
