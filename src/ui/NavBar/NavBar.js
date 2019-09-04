import React from 'react'
import { Link } from 'react-router-dom'
import SignInUpOut from 'ui/SignInUpOut'
import { useAuth0 } from 'react-auth0-spa'

// eslint-disable-next-line
import { green } from 'logger'

const styles = {
  wrapper: {
    display: 'flex',
    backgroundColor: 'blue'
  },
  button: {
    margin: '0 10px'
  }
}

function NavBar(props) {

  const { isAuthenticated } = useAuth0()

  return (
    <nav style={styles.wrapper}>
      {/* <Link to="/">
        <button style={styles.button}>Home</button>
      </Link> */}
      {/* <Link to="/todos">
        <button>Todos</button>
      </Link> */}
      {
        !isAuthenticated
          ? <SignInUpOut />
          : <h1>HI</h1>
      }
      
    </nav>
  )
}

export default NavBar
