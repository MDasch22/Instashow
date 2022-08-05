import React from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)

  return (
    <nav>
      <ul>
        {sessionUser && (
        <>
          <li>
            <NavLink to='/' exact={true} activeClassName='active'>
              Instashow
            </NavLink>
          </li>
          <li>
            <NavLink to='/post/new' exact={true} activeClassName='active'>
              Create a Post
            </NavLink>
          </li>
          <li>
            <NavLink to={`/${sessionUser.username}`} exact={true} activeClassName='active'>
              <img src={sessionUser.profile_pic} style={{width: 50, height: 50}}></img>
            </NavLink>
          </li>
        </>
        )}
        {!sessionUser && (
        <>
          <li>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li>
        </>
        )}
        {sessionUser && (
          <li>
            <LogoutButton />
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
