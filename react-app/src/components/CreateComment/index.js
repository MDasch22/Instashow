import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkCreateComment } from '../../store/comment'

import './createcomment.css'


export default function CreateCommentForm({postId}) {
  const dispatch = useDispatch()

  const sessionUser = useSelector(state => state.session.user)

  const [errors , setErrors] = useState([])
  const [comment, setComment] = useState('')


  const onSubmit = async(e) => {
    e.preventDefault()
    const data = {
      user_id: sessionUser.id,
      post_id: postId,
      comment: comment
    }
    const created_comment = await dispatch(thunkCreateComment(postId, data))
    console.log(created_comment)
    if(created_comment){
      setErrors(created_comment)
      setComment('');
    }
  }

  return (
    <div className='create-comment-container'>
      <div>
        {errors.length ? errors.map((error, ind) => (
          <p id='error-comments' key={ind}>{error}</p>
        )) :  (
            null
          )
        }
      </div>
      <form className='create-comment' onSubmit={onSubmit}>
        <textarea
          className='comment-input'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          required

        />
        <div>
         <button className="post-button"type='submit'>Post</button>
        </div>
      </form>

    </div>
  )
}
