import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'

export default function ExplorePagePost({post}) {

  const [showOverlay, setShowOverlay] = useState(false)

  return (
    <div id="explore-post-div" key={post.id}>
          <NavLink id="link-to-post-explore"
          to={`/post/${post.id}`}
          onMouseEnter={() => setShowOverlay(true)}
          onMouseLeave={() => setShowOverlay(false)}
          >
            <img src={post.image} style={{width: 300, height: 300}} alt='post-image'></img>
          {showOverlay &&
            <div className='explore-post-ratio'
            onMouseEnter={() => setShowOverlay(true)}
            onMouseLeave={() => setShowOverlay(false)}
            >
              <div id="explore-ratio"><i className="fa-solid fa-heart fa-lg"></i> {post.likes.length}</div>
              <div id="explore-ratio"><i className="fa-solid fa-comment fa-lg"></i> {post.comments.length}</div>
            </div>
          }
          </NavLink>
      </div>

  )
}
