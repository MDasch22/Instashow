import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { thunkEditPost, thunkGetSinglePost, thunkLoadAllPosts } from '../../store/posts';

export default function EditPost() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { post_id } = useParams()

  const post = useSelector(state => state.post[post_id])

  const [errors, setErrors] = useState([])
  const [caption, setCaption] = useState(post.caption)
  const [isSubmitted , setIsSubmitted] = useState(false)


  useEffect(() => {
    dispatch(thunkGetSinglePost(post_id))
  },[dispatch])

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsSubmitted(true);
    let errors = []
    if(caption.length < 5) {
      errors.push("Please provide caption with at least 5 characters")
    }
    setErrors(errors)

    if(errors.length) return alert("Cannot edit the snack")

    const edited_post = await dispatch(thunkEditPost(post_id, caption))

    if(edited_post) {
      alert ("Post was edited")
      return history.push('/')
    }

  }
  const cancel =() => {
    history.push(`/${post.ownerUsername}`)
  }

  const updateCaption = async(e) => {
     setCaption(e.target.value)
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
        <button type='submit'>Edit Post</button>
        <button onClick={cancel}>Cancel</button>

      </form>
    </div>
  )
}
