import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import Modal from 'react-modal'
import { thunkLoadAllPosts, thunkLoadUserPosts } from '../../store/posts';
import { thunkGetUser } from '../../store/user';
import FollowButton from '../FollowButton';
import Following from '../Following';
import Followers from '../Followers';

import './ProfilePage.css';
import '../Following/followerModal.css'
import ExplorePagePost from '../ExplorePagePostCard';
import LikesOnPost from '../LikesOnPost';

function ProfilePage() {

  const dispatch = useDispatch();
  const { username }  = useParams();


  const sessionUser = useSelector(state => state.session.user)
  const user = useSelector(state => state.user[username])
  const allPost = useSelector(state => Object.values(state.post))

  const users_posts = allPost.filter(post => post.owner.username === username)

// GETTING ALL POST THAT USER LIKED
  const likedPosts = allPost.filter(post => {
    if(post.likes.map( like => like.username).includes(username)){
      return post
    }
  })

  console.log(likedPosts)

  users_posts.reverse()



  const [showFollower, setShowFollowers] = useState(false)
  const [showFollowing, setShowFollowing] = useState(false)
  const [showPost, setShowPost] = useState(true)
  const [showLikes, setShowLikes] = useState(false)

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
      zIndex: '12',
      padding: '12px',
      backgroundColor: 'rgba(34, 34, 34, 0.65)'
    },
    content: {
      position: 'relative',
      margin: 'auto',
      height: 'auto',
      maxWidth: '500px',
      width: '400px',
      top: '300px',
      left: '40px',
      right: '40px',
      bottom: '40px',
      border: '1px solid #ccc',
      background: '#fff',
      borderRadius: '10px',
      outline: 'none',
      padding: '0',
      overflow: 'auto',
    }
};

  useEffect(() => {
    window.scroll(0, 0)
    dispatch(thunkGetUser(username))
    dispatch(thunkLoadAllPosts())
  },[dispatch, username])


  if(!user) return (
      <h1 style={{textAlign: "center", marginTop: 80}}> No user found </h1>
    )

  function showUserPost(){
    setShowPost(true)
    setShowLikes(false)
  }

  function showUserLikes(){
    setShowLikes(true)
    setShowPost(false)
  }

  return (
    <div className='profile-container'>
      <div className='profile-user-info-container'>
        <img id="profile-user-profilePic"src={user.profile_pic} style={{width: 180 ,height: 180}} alt='profile-pic'></img>
        <div className='profile-user-info'>
          <div id="profile-username-follow">
            {user.username === "McDaschin" || user.username === "instashow" ?
              <div className='McDaschin'>
                <div id="profile-user-username">{user.username}</div>
                <img id="verified"src="https://instashowbucket.s3.us-west-1.amazonaws.com/302-3024199_instagram-verified-symbol-png-instagram-verified-logo-png.png" style={{width:20, height:20}}></img>
              </div>
              :
              <div id="profile-user-username">{user.username}</div>
            }
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
          <div id='profile-bio'>{user.bio}</div>
        </div>
      </div>
      <div className="profile-user-posts">
        <>
          <div id="posts-icon">
            <div onClick={showUserPost} className={showPost ? 'posts-icon-likes' : 'posts-icon-likes-no'}>
              <svg id="grid" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(153, 153, 153)" class="bi bi-grid-3x3-gap" viewBox="0 0 16 16">
                <path d="M4 2v2H2V2h2zm1 12v-2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V7a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm5 10v-2a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V7a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V2a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zM9 2v2H7V2h2zm5 0v2h-2V2h2zM4 7v2H2V7h2zm5 0v2H7V7h2zm5 0h-2v2h2V7zM4 12v2H2v-2h2zm5 0v2H7v-2h2zm5 0v2h-2v-2h2zM12 1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zm-1 6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zm1 4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-2z"/>
              </svg>
              <p>Posts</p>
            </div>
            {sessionUser.username === username &&
              <div onClick={showUserLikes} className={showLikes ? 'posts-icon-likes' : 'posts-icon-likes-no'}>
                <i className="fa-regular fa-heart fa-lg"></i>
                <p>Likes</p>
              </div>
            }
          </div>
          <div id="profile-posts">
            {showPost ?
              users_posts.length ?
                users_posts && users_posts.map(post => {
                  return (
                    <>
                      <ExplorePagePost  post={post}/>
                    </>
                  )}
                )
                :
                <>
                  <div style={{width: 300}}></div>
                  <div id="no-posts-yet">
                    <p className='no-posts'> No Posts Yet</p>
                  </div>
                  <div style={{width: 300}}></div>
                </>
              :
              null
            }
            {showLikes ?
              likedPosts.length ?
                <>
                  <p className='liked-privacy'>Only you can see what you've liked</p>
                  <div></div>
                  <div></div>
                  {likedPosts.map(post => {
                    return (
                        <ExplorePagePost post={post} />
                      )
                  })}
                </>
                :
                <>
                  <div style={{width: 300}}></div>
                  <div id="no-posts-yet">
                    <p className='no-posts'> No Likes Yet</p>
                  </div>
                  <div style={{width: 300}}></div>
                </>
              :
              null
            }
          </div>
        </>
      </div>
    </div>
  );
}
export default ProfilePage;
