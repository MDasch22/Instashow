import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { setUser, thunkEditUser } from '../../store/session'
import { thunkGetUser, thunkLoadAllUsers } from '../../store/user'
import UpdateProfileImg from '../UpdateProfileImg'


import './editProfile.css'

export default function EditProfile({user}) {
  const dispatch = useDispatch()
  const history = useHistory()

  const sessionUser = useSelector(state => state.session.user)
  const users = useSelector(state => Object.values(state.user))

  const [errors, setErrors] = useState([])
  const [email , setEmail] = useState(user.email)
  const [fullname , setFullname] = useState(user.fullname)
  const [username, setUsername] = useState(user.username)
  const [bio, setBio] = useState(user.bio)
  const [showImage , setShowImage] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const userId = user.id
  const profilePic = user.profile_pic

  // CHECK USERNAMES
  const usersUsernames = users.map(user => user.username)
  const noSessionUsernames = usersUsernames.filter(username => username !== user.username)
  // CHECK EMAILS
  const usersEmails = users.map(user => user.email)
  const noSessionEmails = usersEmails.filter(userEmail => userEmail !== user.email )

  useEffect(() => {
    const error = []
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let emailTest = email;
    if(!emailRegex.test(emailTest)){
      error.push("Must enter a valid email address.")
    }
    const whiteSpace = email.replace(/^>s+/, '').replace(/\s+$/, '')
    if( whiteSpace === '') {
      error.push('Please enter a valid email')
    }
    if(noSessionEmails.includes(email)) {
      error.push("Email already exist")
    }
    if(fullname.length > 30 || fullname.length < 5) {
      error.push("Fullname must be between 5-30 characters")
    }
    const whiteSpaceFn = fullname.replace(/^>s+/, '').replace(/\s+$/, '')
    if( whiteSpaceFn === '') {
      error.push('Please enter a valid Fullname')
    }
    const whiteSpaceUn = username.replace(/^>s+/, '').replace(/\s+$/, '')
    if( whiteSpaceUn === '') {
      error.push('Please enter a valid username')
    }
    if(noSessionUsernames.includes(username)){
      error.push("Username already exist")
    }
    if(username.length > 20) {
      error.push("Username cannot exceed 50 characters")
    }
    setErrors(error)
  }, [email, fullname, username])


  useEffect(() => {
    dispatch(thunkLoadAllUsers())
  }, [])


  const onSubmit = async(e) => {
    e.preventDefault()

    setSubmitted(true)

    if(errors.length) {
      return
    }

    const edited_user = await dispatch(thunkEditUser(userId, email, fullname, username, bio))

    if(edited_user) {
      return history.push(`/${username}`)
    }
  }

  const onCancel = () => {
    return history.push(`/${username}`)
  }

  return (
    <div className='edit-profile'>
      <div className='edit-profile-container'>
        <h1>Edit Profile</h1>
        <div className='change-picture'>
          <div className='colorborder'>
            <img id="edit-image"style={{height:300, width:300}} src={profilePic} alt='profile-pic'></img>
          </div>
          <div className='edit-profile-picture-buttons'>
              {!showImage ?
                <button id="change-profile-pic" onClick={() => setShowImage(true)}>Change profile picture</button>
                :
                <UpdateProfileImg id={userId}/>
              }
          </div>
        </div>
        <form className="edit-profile-form" onSubmit={onSubmit}>
          <div>
            {submitted && errors.length > 0 && (
              <div>
                <ul>
                  {errors.map(error => (
                    <div id='actual-error' key={error}>
                    * {error}
                    </div>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className='edit-form-input'>
              <label>Email: </label>
              <input
                type='text'
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
          </div>
          <div className='edit-form-input'>
              <label>Full name: </label>
              <input
                type='text'
                value={fullname}
                required
                onChange={(e) => setFullname(e.target.value)}
              />
          </div>
          <div className='edit-form-input'>
              <label>Username:</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                type='text'
              />
          </div>
          <div className='edit-form-input'>
              <label>Bio: </label>
              <textarea
                id='edit-bio-input'
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
          </div>
          <div className='edit-form-bttns'>
            <button id="edit-form-submit" type='submit'>Submit</button>
            <button id="edit-form-cancel" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
