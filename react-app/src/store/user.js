const LOAD_ALL_USERS = 'session/LOAD_ALL_USERS'
const GET_USER = 'session/GET_USER'
const UPDATE_USER = 'session/UPDATE_USER'

export const actionLoadAllUsers = (users) => {
  return {
    type: LOAD_ALL_USERS,
    users
  }
}


export const actionGetUser = (user) => {
  return {
    type: GET_USER,
    user
  }
}

export const actionUpdateUser = (user) => {
  return {
    type: UPDATE_USER,
    user
  }
}

export const thunkLoadAllUsers = () => async(dispatch) => {
  const response = await fetch('/api/users/')

  if(response.ok){
    const users = await response.json()
    dispatch(actionLoadAllUsers(users))
    return users;
  }
}


export const thunkGetUser = (username) => async(dispatch) => {
  const response = await fetch(`/api/users/profile/${username}`)

  if(response.ok){
    const data = await response.json()
    dispatch(actionGetUser(data))
    return data
  }
}



const initialState = {}
const userReducer = (state = initialState, action) => {
  let newState = {...state}
  switch(action.type) {
    case GET_USER:
      newState = {}
      newState[action.user.username] = action.user
      return newState

    case LOAD_ALL_USERS:
      newState = {}
      action.users.users.forEach(user => {
        newState[user.id] = user
      })
      return newState


    default:
      return state
  }

}

export default userReducer;
