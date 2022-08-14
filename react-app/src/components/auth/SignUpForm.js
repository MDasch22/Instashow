import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { thunkLoadAllUsers } from '../../store/user';
import Footer from '../Footer';

import './signupForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [fullname , setFullname] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [submitted , setSubmitted ] = useState(false)
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const users = useSelector(state => Object.values(state.user))
  const usersEmails = users.map(user => user.email)


  useEffect(() => {
    dispatch(thunkLoadAllUsers())
    const formError=[]
    if(fullname.length < 5) formError.push("Fullname must be at least 5 characters")
    let emailRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}/
    let emailTest = email
    if(!emailRegex.test(emailTest)){
      formError.push("Please provide a valid email address")
    }
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])(?=.*[!@#$%^&*])/
    let passwordTest = password
    if(!passwordRegex.test(passwordTest)) {
      formError.push("Password must be at least 8 characters, contain 1 lowercase letter, uppercase letter, number, and special character (i.e. '!@#$%^&*')")
    }
    if(repeatPassword !== password) {
      formError.push("Passwords do not match")
    }
    if(usersEmails.includes(email)){
      formError.push("Email already being used.")
    }
    setErrors(formError)
  },[fullname, email, password, repeatPassword])

  console.log("This is the password, ", password)
  console.log("This is the confirm password, ", repeatPassword)

  const onSignUp = async (e) => {
    e.preventDefault();
    setSubmitted(true)

    if(errors.length) return

    await dispatch(signUp(username, email, password, fullname));

  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFullname = (e) => {
    setFullname(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-page-whole'>

      <div className='login-page-container'>
        <div>
          <img src='https://instashowbucket.s3.us-west-1.amazonaws.com/splash+login(1).png' style={{height: 585}}></img>
        </div>
        <div>

          <div className='signup-page-form'>
            <div className='signup-page-header'>
              <img id="signup-instashow" src='https://instashowbucket.s3.us-west-1.amazonaws.com/Screenshot+2022-08-10+223031.png' style={{width:200, height: 60}}></img>
              <p id="signup-message">Sign up to see photos and videos from your friends.</p>
            </div>
            <form onSubmit={onSignUp}>
              <div className='error-signup'>
                {submitted && errors.map((error, ind) => (
                  <div id="signup-errors" key={ind}> * {error}</div>
                ))}
              </div>
              <div className='signup-input'>
                <input
                  type='text'
                  name='fullname'
                  onChange={updateFullname}
                  placeholder="Fullname"
                  value={fullname}
                ></input>
              </div>
              <div className='signup-input'>
                <input
                  className='login-input'
                  type='text'
                  name='username'
                  placeholder='Username'
                  onChange={updateUsername}
                  value={username}
                ></input>
              </div>
              <div className='signup-input'>
                <input
                  type='text'
                  name='email'
                  placeholder='Email'
                  onChange={updateEmail}
                  value={email}
                ></input>
              </div>
              <div className='signup-input'>
                <input
                  placeholder='Password'
                  type='password'
                  name='password'
                  onChange={updatePassword}
                  value={password}
                ></input>
              </div>
              <div className='signup-input'>
                <input
                  type='password'
                  name='repeat_password'
                  placeholder='Confirm Password'
                  onChange={updateRepeatPassword}
                  value={repeatPassword}
                  required={true}
                ></input>
              </div>
              <button id="signup-page-bttn" type='submit'>Sign Up</button>
            </form>
          </div>
          <div className='signuppag-login-link'>
            <p>Already have an account? </p>
            <NavLink id='link-to-login' to='/login' >
              <p>Login</p>
            </NavLink>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUpForm;
