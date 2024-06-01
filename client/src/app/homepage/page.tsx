import React from 'react'

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/SCavatar"

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
    const participated_tournaments = [
        {
            title: "SWE Sports Week 2022",
            date: "05/05/2022",
            backgroundImage: "https://wearecardinals.com/wp-content/uploads/2020/04/u1Re9qgMfM8d6kumlW85PS6s55jQh5fbdmppgQsP.jpeg",
            link: "#"
        },
        {
            title: "SWE Sports Week 2023",
            date: "05/05/2023",
            backgroundImage: "https://wearecardinals.com/wp-content/uploads/2020/04/u1Re9qgMfM8d6kumlW85PS6s55jQh5fbdmppgQsP.jpeg",
            link: "#"
        },
        {
            title: "SWE Sports Week 2023",
            date: "05/05/2022",
            backgroundImage: "https://wearecardinals.com/wp-content/uploads/2020/04/u1Re9qgMfM8d6kumlW85PS6s55jQh5fbdmppgQsP.jpeg",
            link: "#"
        }

    ]

    return (
        <div className='w-screen flex'>
            <div className='w-1/6 flex  flex-col  h-screen justify-center bg-gray-400 bg-opacity-50'> 
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
                        <button className="px-8 py-2 rounded-md bg-white text-black font-bold transition duration-200 hover:bg-black hover:text-white border-2 border-black  ">
                            Update Profile
                        </button>
                    </div>
                </div>
            </div>
            <div className='w-5/6 p-4' >
                <div className='flex justify-end w-full'>
                    <div className='px-2' >
                        <button className="px-8 py-2 rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-white  ">
                            Organise a tournament
                        </button>

                    </div>
                    <div className='px-2'>
                        <button className="px-8 py-2 rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-white  ">
                            Join a tournament
                        </button>
                    </div>


                </div>
                <div className='flex justify-start w-full p-2 '>
                    <h1 className='text-4xl font-bold'>Participated Tournaments</h1>
                </div>
                <div className='flex flex-wrap w-full  '>
                    {participated_tournaments.map((tournament, index) => (
                        <div key={index} className='w-full sm:w-1/2 md:w-1/5 p-2'>
                            <TournamentCard
                                title={tournament.title}
                                date={tournament.date}
                                backgroundImage={tournament.backgroundImage}
                                link={tournament.link}
                            />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default page
