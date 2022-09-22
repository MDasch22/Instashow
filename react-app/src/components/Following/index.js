import React from 'react'
import { NavLink } from 'react-router-dom'
import './followerModal.css'

export default function Following({following, closeModal}) {
  return (
    <div className='followers-modal-container'>
      <p id='followers-modal-title'>Following</p>
      {following.length === 0 && (
        <p> Not following anyone yet...</p>
      )}
      <div className='follower-container'>
        {following.map(user => {
          return (
            <div id='modal-user-card' key={user.id}>
              <NavLink id='modal-user-link' to={`/${user.username}`} onClick={closeModal}>
                <img id='modal-profile_pic' src={user.profile_pic} style={{width:40, height:40}} alt="following-pic"></img>
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
