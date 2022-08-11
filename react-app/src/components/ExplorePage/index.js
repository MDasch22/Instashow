import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { thunkLoadAllPosts, thunkLoadFollowingUserPosts } from '../../store/posts'

import './explorepage.css'

export default function ExplorePage() {
  const dispatch = useDispatch()

  const sessionUser = useSelector(state => state.session.user)
  const posts = useSelector(state => Object.values(state.post))

  useEffect(() => {
    dispatch(thunkLoadAllPosts())
  },[dispatch])

  let nonSessionUserPost = posts.filter(post => post.user_id !== sessionUser.id)

  const shuffledPosts = nonSessionUserPost.sort(() => Math.random() - 0.5)

  return (
    <div className='explore-container'>
      <h1>Explore Page</h1>
      <div className='explore-image-card'>
        {shuffledPosts.map(post => {
        return (
          <div id="explore-post-div" key={post.id}>
            <NavLink id="link-to-post-explore" to={`/post/${post.id}`}>
              <img src={post.image} style={{width: 300, height: 300}} alt='post-image'></img>
            </NavLink>
            <div className='explore-post-ratio'>
              <div id="explore-ratio"><i className="fa-solid fa-heart fa-lg"></i> {post.likes.length}</div>
              <div id="explore-ratio"><i className="fa-solid fa-comment fa-lg"></i> {post.comments.length}</div>
           </div>
          </div>
          )
        }) }
      </div>
    </div>
  )
}
