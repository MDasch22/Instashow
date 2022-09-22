import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Modal from 'react-modal'
import LikesOnPostModal from './likesOnPostModal'
import './likesOnPost.css'

export default function LikesOnPost({likes}) {

  console.log(likes)

  const [showLikes, setShowLikes] = useState(false)

  function openCloseLikes() {
    setShowLikes(!showLikes)

  }

  const formStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      minHeight: '100%',
      padding: '12px',
      zIndex: '5',
      backgroundColor: 'rgba(34, 34, 34, 0.65)',
      overflowY: 'hidden'
    },
    content: {
      position: 'relative',
      margin: 'auto',
      height: 'auto',
      maxWidth: '500px',
      width: '400px',
      top: '300px',
      left: '40px',
      right: '40px',
      bottom: '40px',
      border: '1px solid #ccc',
      background: '#fff',
      borderRadius: '10px',
      outline: 'none',
      padding: '0',
      overflow: 'auto',

    }
};


  Modal.setAppElement('body')

  return (
    <div>
      {likes.length === 0 ?
        <div className='hidden'> no likes yet </div>
        :
        <p>{likes.length === 1 ?
              <div className='liked-by-container'>
                <img id='liked-by-pic' src={likes[0].profile_pic} style={{height:20, width: 20}}></img>
                <p id='liked-by-usernames'>
                  Liked by
                  <NavLink id="like-by-link" to={`/${likes[0].username}`}>
                    {likes[0].username}
                  </NavLink>
                </p>
              </div>
            :
              <div>
                {likes.length === 2 ?
                  <div className='liked-by-container'>
                    <img id='liked-by-pic' src={likes[0].profile_pic} style={{height:20, width: 20}}></img>
                    <div id='overlapping-pic'>
                      <img id='overlapping-by-pic' src={likes[1].profile_pic} style={{height:20, width: 20}}></img>
                    </div>
                    <p id='liked-by-usernames'>
                      Liked by
                      <NavLink id="like-by-link" to={`/${likes[0].username}`}>
                        {likes[0].username}
                      </NavLink>
                      and
                      <p id="liked-by-modal" onClick={openCloseLikes}>1 other</p>
                      <Modal isOpen={showLikes} style={formStyles}>
                      <button id="close-modal-likes" onClick={openCloseLikes}><i className="fa-solid fa-xmark fa-lg"></i></button>
                        <LikesOnPostModal likes={likes} />
                      </Modal>
                    </p>
                  </div >
                  :
                  <div className='liked-by-container'>
                    <img id='liked-by-pic' src={likes[0].profile_pic} style={{height:20, width: 20}}></img>
                    <div id='overlapping-pic'>
                      <img id='overlapping-by-pic' src={likes[1].profile_pic} style={{height:20, width: 20}}></img>
                    </div>
                    <p id='liked-by-usernames'>
                      Liked by
                      <NavLink id="like-by-link" to={`/${likes[0].username}`}>
                        {likes[0].username}
                      </NavLink>
                      and
                      <p id="liked-by-modal" onClick={openCloseLikes}> {likes.length - 1} others</p>
                      <Modal isOpen={showLikes} style={formStyles}>
                      <button id="close-modal-likes" onClick={openCloseLikes}><i className="fa-solid fa-xmark fa-lg"></i></button>
                        <LikesOnPostModal likes={likes} />
                      </Modal>
                    </p>
                  </div>
                }
              </div>
            }
        </p>
      }
    </div>
  )
}
