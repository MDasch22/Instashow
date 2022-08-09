import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Following({following, closeModal}) {
  return (
    <div>
      <p>Following</p>
      {following.length === 0 && (
        <p> Not following anyone yet...</p>
      )}
      {following.map(user => {
        return (
          <div key={user.id}>
            <NavLink to={`/${user.username}`} onClick={closeModal}>
              <img src={user.profile_pic} style={{width:30, height:30}} alt="following-pic"></img>
              <div>
                <div>{user.name}</div>
                <div>{user.username}</div>
              </div>
            </NavLink>
          </div>
          )
      })}
    </div>
  )
}
