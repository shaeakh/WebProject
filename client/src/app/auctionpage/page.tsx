"use client"

import React, { useEffect, useState } from 'react'
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { ScrollArea } from "@/components/ui/SCscroll-area"
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

type Team = {
    team_name: string;
    manager_name: string;
    team_logo: string;
    total_players: number;
    current_balance: number;
};

type Player = {
    reg_no: any,
    name: any,
    position: any,
    category: any,
    img_link: string,
    base_value: any,
    current_value: any,
    sold: any
}

type Real_time_data = {
    team_id:bigint;
    current_player_index : string;
    current_bid: bigint;
    sold: boolean;
    pause:boolean;
}


interface auctionpage_Props {
    searchParams: {
        tournament: any;
    };
}

const auctionpage: React.FC<auctionpage_Props> = ({ searchParams }: {
    searchParams: {
        tournament: any;
    }
}) => {

    const router = useRouter();
    let data;
    const [user_role, set_user_role] = useState("");
    const [teams_update, setTeams_update] = useState<Team[]>([]);
    const [players, set_players] = useState<Player[]>([]);
    const [index, setIndex] = useState(0);
    const [token, setToken] = useState<string | undefined>(undefined);
    const [last_bidding_team,set_last_bidding_team] = useState<Team | undefined>(undefined);

    const [real_time_data,set_real_time_data] = useState<Real_time_data | undefined>(undefined);

    const [pause, set_Pause] = React.useState(false);
    async function handle_Pause(a_pause :any) {
        const update_pause_state = await fetch('http://localhost:5000/api/auction/update_pause', {
            method: 'POST',
            credentials: 'include', // Include cookies in the request
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ tournamentId: searchParams.tournament , pause: a_pause})
        });
        set_Pause(a_pause);
        const data = await update_pause_state.json();
        console.log(data.body);
    }

    const handle_player_index = async (index: any) => {
        const player_response = await fetch('http://localhost:5000/api/auction/update_player_index', {
            method: 'POST',
            credentials: 'include', // Include cookies in the request
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ tournamentId: searchParams.tournament, current_player_index: index })
        });
        // // data = await player_response.json();
        // // console.log(data.body);
        // setIndex(index);
    }

    const fetch_real_time_data =()=>{

    }

    const last_bidding_team_fetch = async () => {
        const last_bidding_team_response = await fetch('http://localhost:5000/api/auction/team_details', {
            method: 'POST',
            credentials: 'include', // Include cookies in the request
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ tournamentId: searchParams.tournament })
        });
        data = await last_bidding_team_response.json();
        set_last_bidding_team(data);
    }


    useEffect(() => {
        const fetchUserData = async () => {
            const token = Cookies.get('token');
            setToken(token);
            if (!token) {
                router.push('/authpage'); // Redirect to login if no token is found
                return;
            }
            try {
                const tournament_id = searchParams.tournament;
                const response = await fetch('http://localhost:5000/api/home/tournament-role', {
                    method: 'POST',
                    credentials: 'include', // Include cookies in the request
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ tournament_id })
                });


                data = await response.json();

                if (data.role === 'unauthorized') {
                    router.push('/tournament');
                } else {
                    set_user_role(data.role);

                    const team_update_response = await fetch('http://localhost:5000/api/auction/teams', {
                        method: 'POST',
                        credentials: 'include', // Include cookies in the request
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ tournamentId: searchParams.tournament })
                    });
                    data = await team_update_response.json();
                    setTeams_update(data);

                    const player_response = await fetch('http://localhost:5000/api/auction/players', {
                        method: 'POST',
                        credentials: 'include', // Include cookies in the request
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ tournamentId: searchParams.tournament })
                    });
                    data = await player_response.json();


                    set_players(data);
                }
            } catch (error) {

            }
        }
        fetchUserData()
        handle_Pause(false)
        last_bidding_team_fetch()
    },
        [router]
    )

    let manager = {
        maxbid: 600,
        current_balance: 8000,
        players_bought: 2
    }
    let remaining_time = {
        min: 2,
        sec: 30
    }
    let values = {
        sold: false
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
            {user_role === "manager" && (
                <div className='w-1/3 bg-black bg-opacity-15  flex flex-col justify-around items-center bg-grey-300'>
                    {(bid_able === false) && <div className='m-2 p-2 rounded-lg font-mono font-bold text-2xl  text-center bg-red-500 bg-opacity-75'>
                        You can't bid more then {manager.maxbid} points
                    </div>}
                    <p className='p-2 border-2 border-black font-mono font-bold text-xl  rounded-lg'>Your Team</p>
                    <div className='h-36 overflow-hidden rounded-lg flex justify-center w-full'>
                        <img className='object-cover rounded-lg h-full ' src={last_bidding_team?.team_logo} alt="" />
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
                                        onClick={() => handle_Bid_ability(players[0].current_value, 50)}>50</button>
                                    <button className="px-8 py-2 w-20 flex justify-center rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-black"
                                        onClick={() => handle_Bid_ability(players[0].current_value, 100)}>100</button>
                                    <button className="px-8 py-2 w-20 flex justify-center rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-black"
                                        onClick={() => handle_Bid_ability(players[0].current_value, 150)}>150</button>

                                </div>
                                <div className='flex justify-around w-full px-2'>
                                    <button className="px-8 py-2 w-20 flex justify-center rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-black"
                                        onClick={() => handle_Bid_ability(players[0].current_value, 200)}>200</button>
                                    <button className="px-8 py-2 w-20 flex justify-center rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-black"
                                        onClick={() => handle_Bid_ability(players[0].current_value, 250)}>250</button>
                                    <button className="px-8 py-2 w-20 flex justify-center rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-black"
                                        onClick={() => handle_Bid_ability(players[0].current_value, 300)}>300</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {user_role === "admin" && (
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
                                <img src={team.team_logo || 'asd'} alt="" className="h-10 rounded-lg self-center" />
                                <p className="self-center">{team.team_name}</p>
                                <p className="self-center">{team.total_players}</p>
                                <p className="self-center">{team.current_balance}</p>
                            </div>
                        ))}
                    </ScrollArea>
                </div>
            )}

            <div className={`w-1/3 text-2xl text-center  flex flex-col ${(user_role === "player") ? ("border-l-2 border-black") : ""}  items-center justify-center font-mono font-bold gap-4`}>
                <div className='w-full text-2xl text-center flex flex-col items-center justify-center font-mono font-bold gap-y-4 '>
                    <img className='h-52 w-52 overflow-hidden rounded-lg object-cover' src={players[index]?.img_link} alt="" />
                    <div className=' grid grid-cols-3 grid-rows-3 gap-x-0 gap-y-4'>
                        <p className='w-min'>Name</p>
                        <p>:</p>
                        <p>{players[index]?.name}</p>
                        <p>Position</p>
                        <p>:</p>
                        <p>{players[index]?.position}</p>
                        <p>Category</p>
                        <p>:</p>
                        <p>{players[index]?.category}</p>
                    </div>
                </div>
                <p className='border-2 border-black p-2 rounded-lg'>Current Bid : {players[index]?.current_value || players[index]?.base_value}</p>
                <p>{(players[index]?.sold == null || players[index]?.sold == false) ? "Available" : "sold"}</p>
                {(user_role === "admin") && (
                    <div className='flex flex-col items-center gap-4'>
                        <div className='flex w-full justify-around'>
                            <div className='px-2' >
                                <button onClick={() => {
                                    if (index === 0)
                                        handle_player_index(players.length - 1);
                                    else
                                        handle_player_index(index - 1);

                                }} className="px-8 py-2 rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-white  ">
                                    <FaAngleLeft />
                                </button>
                            </div>
                            <div className='px-2' >
                                <button onClick={() => {
                                    handle_player_index((index + 1) % players.length);
                                }} className="px-8 py-2 rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-white  ">
                                    <FaAngleRight />
                                </button>
                            </div>
                        </div>
                        <button className="px-8 py-2 rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-white  " onClick={()=>handle_Pause(!pause)}>
                            {(pause === true) ? "Resume" :  "Pause"  }
                        </button>
                    </div>
                )
                }
            </div>
            <div className='w-1/3  h-screen flex flex-col justify-center items-center gap-4 bg-black bg-opacity-15 text-2xl text-center font-mono font-bold  '>
                <p className='p-2 border-2 border-black rounded-lg'>Last bidding Team</p>
                <div className='h-36 overflow-hidden rounded-lg flex justify-center w-full'>
                    <img className='object-cover rounded-lg h-full ' src={last_bidding_team?.team_logo || "https://static.vecteezy.com/system/resources/previews/000/552/791/non_2x/flag-waving-vector-icon.jpg"} alt="" />
                </div>
                <div className=' grid grid-cols-3 grid-rows-auto gap-x-0 gap-y-4 p-4'>
                    <p>Team</p>
                    <p>:</p>
                    <p>{last_bidding_team?.team_name || "Null"}</p>
                    <p>Manager</p>
                    <p>:</p>
                    <p>{last_bidding_team?.manager_name || "Null"}</p>
                    {user_role === "admin" && (<p className='text-nowrap '>Current Balance</p>)}
                    {user_role === "admin" && (<p>:</p>)}
                    {user_role === "admin" && (<p>{last_bidding_team?.current_balance || "Null"}</p>)}
                    {user_role === "admin" && (<p className='text-nowrap'>Players Bought</p>)}
                    {user_role === "admin" && (<p>:</p>)}
                    {user_role === "admin" && (<p>{last_bidding_team?.total_players || "Null"}</p>)}
                </div>
                <div className='w-44 m-2 p-2 border-2 border-black rounded-lg font-mono font-bold text-xl  text-center '>Time remaining</div>
                <div className='flex justify-center m-2 p-2  rounded-lg font-mono font-bold text-xl  text-center '>
                    <div className='w-12 border-2 border-black rounded-lg'>{remaining_time.min}m</div>
                    <div className='mx-2'>:</div>
                    <div className='w-12 border-2 border-black rounded-lg'>{remaining_time.sec}s</div>
                </div>
                {(user_role === "admin") && (
                    <button className="px-8 py-2 rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-white  "  >
                        Assign
                    </button>
                )
                }

            </div>
        </div>

    )
}

export default auctionpage