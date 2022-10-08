import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { thunkDeleteComment } from '../../store/comment'
import CommentTime from '../CommentTime';
import EditCommentForm from '../EditComment';
import Modal from 'react-modal'


import './comment.css'

export default function Comments({postId, comment}) {
  const dispatch = useDispatch();

  Modal.setAppElement('body');

  const sessionUser = useSelector(state => state.session.user)

  const [showEditCommentForm, setShowEditCommentForm] = useState(false)
  const [showModal , setShowModal] = useState(false)

  const closeForm = () => {
    setShowEditCommentForm(false)
    setShowModal(false)
  }

  useEffect(() => {
      const closeModal = (e) => {
        if(e.path[0].tagName !== 'I'  ){
          setShowModal(false)
        }
      }
      document.body.addEventListener("click", closeModal)
      return () => document.body.removeEventListener("click", closeModal)

  }, [showModal])

  const formStyles2 = {
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
      zIndex: 12,
      backgroundColor: 'rgba(34, 34, 34, 0.65)'
    },
    content: {
      position: 'relative',
      margin: 'auto',
      maxWidth: '300px',
      width: '300px',
      top: '350px',
      height: '100px' ,
      left: '40px',
      right: '40px',
      bottom: '40px',
      border: '1px solid #ccc',
      background: '#fff',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '5px',
      outline: 'none',
      overflow: 'visibile'
    }
};


  return (

      <div className='single-comment'>
        <span id="single-comment-container">
          <NavLink to={`/${comment.user.username}`} className='single-comment-username'>
            <img id='single-comment-profilePic' src={comment.user.profile_pic} style={{width: 32 ,height: 32}} alt='comment-profile-pic'></img>
            <div id='single-comment-name'>{comment.user.username}</div>
          </NavLink>
          <div className='single-comment-edit'>
            {!showEditCommentForm ?
                <p className='user-single-comment'>{comment.comment}</p>
              :
              <EditCommentForm postId={postId} currentComment={comment} closeForm={closeForm}/>
            }
            <div>
              {!showEditCommentForm ?
                <div className='comment-update'>
                  <CommentTime comment={comment}/>
                  {comment.user_id === sessionUser.id && (
                  <>
                    <button id="show-comment-modal" onClick={() => setShowModal(!showModal)}> <i className="fa-solid fa-ellipsis"></i> </button>
                    <Modal isOpen={showModal} className='edit-delete-button' style={formStyles2}>
                      <button id='comment-delete' onClick={() => dispatch(thunkDeleteComment(comment.id))}>Delete</button>
                      <button id='comment-edit' onClick={() => setShowEditCommentForm(true)}> Edit </button>
                    </Modal>
                  </>
                  )}
                </div>
                :
                null
              }
            </div>
          </div>
        </span>
      </div>
  )
}
