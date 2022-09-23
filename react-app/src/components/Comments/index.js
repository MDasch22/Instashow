import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { thunkDeleteComment } from '../../store/comment'
import CommentTime from '../CommentTime';
import EditCommentForm from '../EditComment';
import PostTime from '../PostTime';

import './comment.css'

export default function Comments({postId, comment}) {
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user)

  const [showEditCommentForm, setShowEditCommentForm] = useState(false)



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
              <EditCommentForm postId={postId} currentComment={comment} closeForm={() => setShowEditCommentForm(false)}/>
            }
            <div>
              {!showEditCommentForm ?
                <div className='comment-update'>
                  <CommentTime comment={comment}/>
                  {comment.user_id === sessionUser.id && (
                    <div className='edit-delete-button'>
                      <button id='comment-edit' onClick={() => setShowEditCommentForm(true)}> Edit </button>
                      <button id='comment-delete' onClick={() => dispatch(thunkDeleteComment(comment.id))}>Delete</button>
                    </div>
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
