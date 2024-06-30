"use client";
import React from "react";
import { Boxes } from "@/components/ui/ACbackground-boxes";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/SCinput";
import { IoSearch } from "react-icons/io5";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="w-full bg-white flex my-2 justify-around">
        <img className="lg:h-10 " src="https://raw.githubusercontent.com/shaeakh/WebProject/main/client/src/app/logo.png" alt="" />
        <div className="flex gap-4 font-mono font-bold items-center ">
          <button className="px-2 rounded-lg hover:bg-slate-300 transition duration-200">Home</button>

          <button className="px-2 rounded-lg hover:bg-slate-300 transition duration-200">Login</button>
          <button className="px-2 rounded-lg hover:bg-slate-300 transition duration-200">About Us</button>
        </div>

        <div className="w-4/12 ">
          <input
            className="border border-grey rounded-lg pl-10 pr-4 py-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="/Search"
          />
        </div>

        <a href="/authpage">
          <button className="mx-2 px-8 py-2 rounded-md bg-slate-700 text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-white  ">
            Get Started
          </button>
        </a>
      </div>
      <div className="h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
        <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

        <Boxes />
        <h1 className={cn("md:text-4xl font-mono font-bold text-2xl text-white relative z-20")}>
          Welcome to Chol-kheli
        </h1>
        <p className="text-center mt-2 font-mono font-bold text-xl text-white relative z-20">
          Seize the Deal, Own the Field!
        </p>
      </div>

    </div>
  );
}
