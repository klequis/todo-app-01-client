import React, { useState } from 'react'

// eslint-disable-next-line
import { green } from 'logger'

// import {
//   getUser,
//   isAuthenticated,
//   logout,
//   loginWithPopup
// } from 'react-auth0-spa'

import { useAuth0 } from 'react-auth0-spa'

const styles = {
  wrapper: {
    display: 'flex'
  }
}

function NavBar(props) {

  const [isOpen, setIsOpen] = useState(false)
  const { user, isAuthenticated, /*loginWithRedirect, */ logout, loginWithPopup } = useAuth0()
  const toggle = () => setIsOpen(!isOpen)

  green('isAuthenticated', isAuthenticated)

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
    <nav
      style={styles.wrapper}
      className="navbar navbar-dark bg-primary fixed-top"
    >
      <h3>nav bar</h3>
      {!isAuthenticated && (
        <button className="btn btn-dark" onClick={handleLoginClick}>
          Sign In
        </button>
      )}

      {isAuthenticated && (
        <div>
          {/* <img
            src={user.picture}
            alt="Profile"
            className="nav-user-profile"
          /> */}
          {/* <label className="mr-2 text-white">{user.nickname}</label> */}
          <button className="btn btn-dark" onClick={handleLogoutClick}>
            Sign Out
          </button>
        </div>
      )}
    </nav>
  )
}

export default NavBar
