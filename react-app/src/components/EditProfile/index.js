import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { thunkEditUser } from '../../store/session'
import { thunkLoadAllUsers } from '../../store/user'
import UpdateProfileImg from '../UpdateProfileImg'
import Picker from 'emoji-picker-react'

import './editProfile.css'

export default function EditProfile({user}) {
  const dispatch = useDispatch()
  const history = useHistory()

  const users = useSelector(state => Object.values(state.user))

  const [showPicker, setShowPicker] = useState(false)
  const [errors, setErrors] = useState([])
  const [email , setEmail] = useState(user.email)
  const [fullname , setFullname] = useState(user.fullname)
  const [username, setUsername] = useState(user.username)
  const [bio, setBio] = useState(user?.bio)
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
      error.push("Username cannot exceed 20 characters")
    }
    setErrors(error)
  }, [email, fullname, username, bio])


  useEffect(() => {
    const error= []
    if(bio?.length > 150){
      error.push('Bio cannot exceed 150 characters')
    }
    setErrors(error)
    dispatch(thunkLoadAllUsers())
  }, [bio])

  useEffect(() => {
    const closeEmoji = (e) => {
      if(e.path[0].tagName !== "I" && e.path[0].tagName !== "BUTTON" && e.path[0].tagName !== "INPUT"){
        setShowPicker(false)
      }
    }
    document.body.addEventListener("click", closeEmoji)
    return () => document.body.removeEventListener('click', closeEmoji)
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

  const emojiClick = (e, emojiObj) => {
    if(emojiObj.emoji.length){
      setBio(bio => bio + emojiObj.emoji);
      setShowPicker(false)
    } else {
      setShowPicker(true)
    }
  }

  const openShow = (e) => {
    setShowPicker(!showPicker)
  }

  return (
    <div className='edit-profile'>
      <div className='edit-profile-container'>
        <div className='edit-profile-picture-buttons'>
        {!showImage ?
          <div className='edit-profile-mix'>
            <img id="edit-image"style={{height:100, width:100}} src={profilePic} alt='profile-pic'></img>
            <div>
              <p id="username-profile-edit">{user.username}</p>
              <button id="change-profile-pic" onClick={() => setShowImage(true)}>Change profile picture</button>
            </div>
          </div>
          :
          <div className='edit-profile-mix-choose'>
            <img id="edit-image"style={{height:100, width:100}} src={profilePic} alt='profile-pic'></img>
            <div>
              <p id="username-profile-edit">{user.username}</p>
              <UpdateProfileImg id={userId}/>
            </div>
          </div>
        }
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
              <label id="edit-profile-label">Email </label>
              <input
                type='text'
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
          </div>
          <div className='edit-form-input'>
              <label id="edit-profile-label">Full name </label>
              <input
                type='text'
                value={fullname}
                required
                onChange={(e) => setFullname(e.target.value)}
              />
          </div>
          <div className='edit-form-input'>
              <label id="edit-profile-label">Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                type='text'
              />
          </div>
          <div className='edit-form-input'>
            <label id="edit-profile-label">Bio </label>
            {showPicker &&
              <div id="edit-user-emoji-picker">
                <Picker onClick={showPicker} pickerStyle={{width: '17rem' , height: '20rem'}} onEmojiClick={emojiClick} />
              </div>

            }
            <textarea
              id='edit-bio-input'
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength='150'
              />
          </div>
          <div class="emoji-bioLength">
            <label className='edit-user-emoji-icon' onClick={openShow}> <i class="fa-regular fa-face-smile fa-lg"></i> </label>
            <div className={bio.length >= 140 ? "reed2" : "noormal2"}>
              <p>{bio.length} / 150</p>
            </div>
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
