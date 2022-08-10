import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkDeleteComment } from '../../store/comment'
import EditCommentForm from '../EditComment';

import './comment.css'

export default function Comments({postId, comment}) {
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user)

  const [showEditCommentForm, setShowEditCommentForm] = useState(false)



  return (

      <div className='single-comment'>
        <div className='single-comment-username'>
          <img id='single-comment-profilePic' src={comment.user.profile_pic} style={{width: 30 ,height: 30}} alt='comment-profile-pic'></img>
          <div id='single-comment-name'>{comment.user.username}</div>
        </div>
        <div className='single-comment-edit'>
        {!showEditCommentForm ?
          <div className='single-comment-edit'>
            <div className="user-comments">
              <p className='user-single-comment'>{comment.comment}</p>
            </div>
          </div>
          :
          <EditCommentForm postId={postId} currentComment={comment} closeForm={() => setShowEditCommentForm(false)}/>
        }
        </div>
        {!showEditCommentForm ?
        <div className='comment-update'>
          {comment.user_id === sessionUser.id && (
            <div className='edit-delete-button'>
              <button id='comment-edit' onClick={() => setShowEditCommentForm(true)}> <i className="fa-solid fa-pen-to-square fa-lg"></i> </button>
              <button id='comment-delete' onClick={() => dispatch(thunkDeleteComment(comment.id))}><i class="fa-solid fa-x fa-lg"></i></button>
            </div>
          )}
        </div>
        :
        null
      }
      </div>
  )
}
