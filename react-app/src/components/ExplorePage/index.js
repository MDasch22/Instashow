import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { thunkLoadAllPosts, thunkLoadFollowingUserPosts } from '../../store/posts'
import ExplorePagePost from '../ExplorePagePostCard'

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
          <ExplorePagePost post={post}/>
          )
        }) }
      </div>
    </div>
  )
}
