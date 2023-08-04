import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkCreateComment } from '../../store/comment'
import Picker from 'emoji-picker-react'

import './createcomment.css'


export default function CreateCommentForm({postId}) {
  const dispatch = useDispatch()

  const sessionUser = useSelector(state => state.session.user)


  const [errors , setErrors] = useState([])
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [showPicker, setShowPicker] = useState(false)
  const [eventListener, setEventListener] = useState(false);

  useEffect(() => {
    const errs = []

    const whiteSpace = comment.replace(/^>s+/, '').replace(/\s+$/, '')
    if( whiteSpace === '') {
      errs.push('Please enter a valid comment')
    }
    if(comment.length > 150) errs.push("Comment must not exceed 150 characters")
    setErrors(errs)

  },[comment])


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

  const handleDocumentClick = (e) => {
    let isEmojiClassFound = false;
    e &&
    e.composedPath() &&
    e.composedPath().forEach(ele => {
      if (ele && ele.classList) {
        const data = ele.classList.value;
        if (data.includes("emoji")) {
          isEmojiClassFound = true;
        }
      }
    });
    if (isEmojiClassFound === false && e.target.id !== "emojis-btn"){
      setShowPicker(false)
      setEventListener(false);
      document.removeEventListener("click", handleDocumentClick)
    }
  };

  const emojiClick = (e, emojiObj) => {
    if(emojiObj.emoji.length){
      setComment(comment => comment + emojiObj.emoji);
    }
  }

  const openShow = (e) => {
    e.preventDefault();
    if (showPicker === false && !eventListener) {
      document.addEventListener("click", handleDocumentClick, false)
      setEventListener(true)
    }
    setShowPicker(!showPicker)
  }

  return (
    <div className='create-comment-container'>
      <div>
        {submitted && errors.map((error, ind) => (
          <p id='error-comments' key={ind}> * {error}</p>
          )
        )}
      </div>
      <form className='create-comment' onSubmit={onSubmit}>
        <label className="emoji-icon" onClick={openShow}> <i class="fa-regular fa-face-smile fa-xl"></i> </label>
        {showPicker &&
        <div id='emoji-icon-picker'>
          <Picker onClick={showPicker} pickerStyle={{width:'17rem'}} onEmojiClick={emojiClick} />
        </div>
        }
        <textarea
          className='comment-input'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          required
        />
        <div>
          <button className="post-button"type='submit'>Post</button>
        </div>
      </form>

    </div>
  )
}
