import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { thunkLoadUserPosts } from '../../store/posts';
import { thunkGetUser } from '../../store/user';

import './ProfilePage.css'

function ProfilePage() {
  const dispatch = useDispatch()
  const { username }  = useParams();

  const user = useSelector(state => state.user[username])
  const users_posts = useSelector(state => Object.values(state.post))

  users_posts.reverse()

  useEffect(() => {
    dispatch(thunkGetUser(username))
    dispatch(thunkLoadUserPosts(username))
  },[dispatch, username])


  if(!user) return null


  return (
    <div>
      <div>
        <img src={user.profile_pic} style={{width: 400 ,height: 400}} alt='profile-pic'></img>
        <div>{user.username}</div>
        <div>{user.bio}</div>
      </div>
      <div>
        {users_posts && users_posts.map(post => {
          return (
          <div key={post.id}>
            <img src={post.image} style={{width: 400, height: 300}} alt='post-image'></img>
            <div>{post.created_at}</div>
            <div>{post.ownerUsername}</div>
            <div>{post.caption}</div>
            <NavLink to={`/post/${post.id}/edit`}>
              Edit
            </NavLink>
          </div>
          )}
        )}
      </div>
    </div>
  );
}
export default ProfilePage;
