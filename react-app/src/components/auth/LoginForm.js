import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { thunkLoadAllUsers } from '../../store/user';

import './loginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();


  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoUser = async(e) => {
    e.preventDefault();
    const data = await dispatch(thunkLoadAllUsers())
    if(data) {
      const users = Object.values(data)
      const usersArray = users[0]
      const demoUser = usersArray.filter(user =>  user.id === 1)

      dispatch(login(`${demoUser[0].email}`, `password`))
    }
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-page-container'>
      <div>
        <img src='https://instashowbucket.s3.us-west-1.amazonaws.com/image+(1).png' style={{height: 585}}></img>
      </div>
      <div className='login-page-form'>
        <img id="login-instashow" src='https://instashowbucket.s3.us-west-1.amazonaws.com/Screenshot+2022-08-10+223031.png' style={{width:200, height: 60}}></img>
        <form onSubmit={onLogin}>
          <div>
            {errors.map((error, ind) => (
              <div id="login-errors" key={ind}>* {error}</div>
            ))}
          </div>
          <div className='login-input'>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='login-input'>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
          </div>
        <button id="loginpage-login-bttn" type='submit'>Login</button>
        </form>
      <div className='loginpage-signup-bttns'>
        <div className='-or-'>
          <div id="line-break"> </div>
          <p id="login-or">or</p>
          <div id="line-break"> </div>
        </div>
        <button id='loginpage-demo-user' onClick={demoUser}>Continue as Demo</button>
      </div>
      <div className='loginpage-signup-link'>
        <p>Dont have an account?</p>
        <NavLink id="link-to-signup" to='/sign-up'>
          <p> Sign up </p>
        </NavLink>
      </div>
      </div>
    </div>
  );
};

export default LoginForm;
