import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { thunkLoadAllUsers } from '../../store/user';
import Footer from '../Footer';

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
    <div className='login-page-whole'>
      <div className='login-page-container'>
        <div>
          <img src='https://instashowbucket.s3.us-west-1.amazonaws.com/splash+login(1).png' style={{height: 585}}></img>
        </div>
        <div className='login-right-info'>
          <div className='login-page-form'>
            <img id="login-instashow" src='https://instashowbucket.s3.us-west-1.amazonaws.com/Screenshot+2022-08-10+223031.png' style={{width:210, height: 60}}></img>
            <form className= 'login-form' onSubmit={onLogin}>
              <div>
                {errors.map((error, ind) => (
                  <div id="login-errors" key={ind}>* {error}</div>
                ))}
              </div>
              <div className='login-input'>
                <input
                  name='email'
                  type='text'
                  value={email}
                  required="required"
                  onChange={updateEmail}
                />
                <span>Email</span>
              </div>
              <div className='login-input'>
                <input
                  name='password'
                  type='password'
                  value={password}
                  required="required"
                  onChange={updatePassword}
                />
                <span>Password</span>
              </div>
            <button id="loginpage-login-bttn" type='submit'>Login</button>
            </form>
          <div className='loginpage-signup-bttns'>
            <div className='-or-'>
              <img id="line-break" src='https://instashowbucket.s3.us-west-1.amazonaws.com/line-break-grey.png' style={{width: 110, height: 30}}></img>
              <p id="login-or">or</p>
              <img id="line-break" src='https://instashowbucket.s3.us-west-1.amazonaws.com/line-break-grey.png' style={{width: 110, height: 30}}></img>
            </div>
            <button id='loginpage-demo-user' onClick={demoUser}> <i className="fa-regular fa-circle-user fa-lg"></i> Login with Demo</button>
          </div>
          </div>
          <div className='loginpage-signup-link'>
            <p>Dont have an account?</p>
            <NavLink id="link-to-signup" to='/sign-up'>
              <p> Sign up </p>
            </NavLink>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginForm;
