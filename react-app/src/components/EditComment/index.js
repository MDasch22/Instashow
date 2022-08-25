import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import { thunkEditComment } from '../../store/comment'
import Picker from 'emoji-picker-react'

import './editcomment.css'

export default function EditCommentForm({ postId ,currentComment, closeForm}) {
  const dispatch = useDispatch()

  const [showPicker, setShowPicker] = useState(false)
  const [comment , setComment ] = useState(currentComment.comment)
  const [errors , setErrors] = useState([])
  const [submited , setSubmitted] = useState(false)

  const commentId = currentComment.id

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

  const onSubmit = async(e) => {
    e.preventDefault()
    setSubmitted(true)

    if(errors.length) return

    const updateComment = await dispatch(thunkEditComment(commentId, comment))

    if(updateComment) {
      closeForm()
    }
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

    <div className='edit-comment-form'>
      <div >
        {submited && errors.map((error, ind) => (
          <p id='error-edit-comments' key={ind}> * {error}</p>
          )
        )}
      </div>
      <form className='edit-form-comment' onSubmit={onSubmit}>
        <div id="edit-emoji-text">
          <label className='edit-emoji-splash-picker' onClick={openShow}> <i class="fa-regular fa-face-smile fa-lg"></i> </label>
            {showPicker &&
              <div id="editcomment-splash-emoji-picker">
                <Picker onClick={showPicker} pickerStyle={{width: '17rem' , height: '15rem'}} onEmojiClick={emojiClick} />
              </div>

            }
          <textarea
            id='edit-comment-input'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Edit your comment..."
            required
          />
          </div>
      <div className='edit-comment-buttons'>
        <button id="done-edit" type='submit'>Done</button>
        <button id="cancel-edit-comment" onClick={() => closeForm()}>Cancel</button>
      </div>
      </form>
    </div>
  )
}
