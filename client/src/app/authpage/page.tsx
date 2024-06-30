"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Login from "./Login"
import Register from "./Register"
export default function SignupFormDemo() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  
  const [registered, setRegistered] = React.useState(true);

  const handleRegister = (value: boolean ) =>{
    setRegistered(value);
  }
  return (

    <div className="flex h-screen w-screen justify-center items-center">
      {registered? <Login handleRegister = {handleRegister} /> : <Register handleRegister = {handleRegister}/>}
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
