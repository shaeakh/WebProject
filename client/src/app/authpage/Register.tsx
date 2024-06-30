"use client";
import React, { useState } from "react";


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
import { Value } from "@radix-ui/react-select";
import UploadIImg from "../components/UploadIImg";
import { Toaster } from "@/components/ui/sonner"
import axios from 'axios';

export default function SignupFormDemo(props: any) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    if (password === confirm_password) {
      e.preventDefault(); // Prevent default form submission
      const formData = new FormData(); // Use FormData for file upload
      formData.append('name', name);
      formData.append('edu_mail', edu_mail);
      formData.append('phone', phone);
      formData.append('regNo', regNo);
      formData.append('department', department);
      formData.append('password', password);
      console.log(formData);
      
      if (userPic) {
        formData.append('picture', userPic);
      }
      else {

      }
      try {
        const response = await axios.post('http://localhost:5000/api/auth/register', formData, {
          headers: {
            'Content-Type': 'multipart/form-data' // Set content type for file upload
          }
        });

        if (response.status === 201) {
          console.log('User registered successfully:', response.data);
          // Handle successful registration (e.g., redirect to login page)
        } else {
          console.error('Registration failed:', response.data);
          // Handle registration errors (e.g., display error messages)
        }
      } catch (error) {
        console.error('Error registering user:', error);
        // Handle errors during communication with the backend
      }
    }
    else {
      set_pass_ok(false);
      console.log(pass_ok);
    }
  };



  const [name, set_name] = React.useState("");
  const [edu_mail, set_edu_mail] = React.useState("");
  const [phone, set_phone] = React.useState("");
  const [regNo, set_regNo] = React.useState("");
  const [department, set_department] = React.useState("Department");
  const [userPic, set_userPic] = useState(null);

  const [password, set_password] = React.useState("");
  const [confirm_password, set_confirm_password] = React.useState("");
  const [pass_ok, set_pass_ok] = React.useState(true);

  const handleFileChange = (event:any) => {
    const file = event.target.files[0];
    set_userPic(file);
  };

  const handleRegister = () => {
    props.handleRegister(true)
  }



  return (

    <div className="flex h-max w-screen justify-center items-center">
      <div className="max-w-md w-screen mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to Online Player Auction
        </h2>
        <form className="my-8" onSubmit={handleSubmit}>
          <div className="grid grid-rows-auto grid-cols-2 gap-x-2">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="firstname">Name</Label>
                <Input value={name} onChange={(e) => set_name(e.target.value)}
                  id="firstname" placeholder="John Doe" type="text" />
              </LabelInputContainer>
            </div>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="phone">Phone Number</Label>
              <Input value={phone} onChange={(e) => set_phone(e.target.value)} id="phone" placeholder="Enter phone number" type="tel" />
            </LabelInputContainer>
          </div>



          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Educational Email Address</Label>
            <Input value={edu_mail} onChange={(e) => set_edu_mail(e.target.value)} id="email" placeholder="xyz12@student.sust.edu" type="email" />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="studentRegistrationNo">Student Registration Number</Label>
            <Input value={regNo} onChange={(e) => set_regNo(e.target.value)} id="studentRegistrationNo" placeholder="Enter Registration Number" type="text" />
          </LabelInputContainer>


          <div className="grid grid-rows-auto grid-cols-2  gap-x-2">
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input value={password} onChange={(e) => set_password(e.target.value)} id="password" placeholder="••••••••" type="password" />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Confirm Password</Label>
              <Input value={confirm_password} onChange={(e) => set_confirm_password(e.target.value)} id="password" placeholder="••••••••" type="password" />
            </LabelInputContainer>
          </div>


          <div className="mb-4">
            <DropdownMenu >
              <DropdownMenuTrigger asChild >
                <button className="px-8 py-2 rounded-md text-black border border-grey outline-none">
                  {department}
                </button>

              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Depertments</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={department} onValueChange={set_department}>
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



          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label htmlFor="picture">Picture</Label>
            <Input id="picture" type="file"  onChange={handleFileChange} />
          </div>

          <SubmitBtn text={"black"} bg={"white"} borderclr={"black"} hover_bg={"black"} hover_text={"white"} hover_border={"white"}
            value={"Register"} />
          <div className="flex justify-center mb-4">
            <Label onClick={handleRegister} htmlFor="password">Already have account ? <b>Sign in</b></Label>
          </div>
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
