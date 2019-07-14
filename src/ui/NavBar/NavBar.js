import React from 'react'
import { useAuth0 } from 'react-auth0-spa'
import { Link } from 'react-router-dom'

// eslint-disable-next-line
import { green } from 'logger'



const styles = {
  wrapper: {
    display: 'flex',
  },
  button: {
    margin: '0 10px'
  }
}

function NavBar(props) {

  const {
    isAuthenticated,
    logout,
    isLoading,
    loginWithPopup
  } = useAuth0()
  green('typeof loginWithPopup', typeof loginWithPopup)
  green('typeof logout', typeof logout)
  green('typeof isAuthenticated', typeof isAuthenticated)
  green('typeof isLoading', typeof isLoading)


  const handleLogoutClick = () => {
    logout({
      returnTo: window.location.origin
    })
  }

  const handleLoginClick = () => {
    // loginWithRedirect({})
    loginWithPopup({})
  }


  return (
    <nav style={styles.wrapper}>
      <Link to="/">
        <button style={styles.button}>Home</button>
      </Link>
      <Link to="/todos">
        <button>Todos</button>
      </Link>
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
    </nav>
  )
}

export default NavBar
