import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import Modal from 'react-modal'
import { thunkDeletePost, thunkLoadAllPosts} from '../../store/posts'
import EditPost from '../EditPost'
import CreateCommentForm from '../CreateComment'
import { thunkGetComments } from '../../store/comment'
import Comments from '../Comments'
import LikeButton from '../LikesButton'
import LikesOnPost from '../LikesOnPost'


import './singlepost.css'
import ExplorePagePost from '../ExplorePagePostCard'
import PostTime from '../PostTime'


export default function SinglePost() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { post_id } = useParams()

  const posts = useSelector(state => state.post)
  const comments = useSelector(state => Object.values(state.comment))
  const sessionUser = useSelector(state => state.session.user)

  const [showEllipsis, setShowEllipsis] = useState(false)
  const [showEditPost, setShowEditPost] = useState(false)
  const [submitted , setSubmitted] = useState(false)

  const post = posts[post_id]

  const allPosts = Object.values(posts)
  const usersPosts = allPosts.filter(daPost => daPost?.owner.id === post?.owner.id)
  const usersPost = usersPosts.filter(singPost => singPost.id !== post.id)


  useEffect(() => {
    window.scroll(0,0)
    dispatch(thunkLoadAllPosts())
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
    setShowEllipsis(false)
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
      zIndex: 12,
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
      zIndex: 12,
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



if(!post) return null
if(!comments) return null

  return (
    <div>
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
                  </Modal>
                  <Modal isOpen={showEditPost} style={formStyles}>
                    <EditPost setTrigger={closeEditPostForm}/>
                  </Modal>
                </div>
              }
            </div>
            <div className='border-bottom-single-post'> </div>
            <div className='single-post-comment-section'>
              <span className='post-caption'>
                <NavLink id='link-caption-user'to={`/${post.owner.username}`}>
                  <img id='user-post-profilePic' src={post.owner.profile_pic} style={{width: 32 ,height: 32}} alt='post-profile-pic'></img>
                </NavLink>
                <p id='post-owner-username'>{post.owner.username}</p>
                <p id='user-post-caption'>{post.caption}</p>
              </span>
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
                <LikesOnPost likes={post.likes}/>
              </div>
            </div>
            <div id="singlePost-time">
              <PostTime post={post} />
            </div>
            <div className='border-bottom-single-post'> </div>
            <div>
              <CreateCommentForm postId={post_id}/>
            </div>
          </div>
        </div>
      </div>
      <div className='more-posts'>
        {usersPost.length > 0 ?
          <div className='more-posts-section'>
            <p id="more-post-by">More post from <NavLink id="more-post-link" to={`/${post.owner.username}`}><b style={{color: 'black'}}>{post.owner.username}</b></NavLink></p>
            <div id="more-post-images">
              {usersPost.slice(0,6).map(post => {
                return (
                    <div>
                     <ExplorePagePost post={post}/>
                    </div>
                  )
                })}
            </div>
          </div>
          :
          null
        }
      </div>
    </div>
  )
}
