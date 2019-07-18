import React from 'react'
import { useAuth0 } from 'react-auth0-spa'
import { version } from '../../../package.json'

const User = ({user}) => {

  if (!user) {
    return null
  }
  return (
    <div>
      nickname: {user.nickname}
      <br />
      user updated: {user.updated_at}
      <br />
      app version: {version}
      <br />
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
