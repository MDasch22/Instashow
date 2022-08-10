import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { thunkEditUser } from '../../store/session'
import { thunkLoadAllUsers } from '../../store/user'
import UpdateProfileImg from '../UpdateProfileImg'


import './editProfile.css'

export default function EditProfile({user}) {
  const dispatch = useDispatch()
  const history = useHistory()

  const sessionUser = useSelector(state => state.session.user)
  const users = useSelector(state => Object.values(state.user))





  const [errors, setErrors] = useState([])
  const [email , setEmail] = useState(user.email)
  const [emailError, setEmailError] = useState([])
  const [fullname , setFullname] = useState(user.fullname)
  const [fullnameErrors, setFullnameErrors] = useState([])
  const [userName, setUserName] = useState(user.username)
  const [usernameErrors, setUserNameErrors] = useState([])
  const [bio, setBio] = useState(user.bio)
  const [showImage , setShowImage] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const userId = user.id
  const profilePic = user.profile_pic

  useEffect(() => {
     dispatch(thunkLoadAllUsers())
  }, [])


  const user_Usernames = users.map(user => user.username)


  useEffect(() => {
    const errs = []
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let emailTest = email;
    if(!emailRegex.test(emailTest)){
      errs.push("Must enter a valid email address.")
      setEmailError(errs)
    }
    if(fullname.length > 100 || fullname.length < 5) {
      errs.push("Fullname must be between 5-100 characters")
      setFullnameErrors(errs)
    }
    if(user_Usernames.includes(user.username)){
      errs.push("Username already exist")
      setUserNameErrors(errs)
    }
  }, [email, fullname, userName])



  const onSubmit = async(e) => {
    e.preventDefault()
    setSubmitted(true)

    if(errors.length) return
    if(emailError.length) return

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
              <button onClick={() => setShowImage(true)}>Change profile picture</button>
              :
              <UpdateProfileImg id={userId}/>
            }
          </div>
        </div>
      </div>
      <form onSubmit={onSubmit}>
        {submitted && emailError.length > 0 && (
          <div>
            <ul>
              {emailError.map(error => (
                <div key={error}>
                  {error}
                </div>
              ))}
            </ul>
          </div>
        )}
        <label>Email: </label>
        <input
          type='text'
          value={email}
          required
          onChange={updateEmail}
        />
        {submitted && fullnameErrors.length > 0 && (
          <div>
            <ul>
              {fullnameErrors.map(error => (
                <div key={error}>
                  {error}
                </div>
              ))}
            </ul>
          </div>
        )}
        <label>Full name: </label>
        <input
          type='text'
          value={fullname}
          required
          onChange={updateFullname}
        />
        {submitted && usernameErrors.length > 0 && (
          <div>
            <ul>
              {usernameErrors.map(error => (
                <div key={error}>
                  {error}
                </div>
              ))}
            </ul>
          </div>
        )}
        <label>Username:</label>
        <input
          value={userName}
          onChange={updateUsername}
          required
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
