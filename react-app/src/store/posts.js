
// ---------------------------------------------------------- TYPE

const LOAD_ALL_POST = 'posts/loadAllPosts'
const GET_SINGLE_POST = 'posts/getSinglePost'
const LOAD_USER_POSTS = 'posts/loadUserPosts'
const CREATE_POST = 'posts/createPost'
const CREATE_COMMENT = 'posts/createComment'
const EDIT_POST = 'posts/editPost'
const DELETE_POST = 'posts/deletePost'

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

export const actionCreateComment = (post) => {
  return {
    type: CREATE_COMMENT,
    post
  }
}

export const actionEditPost = (post) => {
  return {
    type: EDIT_POST,
    post
  }
}

export const actionDeletePost = (postId) => {
  return {
    type: DELETE_POST,
    postId
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

export const thunkCreateComment = (postId, new_comment) => async(dispatch) => {
  // console.log("this is the postId: ", postId)
  // console.log('this is the new_comment: ', new_comment)
  const response = await fetch('/api/comments/new', {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      postId,
      new_comment
    })
  })
  console.log("this is the body being fetched: ", response.body)
  console.log("This is the response: ", response)
  if(response.ok) {
    const data = await response.json()
    dispatch(actionCreateComment(data))
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
  else {
    const error = await response.json()
    return error
  }
}

export const thunkDeletePost = (post_id) => async(dispatch) => {
  const response = await fetch(`/api/posts/${post_id}/delete`, {
    method: 'DELETE',
  })

  if(response.ok) {
    const data = await response.json()
    dispatch(actionDeletePost(post_id))
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

    case CREATE_COMMENT:
      newState[action.post.id] = action.post
      return newState

    case EDIT_POST:
      newState[action.post.id] = action.post
      return newState

    case DELETE_POST:
      delete newState[action.postId]
      return newState

    default:
      return state;
  }
}


export default postReducer
