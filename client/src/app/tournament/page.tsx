import React from 'react'

function page() {
  return (
    <div className='w-screen h-screen flex flex-col justify-around font-bold items-center font-mono text-black text-2xl'>
      <img className='object-cover w-1/2 h-1/2 ' src="https://www.artzstudio.com/content/images/wordpress/2020/05/404-error-not-found-page-lost.png" alt="" />
      <div>
        <p>Oh no !</p>
        <p>You have routed to blank tournament</p>
        <p>Go to homepage and get a right tournament route</p>
      </div>
    </div>
  )
}

export default page