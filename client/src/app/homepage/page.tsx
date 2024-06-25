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
    tournament_id: any;
    tournament_name: string;
    role: string;
    tournament_logo_url: string;
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
            } catch (error) {
                console.error('Error fetching user data:', error);
                router.push('/authpage'); // Redirect to login if an error occurs
            }
            try {
                const tournamentsResponse = await fetch('http://localhost:5000/api/home/participated-tournaments', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                
                if (!tournamentsResponse.ok) {
                    throw new Error('Failed to fetch participated tournaments');
                } else {
                    console.log("eikhane aschi");
                    const tournamentsData = await tournamentsResponse.json(); 
                     
                    
                    setParticipatedTournaments(tournamentsData.tournaments);
                    console.log(tournamentsData.tournaments);
                    
                }
            } catch (error) {
                console.error('Error fetching participated tournament data:', error);
            }
        };

        fetchUserData();
    }, [router]);

    const handleLogout = async () => {
        const token = Cookies.get('token');
        if (!token) {
            router.push('/authpage');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                Cookies.remove('token');
                alert('Logged out successfully');
                router.push('/authpage');
            } else {
                throw new Error('Failed to log out');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className='w-screen flex'>
            <div className='w-1/6 flex flex-col h-screen justify-center bg-gray-400 bg-opacity-50'>
                <div className='flex justify-center items-center'>
                    <div className='w-56 h-56 rounded-full border-2 border-black overflow-hidden flex justify-center items-center'>
                        <img src={profile.user_pic_url} alt="" className='object-cover w-full h-full rounded-full' />
                    </div>
                </div>
                <div className='flex flex-col items-start justify-center m-5'>
                    <p className='font-mono text-wrap font-bold text-2xl'>{profile.name}</p>
                    <p className='font-mono text-lg'>{profile.reg_no}</p>
                    <p className='font-mono text-lg'>{profile.department}</p>
                    <p className='font-mono text-lg'>{profile.phone_number}</p>
                </div>
                <div className='flex justify-center'>
                    <div className='w-7/12'>
                        <a href="/update_profile">
                            <button className="px-8 py-2 rounded-md bg-white text-black font-bold transition duration-200 hover:bg-black hover:text-white border-2 border-black">
                                Update Profile
                            </button>
                        </a>
                    </div>
                </div>
            </div>
            <div className='w-5/6 p-4 flex flex-col justify-start'>
                <div className='flex justify-end w-full'>
                    <div className='px-2'>
                        <a href="/create_tournament">
                            <button className="px-8 py-2 rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-white">
                                Organise a tournament
                            </button>
                        </a>
                    </div>
                    <div className='px-2'>
                        <a href="/join_tournament">
                            <button className="px-8 py-2 rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-white">
                                Join a tournament
                            </button>
                        </a>
                    </div>
                </div>
                <div className='flex justify-start w-full p-2'>
                    <h1 className='text-4xl font-bold'>Participated Tournaments</h1>
                </div>
                <div className='grid grid-flow-row grid-cols-4 grid-rows-auto gap-10'>
            
                    {participatedTournaments?.map((tournament, index) => (
                        <a href={`/tournament/${tournament.tournament_id}`} key={index}>
                            <TournamentCard
                                tournament_name={tournament.tournament_name}
                                role={tournament.role}
                                tournament_logo_url={tournament.tournament_logo_url}
                                 
                            />
                        </a>
                    ))}
                </div>
                <div className='flex flex-col h-full items-end justify-end w-full px-2'>
                    <button onClick={handleLogout} className="px-8 py-2 rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-white">
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Page;
