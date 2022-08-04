
// ---------------------------------------------------------- TYPE

const LOAD_ALL_POST = 'posts/loadAllPosts'
const GET_SINGLE_POST = 'posts/getSinglePost'
const LOAD_USER_POSTS = 'posts/loadUserPosts'
const CREATE_POST = 'posts/createPost'
const EDIT_POST = 'posts/editPost'

// ----------------------------------------------------------ACTION

export const actionLoadAllPosts = (posts) => {
  return {
    type: LOAD_ALL_POST,
    posts
  }
}

export const actionGetSinglePost = (post) => {
  return {
    type: GET_SINGLE_POST,
    post
  }
}

export const actionLoadUserPosts = (posts) => {
  return {
    type: LOAD_USER_POSTS,
    posts
  }
}

export const actionCreatePost = (post) => {
  return {
    type: CREATE_POST,
    post
  }
}

export const actionEditPost = (post) => {
  return {
    type: EDIT_POST,
    post
  }
}

// ----------------------------------------------------------THUNKS

export const thunkLoadAllPosts = () => async(dispatch) => {
  const response = await fetch('/api/posts/')

  if(response.ok){
    const data = await response.json()
    dispatch(actionLoadAllPosts(data))
    return data
  }
}

export const thunkGetSinglePost = (post_id) => async(dispatch) => {
  const response = await fetch(`/api/posts/${post_id}`)

  if(response.ok){
    const data = await response.json()
    dispatch(actionGetSinglePost(data))
    return data
  }
}


export const thunkLoadUserPosts = (username) => async(dispatch) => {
  const response = await fetch (`/api/posts/${username}`)

  if (response.ok) {
    const data = await response.json()
    dispatch(actionLoadUserPosts(data))
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

export const thunkEditPost = (post_id, caption) => async(dispatch) => {
  const response = await fetch(`/api/posts/${post_id}/edit`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({caption})
  })

  if(response.ok){
    const data = await response.json()
    dispatch(actionEditPost(data))
    return data
  }
}



// ----------------------------------------------------------REDUCER

const initialState = {}

const postReducer = (state = initialState, action) => {
  let newState = {...state}
  switch(action.type) {
    case LOAD_ALL_POST:
      newState = {}
      action.posts.all_posts.forEach(post => {
        newState[post.id] = post
      })
      return newState;

    case GET_SINGLE_POST:
      newState = {}
      newState[action.post.id] = action.post
      return newState

    case LOAD_USER_POSTS:
      newState = {}
      action.posts.user_posts.forEach(post => {
        newState[post.id] = post
      })
      return newState;

    case CREATE_POST:
      newState[action.post.id] = action.post
      return newState;

    case EDIT_POST:
      newState[action.post.id] = action.post
      return newState


    default:
      return state;
  }
}


export default postReducer
