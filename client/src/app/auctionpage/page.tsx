"use client"

import React, { useEffect, useState } from 'react'
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { ScrollArea } from "@/components/ui/SCscroll-area"
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/SCbutton';
import {io} from 'socket.io-client';
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
    const [last_bidding_team, set_last_bidding_team] = useState<Team | undefined>(undefined);
    const [current_bid, set_Current_bid] = React.useState(0);
    const [playerSold, set_playerSold] = useState(false);
    const [pause, set_Pause] = React.useState(false);
    const [start, set_Start] = React.useState(false);
    const [socket,set_Socket] = useState(undefined);


    const [manager_team_Details, set_manager_team_Details] = useState({
        team_id: 0,
        team_name: "Team Name",
        team_logo: "https://raw.githubusercontent.com/shaeakh/code-share/refs/heads/main/54eef4c7137ee66cb57bc225d3d90bad.jpg",
        current_balance: 0,
        base_player_value: 0,
        base_player_num: 0,
        players_bought: 0,
    });

    async function handle_Pause(a_pause: any) {
        const update_pause_state = await fetch('http://localhost:5000/api/auction/update_pause', {
            method: 'POST',
            credentials: 'include', // Include cookies in the request
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ tournamentId: searchParams.tournament, pause: a_pause })
        });
        set_Pause(a_pause);
        const data = await update_pause_state.json();
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
    }

    const handle_assign = () => {
        console.log("Player is assigned")
        console.log(searchParams.tournament, players[index].reg_no);
        fetch("http://localhost:5000/api/auction/assign_player_to_team", {
            method: "POST",
            credentials: 'include', // Include cookies in the request
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ tournamentId: searchParams.tournament, reg_no: players[index].reg_no }),
        })
    }

    const fetch_last_bidding_team = async () => {
        const last_biddig_team_res = await fetch('http://localhost:5000/api/auction/last_bidding_team', {
            method: 'POST',
            credentials: 'include', // Include cookies in the request
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ tournamentId: searchParams.tournament })
        });

        const d = await last_biddig_team_res.json();
        set_last_bidding_team({
            team_name: d.team_name,
            manager_name: d.manager,
            team_logo: d.team_logo,
            total_players: d.total_players,
            current_balance: d.balance
        })
    }

    const fetch_real_time_data = async () => {
        const realtimedata_res = await fetch('http://localhost:5000/api/auction/realtime_info', {
            method: 'POST',
            credentials: 'include', // Include cookies in the request
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ tournamentId: searchParams.tournament })
        });

        const d = await realtimedata_res.json();

        setIndex(d.current_player_index);
        set_Current_bid(d.current_bid);
        set_playerSold(d.sold);
        handle_Pause(d.pause);
        set_Start(d.start);
    }



    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         const token = Cookies.get('token');
    //         setToken(token);
    //         if (!token) {
    //             router.push('/authpage'); // Redirect to login if no token is found
    //             return;
    //         }
    //         try {
    //             const tournament_id = searchParams.tournament;
    //             const response = await fetch('http://localhost:5000/api/home/tournament-role', {
    //                 method: 'POST',
    //                 credentials: 'include', // Include cookies in the request
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${token}`
    //                 },
    //                 body: JSON.stringify({ tournament_id })
    //             });

    //             data = await response.json();

    //             if (data.role === 'unauthorized') {
    //                 router.push('/tournament');
    //             } else {
    //                 set_user_role(data.role);
    //                 const player_response = await fetch('http://localhost:5000/api/auction/players', {
    //                     method: 'POST',
    //                     credentials: 'include', // Include cookies in the request
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                         'Authorization': `Bearer ${token}`
    //                     },
    //                     body: JSON.stringify({ tournamentId: searchParams.tournament })
    //                 });
    //                 const player_data = await player_response.json();
    //                 set_players(player_data);
    //                 if (data.role == "admin") {
    //                     const team_update_response = await fetch('http://localhost:5000/api/auction/teams', {
    //                         method: 'POST',
    //                         credentials: 'include', // Include cookies in the request
    //                         headers: {
    //                             'Content-Type': 'application/json',
    //                             'Authorization': `Bearer ${token}`
    //                         },
    //                         body: JSON.stringify({ tournamentId: searchParams.tournament })
    //                     });
    //                     data = await team_update_response.json();
    //                     setTeams_update(data);
    //                 }
    //                 if (data.role == "manager") {
    //                     const team_details_manager = await fetch('http://localhost:5000/api/auction/team_details_manager', {
    //                         method: 'POST',
    //                         credentials: 'include', // Include cookies in the request
    //                         headers: {
    //                             'Content-Type': 'application/json',
    //                             'Authorization': `Bearer ${token}`
    //                         },
    //                         body: JSON.stringify({ tournamentId: searchParams.tournament, reg_no: data.reg_no })
    //                     });
    //                     if (team_details_manager.ok) {
    //                         const teamDetailsManager = await team_details_manager.json();
    //                         console.log(teamDetailsManager);
    //                         set_manager_team_Details({
    //                             team_id: teamDetailsManager.team_id,
    //                             team_name: teamDetailsManager.team_name,
    //                             team_logo: teamDetailsManager.team_logo,
    //                             current_balance: teamDetailsManager.current_balance,
    //                             base_player_value: teamDetailsManager.base_player_value,
    //                             base_player_num: teamDetailsManager.base_player_num,
    //                             players_bought: teamDetailsManager.players_bought,
    //                         });
    //                     }

    //                 }
    //             }
    //         } catch (error) {

    //         }
    //     }
    //     fetchUserData()
    //     fetch_real_time_data();
    //     fetch_last_bidding_team();



    // },
    //     [router,manager_team_Details,pause,current_bid,last_bidding_team,index,teams_update]
    // )
    useEffect(() => {
        const fetchUserData = async () => {
            const token = Cookies.get('token');
            setToken(token);
            if (!token) {
                router.push('/authpage');
                return;
            }
            try {
                const tournament_id = searchParams.tournament;
                const response = await fetch('http://localhost:5000/api/home/tournament-role', {
                    method: 'POST',
                    credentials: 'include',
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
                    const player_response = await fetch('http://localhost:5000/api/auction/players', {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ tournamentId: searchParams.tournament })
                    });
                    const player_data = await player_response.json();
                    set_players(player_data);
    
                    if (data.role === "admin") {
                        const team_update_response = await fetch('http://localhost:5000/api/auction/teams', {
                            method: 'POST',
                            credentials: 'include',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify({ tournamentId: searchParams.tournament })
                        });
                        data = await team_update_response.json();
                        setTeams_update(data);
                    } else if (data.role === "manager") {
                        const team_details_manager = await fetch('http://localhost:5000/api/auction/team_details_manager', {
                            method: 'POST',
                            credentials: 'include',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify({ tournamentId: searchParams.tournament, reg_no: data.reg_no })
                        });
                        if (team_details_manager.ok) {
                            const teamDetailsManager = await team_details_manager.json();
                            set_manager_team_Details({
                                team_id: teamDetailsManager.team_id,
                                team_name: teamDetailsManager.team_name,
                                team_logo: teamDetailsManager.team_logo,
                                current_balance: teamDetailsManager.current_balance,
                                base_player_value: teamDetailsManager.base_player_value,
                                base_player_num: teamDetailsManager.base_player_num,
                                players_bought: teamDetailsManager.players_bought,
                            });
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
    
        const fetchDataInterval = setInterval(() => {
            fetchUserData();
            fetch_real_time_data();
            fetch_last_bidding_team();
        }, 50);
    
        fetchUserData();
        fetch_real_time_data();
        fetch_last_bidding_team();
        return () => clearInterval(fetchDataInterval);  
    }, [router]);
    
    const [bid_able, set_Bid_able] = React.useState(true);


    async function handle_Bid_ability(current_bid: any, bid_increase: any) {
        if (current_bid == 0) {
            if ((manager_team_Details.current_balance - (manager_team_Details.base_player_num - manager_team_Details.players_bought) * manager_team_Details.base_player_value) < (manager_team_Details.base_player_value + bid_increase)) {
                set_Bid_able(false);
                setTimeout(() => {
                    set_Bid_able(true);
                }, 2000);
            }
            else {
                const place_bidding_by_manager = await fetch('http://localhost:5000/api/auction/place_bidding_by_manager', {
                    method: 'POST',
                    credentials: 'include', // Include cookies in the request
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ current_bid: manager_team_Details.base_player_value + bid_increase, team_id: manager_team_Details.team_id, tournament_id: searchParams.tournament })
                });

            }
        }
        else {
            if ((manager_team_Details.current_balance - (manager_team_Details.base_player_num - manager_team_Details.players_bought) * manager_team_Details.base_player_value) < (current_bid + bid_increase)) {
                set_Bid_able(false);
                setTimeout(() => {
                    set_Bid_able(true);
                }, 2000);
            }
            else {
                const place_bidding_by_manager = await fetch('http://localhost:5000/api/auction/place_bidding_by_manager', {
                    method: 'POST',
                    credentials: 'include', // Include cookies in the request
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ current_bid: current_bid + bid_increase , team_id: manager_team_Details.team_id, tournament_id: searchParams.tournament })
                });
            }
        }
    }



    return (
        <div className='w-screen h-screen flex justify-center'>
            {user_role === "manager" && (
                <div className='w-1/3 bg-black bg-opacity-15  flex flex-col justify-around items-center bg-grey-300'>
                    {(bid_able === false) && <div className='m-2 p-2 rounded-lg font-mono font-bold text-2xl  text-center bg-red-500 bg-opacity-75'>
                        You can't bid more then {manager_team_Details.current_balance - (manager_team_Details.base_player_num - manager_team_Details.players_bought) * manager_team_Details.base_player_value} points
                    </div>}
                    <p className='p-2 border-2 border-black font-mono font-bold text-xl  rounded-lg'>Team:{manager_team_Details.team_name}</p>
                    <div className='h-36 overflow-hidden rounded-lg flex justify-center w-full'>
                        <img className='object-cover rounded-lg h-full ' src={manager_team_Details.team_logo} alt="" />
                    </div>
                    <div className='m-2 p-2 border-2 border-black rounded-lg font-mono font-bold text-xl  text-center '>Current Balance : {manager_team_Details.current_balance}</div>
                    <div className='m-2 p-2 border-2 border-black rounded-lg font-mono font-bold text-xl  text-center '>Players Bought : {manager_team_Details.players_bought}</div>
                    <div className='border-2 border-black rounded-lg'>
                        <div className='flex justify-around w-full' >
                            <p className='m-2 p-2 font-mono font-bold text-xl '>{pause == true ? "Bidding is paused" : ""}</p>
                        </div>

                        <div className='flex justify-around w-full' >
                            <p className='m-2 p-2 font-mono font-bold text-xl '>Place your bid</p>
                            <div className='m-2 p-2 border-2 border-black rounded-lg font-mono font-bold text-xl  text-center '>Your max bid : {manager_team_Details.current_balance - (manager_team_Details.base_player_num - manager_team_Details.players_bought) * manager_team_Details.base_player_value}</div>
                        </div>
                        <div className='w-full m-2 p-2 rounded-lg h-max '>
                            <div className=' flex flex-col justify-around items-around gap-5'>
                                <div className='flex justify-around w-full px-2'>
                                    {/*  */}
                                    <button className={`px-8 py-2 ${pause == true ? "bg-[#525252] text-[#949494]" : "bg-black text-white transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-black "}  w-20 flex justify-center rounded-md  font-bold `}
                                        disabled={pause} onClick={() => handle_Bid_ability(current_bid, 50)}>50</button>
                                    <button className={`px-8 py-2 ${pause == true ? "bg-[#525252] text-[#949494]" : "bg-black text-white transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-black "}  w-20 flex justify-center rounded-md  font-bold `}
                                        disabled={pause} onClick={() => handle_Bid_ability(current_bid, 100)}>100</button>
                                    <button className={`px-8 py-2 ${pause == true ? "bg-[#525252] text-[#949494]" : "bg-black text-white transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-black "}  w-20 flex justify-center rounded-md  font-bold `}
                                        disabled={pause} onClick={() => handle_Bid_ability(current_bid, 150)}>150</button>

                                </div>
                                <div className='flex justify-around w-full px-2'>
                                    <button className={`px-8 py-2 ${pause == true ? "bg-[#525252] text-[#949494]" : "bg-black text-white transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-black "}  w-20 flex justify-center rounded-md  font-bold `}
                                        disabled={pause} onClick={() => handle_Bid_ability(current_bid, 200)}>200</button>
                                    <button className={`px-8 py-2 ${pause == true ? "bg-[#525252] text-[#949494]" : "bg-black text-white transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-black "}  w-20 flex justify-center rounded-md  font-bold `}
                                        disabled={pause} onClick={() => handle_Bid_ability(current_bid, 250)}>250</button>
                                    <button className={`px-8 py-2 ${pause == true ? "bg-[#525252] text-[#949494]" : "bg-black text-white transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-black "}  w-20 flex justify-center rounded-md  font-bold `}
                                        disabled={pause} onClick={() => handle_Bid_ability(current_bid, 300)}>300</button>
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
                <p className='border-2 border-black p-2 rounded-lg'> Current Bid : {current_bid || players[index]?.base_value}</p>
                <p>{(playerSold == null || playerSold == false) ? "Available" : "sold"}</p>
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
                        <button className="px-8 py-2 rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-white  " onClick={() => handle_Pause(!pause)}>
                            {(pause === true) ? "Resume" : "Pause"}
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
                {user_role === "admin" ?
                    <div className='w-full  flex justify-center'>
                        <button onClick={handle_assign} className="px-8 py-2 rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black " >
                            Assign
                        </button>
                    </div> : <></>
                }


                {/* {(user_role === "admin") && (
                    <button className="px-8 py-2 rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-white  "  >
                        Assign
                    </button>
                )
                } */}

            </div>
        </div>

    )
}

export default auctionpage

function fetch_all_players_info(token: string) {
    throw new Error('Function not implemented.');
}
