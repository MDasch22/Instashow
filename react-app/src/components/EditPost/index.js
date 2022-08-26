import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { thunkEditPost } from '../../store/posts';
import Picker from 'emoji-picker-react'
import './editpost.css'

export default function EditPost({setTrigger}) {
  const dispatch = useDispatch()
  const history = useHistory()
  const { post_id } = useParams()


  const post = useSelector(state => state.post[post_id])

  const [showPicker, setShowPicker] = useState(false)
  const [errors, setErrors] = useState([])
  const [caption, setCaption] = useState(post.caption)
  const [isSubmitted , setIsSubmitted] = useState(false)

  useEffect(() => {
    const err = []
    const whiteSpace = caption.replace(/^>s+/, '').replace(/\s+$/, '')
    if( whiteSpace === '') {
      err.push('Please enter a valid caption')
    }
    if(caption.length < 5 || caption.length > 150) err.push("Caption must be between 5 and  150 characters")
    setErrors(err)
  }, [caption])

  useEffect(() => {
    const closeEmoji = (e) => {
      if(e.path[0].tagName !== "I" && e.path[0].tagName !== "BUTTON" && e.path[0].tagName !== "INPUT"){
        setShowPicker(false)
      }
    }
    document.body.addEventListener("click", closeEmoji)
    return () => document.body.removeEventListener('click', closeEmoji)
  }, [])


  const emojiClick = (e, emojiObj) => {
    if(emojiObj.emoji.length){
      setCaption(caption => caption + emojiObj.emoji);
      setShowPicker(false)
    } else {
      setShowPicker(true)
    }
  }

  const openShow = (e) => {
    setShowPicker(!showPicker)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if(errors.length) return

    const edited_post = dispatch(thunkEditPost(post_id, caption))

    if(edited_post) {
      setTrigger(false)
      return history.push(`/post/${post.id}`)
    }

  }

  const updateCaption = (e) => {
     setCaption(e.target.value)
  }


  if(!post) return null

  return (
    <div>
      <div className='edit-post-header'>
        <button onClick={setTrigger} id="hidden-edit">Cancel</button>
        <p id="edit-modal-header">Edit info</p>
        <button form='edit-post-form' id="submit-edit" type='submit'>Done</button>
      </div>

      <div className='edit-post-container'>
        <div>
          <img id="edit-post-img" src={post.image} style={{width: 500 ,height: 500}} alt='edit-image'></img>
        </div>
        <div className='edit-post-content'>
          <div className='edit-post-form'>
            {isSubmitted && errors.length > 0 && (
              <div>
                <div id="errorHeading">
                  Please fix the following submitting:
                </div>
                <ul>
                  {errors.map((error) => (
                    <ul key={error} id="edit-error">
                      <i className="fas fa-spinner fa-spin" id="spinner"> </i>
                      {error}
                    </ul>
                  ))}
                </ul>
              </div>
            )}
            <div className='edit-post-user-info'>
              <img id="edit-post-user-pp" src={post.owner.profile_pic} style={{width:40, height: 40}}></img>
              <p id="edit-post-user-username">{post.owner.username}</p>
            </div>
            <form id="edit-post-form" onSubmit={handleSubmit}>
              <textarea
                className='edit-caption'
                value={caption}
                placeholder={post.caption}
                onChange={updateCaption}
                required

              />
              <div className='edit-post-caption-emoji'>
                <label id="edit-post-emoji-icon" onClick={openShow}> <i class="fa-regular fa-face-smile fa-xl"></i> </label>
                {showPicker &&
                  <div id="create-edit-picker">
                    <Picker onClick={showPicker} pickerStyle={{width: '17rem' , height: '15rem'}} onEmojiClick={emojiClick} />
                  </div>
                }
              </div>
              <div className={caption.length >= 140 ? "red" : "normal"}>
                <p>{caption.length} / 150</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
