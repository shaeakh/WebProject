"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/SCdropdown-menu';
import { Input } from '@/components/ui/SCinput';
import { Label } from '@/components/ui/SClabel';
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react'
import { addDays, format } from "date-fns"
import { Button } from "@/components/ui/SCbutton"
import { Calendar } from "@/components/ui/SCcalendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/SCpopover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/SCselect"

import { FaRegCalendar } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Divide } from 'lucide-react';

const Page: React.FC = () => {
    const router = useRouter();
    const [tournament_name, set_tournament_name] = useState("");
    const [tournament_type, set_tournament_type] = React.useState("Tournament type");
    const [date, setDate] = useState<Date>(new Date());
    const [coverpic, set_coverpic] = useState<File | undefined>(undefined);
    const [initial_team_points, set_initial_team_point] = useState<number | undefined>(undefined);
    const [num_of_player, set_num_of_player] = useState<number | undefined>(7);
    const [base_player_point, set_base_player_point] = useState<number | undefined>(undefined);
    const [error, setError] = useState("");
    const [isError, setisError] = useState(false);

    useEffect(() => {
        const today = new Date();
        setDate(today);
    }, []);


    useEffect(() => {
        let timer: any;
        if (isError) {
            timer = setTimeout(() => {
                setisError(false);
            }, 4000);
        }
        return () => clearTimeout(timer);
    }, [isError]);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = Cookies.get('token');
            if (!token) {
                router.push('/authpage');
                return;
            }
        }
        fetchUserData()
    },
        [router]
    )
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            set_coverpic(e.target.files[0]);
        }
    }

    const handleDateSelect = (day: Date | undefined) => {
        if (day) {
            setDate(day);
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = Cookies.get('token');
        if (!token) {
            router.push('/authpage');
            return;
        }

        const formData = new FormData();
        formData.append("tournamentName", tournament_name);
        formData.append("sportType", tournament_type);
        formData.append("playerBaseCoin", base_player_point !== undefined ? base_player_point.toString() : "");
        formData.append("perTeamCoin", initial_team_points !== undefined ? initial_team_points.toString() : "");
        formData.append("num_of_player", num_of_player !== undefined ? num_of_player.toString() : "");

        if (date) {
            formData.append("tournamentDate", date.toISOString());
        }

        if (coverpic) {
            formData.append("logoPicUrl", coverpic);
        }

        try {


            const response = await fetch("http://localhost:5000/api/home/create-tournament", {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
            })

            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData);
                setisError(true);
                setError(errorData.message || "Error creating tournament");
            } else {
                console.log(formData);
                router.push('/homepage')
            }


        } catch (error) {
            setisError(true);
            setError("Error tournament");
        }
    }

    return (
        <div className='w-screen h-screen flex justify-center items-center'>

            <form className="my-8 w-1/3 " onSubmit={handleSubmit} suppressHydrationWarning>
                {(isError) ?
                    <div className="font-bold bg-red-400 bg-opacity-50 rounded-lg my-2 p-2">
                        {error}
                    </div> : <div></div>
                }
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                    <LabelInputContainer>
                        <Label htmlFor="Tournament_name">Tournament name</Label>
                        <Input id="Tournament_name" placeholder="Inter department tournament" type="text" value={tournament_name ?? ""} onChange={(e) => set_tournament_name(e.target.value)} />
                    </LabelInputContainer>
                </div>
                <div className='flex justify-between w-full'>
                    <div className="mb-4 w-1/2">
                        <DropdownMenu >
                            <DropdownMenuTrigger asChild >
                                <button className="px-8  w-full mr-4 py-2 rounded-md text-black border border-grey outline-none">
                                    {tournament_type}
                                </button>

                            </DropdownMenuTrigger>

                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Tournament Type</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup value={tournament_type} onValueChange={set_tournament_type}>
                                    <DropdownMenuRadioItem value="Cricket">Cricket</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Football">Football</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className='w-1/2 ml-4'>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full  justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <FaRegCalendar className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                align="start"
                                className="flex flex-col space-y-2 p-2 "
                            >
                                <Select
                                    onValueChange={(value: any) =>
                                        setDate(addDays(new Date(), parseInt(value)))
                                    }

                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="0">Today</SelectItem>
                                        <SelectItem value="1">Tomorrow</SelectItem>
                                        <SelectItem value="3">In 3 days</SelectItem>
                                        <SelectItem value="7">In a week</SelectItem>
                                    </SelectContent>
                                </Select>
                                <div className="rounded-md border">
                                    <Calendar mode="single" selected={date} onSelect={handleDateSelect} />
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                <div className='flex justify-around gap-4'>
                    <div className="grid w-1/2 max-w-sm items-center gap-1.5 mb-4">
                        <Label htmlFor="picture">Upload tournament logo</Label>
                        <Input id="picture" type="file" onChange={handleFileChange} />
                    </div>
                    <LabelInputContainer className="mb-4 w-1/2 ">
                        <Label htmlFor="points">Number of players</Label>
                        <Input id="points" placeholder="7 (default)" type="number" value={num_of_player} onChange={(e) => set_num_of_player(Number(e.target.value))} />
                    </LabelInputContainer>
                </div>



                <div className='flex justify-between'>
                    <LabelInputContainer className="mb-4 mr-4">
                        <Label htmlFor="points">Initialize points for each team</Label>
                        <Input id="points" placeholder="Initial team points" type="number" value={initial_team_points} onChange={(e) => set_initial_team_point(Number(e.target.value))} />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4 ml-4">
                        <Label htmlFor="points">Base points for each player</Label>
                        <Input id="points" placeholder="Base player points" type="number" value={base_player_point} onChange={(e) => set_base_player_point(Number(e.target.value))} />
                    </LabelInputContainer>
                </div>

                <div className='w-full'>
                    <button className="px-8 w-full py-2 rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-white  ">
                        Create Tournament
                    </button>
                </div>
            </form>
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

export default Page;
