import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { thunkEditPost, thunkDeletePost } from '../../store/posts';
import './editpost.css'

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
    if(caption.length > 50) {
      errors.push("Caption cannot be greater than 50 characters")
    }
    setErrors(errors)

    if(errors.length) return

    const edited_post = dispatch(thunkEditPost(post_id, caption))

    if(edited_post) {
      setTrigger(false)
      return history.push(`/post/${post.id}`)
    }

  }

  const updateCaption = (e) => {
     setCaption(e.target.value)
  }

  const onDelete = async(e) => {
    await dispatch(thunkDeletePost(post_id))
    history.push(`/${sessionUser.username}`)
  }


  if(!post) return null

  return (
    <div className='edit-post-container'>
      <img id="edit-post-img" src={post.image} style={{width: 420 ,height: 420}} alt='edit-image'></img>
      <div className='edit-post-content'>
        <h1>Edit Post</h1>
        {isSubmitted && errors.length > 0 && (
            <div>
              <div>
                Please fix the following errors before submitting:
              </div>
              <ul>
                {errors.map((error) => (
                  <ul key={error} id="error">
                    <i className="fas fa-spinner fa-spin" id="spinner"></i>
                    {error}
                  </ul>
                ))}
              </ul>
            </div>
          )}
        <form onSubmit={handleSubmit}>
          <textarea
            value={caption}
            placeholder={post.caption}
            onChange={updateCaption}
            required

          />
        <div>
          <button type='submit'>Finished</button>
          <button onClick={onDelete}>Delete</button>
        </div>
        </form>
      </div>
    </div>
  )
}
