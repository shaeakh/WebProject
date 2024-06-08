import React from 'react'

function page() {

    return (
        <div className='w-screen h-screen flex'>
            <div className='w-1/2 h-full border-2 border-black flex flex-col justify-start items-center'>
                <div className='font-mono font-bold text-2xl text-center'>Manager Request</div>
            </div>
            <div className='mx-2 h-full flex flex-col justify-center'>
                <div className='h-5/6 bg-black bg-opacity-50 rounded-lg'></div>
            </div>
            <div className='w-1/2 h-full border-2 border-black flex flex-col justify-start items-center'>
                <div className='font-mono font-bold text-2xl text-center'>Players Request</div>
            </div>
        </div>
    )
}

export default page