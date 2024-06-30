import React from 'react'
import Aavatar from '../components/Avater'
import { Input } from "@/components/ui/SCinput"
import { Label } from "@/components/ui/SClabel"
import { cn } from '@/lib/utils'

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
            </div>
            <div className='w-5/6 flex flex-col justify-center items-center'>
                <div className='w-1/3 p-4' >
                    <div className='flex justify-start w-full p-2 '>
                        <h1 className='text-4xl font-bold'>Update Your Profile</h1>
                    </div>
                    <form className="my-8" >
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                            <LabelInputContainer>
                                <Label htmlFor="firstname">Update your Name</Label>
                                <Input id="firstname" placeholder="John Doe" type="text" />
                            </LabelInputContainer>
                        </div>
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="phone">Update your phone number</Label>
                            <Input id="phone" placeholder="Enter phone number" type="tel" />
                        </LabelInputContainer>
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="password">Update your password</Label>
                            <Input id="password" placeholder="••••••••" type="password" />
                        </LabelInputContainer>
                        <hr className='mb-4' style={{ border: '1px solid #ddd', width: '100%' }} />                        

                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="password">Confirm with your current password</Label>
                            <Input id="password" placeholder="••••••••" type="password" />
                        </LabelInputContainer>


                        <div className="flex justify-center w-full mb-4 ">
                            <button className="px-8 w-full py-2 rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-white  ">
                                Update Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>


        </div>
    )
}
const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};


export default page
