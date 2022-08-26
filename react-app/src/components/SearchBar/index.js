import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { thunkSearchAllUsers } from '../../store/search';

import './searchbar.css'


export default function SearchBar() {
  const dispatch = useDispatch();

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [wordEntry, setWordEntry] = useState("");

  const user = useSelector(state => Object.values(state.search))
  const sessionUser = useSelector(state => state.session.user)
  const users = user.filter(user => user.id !== sessionUser.id)

  useEffect(() => {
    dispatch(thunkSearchAllUsers())
  }, [dispatch]);

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setWordEntry(searchWord);
    const newFilter = users.filter((value) => {
        return value.username.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
        setFilteredUsers([])
    } else {
        setFilteredUsers(newFilter)
    }
  }

  const click = () => {
    setFilteredUsers([])
    setWordEntry('')
  }

  const isFollowing = (useR) => {
    for(let i = 0; i < sessionUser.followers.length; i++){
      if(sessionUser.followers[i].username === useR.username)
      return (
        <p id="follows-you">Follows you</p>
       )
    }
  }


  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} id="searched-form">
        <input id="form-search" value={wordEntry} placeholder="Search" onChange={handleFilter} />
        <div className='search-icon'>
          {!wordEntry ?
          <svg aria-label="Search" class="_ab6-" color="#8e8e8e" fill="#8e8e8e" height="16" role="img" viewBox="0 0 24 24" width="16">
            <path d="M19 10.5A8.5 8.5 0 1110.5 2a8.5 8.5 0 018.5 8.5z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
            <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="16.511" x2="22" y1="16.511" y2="22"></line>
          </svg>
          :
            <div onClick={click} className='x-search'><i className="fa-solid fa-circle-xmark"></i></div>
          }
        </div>
      </form>
      {filteredUsers.length !== 0 &&  (
        <div className='search-results'>
          <div className='results'><b>Results...</b></div>
          {filteredUsers.slice(0,5).map(user => {
            return (
                <NavLink onClick={click} id="link-to-search" to={`/${user.username}`}>
                  <img className="search-picture" src={user.profile_pic} style={{width:35, height:35}}></img>
                  <div>
                    <p className='search-username'>{user.username}</p>
                    <p>{isFollowing(user)}</p>
                  </div>

                </NavLink>
              )}
            )}
        </div>
      )}
    </div>
  )
}
