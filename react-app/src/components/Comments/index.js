import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkGetComments } from '../../store/comment';
import CreateCommentForm from '../CreateComment';
import { thunkDeleteComment } from '../../store/comment'

export default function Comments({postId}) {
  const dispatch = useDispatch();

  const comments = useSelector(state => Object.values(state.comment))
  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(thunkGetComments(postId))
  }, [dispatch, postId])


  return (
    <div>
      <div>
        {comments.map(comment => {
          return (
            <div>
              <img src={comment.user.profile_pic} style={{width: 20 ,height: 20}} alt='comment-profile-pic'></img>
              <div>{comment.user.username}</div>
              <div> {comment.comment} </div>
              {sessionUser.id === comment.user.id && (
                <>
                  <button>Edit</button>
                  <button onClick={() => dispatch(thunkDeleteComment(comment.id))}>Delete</button>
                </>
              )}
            </div>
        )}
        )}
      </div>
      <div>
        <CreateCommentForm postId={postId}/>
      </div>
    </div>
  )
}
