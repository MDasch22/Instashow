import React from 'react'
import { NavLink } from 'react-router-dom'

export default function LikesOnPostModal({likes}) {

  console.log(likes)

  return (
    <div id="likes-modal-container">
      <p className='modal-header-likes'>Likes</p>
      <div id="liked-users-container">
        {likes.map(like => {
          return (
            <div className='liked-user-info'>
              <NavLink to={`/${like.username}`}>
                <img className='liked-user-pic' src={like.profile_pic}  style={{width:45, height:45}}></img>
              </NavLink>
              <div id="liked-by-userinfo">
                <NavLink to={`/${like.username}`} className="like-username-link">
                  <p className='liked-username'>{like.username}</p>
                </NavLink>
                <p className='liked-name'>{like.name}</p>
              </div>
            </div>
            )
        })}
      </div>
    </div>
  )
}
