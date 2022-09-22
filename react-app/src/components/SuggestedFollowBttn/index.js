import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { thunkFollow, thunkUnfollow } from '../../store/session'
import { thunkGetUser, thunkLoadAllUsers } from '../../store/user'

export default function SuggestedFollow({sessionUser, username, userId}) {
  const dispatch = useDispatch()

  const follow = async(e) => {
  e.preventDefault()

  const newFollow = await dispatch(thunkFollow(userId))
  if(newFollow){
    if(newFollow.username === username) {
      dispatch(thunkLoadAllUsers())
    }
    if(sessionUser.username === username){
      dispatch(thunkLoadAllUsers())
    }
  }
}

  return (
    <div>
      <button className='suggested-follow' onClick={follow}>
        Follow
      </button>
    </div>
  )
}
