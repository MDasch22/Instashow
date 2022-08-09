import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Followers({followers, closeModal}) {

  return (
    <div>
      <p>Followers</p>
        {followers.length === 0 && (
          <p> No followers yet...</p>
        )}
        {followers.map(user => {
          return (
            <div key={user.id}>
              <NavLink to={`/${user.username}`} onClick={closeModal}>
                <img src={user.profile_pic} style={{width:30, height:30}} alt="following-pic"></img>
                <div>
                  <div>{user.username}</div>
                  <div>{user.name}</div>
                </div>
              </NavLink>
            </div>
            )
        })}
    </div>
  )
}
