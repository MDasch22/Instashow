import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom';
import { logout } from '../../store/session';
import './navbar.css'
import Modal from 'react-modal'
import CreatePost from '../CreatePost'
import SearchBar from '../SearchBar';



const NavBar = ({posts}) => {
  const dispatch = useDispatch()
  const currentLocation = useLocation()

  const sessionUser = useSelector(state => state.session.user)

  const [open, setOpen] = useState(false)
  const [showCreate, setShowCreate] = useState(false);
  const [homeActive, setHomeActive] = useState(false)
  const [exploreActive, setExploreActive] = useState(false)
  const [createActive, setCreateActive] = useState(false)
  const [profileActive , setProfileActive] = useState(false)

  let dropDownRef = useRef();

  useEffect(() => {
    if(currentLocation.pathname === '/' && !showCreate && !open){
      setHomeActive(true)
      setExploreActive(false)
      setProfileActive(false)
      setCreateActive(false)
    } else if(currentLocation.pathname === '/explore/posts' && !showCreate && !open) {
      setHomeActive(false)
      setExploreActive(true)
      setCreateActive(false)
      setProfileActive(false)
    } else if(currentLocation.pathname === `/${sessionUser?.username}` || currentLocation.pathname === `/${sessionUser?.username}/edit` ){
      setHomeActive(false)
      setExploreActive(false)
      setProfileActive(true)
      setCreateActive(false)
    } else {
      setHomeActive(false)
      setExploreActive(false)
      setCreateActive(false)
      setProfileActive(false)
    }

    document.addEventListener("mousedown", (event) => {
      console.log("WHAT IS THIS!!!!!!!!!               " + dropDownRef + event)

    });


  }, [homeActive, open, exploreActive, showCreate, profileActive, currentLocation])

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
      zIndex: 12,
      backgroundColor: 'rgba(34, 34, 34, 0.65)'
    },
    content: {
      position: 'relative',
      margin: 'auto',
      maxWidth: '870px',
      width: '100%',
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
      overflow: 'visibile',
      transform: 'translatex(-5%)'
    }
  };

  const onLogout = async() => {
    await dispatch(logout())
  }


  function openCreate() {
    setShowCreate(true)
    setExploreActive(false)
    setHomeActive(false)
    setProfileActive(false)
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
              <img id='instashow-logged-in'  src='https://instashowbucket.s3.us-west-1.amazonaws.com/Screenshot+2022-08-10+223031.png' style={{width:120, height: 45}}></img>
            </NavLink>
          </li>
          <li>
            <SearchBar />
          </li>
          <li id="nav-bar-content">
            <li id="nav-bar-bttns">
              <NavLink to='/' id='home-button'exact={true} activeClassName='active'>
                {homeActive ?
                  <svg aria-label="Home" class="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                    <path d="M22 23h-6.001a1 1 0 01-1-1v-5.455a2.997 2.997 0 10-5.993 0V22a1 1 0 01-1 1H2a1 1 0 01-1-1V11.543a1.002 1.002 0 01.31-.724l10-9.543a1.001 1.001 0 011.38 0l10 9.543a1.002 1.002 0 01.31.724V22a1 1 0 01-1 1z"></path>
                  </svg>
                  :
                  <svg id="house-button" aria-label="Home" class="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                    <path d="M9.005 16.545a2.997 2.997 0 012.997-2.997h0A2.997 2.997 0 0115 16.545V22h7V11.543L12 2 2 11.543V22h7.005z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path>
                  </svg>
                }
              </NavLink>
            </li>
            <li id="nav-bar-bttns">
              <NavLink to='/explore/posts' id='explore-button' exact={true} activeClassName='active'>
                {exploreActive ?
                  <svg aria-label="Find People" class="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                    <path d="M13.173 13.164l1.491-3.829-3.83 1.49zM12.001.5a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012.001.5zm5.35 7.443l-2.478 6.369a1 1 0 01-.57.569l-6.36 2.47a1 1 0 01-1.294-1.294l2.48-6.369a1 1 0 01.57-.569l6.359-2.47a1 1 0 011.294 1.294z"></path>
                  </svg>
                  :
                  <svg id="explore" aria-label="Find People" class="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                    <polygon fill="none" points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon>
                    <polygon fill-rule="evenodd" points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"></polygon>
                    <circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle>
                  </svg>
                }
              </NavLink>
            </li>
            <li id="nav-bar-bttns">
              {showCreate ?
                <svg aria-label="New post" class="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                  <path d="M12.003 5.545l-.117.006-.112.02a1 1 0 00-.764.857l-.007.117V11H6.544l-.116.007a1 1 0 00-.877.876L5.545 12l.007.117a1 1 0 00.877.876l.116.007h4.457l.001 4.454.007.116a1 1 0 00.876.877l.117.007.117-.007a1 1 0 00.876-.877l.007-.116V13h4.452l.116-.007a1 1 0 00.877-.876l.007-.117-.007-.117a1 1 0 00-.877-.876L17.455 11h-4.453l.001-4.455-.007-.117a1 1 0 00-.876-.877zM8.552.999h6.896c2.754 0 4.285.579 5.664 1.912 1.255 1.297 1.838 2.758 1.885 5.302L23 8.55v6.898c0 2.755-.578 4.286-1.912 5.664-1.298 1.255-2.759 1.838-5.302 1.885l-.338.003H8.552c-2.754 0-4.285-.579-5.664-1.912-1.255-1.297-1.839-2.758-1.885-5.302L1 15.45V8.551c0-2.754.579-4.286 1.912-5.664C4.21 1.633 5.67 1.05 8.214 1.002L8.552 1z"></path>
                </svg>
                :
                <svg onClick={openCreate} id="create-post-plus" aria-label="New post" class="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                  <path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line>
                </svg>
              }
                <Modal isOpen={showCreate} style={formStyles}>
                  <CreatePost setTrigger={closeCreate}/>
                </Modal>
              </li>
            <li id="nav-bar-bttns">
              {profileActive || open?
                <>
                  <img ref={dropDownRef} onClick={() => setOpen((open) => !open)} src={sessionUser.profile_pic} id="nav-bar-profile-bttn-outline"style={{width: 27, height: 27}}></img>
                  {open && (
                  <div >
                    <div id='pointer-arrow'>  </div>
                    <div className='dropDown'>
                      <NavLink id="dropdown-item" to={`/${sessionUser.username}`} onClick={() => setOpen((open) => !open)}>
                        <i id="profile-icon" className="fa-regular fa-circle-user "></i>
                        <p id="dropdown-profile"> Profile </p>
                      </NavLink>
                      <NavLink id="dropdown-item" to={`/${sessionUser.username}/edit`} onClick={() => setOpen((open) => !open)}>
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
                :
                <>
                  <img ref={dropDownRef} onClick={() => setOpen((open) => !open)} src={sessionUser.profile_pic} id="nav-bar-profile-bttn"style={{width: 27, height: 27}}></img>
                  {open && (
                  <div >
                    <div id='pointer-arrow'>  </div>
                    <div className='dropDown'>
                      <NavLink id="dropdown-item" to={`/${sessionUser.username}`} onClick={() => setOpen((open) => !open)}>
                        <i id="profile-icon" className="fa-regular fa-circle-user "></i>
                        <p id="dropdown-profile"> Profile </p>
                      </NavLink>
                      <NavLink id="dropdown-item" to={`/${sessionUser.username}/edit`} onClick={() => setOpen((open) => !open)}>
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
              }
            </li>

          </li>
        </>
        )}
        {!sessionUser && (
        <>
          <li className='nav-bar-instashow'>
            <img id='instashow-logged-in' src='https://instashowbucket.s3.us-west-1.amazonaws.com/Screenshot+2022-08-10+223031.png' style={{width:120, height: 45}}></img>
          </li>
          <div id='empty'>
              hello
          </div>
          <li id="nav-bar-content">
            <li id="nav-bar-ll">
              <NavLink id="no-sessionuser-nav-login"to='/login' exact={true} activeClassName='active'>
                Login
              </NavLink>
            </li>
            <li id="nav-bar-ll">
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
