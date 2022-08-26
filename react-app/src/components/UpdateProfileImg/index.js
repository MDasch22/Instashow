import React, { useEffect, useState }from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../../store/session'
import userReducer from '../../store/user'

import './updateProfilepic.css'


export default function UpdateProfileImg({id}) {
  const dispatch = useDispatch()

  const [errors , setErrors] = useState([])
  const [image, setImage] = useState(null);
  const [ submitted , setSubmitted] = useState(false)
  // const [imageLoading, setImageLoading] = useState(false)

  const onSubmit = async(e) => {
    e.preventDefault()
    setSubmitted(true)
    const formErrors = []

    const formData = new FormData();

    formData.append('image', image)

    const response = await fetch(`/api/users/profile/${id}/profileImg/edit`, {
      method: 'POST',
      body: formData,
    });

    const new_image = await response.json();

    if(new_image && new_image.errors === undefined) {
      dispatch(setUser(new_image))
    }
    else if (new_image.errors) {
      formErrors.push(new_image.errors)
    }
    else {
      formErrors.push('Something went wrong, please try again! ')
    }
    if(formErrors.length) {
      setErrors(formErrors)
    }
  }

  const updateProfilePic = (e) => {
    const err= []
    const file = e.target.files[0]
    if(!file?.type.includes('png') && !file?.type.includes('jpg') && !(file?.type.includes('jpeg'))){
      err.push("Please submit a valid file type.(e.g. 'png', 'jpg', or 'jpeg') ")
      setErrors(err)
      setImage(null)
    } else {
      setImage(file)
      setErrors([])
    }
  }

  return (
    <div className='edit-change-profile-pic'>
      {errors.length > 0 && (
        <div className="errorHandling">
          <p className="error-Title">
            Please fix the following errors before submitting:
          </p>
          <ul className="edit-profilepic-errors">
            {errors.map((error) => (
              <ul key={error} id="edit-pic-error">
                <i className="fas fa-spinner fa-spin" id="spinner"></i>
                {error}
              </ul>
            ))}
          </ul>
        </div>
      )}
      <form className="edit-profile-pic-form" onSubmit={onSubmit}>
        <div className='edit-choose-photo'>
          <input
            id='user-update-img'
            type='file'
            accept='image/*'
            onChange={updateProfilePic}
            />
            {!image ?
              <label for='user-update-img' id="choose-photo">Choose Photo</label>
              :
              <>
                <label for='user-update-img' id="choose-photo2">Change photo</label>
                <label id="upload-profile-pic" >Upload</label>
              </>
            }
          {/* {submitted && errors.length ?
            <button id="upload-profile-pic-dis" disabled={true}>Upload</button>
            :
          } */}
        </div>
      </form>
    </div>
  )
}
