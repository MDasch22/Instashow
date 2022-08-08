import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkDeleteComment } from '../../store/comment'
import EditCommentForm from '../EditComment';

export default function Comments({postId, comment}) {
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user)

  const [showEditCommentForm, setShowEditCommentForm] = useState(false)



  return (
    <div>
      <div>
          <img src={comment.user.profile_pic} style={{width: 20 ,height: 20}} alt='comment-profile-pic'></img>
          <div>
            <div>{comment.user.username}</div>
          </div>
          {!showEditCommentForm ?
            <div>
              <>
                <div> {comment.comment} </div>
                {comment.user_id === sessionUser.id && (
                  <>
                    <button onClick={() => setShowEditCommentForm(true)}>Edit</button>
                    <button onClick={() => dispatch(thunkDeleteComment(comment.id))}>Delete</button>
                  </>
                )}

              </>
            </div>
            :
            <>
              <EditCommentForm postId={postId} currentComment={comment} closeForm={() => setShowEditCommentForm(false)}/>
            </>
          }
      </div>
    </div>
  )
}
