import React from 'react'
import { NavLink } from 'react-router-dom'
import '../Following/followerModal.css'

export default function Followers({followers, closeModal}) {

  return (
    <div className='followers-modal-container'>
      <p id='followers-modal-title'>Followers</p>
      <div>
        {followers.length === 0 && (
          <p> No followers yet...</p>
        )}
      </div>
      <div>
        {followers.map(user => {
          return (
            <div id='modal-user-card'key={user.id}>
              <NavLink id='modal-user-link'to={`/${user.username}`} onClick={closeModal}>
                <img id='modal-profile_pic'src={user.profile_pic} style={{width:40, height:40}} alt="following-pic"></img>
                <div id='modal-user-info'>
                  <div id='modal-user-username'>{user.username}</div>
                  <div id='modal-user-fullname'>{user.name}</div>
                </div>
              </NavLink>
            </div>
            )
        })}
      </div>
    </div>
  )
}
