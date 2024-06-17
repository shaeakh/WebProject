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
import { Value } from "@radix-ui/react-select";
import UploadIImg from "../components/UploadIImg";

export default function SignupFormDemo(props: any) {

  const [name, set_name] = React.useState("");
  const [edu_mail, set_edu_mail] = React.useState("");
  const [phone, set_phone] = React.useState("");
  const [regNo, set_regNo] = React.useState("");
  const [department, set_department] = React.useState("Department");
  const [userPic, setUserPic] = useState<File | null>(null);
  const [password, set_password] = React.useState("");
  const [confirm_password, set_confirm_password] = React.useState("");
  const [error, setError] = useState("");
  const [isError, setisError] = useState(false);

  const isValidEmail = (email: any) => {
    const regex = /^[a-zA-Z]+[0-9]*@student\.sust\.edu$/;
    return regex.test(email);
  };

  
  useEffect(() => {
    let timer: any;
    if (isError) {
      timer = setTimeout(() => {
        setisError(false);
      }, 4000);
    }    
    return () => clearTimeout(timer);
  }, [isError]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    if (password !== confirm_password) {
      setisError(true);
      setError("Passwords do not match");
      
      return;
    }
    if (!isValidEmail(edu_mail)) {
      setisError(true);
      setError("Only @student.sust.edu emails are allowed.");      
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", edu_mail);
      formData.append("phone", phone);
      formData.append("regNo", regNo);
      formData.append("department", department);
      formData.append("password", password);
      formData.append("confirmPassword", confirm_password);

      if (userPic) {
        formData.append("userPicUrl", userPic);
      }
      
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setisError(true);
        setError(errorData.message || "Error registering user");
      } else {
        props.handleRegister(true); 
      }
    } catch (err) {
      setisError(true);
      setError("Error registering user");
      
    }
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUserPic(e.target.files[0]);
    }
  };

  const handleRegister = () => {
    props.handleRegister(true)
  }

  return (

    <div className="flex h-full w-screen justify-center items-center">
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
          <div className="flex gap-4 justify-between">
            <div className="w-1/2 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="firstname">Name</Label>
                <Input value={name} onChange={(e) => set_name(e.target.value)}
                  id="firstname" placeholder="John Doe" type="text" />
              </LabelInputContainer>
            </div>

            <LabelInputContainer className="w-1/2  mb-4">
              <Label htmlFor="phone">Phone Number</Label>
              <Input value={phone} onChange={(e) => set_phone(e.target.value)} id="phone" placeholder="Enter phone number" type="tel" />
            </LabelInputContainer>
          </div>


          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Educational Email Address</Label>
            <Input value={edu_mail} onChange={(e) => set_edu_mail(e.target.value)} id="email" placeholder="xyz12@student.sust.edu" type="email" />
          </LabelInputContainer>

          <div className="flex gap-4 w-full items-end justify-between">
            <LabelInputContainer className="mb-4 w-1/2">
              <Label htmlFor="studentRegistrationNo">Registration Number</Label>
              <Input value={regNo} onChange={(e) => set_regNo(e.target.value)} id="studentRegistrationNo" placeholder="Enter Registration Number" type="text" />
            </LabelInputContainer>
            <div className="mb-4 w-1/2">
              <DropdownMenu >
                <DropdownMenuTrigger asChild >
                  <button className=" w-full px-8 py-2 rounded-md text-black border border-grey outline-none">
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
          </div>

          <div className="flex gap-4 justify-between">
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input value={password} onChange={(e) => set_password(e.target.value)} id="password" placeholder="••••••••" type="password" />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Confirm Password</Label>
              <Input value={confirm_password} onChange={(e) => set_confirm_password(e.target.value)} id="password" placeholder="••••••••" type="password" />
            </LabelInputContainer>
          </div>



          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label htmlFor="picture">Picture</Label>
            <Input id="picture" type="file" onChange={handleFileChange} />
          </div>
          <div className="w-full flex justify-center mb-4">
            <button className="px-8 py-2 rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-white  ">
              Register
            </button>
          </div>

          <div className="flex justify-center">
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
