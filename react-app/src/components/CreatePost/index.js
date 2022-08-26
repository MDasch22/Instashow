import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { thunkCreatePost } from '../../store/posts'
import Picker from 'emoji-picker-react'

import './createpost.css'

export default function CreatePost({setTrigger}) {
  const dispatch = useDispatch()
  const history = useHistory()

  const [showPicker, setShowPicker] = useState(false)
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

  useEffect(() => {
    const closeEmoji = (e) => {
      if(e.path[0].tagName !== "I" && e.path[0].tagName !== "BUTTON" && e.path[0].tagName !== "INPUT"){
        setShowPicker(false)
      }
    }
    document.body.addEventListener("click", closeEmoji)
    return () => document.body.removeEventListener('click', closeEmoji)
  }, [])

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

  const emojiClick = (e, emojiObj) => {
    if(emojiObj.emoji.length){
      setCaption(caption => caption + emojiObj.emoji);
      setShowPicker(false)
    } else {
      setShowPicker(true)
    }
  }

  const openShow = (e) => {
    setShowPicker(!showPicker)
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
                        />
                        <div className='create-edit-caption'>
                          <label id="emoji-icon-edit-post" onClick={openShow}> <i class="fa-regular fa-face-smile fa-xl"></i> </label>
                          {showPicker &&
                            <div id="create-edit-picker">
                              <Picker onClick={showPicker} pickerStyle={{width: '17rem' , height: '15rem'}} onEmojiClick={emojiClick} />
                            </div>
                          }
                        </div>
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
                <label for="choosepicture2" id="no-image-create">
                  <svg aria-label="Icon to represent media such as images or videos" class="_ab6-" color="#262626" fill="#262626" height="80" role="img" viewBox="0 0 97.6 77.3" width="100">
                    <path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path>
                    <path d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path>
                    <path d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path>
                  </svg>
                </label>
                <label id="select-picture" for="choosepicture2">Select from computer</label>
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
