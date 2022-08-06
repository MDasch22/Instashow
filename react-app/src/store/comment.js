// ---------------------------------------------------------- TYPE

const GET_COMMENTS = 'comments/getComments'
const CREATE_COMMENT = 'comments/createComment'
const EDIT_COMMENT = 'comments/editComment'
const DELETE_COMMENT = 'comments/deleteComment'

// ----------------------------------------------------------ACTION

export const actionGetComments = (comments) => {
  return {
    type: GET_COMMENTS,
    comments
  }
}

export const actionCreateComment = (comment) => {
  return {
    type: CREATE_COMMENT,
    comment
  }
}

export const actionEditComment = (comment) => {
  return {
    type: EDIT_COMMENT,
    comment
  }
}

export const actionDeleteComment = (commentId) => {
  return {
    type: DELETE_COMMENT,
    commentId,

  }
}

// ----------------------------------------------------------THUNKS

export const thunkGetComments = (post_id) => async(dispatch) => {
  const response = await fetch(`/api/comments/${post_id}`)

  if(response.ok) {
    const data = await response.json()
    dispatch(actionGetComments(data))
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
    const data = await response.json()
    if(data.errors) {
      return data.errors
    }
  }
}

export const thunkEditComment = (commentId, edited_comment) => async(dispatch) => {
  const response = await fetch(`/api/comments/${commentId}/edit`, {
    method: "PUT",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      commentId,
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

export const thunkDeleteComment = (commentId) => async(dispatch) => {
  const response = await fetch(`/api/comments/${commentId}/delete`, {
    method: 'DELETE'

  })
  if(response.ok) {
    const deletedComment = await response.json()
    dispatch(actionDeleteComment(commentId))
    return deletedComment
  }
}

// ----------------------------------------------------------REDUCER

const initialState = {}

const commentReducer = (state = initialState, action) => {
  let newState = {...state}
  switch(action.type) {
    case GET_COMMENTS:
      newState = {}
      action.comments.comments.forEach(comment => {
        newState[comment.id] = comment
      })
      return newState

    case CREATE_COMMENT:
      newState[action.comment.id] = action.comment
      return newState


    case DELETE_COMMENT:
      delete newState[action.commentId]
      return newState

    default:
      return state
  }
}


export default commentReducer;
