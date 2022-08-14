import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { thunkFollow, thunkUnfollow } from '../../store/session'
import { thunkGetUser } from '../../store/user'

export default function FollowButton({sessionUser, username, userId}) {
  const dispatch = useDispatch()

  const [userFollowing, setUserFollowing] = useState(false)

  useEffect(() => {
    for (let i = 0; i < sessionUser.following.length; i++) {
        let user = sessionUser.following[i]
        if (user.username === username) {
            setUserFollowing(true)
        }
      }
   }, [sessionUser.following, username])


  const follow = async(e) => {
    e.preventDefault()
    setUserFollowing(true)
    const newFollow = await dispatch(thunkFollow(userId))
    if(newFollow){
      if(newFollow.username === username) {
        dispatch(thunkGetUser(username))
      }
      if(sessionUser.username === username){
        dispatch(thunkGetUser(username))
      }
    }
  }

  const unfollow = async(e) => {
    e.preventDefault()
    setUserFollowing(false)
    const removeFollow = await dispatch(thunkUnfollow(userId))
    if(removeFollow){
      if(removeFollow.username === username){
        dispatch(thunkGetUser(username))
      }
      if(sessionUser.username === username) {
        dispatch(thunkGetUser(username))
      }
    }
  }

  return (
    <div>
      {sessionUser.username !== username ?
        <>
          {!userFollowing ?
            <button id="follow-unfollow-bttn" onClick={follow}>
              Follow
            </button>
          :
            <button id="unfollow-bttn" onClick={unfollow}>
              <i className="fa-solid fa-user-check"></i>
            </button>
          }
        </>
        :
        <></>
    }

    </div>
  )

}
