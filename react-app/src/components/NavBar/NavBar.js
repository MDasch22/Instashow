import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { NavLink } from 'react-router-dom';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import { logout } from '../../store/session';
import './navbar.css'
import Modal from 'react-modal'
import CreatePost from '../CreatePost'



const NavBar = () => {
  const dispatch = useDispatch()

  const sessionUser = useSelector(state => state.session.user)

  const [open, setOpen] = useState(false)
  const [showCreate, setShowCreate] = useState(false);

  Modal.setAppElement('body');

  const formStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      minHeight: '100%',
      padding: '12px',
      zIndex: 3,
      backgroundColor: 'rgba(34, 34, 34, 0.65)'
    },
    content: {
      position: 'relative',
      margin: 'auto',
      maxWidth: '870px',
      width: 'auto',
      height:'auto',
      top: '100px',
      left: '40px',
      right: '40px',
      bottom: '40px',
      border: '1px solid #ccc',
      background: '#fff',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '5px',
      outline: 'none',
      padding: " 0, 20px 0",
      overflow: 'visibile'
    }
  };

  const onLogout = async() => {
    await dispatch(logout())
  }

  useEffect(() => {

    const closeDrop = (e) => {
      if(e.path[0].tagName !== 'IMG'){
        setOpen(false)
      }
    }

    document.body.addEventListener('click', closeDrop )

    return () => document.body.removeEventListener('click', closeDrop);

  }, [])

  function openCreate() {
    setShowCreate(true)
  }

  function closeCreate(){
    setShowCreate(false)
  }


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
              {/* <NavLink to='/post/new' exact={true} activeClassName='active'> */}
                <button onClick={openCreate} id="create-post-plus"><i class="fas fa-plus fa-xl"></i></button>
                <Modal isOpen={showCreate} style={formStyles}>
                  <CreatePost setTrigger={closeCreate}/>
                </Modal>
              {/* </NavLink> */}
            </li>
            <li id="nav-bar-bttns">
              <>
                <img onClick={() => setOpen(!open)} src={sessionUser.profile_pic} id="nav-bar-profile-bttn"style={{width: 30, height: 30}}></img>
                {open && (
                <div >
                  <div id='pointer-arrow'>  </div>
                  <div className='dropDown'>
                    <NavLink id="dropdown-item" to={`/${sessionUser.username}`} onClick={() => setOpen(!open)}>
                      <i id="profile-icon" className="fa-regular fa-circle-user "></i>
                      <p id="dropdown-profile"> My Profile </p>
                    </NavLink>
                    <NavLink id="dropdown-item" to={`/${sessionUser.username}/edit`} onClick={() => setOpen(!open)}>
                      <i className="fa-solid fa-gears"></i>
                      <p id="dropdown-text"> Manage account </p>
                    </NavLink>
                    <div id='dropdown-logout' onClick={onLogout}>
                      Logout
                    </div>
                  </div>
                </div>
                )}
              </>
            </li>

          </li>
        </>
        )}
        {!sessionUser && (
        <>
          <li className='nav-bar-instashow'>
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
