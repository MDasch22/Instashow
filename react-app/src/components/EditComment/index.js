import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import { thunkEditComment } from '../../store/comment'

import './editcomment.css'

export default function EditCommentForm({ postId ,currentComment, closeForm}) {
  const dispatch = useDispatch()

  const [comment , setComment ] = useState(currentComment.comment)
  const [errors , setErrors] = useState([])
  const [submited , setSubmitted] = useState(false)

  const commentId = currentComment.id

  useEffect(() => {
    const errs = []
    const whiteSpace = comment.replace(/^>s+/, '').replace(/\s+$/, '')
    if( whiteSpace === '') {
      errs.push('Please enter a valid comment')
    }
    if(comment.length > 150) errs.push("Comment must not exceed 150 characters")
    setErrors(errs)
  },[comment])

  const onSubmit = async(e) => {
    e.preventDefault()
    setSubmitted(true)

    if(errors.length) return

    const updateComment = await dispatch(thunkEditComment(commentId, comment))

    if(updateComment) {
      closeForm()
    }
  }

  return (

    <div className='edit-comment-form'>
      <div >
        {submited && errors.map((error, ind) => (
          <p id='error-edit-comments' key={ind}> * {error}</p>
          )
        )}
      </div>
      <form className='edit-form-comment' onSubmit={onSubmit}>
        <textarea
          id='edit-comment-input'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Edit your comment..."
          required
        />
      <div className='edit-comment-buttons'>
        <button id="done-edit" type='submit'>Done</button>
        <button id="cancel-edit-comment" onClick={() => closeForm()}>Cancel</button>
      </div>
      </form>
    </div>
  )
}
