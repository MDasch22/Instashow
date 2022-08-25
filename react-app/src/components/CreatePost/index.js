import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { thunkCreatePost } from '../../store/posts'

import './createpost.css'

export default function CreatePost({setTrigger}) {
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
    if(!image) err.push("No image was selected ")
    if(!image?.type.includes('png') && !image?.type.includes('jpg') && !(image?.type.includes('jpeg'))){
      err.push("Please submit a valid file type.(e.g. 'png', 'jpg', 'jpeg' ) ")
    }
    const whiteSpace = caption.replace(/^>s+/, '').replace(/\s+$/, '')
    if( whiteSpace === '') {
      err.push('Please enter a valid caption')
    }
    if(caption.length < 5 || caption.length > 150) err.push("Caption must be between 5 and  100 characters")
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
      setTrigger()
      return history.push(`/${sessionUser.username}`)
    }
  }


  const updateCaption = async(e) => {
    setCaption(e.target.value)
  }

  const updateImage = async(e) => {
    const file = e.target.files[0]

    setImage(file)
    setPhotoUrl(URL.createObjectURL(file))
  }


  return (
    <div className='create-post-container'>
      <div className="create-header">
        <button className="header-button"onClick={setTrigger}>Cancel</button>
        <h1 id='create-post-header'>Create a new post</h1>
        {image ?
          <button className="header-button-submit" form='create-post-form'>Submit</button>
          :
          <button className="header-button-submitDs" disabled={true}>Submit</button>
        }
      </div>
      <div className='creat-post-content'>
        {image ? (
              <div className='flex-edit-container'>
                <img id="post-create-img"src={photoUrl} key={image} style={{width: 500, height: 500}} alt="post-image"></img>
                <form id='create-post-form' onSubmit={handleSubmit}>
                  <div className='create-form-post-header'>
                    {submitted && errors.length > 0 && (
                      <div className='create-post-error-container'>
                        <div id="create-post-errors">
                          Please fix the following errors before submitting:
                        </div>
                        <ul >
                          {errors.map((error) => (
                            <ul id="create-errors" key={error}>
                              <i className="fas fa-spinner fa-spin" id="spinner"></i>
                              {error}
                            </ul>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className='form-input-create-post'>
                    <div className='image-selector-post'>
                      <label id='image-selector-button' for="choosepicture" >Select a different photo</label>
                      <input
                        type='file'
                        id='choosepicture'
                        onChange={updateImage}
                        visability="hidden"
                      />
                    </div>
                    {image && (
                      <div className='caption-post-cancel'>
                        <textarea
                          id="caption-input"
                          placeholder='Caption...'
                          onChange={updateCaption}
                          required
                          maxLength={150}
                        />
                        <div className={caption.length >= 140 ? "red" : "normal"}>
                          <p>{caption.length} / 150</p>
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              </div>
          )
          :
            <>
              <div id="no-image-yet">
                <label for="choosepicture2" id="no-image-create"><i className="fa-solid fa-images fa-4x"></i></label>
                <label id="select-picture" for="choosepicture2"> Click here to select a picture</label>
              </div>
              <input
              type='file'
              id='choosepicture2'
              visability="hidden"
              onChange={updateImage}
               />
            </>
        }
      </div>
    </div>
  )
}
