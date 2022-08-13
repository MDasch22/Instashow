import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import Modal from 'react-modal'
import { thunkLoadUserPosts } from '../../store/posts';
import { thunkGetUser } from '../../store/user';
import FollowButton from '../FollowButton';
import Following from '../Following';
import Followers from '../Followers';

import './ProfilePage.css';
import '../Following/followerModal.css'
import ExplorePagePost from '../ExplorePagePostCard';

function ProfilePage() {

  const dispatch = useDispatch();
  const { username }  = useParams();


  const sessionUser = useSelector(state => state.session.user)
  const user = useSelector(state => state.user[username])
  const users_posts = useSelector(state => Object.values(state.post))
  users_posts.reverse()


  const [showFollower, setShowFollowers] = useState(false)
  const [showFollowing, setShowFollowing] = useState(false)

  Modal.setAppElement('body')

  function openFollowers(){
    setShowFollowers(true)
  }

  function closeFollowers() {
    setShowFollowers(false)
  }

  function openFollowing() {
    setShowFollowing(true)
  }

  function closeFollowing() {
    setShowFollowing(false)
  }

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
      backgroundColor: 'rgba(34, 34, 34, 0.65)'
    },
    content: {
      position: 'relative',
      margin: 'auto',
      maxWidth: '500px',
      width: '400px',
      top: '300px',
      left: '40px',
      right: '40px',
      bottom: '40px',
      border: '1px solid #ccc',
      background: '#fff',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '24px',
      outline: 'none',
      padding: '0',
      overflow: 'visibile'
    }
};

  useEffect(() => {
    window.scroll(0, 0)
    dispatch(thunkGetUser(username))
    dispatch(thunkLoadUserPosts(username))
  },[dispatch, username])


  if(!user) return null


  return (
    <div className='profile-container'>
      <div className='profile-user-info-container'>
        <img id="profile-user-profilePic"src={user.profile_pic} style={{width: 180 ,height: 180}} alt='profile-pic'></img>
        <div className='profile-user-info'>
          <div id="profile-username-follow">
            <div id="profile-user-username">{user.username}</div>
            <div id="profile-follow-bttn">
              <FollowButton sessionUser={sessionUser} username={username} userId={user.id}/>
            </div>
            {user.id === sessionUser.id && (
              <NavLink to={`/${username}/edit`}>
                <button id="edit-profile-bttn">Edit Profile</button>
              </NavLink>
            )}
          </div>
          <div id="profile-followers-info">
            <p id='user-post-amount'>{users_posts.length} Posts</p>
            <div>
              <p id="followers-bttn" onClick={openFollowers}>{user.followers.length} Followers</p>
              <Modal isOpen={showFollower} style={formStyles}>
                <button id="close-modal-followers" onClick={closeFollowers}><i className="fa-solid fa-xmark fa-lg"></i></button>
                <Followers followers={user.followers} closeModal={closeFollowers}/>
              </Modal>
            </div>
            <div>
              <p id="followers-bttn" onClick={openFollowing}>{user.following.length} Following </p>
              <Modal isOpen={showFollowing} style={formStyles}>
                <button id="close-modal-followers" onClick={closeFollowing}><i className="fa-solid fa-xmark fa-lg"></i></button>
                <Following following={user.following} closeModal={closeFollowing}/>
              </Modal>
            </div>
          </div>
          <div>{user.fullname}</div>
          <div>{user.bio}</div>
        </div>
      </div>
      <div className="profile-user-posts">
        {users_posts && users_posts.map(post => {
          return (
            <ExplorePagePost  post={post}/>
          )}
        )}
        {users_posts.length === 0 &&
          <div id="no-posts-yet">
            <p> No posts yet</p>
          </div>
        }
      </div>
    </div>
  );
}
export default ProfilePage;
