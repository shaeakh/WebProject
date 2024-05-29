"use client";
import React from "react";
import { Button } from "@/components/ui/button"
import SubmitBtn from "../components/SubmitBtn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";

export default function SignupFormDemo() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  const [depertment, setDepertment] = React.useState("Depertment");
  return (

    <div className="flex h-screen w-screen justify-center items-center">
      <div className="max-w-md w-screen mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Online Player Auction
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Get the best players in the tournament with our analysis tools
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">Name</Label>
            <Input id="firstname" placeholder="John Doe" type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" placeholder="Enter phone number" type="tel" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Educational Email Address</Label>
          <Input id="email" placeholder="xyz12@student.sust.edu" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="studentRegistrationNo">Student Registration Number</Label>
          <Input id="studentRegistrationNo" placeholder="Enter Registration Number" type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Confirm Password</Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>
        <div className="mb-4">
          <DropdownMenu >
            <DropdownMenuTrigger asChild >
              <Button variant={"outline"}>{depertment}</Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Depertments</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={depertment} onValueChange={setDepertment}>
                
                <DropdownMenuRadioItem value="ARC">ARC</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="CSE">CSE</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="SWE">SWE</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="EEE">EEE</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="IPE">IPE</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="ME">ME</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="CEE">CEE</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="PME">PME</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="BMB">BMB</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="GEB">GEB</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="PSS">PSS</DropdownMenuRadioItem>
                
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <SubmitBtn text={"black"} bg={"white"} borderclr={"black"} hover_bg={"black"} hover_text={"white"} hover_border={"white"}
          value={"Register"} />
      </form>
    </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

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
