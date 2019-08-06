import React from 'react'
import { Link } from 'react-router-dom'
import SignInUpOut from 'ui/SignInUpOut'

const styles = {
  wrapper: {
    display: 'flex',
  },
  button: {
    margin: '0 10px'
  }
}

function NavBar(props) {
  return (
    <nav style={styles.wrapper}>
      <Link to="/">
        <button style={styles.button}>Home</button>
      </Link>
      <Link to="/todos">
        <button>Todos</button>
      </Link>
      <SignInUpOut />
    </nav>
  )
}

export default NavBar
