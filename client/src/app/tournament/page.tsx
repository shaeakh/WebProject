import { Button } from '@/components/ui/SCbutton'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/SCcard'
import { Input } from '@/components/ui/SCinput'
import { Label } from '@/components/ui/SClabel'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/SCselect'
import React from 'react'
import { FaRegCopy } from "react-icons/fa6";
import { MoviingBorderButton } from "@/components/ui/SCmoving-border";
import Teams from './Teams'
function page() {
    let props = {
        joincode: "#asdksadsa"
    }
    return (
        <div className='w-screen flex flex-col justify-center items-center p-5'>
            <div className='w-8/12 h-2/6  flex items-center justify-center overflow-hidden rounded-lg'>
                <img
                    src="https://staticg.sportskeeda.com/editor/2022/05/17c93-16519157288727-1920.jpg"
                    alt=""
                    className='w-full h-full object-cover'
                />

            </div>
            
            <div className='flex justify-between  w-8/12 p-2 '>
                <div className='h-32 flex flex-col justify-center items-around'>
                    <div className='flex flex-col  justify-around p-2 border border-black rounded-lg' >
                        <p className='text-2xl font-bold'>Tournament Join Code</p>
                        <hr className='w-full border border-grey' />
                        <div className='flex justify-between p-2'>
                            <div className=' w-9/12 bg-black rounded-lg bg-opacity-50 py-2 px-4'>
                                <p className='text-xl text-white font-bold '>{props.joincode}</p>
                            </div>
                            <button className="px-4 py-2 w-min rounded-md bg-black text-white font-bold text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
                                <FaRegCopy className='h-full' />
                            </button>
                        </div>

                    </div>
                </div>
                <div className='flex flex-col justify-center'>
                    <div >
                        <MoviingBorderButton
                            borderRadius="1.75rem"
                            className="bg-white hover:bg-black hover:text-white transition transition-colors duration-500 font-bold text-xl text-black border-2 border-neutral-200"
                        >
                            Start Auction
                        </MoviingBorderButton>
                    </div>
                </div>
                <div className='flex flex-col items-around gap-2'>
                    <button className="px-8 py-2 rounded-md bg-black text-white font-bold text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
                        Member Request
                    </button>
                    <button className="px-8 py-2 rounded-md bg-black text-white font-bold text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
                        Set players catagory
                    </button>
                    <button className="px-8 py-2 rounded-md bg-black text-white font-bold text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
                        Update Tournament
                    </button>
                </div>
            </div>
            <hr className='border border-grey w-8/12 my-2' />
            <Teams/>
        </div>
        
    )
}
export default page