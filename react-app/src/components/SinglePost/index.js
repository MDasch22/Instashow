import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams, NavLink } from 'react-router-dom'
import Modal from 'react-modal'
import { thunkGetSinglePost } from '../../store/posts'
import EditPost from '../EditPost'
import CreateCommentForm from '../CreateComment'


export default function SinglePost() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { post_id } = useParams()

  const post = useSelector(state => state.post[post_id])
  const sessionUser = useSelector(state => state.session.user)

  const [showEditPost, setShowEditPost] = useState(false)
  const [submitted , setSubmitted] = useState(false)

  useEffect(() => {

    dispatch(thunkGetSinglePost(post_id))
  },[dispatch])

  Modal.setAppElement('body');

  function openEditForm() {
    setShowEditPost(true)
  }

  function closeEditForm() {
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
      maxWidth: '500px',
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
      padding: '0px 18px 18px',
      overflow: 'visibile'
    }
};

if(!post) return null

  return (
    <div>
      <img src={post.image} style={{width: 500 ,height: 500}} alt='post-image'></img>
      <img src={post.owner.profile_pic} style={{width: 70 ,height: 70}} alt='post-profile-pic'></img>
      <div>{post.created_at}</div>
      <div>{post.owner.username}</div>
      <div>{post.caption}</div>
      <div className='edit-modal'>
        <button onClick={openEditForm}>Edit</button>
        <Modal isOpen={showEditPost} style={formStyles}>
          <button onClick={closeEditForm}>X</button>
          <EditPost setTrigger={setShowEditPost}/>
        </Modal>
      </div>
      <div>
        {post.comments && post.comments.map(comment => {
        return (
          <div>
            <div>{comment.user.username}</div>
            <div>{comment.comment}</div>
          </div>
          )}
        )}
      </div>
      <div>
          <CreateCommentForm postId={post_id}/>
      </div>

    </div>
  )
}
