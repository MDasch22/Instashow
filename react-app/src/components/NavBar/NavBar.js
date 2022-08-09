import React from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './navbar.css'


const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)

  return (
    <nav className='nav'>
      <ul className='nav-bar'>
        {sessionUser && (
        <>
          <li className='nav-bar-instashow'>
            <NavLink to='/' exact={true} id='instashow-logged-in' activeClassName='active'>
              <div id='instashow'>Instashow</div>
            </NavLink>
          </li>
          <li id="nav-bar-content">
            <li id="nav-bar-bttns">
              <NavLink to='/' id='home-button'exact={true} activeClassName='active'>
                <div><i className="fa-solid fa-house fa-lg"></i></div>
              </NavLink>
            </li>
            <li id="nav-bar-bttns">
              <NavLink to='/explore/posts' id='explore-button' exact={true} activeClassName='active'>
                <div><i class="fa-regular fa-compass fa-lg"></i></div>
              </NavLink>
            </li>
            <li id="nav-bar-bttns">
              <NavLink to='/post/new' exact={true} activeClassName='active'>
                <button><i className="fa-solid fa-plus fa-lg"></i></button>
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
            <div>Instashow</div>
          </li>
          <li id="nav-bar-content">
            <li id="nav-bar-bttns">
              <NavLink to='/login' exact={true} activeClassName='active'>
                Login
              </NavLink>
            </li>
            <li id="nav-bar-bttns">
              <NavLink to='/sign-up' exact={true} activeClassName='active'>
                Sign Up
              </NavLink>
            </li>
          </li>
        </>
        )}
        {/* {sessionUser && (
          <li>
            <LogoutButton />
          </li>
        )} */}
      </ul>
    </nav>
  );
}

export default NavBar;
