// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const USER_FOLLOW = 'session/USER_FOLLOW';
const USER_UNFOLLOW = 'session/USER_UNFOLLOW';

export const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

export const actionFollow = (user) => {
  return {
    type: USER_FOLLOW,
    user
  }
}

export const actionUnfollow = (user) => {
  return {
    type: USER_UNFOLLOW,
    user
  }
}

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (username, email, password, fullname) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      fullname,
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  }
  // else if (response.status < 500) {
  //   const data = await response.json();
  //   if (data.errors) {
  //     return data.errors;
  //   }
  // } else {
  //   return ['An error occurred. Please try again.']
  // }
}

export const thunkEditUser = (id, email, fullname, username, bio) => async(dispatch) => {
  const response = await fetch(`/api/users/profile/${id}/edit`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      id, email, fullname, username, bio
    })
  })
  if (response.ok) {
    const data = await response.json()
    dispatch(setUser(data))
    return "success"
  }
}

export const thunkFollow = (userId) => async(dispatch) => {
  const response = await fetch(`/api/follows/follow/${userId}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
  });

  if(response.ok){
    const data = await response.json()
    dispatch(actionFollow(data))
    return data
  }
}

export const thunkUnfollow = (userId) => async(dispatch) => {
  const response = await fetch(`/api/follows/unfollow/${userId}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
  });

  if(response.ok){
    const data = await response.json()
    dispatch(actionUnfollow(data))
    return data
  }
}

export default function reducer(state = initialState, action) {
  let newState = {...state}
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    case USER_FOLLOW:
      newState.user.following.push(action.user)
      return newState
    case USER_UNFOLLOW:
      const i = newState.user.following.indexOf(action.user.id)
      newState.user.following.splice(i, 1)
      return newState
    default:
      return state;
  }
}
