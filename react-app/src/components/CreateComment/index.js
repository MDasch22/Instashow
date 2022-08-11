import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkCreateComment, thunkGetComments } from '../../store/comment'

import './createcomment.css'


export default function CreateCommentForm({postId}) {
  const dispatch = useDispatch()

  const sessionUser = useSelector(state => state.session.user)

  const [errors , setErrors] = useState([])
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)

  let com = comment

  useEffect(() => {
    const errs = []
    if(com.length > 50 || com.length < 5) errs.push("Comment must be between 5-50 characters")
    setErrors(errs)
  },[com])

  const onSubmit = async(e) => {
    e.preventDefault()
    setSubmitted(true)

    if(errors.length) return

    const data = {
      user_id: sessionUser.id,
      post_id: postId,
      comment: comment
    }
   await dispatch(thunkCreateComment(postId, data))
    // console.log(created_comment)
    // if(created_comment){
    //   setErrors(created_comment)
    //   setComment('');
    // }
  }

  return (
    <div className='create-comment-container'>
      <div>
        {submitted && errors.map((error, ind) => (
          <p id='error-comments' key={ind}>{error}</p>
          )
        )}
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
