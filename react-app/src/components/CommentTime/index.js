import React from 'react'
import './commentTime.css'


export default function CommentTime({comment}) {

  const months = {
    'Jan': 'January',
    'Feb': 'February',
    'Mar': 'March',
    'Apr': 'April',
    'May': 'May',
    'Jun': 'June',
    'Jul': 'July',
    'Aug': 'August',
    'Sep': 'September',
    'Oct': 'October',
    'Nov': 'November',
    'Dec': 'December',
  }

  const today = new Date()
  const todayGMT = today.toUTCString();
  const currentDateArr = todayGMT.split(' ')
  const dayToday = currentDateArr[1]
  const monthToday = currentDateArr[2]
  const yearToday = currentDateArr[3]
  const timeToday = currentDateArr[4]

  const dateCreated = comment.created_at.split(' ');
  const dayCreated = dateCreated[1]
  const monthCreated = dateCreated[2]
  const yearCreated = dateCreated[3]
  const timeCreated = dateCreated[4]

  const dateToday = new Date(`${dayToday}/${monthToday}/${yearToday} ${timeToday}`)
  const dateCommentCreated = new Date (`${dayCreated}/${monthCreated}/${yearCreated} ${timeCreated}`)

  const timeDiff= Math.abs(dateToday - dateCommentCreated)
  const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hourDiff = Math.floor(timeDiff / (1000 * 60 * 60));
  const minuteDiff = Math.floor(timeDiff / (1000* 60));
  const secondDiff = Math.floor(timeDiff / 1000)


  let newComment;

  switch(true) {
    case(secondDiff < 60 ):
      if(secondDiff <= 1){
        newComment = (
            <div className='commentCreateAt'> 1s </div>
          )
      } else {
        newComment = (
          <div className='commentCreateAt'> {secondDiff}s </div>
        )
      }
      break;

    case(minuteDiff < 60):
      if(minuteDiff <= 1) {
        newComment = (
          <div className='commentCreateAt'> 1 min </div>
        )
      } else {
        newComment = (
          <div className='commentCreateAt'> {minuteDiff} mins </div>
        )
      }
      break;

    case(hourDiff < 24):
      if(hourDiff <= 1){
        newComment = (
          <div className='commentCreateAt'> 1 h </div>
        )
      } else {
        newComment = (
          <div className='commentCreateAt'> {hourDiff} hrs </div>
        )
      }
      break;

    case(dayDiff < 7):
      if(dayCreated <= 1) {
        newComment = (
          <div className='commentCreateAt'> 1d </div>
        )
      } else {
        newComment = (
          <div className='commentCreateAt'> {dayDiff} days ago  </div>
        )
      }
    case (yearToday === yearCreated):
      newComment = (
        <div className='commentCreateAt'> {months[monthCreated]} {dayCreated} </div>
      )
      break;

    default:
      newComment = (
        <div className='commentCreateAt'> {months[monthCreated]} {dayCreated}, {yearCreated} </div>
      )
      break;
  }

  return (

    <div>
      {newComment}
    </div>
  )
}
