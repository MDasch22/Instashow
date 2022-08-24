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
    if(caption.length < 5 || caption.length > 150) err.push("Caption must be between 5 and  150 characters")
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
    <div>
      <div className='edit-post-header'>
        <button onClick={setTrigger} id="hidden-edit">Cancel</button>
        <p id="edit-modal-header">Edit info</p>
        <button form='edit-post-form' id="submit-edit" type='submit'>Done</button>
      </div>

      <div className='edit-post-container'>
        <div>
          <img id="edit-post-img" src={post.image} style={{width: 500 ,height: 500}} alt='edit-image'></img>
        </div>
        <div className='edit-post-content'>
          <div className='edit-post-form'>
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
            <div className='edit-post-user-info'>
              <img id="edit-post-user-pp" src={post.owner.profile_pic} style={{width:40, height: 40}}></img>
              <p id="edit-post-user-username">{post.owner.username}</p>
            </div>
            <form id="edit-post-form" onSubmit={handleSubmit}>
              <textarea
                className='edit-caption'
                value={caption}
                placeholder={post.caption}
                onChange={updateCaption}
                required

              />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
