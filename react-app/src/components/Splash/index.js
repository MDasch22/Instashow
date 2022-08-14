import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { thunkGetAllComments } from '../../store/comment'
import { thunkLoadAllPosts } from '../../store/posts'
import { thunkLoadAllUsers } from '../../store/user'
import CreateCommentForm from '../CreateComment'
import FollowButton from '../FollowButton'
import LikeButton from '../LikesButton'

import './splash.css'

export default function HomePage() {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const allPosts = useSelector(state => Object.values(state.post))
  const allUsers = useSelector(state => Object.values(state.user))
  const allComments = useSelector(state => Object.values(state.comment))



  // GETTING POST BY USER FOLLOWING
  let followingPost = allPosts.filter(post => {
    if(sessionUser.following.map(user => user.id).includes(post.user_id)){
      return post
    }
  })

  // GETTING DEMO USER POST IF NEW USER HAS NO FOLLOWERS
  let demoPost = allPosts.filter(post => post.user_id === 1)
  if(sessionUser.following.length === 0) {
    followingPost = demoPost
  }

  // SUGGESTED USER BY USER NOT FOLLOWING
  const userFollowing = sessionUser.following.map(user => user.username)
  const suggested = []

  for(let i = 0; i < allUsers.length -1; i++){
    let userObj = allUsers[i]
    console.log(userObj.username)
    if(!userFollowing) {
      suggested.push(allUsers)
    }
    if(!userFollowing.includes(`${userObj.username}`)){
      suggested.push(userObj)
    }
    else {
      suggested.push(allUsers)
    }
  }

  const suggestedFollower = suggested.filter(user => user.username !== sessionUser.username)

  const radomSuggested = suggestedFollower.sort(() => Math.random() - 0.5)


  followingPost.reverse()

  useEffect(() => {
    window.scroll(0,0)
    dispatch(thunkGetAllComments())
    dispatch(thunkLoadAllPosts())
    dispatch(thunkLoadAllUsers())
  }, [dispatch])

  return (
    <div className='home-page'>
      <div className='splash-container'>
        {followingPost.map(post => {
        return (
          <div className="splash-page-postCard" key={post.id}>
            <NavLink id="splash-page-post-link" to={`/${post.owner.username}`}>
              <img id="splash-page-profile-pic" src={post.owner.profile_pic} style={{width:32, height:32}}></img>
              <div id='username-splash-card'>
                <p id="splash-page-user-username">{post.owner.username}</p>
              </div>
            </NavLink>
            <NavLink to={`/post/${post.id}`}>
              <img id='splash-post-picture' src={post.image} style={{width: 450, height: 500}} alt='post-image'></img>
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
              {post.likes.length === 0 ?
                  <div className='hidden'> no likes yet</div>
                :
                <p>{post.likes.length === 1 ?
                      <div className='liked-by-container'>
                        <img id='liked-by-pic' src={post.likes[0].profile_pic} style={{height:20, width: 20}}></img>
                        <p id='liked-by-usernames'>Liked by {post.likes[0].username} </p>
                      </div>
                    :
                      <div>
                        {post.likes.length === 2 ?
                          <div className='liked-by-container'>
                            <img id='liked-by-pic' src={post.likes[0].profile_pic} style={{height:20, width: 20}}></img>
                            <div id='overlapping-pic'>
                              <img id='overlapping-by-pic' src={post.likes[1].profile_pic} style={{height:20, width: 20}}></img>
                            </div>
                            <p id='liked-by-usernames'>Liked by {post.likes[0].username} and 1 other</p>
                          </div >
                          :
                          <div className='liked-by-container'>
                            <img id='liked-by-pic' src={post.likes[0].profile_pic} style={{height:20, width: 20}}></img>
                            <div id='overlapping-pic'>
                              <img id='overlapping-by-pic' src={post.likes[1].profile_pic} style={{height:20, width: 20}}></img>
                            </div>
                            <p id='liked-by-usernames'>Liked by {post.likes[0].username} and {post.likes.length - 1} others </p>
                          </div>
                        }
                      </div>
                    }
                </p>
              }
              <div className='splash-username-post-caption'>
                <p id="splash-username-post">{post.owner.username}</p>
                <div className='user-caption-slash-post'>
                  <p id="splash-caption-post">{post.caption}</p>
                </div>
              </div>
              <NavLink id="view-all-comments" to={`/post/${post.id}`}>
                <p>View all comments </p>
              </NavLink>
              {/* {post.comments.length ? (
                <div>
                  {post.comments.slice(0, 2).map(comment => {
                    return (
                        <div className='splash-content-comments'>
                          <p id="splash-comment-username">{comment.user.username}</p>
                          <p id="splash-comment-comment">{comment.comment}</p>
                        </div>
                      )
                  })}
                </div>
                ) :
                null
              } */}
            <div id='created-at-splash'>{post.created_at}</div>
            </div>
            <CreateCommentForm postId={post.id}/>
          </div>
          )
        })}
      </div>
      <div className='suggested-users'>
        <div className='border'>
          <NavLink to={`/${sessionUser.username}`} className='user-info-suggest'>
              <img id="user-profile-pic-suggest" src={sessionUser.profile_pic} style={{width:60, height: 60}}></img>
              <div>
                <p id="user-username-suggest" >{sessionUser.username}</p>
                <p id="user-fullname-suggest">{sessionUser.fullname}</p>
              </div>
          </NavLink>
          <div className='suggestion-container'>
            <p id="suggested-for-you">Suggestions For You</p>
            {suggestedFollower.slice(0, 4).map(user => {
            return (
                <NavLink to={`/${user.username}`} className='suggestion-user'>
                  <img id="profile-pic_suggest"src={user.profile_pic} style={{width: 35, height: 35}}></img>
                  <div>
                    <p id="username-suggest">{user.username}</p>
                    <p id="fullname-suggest">{user.fullname}</p>
                  </div>
                </NavLink>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
