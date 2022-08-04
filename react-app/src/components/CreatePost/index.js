import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { thunkCreatePost } from '../../store/posts'

export default function CreatePost() {
  const dispatch = useDispatch()
  const history = useHistory()

  const [errors, setErrors] = useState([])
  const [image, setImage] = useState(null)
  const [photoUrl, setPhotoUrl] = useState()
  const [caption , setCaption] = useState('')


  const handleSubmit = async(e) => {
    e.preventDefault();
    const errors = [];
    const formData = new FormData();
    formData.append('image', image)
    formData.append('caption', caption)

    const new_post = await dispatch(thunkCreatePost(formData))

    if(new_post){
      alert("Post was created")
      return history.push('/')
    }
  }


  const updateCaption = async(e) => {
    setCaption(e.target.value)
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
          {errors && errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <input
          type='file'
          onChange={updateImage}
        />
        <textarea
          placeholder='Caption...'
          onChange={updateCaption}
        />
        <button type='submit'>Post</button>
      </form>
      {image && (
        <>
          <img src={photoUrl} key={image} style={{width: 400, height: 300}} alt="image"></img>
        </>
      )}
    </div>
  )
}
