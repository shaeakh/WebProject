"use client"
import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation';

function page() {
    const router = useRouter();
    useState(() => {
        const fetchUserData = async () => {
            const token = Cookies.get('token');
            if (!token) {
                router.push('/authpage'); // Redirect to login if no token is found
                return;
            }

            console.log(token);

        }
        fetchUserData();
    })
    return (
        <div className='h-screen w-screen flex flex-col items-start justify-start '>
            <div className='text-5xl w-full text-center'>Activity Log</div>

            {/* activity component */}
            <div className='flex flex-col items-start border-2 border-input rounded-lg p-5 m-2'>
                <div className='text-2xl font-bold'>Logged in || time</div>
                <div>
                    <div className='text-xl font-bold'>title</div>
                    <div className='text-lg text-grey-600'>time</div>
                    <div className='text-lg '>Description</div>
                </div>
                <div>
                    <div className='text-xl font-bold'>title</div>
                    <div className='text-lg text-grey-600'>time</div>
                    <div className='text-lg '>Description</div>
                </div>
                <div>
                    <div className='text-xl font-bold'>title</div>
                    <div className='text-lg text-grey-600'>time</div>
                    <div className='text-lg '>Description</div>
                </div>
            </div>
        </div>
    )
}

export default page