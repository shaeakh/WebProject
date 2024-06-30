"use client";
import React, { useEffect, useState } from "react";
import SubmitBtn from "../components/SubmitBtn";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/SCdropdown-menu"
import { Label } from "@/components/ui/SClabel";
import { Input } from "@/components/ui/SCinput";
import { cn } from "@/lib/utils";
import Cookies from 'js-cookie';


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/SCselect"

import {
    IconBrandGithub,
    IconBrandGoogle,
    IconBrandOnlyfans,
} from "@tabler/icons-react";

import { useRouter } from "next/navigation";

export default function SignupFormDemo(props: any) {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isError, setisError] = useState(false);

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
            if (token) {
                router.push('/homepage'); // Redirect to login if no token is found
                return;
            }
        }
        fetchUserData()
    },
        [router]
    )

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const login = {
                email: email,
                password: password || 'password'
            }

            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(login),
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();
                setisError(true);
                setError(errorData.message || "Error while logging in");
            } else {
                const data = await response.json();
                Cookies.set('token', data.token);

                router.push('/homepage') //router push to homepage
                console.log("//router push to homepage");
            }

        } catch (error) {
            console.log(error);
            setisError(true);
            setError("Error while logging in");
        }
    }

    const handleRegister = () => {
        props.handleRegister(false)
    }


    return (

        <div className="flex h-screen w-screen justify-center items-center">
            <div className="max-w-md w-screen mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                    Welcome to Online Player Auction
                </h2>
                <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                    Get the best players in the tournament with our analysis tools
                </p>

                <form className="my-4" onSubmit={handleSubmit}>
                    {(isError) ?
                        <div className="font-bold bg-red-400 bg-opacity-50 rounded-lg my-2 p-2">
                            {error}
                        </div> : <div></div>
                    }
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Educational Email Address</Label>
                        <Input id="email" placeholder="xyz12@student.sust.edu" type="email" value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" placeholder="••••••••" type="password" value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </LabelInputContainer>
                    <div className="flex justify-end mb-4">
                        <Label htmlFor="password">Forgot Password ?</Label>
                    </div>

                    <div className="flex justify-center w-full mb-4 ">
                        <button type="submit" onClick={() => handleSubmit} className="px-8 w-full py-2 rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-white  ">
                            Login
                        </button>
                    </div>


                    <div className="flex justify-center mb-4">
                        <Label onClick={handleRegister} htmlFor="password">Don't have any account ? <b>Register</b></Label>
                    </div>

                </form>
            </div>
        </div>
    );
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
