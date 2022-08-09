import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { thunkLoadAllPosts, thunkLoadFollowingUserPosts } from '../../store/posts'

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
    <div>
      <div>
        {shuffledPosts.map(post => {
        return (
          <div key={post.id}>
            <NavLink to={`/post/${post.id}`}>
              <img src={post.image} style={{width: 400, height: 300}} alt='post-image'></img>
            </NavLink>
            <div>{post.created_at}</div>
            <NavLink to={`/${post.owner.username}`}>
              <img src={post.owner.profile_pic} style={{width:30, height:30}}></img>
            </NavLink>
            <div>{post.owner.username}</div>
            <div>{post.caption}</div>

          </div>
          )
        }) }
      </div>
    </div>
  )
}
