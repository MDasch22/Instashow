
// ---------------------------------------------------------- TYPE

const LOAD_ALL_POST = 'posts/loadAllPosts'
const GET_SINGLE_POST = 'posts/getSinglePost'
const LOAD_USER_POSTS = 'posts/loadUserPosts'
const LOAD_FOLLOWING_POSTS = 'post/FollowingPosts'

const CREATE_POST = 'posts/createPost'

const EDIT_POST = 'posts/editPost'
const DELETE_POST = 'posts/deletePost'

const CREATE_COMMENT = 'posts/createComment'
const EDIT_COMMENT = 'posts/editComment'
const DELETE_COMMENT = 'posts/deleteComment'

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

export const actionLoadFollowingPosts = (posts) => {
  return {
    type: LOAD_FOLLOWING_POSTS,
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

export const actionDeletePost = (postId) => {
  return {
    type: DELETE_POST,
    postId
  }
}

export const actionCreateComment = (post) => {
  return {
    type: CREATE_COMMENT,
    post
  }
}

export const actionEditComment = (post) => {
  return {
    type: EDIT_COMMENT,
    post
  }
}

export const actionDeleteComment = (postId, commentId) => {
  return {
    type: DELETE_COMMENT,
    postId,
    commentId,

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

export const thunkLoadFollowingUserPosts = (id) => async(dispatch) => {
  const response = await fetch (`/api/posts/explore/${id}`)

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

export const thunkCreateComment = (postId, new_comment) => async(dispatch) => {

  const response = await fetch('/api/comments/new', {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      postId,
      new_comment
    })
  })

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

export const thunkEditComment = (postId, edited_comment) => async(dispatch) => {
  const response = await fetch('/api/comments/new', {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      postId,
      edited_comment
    })
  })

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

export const thunkDeleteComment = (postId, commentId) => async(dispatch) => {
  console.log('THIS IS THE POSTiD : ', postId)
  console.log("This is the comment Id: ", commentId)
  const response = await fetch(`/api/comments/${commentId}/delete`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      postId,
      commentId
    })
  })
  if(response.ok) {
    const data = await response.json()
    dispatch(actionDeleteComment(data))
  }
}

export const thunkAddLike = (post_id) => async(dispatch) => {
  const response = await fetch(`/api/posts/like/${post_id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
  })

  if(response.ok) {
    const data = await response.json()
    dispatch(actionEditPost(data))
    return data;
  }
}

export const thunkDeleteLike = (post_id) => async(dispatch) => {
  const response = await fetch (`/api/posts/unlike/${post_id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'}
  })

  if(response.ok) {
    const data = await response.json()
    dispatch(actionEditPost(data))
    return data;
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

    case LOAD_FOLLOWING_POSTS:
      newState = {}
      action.posts.posts.forEach(post => {
        newState[post.id] = post
      })
      return newState;

    case CREATE_POST:
      newState[action.post.id] = action.post
      return newState;

    case EDIT_POST:
      newState[action.post.id] = action.post
      return newState

    case DELETE_POST:
      delete newState[action.postId]
      return newState

    case CREATE_COMMENT:
      newState[action.post.id] = action.post
      return newState

    case EDIT_COMMENT:
      newState[action.post.id] = action.post
      return newState

    case DELETE_COMMENT:
      delete newState[action.postId]?.comments[action.commentId]
      return newState

    default:
      return state;
  }
}


export default postReducer
