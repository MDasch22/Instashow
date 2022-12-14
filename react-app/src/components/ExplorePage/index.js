import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkLoadAllPosts } from '../../store/posts'
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

  const toTop = () => {
    window.scroll(0, 0)
  }

  return (
    <div className='explore-container'>
      <h1 className='explore-title'>Explore Page</h1>
      <div className='explore-image-card'>
        {shuffledPosts.map(post => {
        return (
          <ExplorePagePost post={post}/>
          )
        }) }
      </div>
      <p onClick={toTop} id="to-the-top">Back to the top</p>
    </div>
  )
}
