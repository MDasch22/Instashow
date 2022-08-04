import CreatePost from "../components/CreatePost"

const LOAD_ALL_POST = 'posts/loadAllPosts'

const CREATE_POST = 'posts/createPost'





export const actionLoadAllPosts = (posts) => {
  return {
    type: LOAD_ALL_POST,
    posts
  }
}

export const actionCreatePost = (post) => {
  return {
    type: CREATE_POST,
    post
  }
}





export const thunkLoadAllPosts = () => async(dispatch) => {
  const response = await fetch('/api/posts/')

  if(response.ok){
    const data = await response.json()
    dispatch(actionLoadAllPosts(data))
    return data
  }
}


export const thunkCreatePost = (formData) => async(dispatch) => {
  const response = await fetch('/api/posts/new', {
    method: "POST",
    body: formData
  })

  if(response.ok) {
    const data = await response.json()
    dispatch(actionCreatePost(data))
    return data
  }
  else {
    const error = await response.json()
    return error
  }
}






const initialState = {}

const postReducer = (state = initialState, action) => {
  let newState = {...state}
  switch(action.type) {
    case LOAD_ALL_POST:
      newState = {}
      action.posts.all_posts.forEach(post => {
        newState[post.id] = post
      })
      return newState

    case CREATE_POST:
      newState[action.post.id] = action.post
      return newState


    default:
      return state
  }
}


export default postReducer
