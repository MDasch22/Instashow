import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import Modal from 'react-modal'
import { thunkGetSinglePost, thunkDeletePost } from '../../store/posts'
import EditPost from '../EditPost'
import CreateCommentForm from '../CreateComment'
import { thunkGetComments } from '../../store/comment'
import Comments from '../Comments'
import LikeButton from '../LikesButton'


import './singlepost.css'


export default function SinglePost() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { post_id } = useParams()

  const post = useSelector(state => state.post[post_id])
  const comments = useSelector(state => Object.values(state.comment))
  const sessionUser = useSelector(state => state.session.user)

  const [showEllipsis, setShowEllipsis] = useState(false)
  const [showEditPost, setShowEditPost] = useState(false)
  const [submitted , setSubmitted] = useState(false)

  useEffect(() => {
    window.scroll(0,0)
    dispatch(thunkGetSinglePost(post_id))
    dispatch(thunkGetComments(post_id))
  },[dispatch, post_id])


  useEffect(() => {
    const closeEllipsisModal = (e) => {
      if(e.path[0].tagName === 'DIV' ){
        setShowEllipsis(false)
      }
    }
    document.body.addEventListener("click",  closeEllipsisModal)
    return () => document.body.removeEventListener("click", closeEllipsisModal)
  }, [])


  Modal.setAppElement('body');

  function openEditPostForm() {
    setShowEditPost(true)
  }

  function closeEditPostForm() {
    setShowEditPost(false)
  }

  function openEllipsis() {
    setShowEllipsis(true)
  }

  function closeEllipsis(){
    setShowEllipsis(false)
  }

  const formStyles2 = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      minHeight: '100%',
      padding: '12px',
      zIndex: 3,
      backgroundColor: 'rgba(34, 34, 34, 0.65)'
    },
    content: {
      position: 'relative',
      margin: 'auto',
      maxWidth: '300px',
      width: '300px',
      top: '200px',
      height: '100px' ,
      left: '40px',
      right: '40px',
      bottom: '40px',
      border: '1px solid #ccc',
      background: '#fff',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '5px',
      outline: 'none',
      overflow: 'visibile'
    }
};

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
      padding: '12px',
      zIndex: 3,
      backgroundColor: 'rgba(34, 34, 34, 0.65)'
    },
    content: {
      position: 'relative',
      margin: 'auto',
      maxWidth: '800px',
      width: '800px',
      top: '100px',
      left: '40px',
      right: '40px',
      bottom: '40px',
      border: '1px solid #ccc',
      background: '#fff',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '5px',
      outline: 'none',
      padding: " 0, 20px 0",
      overflow: 'visibile'
    }
};

const onDelete = async(e) => {
  await dispatch(thunkDeletePost(post_id))
  history.push(`/${sessionUser.username}`)
}

// const todaysFullDate = new Date()
// const todaysDate = (todaysFullDate.getDate() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
// const todaysMonth = (todaysFullDate.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
// const currentYear = todaysFullDate.getFullYear()


if(!post) return null
if(!comments) return null

  return (
    <div className='single-post'>
      <div className='single-post-container'>
        <img src={post.image} style={{width: 600 ,height: 600}} alt='post-image'></img>
        <div className='single-post-interation'>
          <div className='single-post-profilepic-username'>
            <NavLink id='link-to-ownerProfile' to={`/${post.owner.username}`}>
              <img id='single-post-profilePic' src={post.owner.profile_pic} style={{width: 40 ,height: 40}} alt='post-profile-pic'></img>
              <div id='single-post-username'>{post.owner.username}</div>
            </NavLink>
            {sessionUser.id === post.owner.id &&
              <div>
                <button id="ellipsis-post" onClick={openEllipsis}> <i className="fa-solid fa-ellipsis"></i> </button>
                <Modal className='single-post-edit-modal' isOpen={showEllipsis} style={formStyles2}>
                  <button id="single-post-delete" onClick={onDelete}> Delete </button>
                  <button id="single-post-edit" onClick={openEditPostForm}>Edit</button>
                  <Modal isOpen={showEditPost} style={formStyles}>
                    <EditPost setTrigger={closeEditPostForm}/>
                  </Modal>
                </Modal>
              </div>
            }
          </div>
          <div className='border-bottom-single-post'> </div>
          <div className='single-post-comment-section'>
            <div className='post-caption'>
              <NavLink id='link-caption-user'to={`/${post.owner.username}`}>
                <img id='user-post-profilePic' src={post.owner.profile_pic} style={{width: 30 ,height: 30}} alt='post-profile-pic'></img>
              </NavLink>
              <p id='post-owner-username'>{post.owner.username}</p>
              <p id='user-post-caption'>{post.caption}</p>
            </div>
            <div>
              {comments.map(comment => {
                return(
                  <div className='single-post-single-comment'>
                    <Comments postId={post_id} comment={comment}/>
                  </div>
                )}
              )}
            </div>
          </div>
          <div className='border-bottom-single-post'> </div>
          <div className='single-post-likes-container'>
            <LikeButton post={post}/>
            <div className='single-post-liked-by'>
              {post.likes.length === 0 ?
                  <div className='hidden'> No likes yet</div>
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
            </div>
          </div>
          <div className='post-created'>{post.created_at.split(' ').slice(0, 4).join(' ')}</div>
          <div className='border-bottom-single-post'> </div>
          <div>
            <CreateCommentForm postId={post_id}/>
          </div>
        </div>
      </div>
    </div>
  )
}
