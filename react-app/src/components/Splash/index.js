import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkLoadAllPosts } from '../../store/posts'

export default function HomePage() {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const allPosts = useSelector(state => Object.values(state.post))

  allPosts.reverse()

  useEffect(() => {
    dispatch(thunkLoadAllPosts())
  }, [dispatch])

  return (
    <div>
      <div>
        {allPosts.map(post => {
        return (
          <div key={post.id}>
            <img src={post.image} style={{width: 400, height: 300}} alt='post-image'></img>
            <div>{post.created_at}</div>
            <div>{post.ownerUsername}</div>
            <div>{post.caption}</div>

          </div>
          )
        }) }
      </div>

    </div>
  )
}
