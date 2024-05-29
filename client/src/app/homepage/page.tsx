import React from 'react'

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import Aavatar from '../components/Avater'
import SubmitBtn from '../components/SubmitBtn'
import TournamentCard from './TournamentCard'
function page() {
    let profile = {
        Name: "Shaeakh Ahmed Chowdhury",
        Email: "Shaeakh12@gmail.com",
        Reg_no: 2020831022,
        Depertment: "Software Engineering",
        Phone_number: "01704567731"
    }

    return (
        <div className='w-screen flex'>
            <div className='w-1/6 flex-col  h-screen border-2 border-black'>
                <div className='flex justify-center '>
                    <div className='w-56 h-56'>
                        <Aavatar />
                    </div>
                </div>
                <div className='flex flex-col items-start justify-center m-5'>
                    <p className='font-mono font-bold text-2xl' >{profile.Name}</p>
                    <p className='font-mono text-lg' >{profile.Email}</p>
                    <p className='font-mono text-lg' >{profile.Reg_no}</p>
                    <p className='font-mono text-lg' >{profile.Depertment}</p>
                    <p className='font-mono text-lg' >{profile.Phone_number}</p>
                </div>
                <div className=' flex justify-center'>
                    <div className='w-7/12'>
                        <SubmitBtn text={"black"} bg={"white"} borderclr={"black"} hover_bg={"black"} hover_text={"white"} hover_border={"white"}
                            value={"Update Profile"} />
                    </div>
                </div>
            </div>
            <div className=''>
                <TournamentCard/>
            </div>
        </div>
    )
}

export default page
