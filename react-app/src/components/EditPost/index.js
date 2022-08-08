import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { thunkEditPost, thunkDeletePost } from '../../store/posts';

export default function EditPost({setTrigger}) {
  const dispatch = useDispatch()
  const history = useHistory()
  const { post_id } = useParams()

  const post = useSelector(state => state.post[post_id])
  const sessionUser = useSelector(state => state.session.user)
  const user = useSelector(state => state.user[post.ownerUsername])

  const [errors, setErrors] = useState([])
  const [caption, setCaption] = useState(post.caption)
  const [isSubmitted , setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    let errors = []
    if(caption.length < 5) {
      errors.push("Please provide caption with at least 5 characters")
    }
    setErrors(errors)

    if(errors.length) return alert("Cannot edit the snack")

    const edited_post = dispatch(thunkEditPost(post_id, caption))

    if(edited_post) {
      setTrigger(false)
      return history.push(`/post/${post.id}`)
    }

  }

  const updateCaption = (e) => {
     setCaption(e.target.value)
  }

  const onDelete = (e) => {
    dispatch(thunkDeletePost(post_id))
    history.push(`/${sessionUser.username}`)
  }


  if(!post) return null

  return (
    <div>
      <h1>Edit Post</h1>
      <img src={post.image} style={{width: 400 ,height: 400}} alt='edit-image'></img>
      <form onSubmit={handleSubmit}>
        <div>
          {errors && errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <textarea
          value={caption}
          placeholder={post.caption}
          onChange={updateCaption}
          required

        />
        <button type='submit'>Finished</button>
        <button onClick={onDelete}>Delete</button>

      </form>
    </div>
  )
}
