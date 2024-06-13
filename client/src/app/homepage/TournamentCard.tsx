import React from 'react'

function TournamentCard(props: any) {
  return (
    // <div
    //   className='rounded-lg '
    //   style={{
    //     backgroundImage: `url( ${props.backgroundImage} )`,
    //     backgroundSize: 'cover',
    //     backgroundPosition: 'center',
    //     height: '250px', // Adjust height as needed
    //     width: '300px'
    //   }}
    // >
    //   <a href={props.link}>

    //     <div className='h-full flex flex-col justify-end rounded-lg'>
    //       <div className=' h-min  bg-black rounded-lg bg-opacity-50 '>
    //         <p className='font-mono font-bold text-xl text-white mx-2 mt-2' >{props.title}</p>
    //         <p className='font-mono text-lg text-white mx-2 mb-2' >{props.date}</p>
    //       </div>
    //     </div>
    //   </a>
    // </div>
    <div className='border-2 border-black rounded-lg hover:font-bold' style={{
      backgroundImage: `url( ${props.backgroundImage} )`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '150px', // Adjust height as needed
      width: '250px'
    }}>
      <a href={props.link}>
        <div className='h-full flex flex-col justify-end rounded-lg'>
          <div className=' h-min  bg-black rounded-lg bg-opacity-50 '>
            <p className='font-mono  text-2xl  text-white mx-2 mt-2' >{props.title}</p>
            <p className='font-mono text-lg text-white   mx-2 mb-2' >{props.date}</p>
          </div>
        </div>
      </a>
    </div>

  )
}

export default TournamentCard