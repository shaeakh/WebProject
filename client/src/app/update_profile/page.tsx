"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Input } from "@/components/ui/SCinput";
import { Label } from "@/components/ui/SClabel";
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/SCavatar";

interface Profile {
    name: string;
    email: string;
    reg_no: string;
    department: string;
    phone_number: string;
    user_pic_url: string;
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

    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [newProfilePic, setNewProfilePic] = useState<File | null>(null);

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
            }
        };

        fetchUserData();
    }, [router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = Cookies.get('token');
        if (!token) {
            router.push('/authpage'); // Redirect to login if no token is found
            return;
        }

        const formData = new FormData();
        formData.append('email', profile.email);
        formData.append('password', currentPassword); // current password, to be filled by the user
        formData.append('name', profile.name);
        formData.append('phone', profile.phone_number);
        formData.append('newPassword', newPassword); // new password, if user wants to change
        if (newProfilePic) {
            formData.append('userPicUrl', newProfilePic);
        }


        try {
            const response = await fetch('http://localhost:5000/api/home/update-user', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const data = await response.json();
            console.log('Profile updated successfully:', data);
            alert('Profile update successful');

        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setNewProfilePic(e.target.files[0]);
        }
    };

    return (
        <div className='w-screen flex'>
            <div className='w-1/6 flex flex-col h-screen justify-center bg-gray-400 bg-opacity-50'>
                <div className='flex justify-center'>
                    <div className='w-full h-full justify-center flex items-center'>
                        <Avatar className='h-40 w-40'>
                            <AvatarImage src={profile.user_pic_url} alt={profile.name} />
                            <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
                <div className='flex flex-col items-start justify-center m-5'>
                    <p className='font-mono font-bold text-2xl'>{profile.name}</p>
                    <p className='font-mono text-lg'>{profile.reg_no}</p>
                    <p className='font-mono text-lg'>{profile.department}</p>
                    <p className='font-mono text-lg'>{profile.phone_number}</p>
                </div>
            </div>
            <div className='w-5/6 flex flex-col justify-center items-center'>
                <div className='w-1/3 p-4'>
                    <div className='flex justify-start w-full p-2'>
                        <h1 className='text-4xl font-bold'>Update Your Profile</h1>
                    </div>
                    <form className="my-8" onSubmit={handleSubmit}>
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                            <LabelInputContainer>
                                <Label htmlFor="name">Update your Name</Label>
                                <Input id="name" placeholder="John Doe" type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                            </LabelInputContainer>
                        </div>
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="phone">Update your phone number</Label>
                            <Input id="phone" placeholder="Enter phone number" type="tel" value={profile.phone_number} onChange={(e) => setProfile({ ...profile, phone_number: e.target.value })} />
                        </LabelInputContainer>
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="profile-pic">Update your profile picture</Label>
                            <Input id="profile-pic" type="file" accept="image/*" onChange={handleProfilePicChange} />
                        </LabelInputContainer>
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="new-password">Update your password</Label>
                            <Input id="new-password" placeholder="••••••••" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        </LabelInputContainer>
                        <hr className='mb-4' style={{ border: '1px solid #ddd', width: '100%' }} />
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="current-password">Confirm with your current password</Label>
                            <Input id="current-password" placeholder="••••••••" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                        </LabelInputContainer>
                        <div className="flex justify-center w-full mb-4">
                            <button type="submit" className="px-8 w-full py-2 rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-white">
                                Update Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};

export default Page;
