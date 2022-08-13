import React, { useEffect, useState }from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../../store/session'


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
    if(!file?.type.includes('jpg') && !(file?.type.includes('jpeg') && !file?.type.includes('png') && !file?.type.includes('gif'))){
      err.push("Please submit a valid file type.(e.g. 'jpg', 'jpeg', 'png', and 'gif' ) ")
      setErrors(err)
      setImage(null)
    } else {
      setImage(file)
      setErrors([])
    }
  }

  return (
    <div>
      <form className="edit-profile-pic-form" onSubmit={onSubmit}>
        <div>
        {errors.length > 0 && (
          <div className="errorHandling">
            <div className="errorTitle">
              Please fix the following errors before submitting:
            </div>
            <ul className="errors">
              {errors.map((error) => (
                <ul key={error} id="error">
                  <i className="fas fa-spinner fa-spin" id="spinner"></i>
                  {error}
                </ul>
              ))}
            </ul>
          </div>
        )}
        </div>
        <div>
          <label for='user-update-img'>Choose Photo</label>
          <input
            id='user-update-img'
            type='file'
            accept='image/*'
            onChange={updateProfilePic}
          />
          {!image && errors.length ?
            <button disabled={true}>Upload</button>
            :
            <button>Upload</button>
          }
        </div>
      </form>
    </div>
  )
}
