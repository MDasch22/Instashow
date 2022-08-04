import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { thunkEditPost, thunkGetSinglePost, thunkLoadAllPosts } from '../../store/posts';

export default function EditPost() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { post_id } = useParams()

  const post = useSelector(state => state.post[post_id])
  const sessionUser = useSelector(state => state.session.user)




  const [caption, setCaption] = useState(``)
  const [isSubmitted , setIsSubmitted] = useState(false)

  const updateCaption = async(e) => {
    setCaption(e.target.value)
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const edited_post = await dispatch(thunkEditPost(post_id, caption))

    if(edited_post) {
      alert ("Post was edited")
      return history.push('/')
    }
  }

  useEffect(() => {
    dispatch(thunkGetSinglePost(post_id))
  },[dispatch])

  if(!post) return null

  return (
    <div>
      <h1>Edit Post</h1>
      <img src={post.image} style={{width: 400 ,height: 400}} alt='edit-image'></img>
      <form onSubmit={handleSubmit}>
        <textarea
          value={caption}
          placeholder={post.caption}
          onChange={updateCaption}
        />
        <button type='submit'>Edit Post</button>
      </form>
    </div>
  )
}
