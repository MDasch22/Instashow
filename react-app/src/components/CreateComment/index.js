import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { thunkCreateComment } from '../../store/posts'


export default function CreateCommentForm({postId}) {
  const dispatch = useDispatch()

  const [comment, setComment] = useState('')

  const onSubmit = async(e) => {
    e.preventDefault()

    const new_comment = comment;
    console.log("this is the new comment:  ", new_comment)
    console.log(postId)
    const created_comment = await dispatch(thunkCreateComment(postId, new_comment))


    if(created_comment){
      setComment('');
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."

        />
        <button type='submit'>Post</button>
      </form>

    </div>
  )
}
