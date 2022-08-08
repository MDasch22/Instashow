import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { thunkEditComment } from '../../store/comment'

export default function EditCommentForm({ postId ,currentComment, closeForm}) {
  const dispatch = useDispatch()

  const [comment , setComment ] = useState(currentComment.comment)

  const commentId = currentComment.id


  const onSubmit = async(e) => {
    e.preventDefault()

    const updateComment = await dispatch(thunkEditComment(commentId, comment))

    if(updateComment) {
      closeForm()
    }
  }

  return (

    <div>
      <form onSubmit={onSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Edit your comment..."
        />
        <button type='submit'>Done</button>
        <button onClick={() => closeForm()}>Cancel</button>
      </form>
    </div>
  )
}
