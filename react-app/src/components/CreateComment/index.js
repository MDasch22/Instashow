import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkCreateComment } from '../../store/comment'


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
    <div>
      <form onSubmit={onSubmit}>
        <div>
          {errors.length ? errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          )) :  (
              <></>
            )
          }
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          required

        />
        <button type='submit'>Post</button>
      </form>

    </div>
  )
}
