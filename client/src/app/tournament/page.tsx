import React from 'react'

function page() {

    return (
        <div className='w-screen flex flex-col justify-center h-screen items-center p-5'>
            <div className='w-1/2 h-1/6 border-2 border-black flex items-center justify-center overflow-hidden rounded-lg'>
                <img
                    src="https://staticg.sportskeeda.com/editor/2022/05/17c93-16519157288727-1920.jpg"
                    alt=""
                    className='w-full h-full object-cover'
                />
            </div>
            <div className='flex justify-end border-2 border-black w-full p-2 '>
                <button className="px-8 py-2 rounded-md bg-black text-white font-bold text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
                    Member Request
                </button>
                <button className="px-8 py-2 rounded-md bg-black text-white font-bold text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
                    Update Tournament
                </button>
            </div>
            <div className='flex justify-between border-2 border-black w-full p-2 '>
                <div className='w-1/6 h-32 border-2 border-black flex flex-col justify-around p-2'>
                    <div>
                    <p>Tournament Join Code</p>
                    </div>
                    <div className='flex'>
                    <p>Tournament Join Code</p>
                    <p>Tournament Join Code</p>
                    </div>                    
                </div>
            </div>
        </div>

    )
}

export default page