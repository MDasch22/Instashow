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

  useEffect(() => {
    const errs = []
    const whiteSpace = comment.replace(/^>s+/, '').replace(/\s+$/, '')
    if( whiteSpace === '') {
      errs.push('Please enter a valid comment')
    }
    if(comment.length > 150) errs.push("Comment must not exceed 150 characters")
    setErrors(errs)
  },[comment])

  const onSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)

    if(errors.length) return

    const data = {
      user_id: sessionUser.id,
      post_id: postId,
      comment: comment
    }

    dispatch(thunkCreateComment(postId, data))
    reset()
  }

  const reset = () => {
    setComment('')
    setErrors([])
  }

  return (
    <div className='create-comment-container'>
      <div>
        {submitted && errors.map((error, ind) => (
          <p id='error-comments' key={ind}> * {error}</p>
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
