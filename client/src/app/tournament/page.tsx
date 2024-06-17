import { Button } from '@/components/ui/SCbutton'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/SCcard'
import { Input } from '@/components/ui/SCinput'
import { Label } from '@/components/ui/SClabel'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/SCselect'
import React from 'react'
import { FaRegCopy } from "react-icons/fa6";
import { MoviingBorderButton } from "@/components/ui/SCmoving-border";
import Teams from './Teams'
import Teamheader from './Teamheader'
import { DataTableDemo } from './DataTable'

function Page() {
    let props = {
        joincode: "#asdksadsa"
    }
    let user = {
        role: "manager",
        card: [
            {
                team: "Argentina",
                manager: "Shaeakh",
                link: "https://images2.alphacoders.com/980/thumb-1920-980120.jpg"
            },
            {
                team: "Brazil",
                manager: "Shaeakh",
                link: "https://images2.alphacoders.com/980/thumb-1920-980120.jpg"
            },
            {
                team: "China",
                manager: "Shaeakh",
                link: "https://images2.alphacoders.com/980/thumb-1920-980120.jpg"
            }
        ]
    }
    let team = {
        manager: "Shaeakh",
        Players: [
            {
                name: "Sawon",
                position: "Mid fielder",
                category: "Platinum",
                value: 1000
            },
            {
                name: "Amit",
                position: "Striker",
                category: "Gold",
                value: 900
            },
            {
                name: "Niloy",
                position: "Defense",
                category: "Bronze",
                value: 400
            },
            {
                name: "Farzine",
                position: "Forword",
                category: "Silver",
                value: 600
            },
            {
                name: "Meraj",
                position: "Goal Keeper",
                category: "Platinum",
                value: 500
            }
        ]
    }

    return (
        <div className='flex flex-col justify-center items-center p-5'>
            <div className='w-8/12 lg:h-56 md:h-40 sm:h-24 overflow-hidden rounded-lg flex justify-center border-2 border-black'>
                <img className='object-cover h-full w-full' src="https://staticg.sportskeeda.com/editor/2022/05/17c93-16519157288727-1920.jpg" alt="" />
            </div>
            {user.role === "admin" && (
                <div className=' w-8/12  '>
                    <div className='flex justify-between w-full p-2'>
                        <div className='h-32 flex flex-col justify-center'>
                            <div className='flex flex-col justify-around p-2 border border-black rounded-lg'>
                                <p className='text-2xl font-bold'>Tournament Join Code</p>
                                <hr className='w-full border border-grey' />
                                <div className='flex justify-between p-2'>
                                    <div className='w-9/12 bg-black rounded-lg bg-opacity-50 py-2 px-4'>
                                        <p className='text-xl text-white font-bold'>{props.joincode}</p>
                                    </div>
                                    <button className="px-4 py-2 w-min rounded-md bg-black text-white font-bold text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
                                        <FaRegCopy className='h-full' />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center'>
                            <div>
                                <MoviingBorderButton
                                    borderRadius="1.75rem"
                                    className="bg-white hover:bg-black hover:text-white transition transition-colors duration-500 font-bold text-xl text-black border-2 border-neutral-200"
                                >
                                    Start Auction
                                </MoviingBorderButton>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <button className="px-8 py-2 rounded-md bg-black text-white font-bold text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
                                Member Request
                            </button>
                            <button className="px-8 py-2 rounded-md bg-black text-white font-bold text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
                                Set Players Category
                            </button>
                            <button className="px-8 py-2 rounded-md bg-black text-white font-bold text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
                                Update Tournament
                            </button>
                        </div>
                    </div>
                    <hr className='border border-grey w-full my-2' />
                    <Teams obj={user.card}/>
                </div>
            )}
            {(user.role === "manager" || user.role === "player") && (
                <div className='w-8/12 border-red-600 flex flex-col'>

                    <div className='flex w-full '>
                        <Teamheader />
                    </div>
                    <div className=' '>
                        <div className='font-mono font-bold text-2xl text-center'>
                            Player List
                        </div>
                        <DataTableDemo Players={team.Players} />
                    </div>
                </div>
            )}
            {user.role !== "admin" && user.role !== "manager" && user.role !== "player" && (
                <div>Invalid user!</div>
            )}
        </div>
    )
}

export default Page
