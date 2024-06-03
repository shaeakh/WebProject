"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/SCdropdown-menu';
import { Input } from '@/components/ui/SCinput';
import { Label } from '@/components/ui/SClabel';
import { cn } from '@/lib/utils';
import React from 'react'

function page() {
    const [tournament_type, set_tournament_type] = React.useState("Tournament type");
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <form className="my-8 w-1/3 " >
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                    <LabelInputContainer>
                        <Label htmlFor="Tournament_name">Tournament name</Label>
                        <Input id="Tournament_name" placeholder="Inter department tournament" type="text" />
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
                                    <DropdownMenuRadioItem value="Handball">Handball</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Volleyball">Volleyball</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className='w-1/2 ml-4'>
                        <button className="px-8 w-full py-2 rounded-md text-black border border-grey outline-none">
                            Pic a date
                        </button>
                    </div>
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                    <Label htmlFor="picture">Upload your team logo</Label>
                    <Input id="picture" type="file" />
                </div>

                <div className='flex justify-between'>
                    <LabelInputContainer className="mb-4 mr-4">
                        <Label htmlFor="points">Initialize points for each team</Label>
                        <Input id="points" placeholder="Initial points" type="number" />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4 ml-4">
                        <Label htmlFor="points">Base points for each player</Label>
                        <Input id="points" placeholder="Base points" type="number" />
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

export default page