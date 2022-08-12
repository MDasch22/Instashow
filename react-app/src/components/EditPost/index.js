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

  useEffect(() => {
    const err = []
    const whiteSpace = caption.replace(/^>s+/, '').replace(/\s+$/, '')
    if( whiteSpace === '') {
      err.push('Please enter a valid caption')
    }
    if(caption.length < 5 || caption.length > 100) err.push("Caption must be between 5 and  100 characters")
    setErrors(err)
  }, [caption])



  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

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
      <div>
       <img id="edit-post-img" src={post.image} style={{width: 500 ,height: 500}} alt='edit-image'></img>
      </div>
      <div className='edit-post-content'>
        <div className='edit-post-form'>
          <h1 id="edit-modal-header">Edit Post</h1>
          {isSubmitted && errors.length > 0 && (
            <div>
              <div id="errorHeading">
                Please fix the following submitting:
              </div>
              <ul>
                {errors.map((error) => (
                  <ul key={error} id="edit-error">
                    <i className="fas fa-spinner fa-spin" id="spinner"> </i>
                    {error}
                  </ul>
                ))}
              </ul>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <textarea
              className='edit-caption'
              value={caption}
              placeholder={post.caption}
              onChange={updateCaption}
              required

            />
          <div className='edit-form-bttns'>
            <button id="edit-submit" type='submit'>Finished</button>
            <button id="edit-delete" onClick={onDelete}>Delete Post</button>
          </div>
          </form>
        </div>
      </div>
    </div>
  )
}
