"use client"
import { Button } from '@/components/ui/SCbutton'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/SCcard'
import { Input } from '@/components/ui/SCinput'
import { Label } from '@/components/ui/SClabel'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/SCselect'
import React, { use, useEffect, useState } from 'react'
import { FaRegCopy } from "react-icons/fa6";
import { MdFileDownloadDone } from "react-icons/md";

import { MoviingBorderButton } from "@/components/ui/SCmoving-border";
import Teams from './Teams'
import Teamheader from './Teamheader'
import { DataTableDemo } from './DataTable'
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from "next/link";
function Page({ params }: { params: { tournament: string } }) {

    const router = useRouter();

    const [user_role, setUserRole] = useState("undefined");

    const [tournament, set_tournament] = React.useState(
        {
            tournament_name: "",
            join_code: "",
            tournament_logo_url: ""
        }
    );
    const token = Cookies.get('token');

    const [codeCopy,set_codeCopy] = React.useState(false);
 
    const [teams, set_teams] = React.useState([]);

    const [Players, set_Players] = React.useState([]);

    const [team, set_team] = React.useState({
        team_id: 0,
        team_name: "",
        team_logo: "",
        name: ""
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const token = Cookies.get('token');
            if (!token) {
                router.push('/authpage'); // Redirect to login if no token is found
                return;
            }

            try {
                const tournament_id = params.tournament;
                const response = await fetch('http://localhost:5000/api/home/tournament-role', {
                    method: 'POST',
                    credentials: 'include', // Include cookies in the request
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ tournament_id })
                });

                const data = await response.json();
                if (data.role === 'unauthorized') {
                    router.push('/tournament');
                }
                else {
                    setUserRole(data.role);

                    const t_info_res = await fetch('http://localhost:5000/api/home/tournament-info', {
                        method: 'POST',
                        credentials: 'include', // Include cookies in the request
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ tournament_id })
                    });
                    const data2 = await t_info_res.json();

                    set_tournament(data2);
                    if (data.role === "admin") {
                        const teams_res = await fetch('http://localhost:5000/api/home/tournament-teams', {
                            method: 'POST',
                            credentials: 'include', // Include cookies in the request
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify({ tournament_id })
                        });
                        const data3 = await teams_res.json();
                        set_teams(data3);
                    }
                    if (data.role == "manager") {
                        const team_res = await fetch('http://localhost:5000/api/home/team-details-managerview', {
                            method: 'POST',
                            credentials: 'include', // Include cookies in the request
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify({ tournament_id })
                        });

                        const data4 = await team_res.json();
                        set_team(data4);

                        const players_res = await fetch('http://localhost:5000/api/home/team-players', {
                            method: 'POST',
                            credentials: 'include', // Include cookies in the request
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify({
                                tournament_id: tournament_id,
                                team_id: data4.team_id
                            })
                        });
                        const data5 = await players_res.json();
                        set_Players(data5);
                    }
                    if (data.role == "player") {
                        const team_res = await fetch('http://localhost:5000/api/home/team-details-playerview', {
                            method: 'POST',
                            credentials: 'include', // Include cookies in the request
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify({ tournament_id })
                        });

                        const data4 = await team_res.json();
                        set_team(data4);

                        const players_res = await fetch('http://localhost:5000/api/home/team-players-playerview', {
                            method: 'POST',
                            credentials: 'include', // Include cookies in the request
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify({
                                tournament_id: tournament_id,
                                team_id: data4.team_id
                            })
                        });
                        const data5 = await players_res.json();
                        set_Players(data5);
                    }

                }
            } catch (error) {

            }
        }
        fetchUserData()
    },
        [router]
    )

    const Start_auction = async () => {
        const team_res = await fetch('http://localhost:5000/api/auction/start', {
            method: 'POST',
            credentials: 'include', // Include cookies in the request
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ tournamentId: params.tournament })
        });
        const data = await team_res.json();
        console.log(data.body);
    }

    const handleCopy = () =>{
        set_codeCopy(true);
        navigator.clipboard.writeText(tournament.join_code);
    }

    return (
        <div className='flex flex-col justify-center items-center p-5'>
            <div className='w-8/12 lg:h-56 md:h-40 sm:h-24 overflow-hidden rounded-lg flex justify-center border-2 border-black'>
                <img className='object-cover h-full w-full' src={tournament.tournament_logo_url} alt="" />
            </div>
            {user_role === "admin" && (
                <div className=' w-8/12  '>
                    <div className='flex justify-between w-full p-2'>
                        <div className='h-32 flex flex-col justify-center'>
                            <div className='flex flex-col justify-around p-2 border border-black rounded-lg'>
                                <p className='text-2xl font-bold'>Tournament Join Code</p>
                                <hr className='w-full border border-grey' />
                                <div className='flex justify-between p-2'>
                                    <div className='w-9/12 bg-black rounded-lg bg-opacity-50 py-2 px-4'>
                                        <p className='text-xl text-white font-bold'>{tournament.join_code}</p>
                                    </div>
                                    <button onClick={handleCopy} className="px-2 w-min rounded-md bg-black text-white font-bold text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
                                        {codeCopy === true ? <MdFileDownloadDone  className='h-full text-2xl' /> : <FaRegCopy  className='h-full  text-xl' />}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center'>
                            <Link href={{
                                pathname: '/auctionpage',
                                query: {tournament: params.tournament}
                            }}>
                                <MoviingBorderButton
                                    onClick={Start_auction}
                                    borderRadius="1.75rem"
                                    className="bg-white hover:bg-black hover:text-white transition transition-colors duration-500 font-bold text-xl text-black border-2 border-neutral-200"
                                >
                                    Start Auction
                                </MoviingBorderButton>
                            </Link>

                        </div>
                        <div className='flex flex-col gap-2'>

                            <Link href={{
                                pathname: '/member_request',
                                query: { tournament: params.tournament }
                            }}>
                                <button className="px-8 py-2 rounded-md bg-black text-white font-bold text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
                                    Member Request
                                </button>
                            </Link>
                            <Link href={{
                                pathname: '/set_category',
                                query: { tournament: params.tournament }
                            }}>
                                <button className="px-8 py-2 rounded-md bg-black text-white font-bold text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
                                    Set Players Category
                                </button>
                            </Link>
                            <Link href={{
                                pathname: '/update_tournament',
                                query: { tournament: params.tournament }
                            }}>
                                <button className="px-8 py-2 rounded-md bg-black text-white font-bold text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
                                    Update Tournament
                                </button>
                            </Link>
                        </div>
                    </div>
                    <hr className='border border-grey w-full my-2' />
                    <Teams obj={teams} />
                </div>
            )}
            {(user_role === "manager" || user_role === "player") && (
                <div className='w-8/12 border-red-600 flex flex-col'>

                    <div className='flex w-full '>
                        <Teamheader tournament={params.tournament} role={user_role} team_name={team.team_name} team_logo={team.team_logo} name={team.name} />
                    </div>
                    <div className=' '>
                        <div className='font-mono font-bold text-2xl text-center'>
                            Player List
                        </div>
                        <DataTableDemo Players={Players} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Page
