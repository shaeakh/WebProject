// pages/join-tournament.tsx

"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MoviingBorderButton } from "@/components/ui/SCmoving-border";
import Cookies from 'js-cookie';

const JoinTournament: React.FC = () => {
  const [joinCode, setJoinCode] = useState('');
  const [role, setRole] = useState<'manager' | 'player' | ''>('');
  const [position, setPosition] = useState('');
  const [teamName, setTeamName] = useState('');
  const [teamLogo, setTeamLogo] = useState<File | null>(null);
  const router = useRouter();

    
    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         const token = Cookies.get('token');
    //         if (!token) {
    //             router.push('/authpage'); // Redirect to login if no token is found
    //             return;
    //         }
    //     }
    //     fetchUserData()
    // },
    //     [router]
    // )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTeamLogo(e.target.files[0]);
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
    formData.append('joinCode', joinCode);
    formData.append('role', role);
    if (role === 'player') {
      formData.append('position', position);
    } else if (role === 'manager') {
      formData.append('teamName', teamName);
      if (teamLogo) {
        formData.append('teamLogo', teamLogo);
      }
    }

    try {
      const response = await fetch('http://localhost:5000/api/home/join-tournament', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      if (!response.ok) {
        throw new Error('Failed to join tournament');
      }
      // Navigate to homepage upon successful join
      router.push('/homepage');
      alert('Joined request sent Successfully ');
    } catch (error) {
      console.error('Error joining tournament:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-96">
        <div className="flex justify-center items-center pt-5 mb-5">
          <MoviingBorderButton borderRadius="1rem"
            className=" bg-white hover:bg-black hover:text-white transition transition-colors duration-500 font-bold text-xl text-black border-2 border-neutral-200"
          >
            Join Tournament
          </MoviingBorderButton>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Join Code:</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Select Role:</label>
            <select
              className="w-full p-2 border-2 rounded"
              value={role}
              onChange={(e) => setRole(e.target.value as 'manager' | 'player')}
              required
            >
              <option value="" disabled>Select role</option>
              <option value="player">Player</option>
              <option value="manager">Manager</option>
            </select>
          </div>
          {role === 'player' && (
            <div className="mb-4">
              <label className="block mb-2">Select Speciality:</label>
              <input
                type="text"
                className="w-full p-2 border-2 rounded"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required
              />
            </div>
          )}
          {role === 'manager' && (
            <>
              <div className="mb-4">
                <label className="block mb-2">Team Name:</label>
                <input
                  type="text"
                  className="w-full p-2 border-2 rounded"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Team Logo:</label>
                <input
                  type="file"
                  className="w-full p-2 border-2 rounded"
                  onChange={handleFileChange}
                  required
                />
              </div>
            </>
          )}
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Join Tournament
            </button>
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => router.push('/homepage')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinTournament;
