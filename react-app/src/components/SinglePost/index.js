import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import Modal from 'react-modal'
import { thunkGetSinglePost } from '../../store/posts'
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


  const [showEditPost, setShowEditPost] = useState(false)
  const [submitted , setSubmitted] = useState(false)

  useEffect(() => {
    window.scroll(0,0)
    dispatch(thunkGetSinglePost(post_id))
    dispatch(thunkGetComments(post_id))
  },[dispatch, post_id])


  Modal.setAppElement('body');

  function openEditPostForm() {
    setShowEditPost(true)
  }

  function closeEditPostForm() {
    setShowEditPost(false)
  }

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
      backgroundColor: 'rgba(34, 34, 34, 0.65)'
    },
    content: {
      position: 'relative',
      margin: 'auto',
      maxWidth: '600px',
      width: '100%',
      top: '40px',
      left: '40px',
      right: '40px',
      bottom: '40px',
      border: '1px solid #ccc',
      background: '#fff',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '24px',
      outline: 'none',
      // padding: 0,
      overflow: 'visibile'
    }
};

const todaysFullDate = new Date()
const todaysDate = (todaysFullDate.getDate() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
const todaysMonth = (todaysFullDate.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
const currentYear = todaysFullDate.getFullYear()

console.log(todaysDate)

if(!post) return null
if(!comments) return null

  return (
    <div className='single-post'>
      <div className='single-post-container'>
        <div>
          <img src={post.image} style={{width: 600 ,height: 600}} alt='post-image'></img>
        </div>
        <div className='single-post-interation'>
          <div className='single-post-profilepic-username'>
            <img id='single-post-profilePic' src={post.owner.profile_pic} style={{width: 40 ,height: 40}} alt='post-profile-pic'></img>
            <div id='single-post-username'>{post.owner.username}</div>
            {sessionUser.id === post.owner.id &&
              <div className='single-post-edit-modal'>
                <button id='edit-post-bttn' onClick={openEditPostForm}><i className="fa-regular fa-pen-to-square fa-lg"></i></button>
                <Modal isOpen={showEditPost} style={formStyles}>
                  <button onClick={closeEditPostForm}>X</button>
                  <EditPost setTrigger={setShowEditPost}/>
                </Modal>
              </div>
            }
          </div>
          <div className='border-bottom-single-post'> </div>
          <div className='single-post-comment-section'>
            <div className='post-caption'>
              <img id='user-post-profilePic' src={post.owner.profile_pic} style={{width: 30 ,height: 30}} alt='post-profile-pic'></img>
              <div id='post-owner-username'>{post.owner.username}</div>
              <p id='user-post-caption'>{post.caption}</p>
            </div>
            <div>
              {comments.map(comment => {
                return(
                  <div className='single-post-single-comment'>
                    <Comments postId={post_id}comment={comment}/>
                  </div>
                )}
                )}
            </div>
          </div>
          <div className='border-bottom-single-post'> </div>
          <LikeButton post={post}/>
          <div className='post-created'>{post.created_at}</div>
          <div className='border-bottom-single-post'> </div>
          <div>
            <CreateCommentForm postId={post_id}/>
          </div>
        </div>
      </div>
    </div>
  )
}
