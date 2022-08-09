import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { thunkEditUser } from '../../store/session'
import UpdateProfileImg from '../UpdateProfileImg'

export default function EditProfile({user}) {
  const dispatch = useDispatch()
  const history = useHistory()

  const [errors, setErrors] = useState([])
  const [email , setEmail] = useState(user.email)
  const [fullname , setFullname] = useState(user.fullname)
  const [userName, setUserName] = useState(user.username)
  const [bio, setBio] = useState(user.bio)
  const [showImage , setShowImage] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const userId = user.id
  const profilePic = user.profile_pic


  const onSubmit = async(e) => {
    e.preventDefault()
    setSubmitted(true)

    const edited_user = await dispatch(thunkEditUser(userId, email, fullname, userName, bio))

    if(edited_user){
      return history.push(`/${userName}`)
    }

  }

  const updateEmail = async(e) => {
    setEmail(e.target.value)
  }

  const updateFullname = async(e) => {
    setFullname(e.target.value)
  }

  const updateUsername = async(e) => {
    setUserName(e.target.value)
  }

  const updateBio = async(e) => {
    setBio(e.target.value)
  }


  const onCancel = async() => {
    return history.push(`/${userName}`)
  }

  return (
    <div>
      <h1>Edit Profile</h1>
      <div>
        <div>
          <img src={profilePic} alt='profile-pic'></img>
        </div>
        <div>
          <div>
            {!showImage ?
              <button onClick={() => setShowImage(true)}>Change profile</button>
              :
              <UpdateProfileImg id={userId}/>
            }
          </div>
        </div>
      </div>
      <form onSubmit={onSubmit}>
        <label>Email: </label>
        <input
          type='text'
          value={email}
          onChange={updateEmail}
        />
        <label>Full name: </label>
        <input
          type='text'
          value={fullname}
          onChange={updateFullname}
        />
        <label>Username:</label>
        <input
          value={userName}
          onChange={updateUsername}
          type='text'
        />
        <label>Bio: </label>
        <textarea
          value={bio}
          onChange={updateBio}
        />
        <button type='submit'>Done</button>
        <button onClick={onCancel}>Cancel</button>
      </form>
    </div>
  )
}
