import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { thunkCreatePost } from '../../store/posts'

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
    if(caption.length < 5) err.push("Caption must be at least 5 characters")
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
    const errors = []
    const file = e.target.files[0]
    if(!file?.name.includes('jpg') && !file?.name.includes('jpeg') && !file?.name.includes('png')){
      errors.push('Please enter a valid filetype: "jpg", "jpeg", and "png"')
    }
    if (errors.length){
      setErrors(errors)
    }
    setImage(file)
    setPhotoUrl(URL.createObjectURL(file))
  }


  return (
    <div>
      <h1>Create a new post</h1>
      <form onSubmit={handleSubmit}>
        <div>
        {submitted && errors.length > 0 && (
              <div>
                <div >
                  Please fix the following errors before submitting:
                </div>
                <ul>
                  {errors.map((error) => (
                    <ul key={error}>
                      <i className="fas fa-spinner fa-spin" id="spinner"></i>
                      {error}
                    </ul>
                  ))}
                </ul>
              </div>
        )}
        </div>
        <input
          type='file'
          onChange={updateImage}
        />
        <textarea
          placeholder='Caption...'
          onChange={updateCaption}
          required
        />
        <button type='submit'>Post</button>
      </form>
      <button onClick={onCancel} type='cancel'>Cancel</button>
      {image && (
        <>
          <img src={photoUrl} key={image} style={{width: 400, height: 300}} alt="image"></img>
        </>
      )}
    </div>
  )
}
