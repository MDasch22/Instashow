import React from 'react'
import './postTime.css'

export default function PostTime({post}) {

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

  const dateCreated = post.created_at.split(' ');
  const dayCreated = dateCreated[1]
  const monthCreated = dateCreated[2]
  const yearCreated = dateCreated[3]
  const timeCreated = dateCreated[4]



  const dateToday = new Date(`${dayToday}/${monthToday}/${yearToday} ${timeToday}`)
  const datePostCreated = new Date (`${dayCreated}/${monthCreated}/${yearCreated} ${timeCreated}`)

  console.log(dateToday)
  console.log(datePostCreated)

  const timeDiff= Math.abs(dateToday - datePostCreated)
  const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hourDiff = Math.floor(timeDiff / (1000 * 60 * 60));
  const minuteDiff = Math.floor(timeDiff / (1000* 60));
  const secondDiff = Math.floor(timeDiff / 1000)


  let newPost;

  switch(true) {
    case(secondDiff < 60 ):
      if(secondDiff <= 1){
        newPost = (
            <div className='postCreateAt'> 1 SECOND AGO </div>
          )
      } else {
        newPost = (
          <div className='postCreateAt'> {secondDiff} SECOND AGO </div>
        )
      }
      break;

    case(minuteDiff < 60):
      if(minuteDiff <= 1) {
        newPost = (
          <div className='postCreateAt'> 1 MINUTE AGO </div>
        )
      } else {
        newPost = (
          <div className='postCreateAt'> {minuteDiff} MINUTES AGO </div>
        )
      }
      break;

    case(hourDiff < 24):
      if(hourDiff <= 1){
        newPost = (
          <div className='postCreateAt'> 1 HOUR AGO </div>
        )
      } else {
        newPost = (
          <div className='postCreateAt'> {hourDiff} HOURS AGO </div>
        )
      }
      break;

    case(dayDiff < 7):
      if(dayCreated <= 1) {
        newPost = (
          <div className='postCreateAt'> 1 DAY AGO </div>
        )
      } else {
        newPost = (
          <div className='postCreateAt'> {dayDiff} DAYS AGO </div>
        )
      }
    case (yearToday === yearCreated):
      newPost = (
        <div className='postCreateAt'> {months[monthCreated]} {dayCreated} </div>
      )
      break;

    default:
      newPost = (
        <div className='postCreateAt'> {months[monthCreated]} {dayCreated}, {yearCreated} </div>
      )
      break;
  }

  return (

    <div>
      {newPost}
    </div>
  )
}
