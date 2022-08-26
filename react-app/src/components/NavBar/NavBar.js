import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { NavLink } from 'react-router-dom';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import { logout } from '../../store/session';
import './navbar.css'
import Modal from 'react-modal'
import CreatePost from '../CreatePost'
import { thunkSearchAllUsers } from '../../store/search';
import SearchBar from '../SearchBar';



const NavBar = () => {
  const dispatch = useDispatch()

  const sessionUser = useSelector(state => state.session.user)

  const [open, setOpen] = useState(false)
  const [showCreate, setShowCreate] = useState(false);
  const [wordEntry, setWordEntry] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

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


  const users = useSelector(state => Object.values(state.search))

  useEffect(() => {
    dispatch(thunkSearchAllUsers())
  }, [dispatch]);

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
  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setWordEntry(searchWord);
    const newFilter = users.filter((value) => {
        return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
        setFilteredUsers([])
    } else {
        setFilteredUsers(newFilter)
    }
  }

  const cancelSearch = () => {
    setFilteredUsers([])
    setWordEntry("")
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
                {/* <button id="house-button"> <HomeOutlinedIcon fontSize='large' /></button> */}
                <svg id="house-button" aria-label="Home" class="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                  <path d="M9.005 16.545a2.997 2.997 0 012.997-2.997h0A2.997 2.997 0 0115 16.545V22h7V11.543L12 2 2 11.543V22h7.005z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path>
                </svg>
              </NavLink>
            </li>
            <li id="nav-bar-bttns">
              <NavLink to='/explore/posts' id='explore-button' exact={true} activeClassName='active'>
              <svg id="explore" aria-label="Find People" class="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                <polygon fill="none" points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon>
                <polygon fill-rule="evenodd" points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"></polygon>
                <circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle>
              </svg>
              </NavLink>
            </li>
            <li id="nav-bar-bttns">
            <svg onClick={openCreate} id="create-post-plus" aria-label="New post" class="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
              <path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line>
            </svg>
              <Modal isOpen={showCreate} style={formStyles}>
                <CreatePost setTrigger={closeCreate}/>
              </Modal>
            </li>
            <li id="nav-bar-bttns">
              <>
                <img onClick={() => setOpen(!open)} src={sessionUser.profile_pic} id="nav-bar-profile-bttn"style={{width: 27, height: 27}}></img>
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
