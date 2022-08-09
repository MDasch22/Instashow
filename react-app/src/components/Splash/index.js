import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { thunkLoadAllPosts } from '../../store/posts'

export default function HomePage() {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const allPosts = useSelector(state => Object.values(state.post))

  // GETTING POST BY USER FOLLOWING
  const followingPost = allPosts.filter(post => {
    if(sessionUser.following.map(user => user.id).includes(post.user_id)){
      return post
    }
  })

  followingPost.reverse()

  useEffect(() => {
    window.scroll(0,0)
    dispatch(thunkLoadAllPosts())
  }, [dispatch])

  return (
    <div>
      <div>
        {followingPost.map(post => {
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
