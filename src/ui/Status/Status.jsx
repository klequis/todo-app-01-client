import React from 'react'
import { useAuth0 } from 'react-auth0-spa'
import { green } from 'logger'

const User = ({user}) => {

  if (!user) {
    return null
  }
  return (
    <div>
      nickname: {user.nickname}
      <br />
      user updated: {user.updated_at}
    </div>
  )
}

const Status = () => {
  const { isAuthenticated, user } = useAuth0()

  return (
    <div>
      <b>status</b>
      <br />
      <br />
      isAuthenticated: {isAuthenticated ? 'yes' : 'no'}
      <br />
      <User user={user} />
      <br />
    </div>
  )
}

export default Status
