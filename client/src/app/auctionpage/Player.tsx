import React from 'react'

function Player() {
    let player = {
        img_link: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Neymar_Jr._with_Al_Hilal%2C_3_October_2023_-_03_%28cropped%29.jpg",
        name: "Neimar",
        position: "Attacker",
        category: "Silver",
        sold: false
    }
    let values = {
        current_bid: 500
    }
    return (
        <div className='w-full text-2xl text-center flex flex-col items-center justify-center font-mono font-bold gap-y-4 '>
            <img className='h-52 w-52 overflow-hidden rounded-lg object-cover' src={player.img_link} alt="" />
            <div className=' grid grid-cols-3 grid-rows-3 gap-x-0 gap-y-4'>
                <p className='w-min'>Name</p>
                <p>:</p>
                <p>{player.name}</p>
                <p>Position</p>
                <p>:</p>
                <p>{player.position}</p>
                <p>Category</p>
                <p>:</p>
                <p>{player.category}</p>
                
            </div>            
        </div>
    )
}

export default Player