import { MoviingBorderButton } from '@/components/ui/SCmoving-border'
import React from 'react'
function Teamheader(props: any) {
    const team_logo = props.team_logo || "https://smallimg.pngkey.com/png/small/81-810923_flag-clipart-plain-blank-flag-transparent.png";
    return (
        <div className=" w-full bg-black bg-opacity-50 p-4 rounded-lg flex justify-between gap-4 my-4">
            <div className='flex w-full justify-start gap-4'>
                <div className='h-36 overflow-hidden rounded-lg flex justify-center '>
                    <img className='object-cover h-full' src={team_logo} alt="" />
                </div>
                <div className='flex flex-col justify-center items-start text-black ' >
                    <p className='font-mono font-bold text-2xl'>{props.team_name}</p>
                    <p className='font-mono text-lg'>{props.name}</p>
                </div>
            </div>
            <div className='flex flex-col justify-center items-end '>
                <a href="/auctionpage">
                    <MoviingBorderButton
                        borderRadius="1.75rem"
                        className="bg-white transition transition-colors duration-500 hover:bg-black hover:border-black hover:text-white font-bold text-xl text-black border-2 border-neutral-200"
                    >
                        Goto Auction
                    </MoviingBorderButton>
                </a>
            </div>
        </div>
    )
}

export default Teamheader