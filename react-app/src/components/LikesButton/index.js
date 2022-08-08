import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkAddLike, thunkDeleteLike } from '../../store/posts'
import './likebutton.css'

export default function LikeButton({post}) {
  const dispatch = useDispatch()

  const sessionUser = useSelector(state => state.session.user)

  const [like, setLike] = useState(false);

  useEffect(() => {
    if(post.likes.includes(user => user.username === sessionUser.username)){
      setLike(true)
    }
  }, [post.likes, sessionUser.username])

  const liking = async(e) => {
    e.preventDefault()
    await dispatch(thunkAddLike(post.id))
    setLike(true)
  }

  const unliking = async(e) => {
    e.preventDefault()
    await dispatch(thunkDeleteLike(post.id))
    setLike(false)
  }


  return (
    <div>
      {!like ? (

        <button className="like-button"onClick={liking}> <i id='like' className="fa-solid fa-heart fa-2x"> </i></button>

      ) : (

        <button className='unlike-button' onClick={unliking}> <i id='unlike' className="fa-solid fa-heart fa-2x"> </i> </button>

      )}

      {post.likes.length >= 1 && (
        <>
          <div>{post.likes.length} likes</div>
        </>
      )}
    </div>
  )
}
