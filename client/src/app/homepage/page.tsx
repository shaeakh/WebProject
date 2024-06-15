"use client"; 

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/SCavatar";
import Aavatar from '../components/Avater';
import SubmitBtn from '../components/SubmitBtn';
import TournamentCard from './TournamentCard';

interface Profile {
    name: string;
    email: string;
    reg_no: string;
    department: string;
    phone_number: string;
    user_pic_url: string;
}

interface Tournament {
    title: string;
    date: string;
    backgroundImage: string;
    link: string;
}

const Page: React.FC = () => {
    const router = useRouter();
    const [profile, setProfile] = useState<Profile>({
        name: "",
        email: "",
        reg_no: "",
        department: "",
        phone_number: "",
        user_pic_url: ""
    });
    const [participatedTournaments, setParticipatedTournaments] = useState<Tournament[]>([]);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = Cookies.get('token');
            console.log(token);
            if (!token) {
                router.push('/authpage'); // Redirect to login if no token is found
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/api/home/user-details', {
                    method: 'GET',
                    credentials: 'include', // Include cookies in the request
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const data = await response.json();
                setProfile({
                    name: data.name,
                    email: data.edu_mail,
                    reg_no: data.reg_no,
                    department: data.department,
                    phone_number: data.phone,
                    user_pic_url: data.user_pic_url
                });

                // Fetch participated tournaments
                const tournamentsResponse = await fetch('http://localhost:5000/api/home/participated-tournaments', {
                    method: 'GET',
                    credentials: 'include', // Include cookies in the request
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!tournamentsResponse.ok) {
                    throw new Error('Failed to fetch participated tournaments');
                }

                const tournamentsData = await tournamentsResponse.json();
                setParticipatedTournaments(tournamentsData.tournaments);

            } catch (error) {
                console.error('Error fetching user data:', error);
                router.push('/authpage'); // Redirect to login if an error occurs
            }
        };

        fetchUserData();
    }, [router]);

    return (
        <div className='w-screen flex'>
            <div className='w-1/6 flex flex-col h-screen justify-center bg-gray-400 bg-opacity-50'>
                <div className='flex justify-center'>
                    <div className='w-56 h-56'>
                        <Avatar>
                            <AvatarImage src={profile.user_pic_url} alt={profile.name} />
                            <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
                <div className='flex flex-col items-start justify-center m-5'>
                    <p className='font-mono font-bold text-2xl'>{profile.name}</p>
                    <p className='font-mono text-lg'>{profile.email}</p>
                    <p className='font-mono text-lg'>{profile.reg_no}</p>
                    <p className='font-mono text-lg'>{profile.department}</p>
                    <p className='font-mono text-lg'>{profile.phone_number}</p>
                </div>
                <div className='flex justify-center'>
                    <div className='w-7/12'>
                        <button className="px-8 py-2 rounded-md bg-white text-black font-bold transition duration-200 hover:bg-black hover:text-white border-2 border-black">
                            Update Profile
                        </button>
                    </div>
                </div>
            </div>
            <div className='w-5/6 p-4'>
                <div className='flex justify-end w-full'>
                    <div className='px-2'>
                        <button className="px-8 py-2 rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover-border-black border-2 border-white">
                            Organise a tournament
                        </button>
                    </div>
                    <div className='px-2'>
                        <button className="px-8 py-2 rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover-border-2 hover-border-black border-2 border-white">
                            Join a tournament
                        </button>
                    </div>
                </div>
                <div className='flex justify-start w-full p-2'>
                    <h1 className='text-4xl font-bold'>Participated Tournaments</h1>
                </div>
                <div className='grid grid-flow-row grid-cols-4 grid-rows-auto gap-10'>
                    {participatedTournaments.map((tournament, index) => (
                        <TournamentCard key={index}
                            title={tournament.title}
                            date={tournament.date}
                            backgroundImage={tournament.backgroundImage}
                            link={tournament.link}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Page;
