import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkCreateComment } from '../../store/comment'
import Picker from 'emoji-picker-react'

import './newComment.css'

export default function NewComment({postId}) {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)

  const [showPicker, setShowPicker] = useState(false)
  const [errors , setErrors] = useState([])
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const errs = []

    const whiteSpace = comment.replace(/^>s+/, '').replace(/\s+$/, '')
    if( whiteSpace === '') {
      errs.push('Please enter a valid comment')
    }
    if(comment.length > 150) errs.push("Comment must not exceed 150 characters")
    setErrors(errs)

  },[comment])

  useEffect(() => {
    const closeEmoji = (e) => {
      if(e.path[0].tagName !== "I" && e.path[0].tagName !== "BUTTON" && e.path[0].tagName !== "INPUT"){
        setShowPicker(false)
      }
    }
    document.body.addEventListener("click", closeEmoji)
    return () => document.body.removeEventListener('click', closeEmoji)
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)

    if(errors.length) return

    const data = {
      user_id: sessionUser.id,
      post_id: postId,
      comment: comment
    }

    const newComment = dispatch(thunkCreateComment(postId, data))
    if(newComment){
      reset()
    }
  }

  const reset = () => {
    setComment('')
    setSubmitted(false)
    setErrors([])
  }

  const emojiClick = (e, emojiObj) => {
    if(emojiObj.emoji.length){
      setComment(comment => comment + emojiObj.emoji);
      setShowPicker(false)
    } else {
      setShowPicker(true)
    }
  }

  const openShow = (e) => {
    setShowPicker(!showPicker)
  }


  return (
    <div className='new-comment-splash'>
       <div>
        {submitted && errors.map((error, ind) => (
          <p id='error-comments' key={ind}> * {error}</p>
          )
        )}
      </div>
      <form onSubmit={onSubmit} id="newcomment-splash-form">
        <label className='emoji-splash-picker' onClick={openShow}> <i class="fa-regular fa-face-smile fa-xl"></i> </label>
        {showPicker &&
          <div id="newcomment-splash-emoji-picker">
            <Picker onClick={showPicker} pickerStyle={{width: '17rem'}} onEmojiClick={emojiClick} />
          </div>

        }
        <textarea
          className='newcomment-splash-input'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          required
        />
        <div>
          <button className='newcomment-splash-post' type='submit'>Post</button>
        </div>
      </form>
    </div>
  )
}
