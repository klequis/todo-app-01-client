import React from 'react'
import { useAuth0 } from 'react-auth0-spa'

const Status = () => {
  const { 
    isAuthenticated,
  } = useAuth0
  return (
    <div>
      <b>status</b>
      <br />
      <br />
      isAuthenticated: {isAuthenticated ? 'yes' : 'no'}
      <br />
    </div>
  )
}

export default Status