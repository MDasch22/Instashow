import React from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import './navbar.css'


const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)


  return (
    <nav className='nav'>
      <ul className='nav-bar'>
        {sessionUser && (
        <>
          <li className='nav-bar-instashow'>
            <NavLink to='/' exact={true} activeClassName='active'>
              <img id='instashow-logged-in'  src='https://instashowbucket.s3.us-west-1.amazonaws.com/Screenshot+2022-08-10+223031.png' style={{width:150, height: 50}}></img>
            </NavLink>
          </li>
          <li >
            <div id='empty'>
              hello
            </div>
          </li>
          <li id="nav-bar-content">
            <li id="nav-bar-bttns">
              <NavLink to='/' id='home-button'exact={true} activeClassName='active'>
                <button id="house-button"> <HomeOutlinedIcon fontSize='large' /></button>
              </NavLink>
            </li>
            <li id="nav-bar-bttns">
              <NavLink to='/explore/posts' id='explore-button' exact={true} activeClassName='active'>
                <button id="explore"><i className="fa-regular fa-compass fa-2x"></i></button>
              </NavLink>
            </li>
            <li id="nav-bar-bttns">
              <NavLink to='/post/new' exact={true} activeClassName='active'>
                <button id="create-post-plus"><i class="fas fa-plus fa-xl"></i></button>
              </NavLink>
            </li>
            <li id="nav-bar-bttns">
              <NavLink to={`/${sessionUser.username}`} exact={true} activeClassName='active'>
                <img src={sessionUser.profile_pic} id="nav-bar-profile-bttn"style={{width: 30, height: 30}}></img>
              </NavLink>
            </li>
            <li id="nav-bar-bttns">
              <LogoutButton />
            </li>
          </li>
        </>
        )}
        {!sessionUser && (
        <>
          <li>
          <img id='instashow-logged-in' src='https://instashowbucket.s3.us-west-1.amazonaws.com/Screenshot+2022-08-10+223031.png' style={{width:150, height: 50}}></img>
          </li>
          <li id="nav-bar-content">
            <li id="nav-bar-bttns">
              <NavLink id="no-sessionuser-nav-login"to='/login' exact={true} activeClassName='active'>
                Login
              </NavLink>
            </li>
            <li id="nav-bar-bttns">
              <NavLink id="no-sessionuser-nav-signup" to='/sign-up' exact={true} activeClassName='active'>
                Sign Up
              </NavLink>
            </li>
          </li>
        </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
