import React /*, { useState }*/ from 'react'
import { useAuth0 } from 'react-auth0-spa'

// eslint-disable-next-line
import { green } from 'logger'



const styles = {
  wrapper: {
    display: 'flex'
  }
}

function NavBar(props) {

  green('NavBar')
  
  // const [isOpen, setIsOpen] = useState(false)
  const { /*user,*/ isAuthenticated, loginWithRedirect, logout } = useAuth0()
  // const toggle = () => setIsOpen(!isOpen)

  

  const handleLogoutClick = () => {
    logout({
      returnTo: window.location.origin
    })
  }

  const handleLoginClick = () => {
    loginWithRedirect({})
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
