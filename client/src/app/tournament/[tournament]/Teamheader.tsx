import { MoviingBorderButton } from '@/components/ui/SCmoving-border'
import React from 'react'
function Teamheader() {
    return (
        <div className=" w-full bg-black bg-opacity-50 p-4 rounded-lg flex justify-between gap-4 my-4">
            <div className='flex w-full justify-start gap-4'>
                <div className='h-36 overflow-hidden rounded-lg flex justify-center '>
                    <img className='object-cover h-full' src="https://t3.ftcdn.net/jpg/01/01/28/54/360_F_101285414_98sNHFkPzvezdhaqAbS5miuRhe15VmJU.jpg" alt="" />
                </div>
                <div className='flex flex-col justify-center items-start text-black ' >
                    <p className='font-mono font-bold text-2xl'>Argentina</p>
                    <p className='font-mono text-lg'>Shaeakh</p>
                </div>
            </div>
            <div className='flex flex-col justify-center items-end '>
                <MoviingBorderButton
                    borderRadius="1.75rem"
                    className="bg-white transition transition-colors duration-500 font-bold text-xl text-black border-2 border-neutral-200"
                >
                    Goto Auction
                </MoviingBorderButton>
            </div>
            
    
        </div>
    )
}

export default Teamheader