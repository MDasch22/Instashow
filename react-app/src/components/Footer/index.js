import React from 'react'

import './footer.css'

export default function Footer() {
  return (
    <div className='footer-nav-container'>
      <div className='footer-content-top'>
        <img id="footer-dasch-img" src="https://instashowbucket.s3.us-west-1.amazonaws.com/coaching.jpeg" style={{width:30, height:30}}></img>
        <p id="michael-dasch">Developer: Michael Dasch </p>
        <a id="anchor" target="_blank" href='https://www.linkedin.com/in/michael-dasch-71b6a6187/'> <i className="fa-brands fa-linkedin fa-xl"></i></a>
        <a id="anchor" target="_blank" href='https://github.com/MDasch22'><i className="fa-brands fa-square-github fa-xl"></i></a>
      </div>
      <div className='footer-content'>
        <p id="created-at"><i className="fa-solid fa-c fa-xs"></i></p>
        <p id="app-academy"> 2022 App Academy </p>
      </div>
    </div>
  )
}
