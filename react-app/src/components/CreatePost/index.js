import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { thunkCreatePost } from '../../store/posts'

import './createpost.css'

export default function CreatePost() {
  const dispatch = useDispatch()
  const history = useHistory()

  const [errors, setErrors] = useState([])
  const [image, setImage] = useState(null)
  const [photoUrl, setPhotoUrl] = useState()
  const [caption , setCaption] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    const err = []
    if(!image) err.push("Must select a valid image. (e.g. jpg, jpeg, gif)")
    if(!image?.name.includes('jpg') && !(image?.name.includes('jpeg') && !image?.name.includes('png') && !image?.name.includes('gif'))){
      err.push("Please submit a valid ")
    }
    if(caption.length < 5 || caption.length > 100) err.push("Caption must be between 5 and  100 characters")
    setErrors(err)
  }, [image, caption])

  const handleSubmit = async(e) => {
    e.preventDefault();
    setSubmitted(true)
    if(errors.length) {
      return alert("Could not make your post!")
    }

    const formData = new FormData();
    formData.append('image', image)
    formData.append('caption', caption)

    const new_post = await dispatch(thunkCreatePost(formData))

    if(new_post){
      alert("Post was created")
      return history.push(`/${sessionUser.username}`)
    }
  }


  const updateCaption = async(e) => {
    setCaption(e.target.value)
  }

  const onCancel = async() => {
    return history.push('/')
  }

  const updateImage = async(e) => {
    const file = e.target.files[0]

    setImage(file)
    setPhotoUrl(URL.createObjectURL(file))
  }


  return (
    <div className='create-post-container'>
      <div className='creat-post-content'>
        {image ? (
            <img id="post-create-img"src={photoUrl} key={image} style={{width: 500, height: 500}} alt="image"></img>
          )
          :
            <div id="no-image-create"><i className="fa-solid fa-image fa-4x"></i></div>
        }
        <form className='create-post-form' onSubmit={handleSubmit}>
          <h1 id='create-post-header'>Create a new post</h1>
          <div>
            {submitted && errors.length > 0 && (
                  <div>
                    <div id="create-post-errors">
                      Please fix the following errors before submitting:
                    </div>
                    <ul>
                      {errors.map((error) => (
                        <ul id="create-errors" key={error}>
                          <i className="fas fa-spinner fa-spin" id="spinner"></i>
                          {error}
                        </ul>
                      ))}
                    </ul>
                  </div>
            )}
            <input
              type='file'
              className='choose-picture'
              onChange={updateImage}
            />
            {image && (
              <div className='caption-post-cancel'>
                <textarea
                  id="caption-input"
                  placeholder='Caption...'
                  onChange={updateCaption}
                  required
                />
                <div className='create-post-buttons'>
                  <button id="post-create" type='submit'>Post</button>
                  <button id="post-cancel" onClick={onCancel} type='cancel'>Cancel</button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
