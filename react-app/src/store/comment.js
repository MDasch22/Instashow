// ---------------------------------------------------------- TYPE

const GET_COMMENTS = 'comments/getComments'
const GET_ALL_COMMENTS = 'comments/getAllComments'
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
export const actionGetAllComments = (comments) => {
  return {
    type: GET_ALL_COMMENTS,
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
  const response = await fetch(`/api/posts/${post_id}/comments`)

  if(response.ok) {
    const data = await response.json()
    dispatch(actionGetComments(data))
    return data
  }
}

export const thunkGetAllComments = (post_id) => async(dispatch) => {
  const response = await fetch(`/api/comments/`)

  if(response.ok) {
    const data = await response.json()
    dispatch(actionGetComments(data))
    return data
  }
}


export const thunkCreateComment = (postId, data) => async(dispatch) => {

  const response = await fetch(`/api/posts/${postId}/comments/new`, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(
      data
    )
  })

  if(response.ok) {
    const data = await response.json()
    dispatch(actionCreateComment(data))
    return data
  }
  // else {
  //   const data = await response.json()
  //   if(data.errors) {
  //     return data.errors
  //   }
  // }
}

export const thunkEditComment = (commentId, comment) => async dispatch => {
  const response = await fetch(`/api/comments/${commentId}/edit`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({comment})
  })

  if (response.ok) {
      const data = await response.json();
      dispatch(actionEditComment(data));
      return data
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

    case GET_ALL_COMMENTS:
      newState = {}
      action.comments.comments.forEach(comment => {
        newState[comment.id] = comment
      })
      return newState

    case CREATE_COMMENT:
      newState[action.comment.id] = action.comment
      return newState

    case EDIT_COMMENT:
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
