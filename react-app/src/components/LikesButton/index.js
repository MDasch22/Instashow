import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkAddLike, thunkDeleteLike } from '../../store/posts'
import './likebutton.css'

export default function LikeButton({post}) {
  const dispatch = useDispatch()

  const sessionUser = useSelector(state => state.session.user)

  const [like, setLike] = useState(false);

  useEffect(() => {
    console.log(post.likes)
    if(post.likes.find(user => user.username === sessionUser.username)){
      setLike(true)
    } else {
      setLike(false)
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
    <div className='like-container'>
      {!like ? (

        <button className="like-button"onClick={liking}> <i id='like' className="fa-regular fa-heart fa-2x"></i></button>

      ) : (

        <button className='unlike-button' onClick={unliking}> <i id='unlike' className="fa-solid fa-heart fa-2x"></i></button>

      )}
    </div>
  )
}
