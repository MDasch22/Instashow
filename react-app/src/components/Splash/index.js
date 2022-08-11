import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { thunkLoadAllPosts } from '../../store/posts'
import CreateCommentForm from '../CreateComment'
import LikeButton from '../LikesButton'

import './splash.css'

export default function HomePage() {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const allPosts = useSelector(state => Object.values(state.post))

  // GETTING POST BY USER FOLLOWING
  let followingPost = allPosts.filter(post => {
    if(sessionUser.following.map(user => user.id).includes(post.user_id)){
      return post
    }
  })

  // GETTING DEMO USER POST IF NEW USER HAS NO FOLLOWERS
  const demoPost = allPosts.filter(post => post.user_id === 1)
  if(sessionUser.following.length === 0) {
    followingPost = demoPost
  }


  followingPost.reverse()

  useEffect(() => {
    window.scroll(0,0)
    dispatch(thunkLoadAllPosts())
  }, [dispatch])

  return (
    <div>
      <div className='splash-container'>
        {followingPost.map(post => {
        return (
          <div className="splash-page-postCard" key={post.id}>
            <NavLink id="splash-page-post-link" to={`/${post.owner.username}`}>
              <img id="splash-page-profile-pic" src={post.owner.profile_pic} style={{width:30, height:30}}></img>
              <p id="splash-page-user-username">{post.owner.username}</p>
            </NavLink>
            <NavLink to={`/post/${post.id}`}>
              <img src={post.image} style={{width: 450, height: 500}} alt='post-image'></img>
            </NavLink>
            <div className='like-comment-splash-buttons'>
              <div className='like-button-splash'>
                <LikeButton post={post}/>
              </div>
              <NavLink id="comment-link-splash"to={`/post/${post.id}`}>
                <button id="comment-button-splash" ><i className="fa-regular fa-comment fa-2x"></i></button>
              </NavLink>
            </div>
            <div className='splash-post-content-info'>
              <p>{post.likes.length} likes </p>
              <div className='splash-username-post-caption'>
                <p id="splash-username-post">{post.owner.username}</p>
                <p id="splash-caption-post">{post.caption}</p>
              </div>
              {post.comments.length ? (
                <div>
                  <NavLink to={`/post/${post.id}`}>
                    <p>view all {post.comments.length} comments </p>
                  </NavLink>
                  {post.comments.slice(0, 2).map(comment => {
                    return (
                        <div>
                          <p>{comment.user.username}</p>
                          <p>{comment.comment}</p>
                        </div>
                      )
                  })}
                </div>
                ) :
                null
              }
            <div>{post.created_at}</div>
            </div>
            <CreateCommentForm postId={post.id}/>
          </div>
          )
        })}
      </div>
    </div>
  )
}
