"use client"

import React, { useEffect } from 'react'
import Player from './Player'
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { ScrollArea } from "@/components/ui/SCscroll-area"
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
function page() {
    const router = useRouter();
    
    useEffect(() => {
        const fetchUserData = async () => {
            const token = Cookies.get('token');
            if (!token) {
                router.push('/authpage'); // Redirect to login if no token is found
                return;
            }
        }
        fetchUserData()
    },
        [router]
    )

    let user = {
        role: "admin",
        card: [
            {
                team: "Argentina",
                manager: "Shaeakh",
                link: "https://images2.alphacoders.com/980/thumb-1920-980120.jpg"
            }
        ]
    }
    let manager = {
        maxbid: 600,
        current_balance: 8000,
        players_bought: 2
    }
    let remaining_time = {
        min: 2,
        sec: 30
    }
    let last_bidding_team = {
        team: "China",
        manager: "Shaeakh",
        link: "https://images2.alphacoders.com/980/thumb-1920-980120.jpg",
        Players_bought: 5,
        Current_balance: 600
    }
    let player = [
        {
            name: "Neimar",
            position: "Defense",
            category: "Gold",
            img_link: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Neymar_Jr._with_Al_Hilal%2C_3_October_2023_-_03_%28cropped%29.jpg",
            base_value: 200,
            current_value: 500,
            sold: false,
        },
        {
            name: "Neimar",
            position: "Defense",
            category: "Gold",
            img_link: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Neymar_Jr._with_Al_Hilal%2C_3_October_2023_-_03_%28cropped%29.jpg",
            base_value: 200,
            current_value: 500,
            sold: false
        },
        {
            name: "Ronaldo",
            position: "Forward",
            category: "Bronze",
            img_link: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg/687px-Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg",
            base_value: 200,
            current_value: 700,
            sold: false
        },
        {
            name: "Messy",
            position: "Forward",
            category: "Platinum",
            img_link: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg",
            base_value: 200,
            current_value: 1000,
            sold: false
        }
    ]
    let values = {
        sold: false
    }
    let teams_update = [
        {
            name: "Argentina",
            link: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1200px-Flag_of_Argentina.svg.png",
            Players_bought: 5,
            Current_balance: 600
        },
        {
            name: "Brazil",
            link: "https://cdn.britannica.com/47/6847-004-7D668BB0/Flag-Brazil.jpg",
            Players_bought: 6,
            Current_balance: 500
        },
        {
            name: "Portugal",
            link: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/600px-Flag_of_Portugal.svg.png",
            Players_bought: 7,
            Current_balance: 400
        },
        {
            name: "Argentina",
            link: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1200px-Flag_of_Argentina.svg.png",
            Players_bought: 5,
            Current_balance: 600
        },
        {
            name: "Brazil",
            link: "https://cdn.britannica.com/47/6847-004-7D668BB0/Flag-Brazil.jpg",
            Players_bought: 6,
            Current_balance: 500
        },
        {
            name: "Portugal",
            link: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/600px-Flag_of_Portugal.svg.png",
            Players_bought: 7,
            Current_balance: 400
        },
        {
            name: "Argentina",
            link: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1200px-Flag_of_Argentina.svg.png",
            Players_bought: 5,
            Current_balance: 600
        },
        {
            name: "Brazil",
            link: "https://cdn.britannica.com/47/6847-004-7D668BB0/Flag-Brazil.jpg",
            Players_bought: 6,
            Current_balance: 500
        },
        {
            name: "Portugal",
            link: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/600px-Flag_of_Portugal.svg.png",
            Players_bought: 7,
            Current_balance: 400
        },
        {
            name: "Argentina",
            link: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1200px-Flag_of_Argentina.svg.png",
            Players_bought: 5,
            Current_balance: 600
        },
        {
            name: "Brazil",
            link: "https://cdn.britannica.com/47/6847-004-7D668BB0/Flag-Brazil.jpg",
            Players_bought: 6,
            Current_balance: 500
        },
        {
            name: "Portugal",
            link: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/600px-Flag_of_Portugal.svg.png",
            Players_bought: 7,
            Current_balance: 400
        }
    ]
    const [pause, set_Pause] = React.useState(false);
    function handle_Pause() {
        set_Pause(!pause);
    }
    const [bid_able, set_Bid_able] = React.useState(true);
    const [current_bid, set_Current_bid] = React.useState(200);

    function handle_Bid_ability(current_bid: any, bid_increase: any) {
        if (manager.maxbid < (current_bid + bid_increase)) {
            set_Bid_able(false);
        }
        else {
            set_Current_bid(current_bid + bid_increase);
        }
    }


    return (
        <div className='w-screen h-screen flex justify-center'>
            {user.role === "manager" && (
                <div className='w-1/3 bg-black bg-opacity-15  flex flex-col justify-around items-center bg-grey-300'>
                    {(bid_able === false) && <div className='m-2 p-2 rounded-lg font-mono font-bold text-2xl  text-center bg-red-500 bg-opacity-75'>
                        You can't bid more then {manager.maxbid} points
                    </div>}
                    <p className='p-2 border-2 border-black font-mono font-bold text-xl  rounded-lg'>Your Team</p>
                    <div className='h-36 overflow-hidden rounded-lg flex justify-center w-full'>
                        <img className='object-cover rounded-lg h-full ' src={last_bidding_team.link} alt="" />
                    </div>                    
                    <div className='m-2 p-2 border-2 border-black rounded-lg font-mono font-bold text-xl  text-center '>Current Balance : {5000000}</div>
                    <div className='m-2 p-2 border-2 border-black rounded-lg font-mono font-bold text-xl  text-center '>Players Bought : {500}</div>
                    <div className='border-2 border-black rounded-lg'>
                        <div className='flex justify-around w-full' >
                            <p className='m-2 p-2 font-mono font-bold text-xl '>Place you bid</p>
                            <div className='m-2 p-2 border-2 border-black rounded-lg font-mono font-bold text-xl  text-center '>Your max bid : {-50}</div>
                        </div>
                        <div className='w-full m-2 p-2 rounded-lg h-max '>
                            <div className=' flex flex-col justify-around items-around gap-5'>
                                <div className='flex justify-around w-full px-2'>
                                    <button className="px-8 py-2 w-20 flex justify-center rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-black"
                                        onClick={() => handle_Bid_ability(player[0].current_value, 50)}>50</button>
                                    <button className="px-8 py-2 w-20 flex justify-center rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-black"
                                        onClick={() => handle_Bid_ability(player[0].current_value, 100)}>100</button>
                                    <button className="px-8 py-2 w-20 flex justify-center rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-black"
                                        onClick={() => handle_Bid_ability(player[0].current_value, 150)}>150</button>

                                </div>
                                <div className='flex justify-around w-full px-2'>
                                    <button className="px-8 py-2 w-20 flex justify-center rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-black"
                                        onClick={() => handle_Bid_ability(player[0].current_value, 200)}>200</button>
                                    <button className="px-8 py-2 w-20 flex justify-center rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-black"
                                        onClick={() => handle_Bid_ability(player[0].current_value, 250)}>250</button>
                                    <button className="px-8 py-2 w-20 flex justify-center rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-black"
                                        onClick={() => handle_Bid_ability(player[0].current_value, 300)}>300</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {user.role === "admin" && (
                <div className='w-1/3 p-4 bg-black bg-opacity-15 flex flex-col justify-center items-center bg-grey-300  font-mono font-bold text-center '>
                    <h1 className='text-3xl' >Teams Overview</h1>
                    <div className='p-4'>
                        <div className=" grid grid-rows-auto border-2 rounded-md border-black grid-cols-4 gap-x-0 gap-y-4 p-4 justify-items-center">
                            <p>Logo</p>
                            <p>Team Name</p>
                            <p>Players</p>
                            <p>Current Balance</p>
                        </div>
                    </div>
                    <ScrollArea className='w-full rounded-md px-4 '>
                        {teams_update.map((team, index) => (
                            <div key={index} className="border border-2 rounded-md border-black grid grid-rows-auto grid-cols-4 gap-x-0 gap-y-4 p-4 justify-items-center">
                                <img src={team.link} alt="" className="h-10 rounded-lg self-center" />
                                <p className="self-center">{team.name}</p>
                                <p className="self-center">{team.Players_bought}</p>
                                <p className="self-center">{team.Current_balance}</p>
                            </div>
                        ))}
                    </ScrollArea>
                </div>
            )}

            <div className={`w-1/3 text-2xl text-center  flex flex-col ${(user.role === "player") ? ("border-l-2 border-black") : ""}  items-center justify-center font-mono font-bold gap-4`}>
                <Player />
                <p className='border-2 border-black p-2 rounded-lg'>Current Bid : {current_bid}</p>
                <p>{(values.sold) ? "Sold" : "Available"}</p>
                {(user.role === "admin") && (
                    <div className='flex flex-col items-center gap-4'>
                        <div className='flex w-full justify-around'>
                            <div className='px-2' >
                                <button className="px-8 py-2 rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-white  ">
                                    <FaAngleLeft />
                                </button>
                            </div>
                            <div className='px-2' >
                                <button className="px-8 py-2 rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-white  ">
                                    <FaAngleRight />
                                </button>
                            </div>
                        </div>
                        <button className="px-8 py-2 rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-white  " onClick={handle_Pause}>
                            {(pause === false) ? "Resume" : "Pause"}
                        </button>
                    </div>
                )
                }
            </div>
            <div className='w-1/3  h-screen flex flex-col justify-center items-center gap-4 bg-black bg-opacity-15 text-2xl text-center font-mono font-bold  '>
                <p className='p-2 border-2 border-black rounded-lg'>Last bidding Team</p>
                <div className='h-36 overflow-hidden rounded-lg flex justify-center w-full'>
                    <img className='object-cover rounded-lg h-full ' src={last_bidding_team.link} alt="" />
                </div>
                <div className=' grid grid-cols-3 grid-rows-auto gap-x-0 gap-y-4 p-4'>
                    <p>Team</p>
                    <p>:</p>
                    <p>{last_bidding_team.team}</p>
                    <p>Manager</p>
                    <p>:</p>
                    <p>{last_bidding_team.manager}</p>
                    {user.role === "admin" && (<p className='text-nowrap '>Current Balance</p>)}
                    {user.role === "admin" && (<p>:</p>)}
                    {user.role === "admin" && (<p>{last_bidding_team.Current_balance}</p>)}
                    {user.role === "admin" && (<p className='text-nowrap'>Players Bought</p>)}
                    {user.role === "admin" && (<p>:</p>)}
                    {user.role === "admin" && (<p>{last_bidding_team.Players_bought}</p>)}
                </div>
                <div className='w-44 m-2 p-2 border-2 border-black rounded-lg font-mono font-bold text-xl  text-center '>Time remaining</div>
                <div className='flex justify-center m-2 p-2  rounded-lg font-mono font-bold text-xl  text-center '>
                    <div className='w-12 border-2 border-black rounded-lg'>{remaining_time.min}m</div>
                    <div className='mx-2'>:</div>
                    <div className='w-12 border-2 border-black rounded-lg'>{remaining_time.sec}s</div>
                </div>
            </div>
        </div>

    )
}

export default page