
"use client";

import React, { useEffect, useState } from 'react';
import { MoviingBorderButton } from "@/components/ui/SCmoving-border";
// import { useRouter } from 'next/router';
// import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const UpdateTournament: React.FC = () => {
  const [tournamentName, setTournamentName] = useState('');
  const [sportType, setSportType] = useState('');
  const [tournamentDate, setTournamentDate] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [playerBaseCoin, setPlayerBaseCoin] = useState<number | string>('');
  const [perTeamCoin, setPerTeamCoin] = useState<number | string>('');

  const router = useRouter();
    
    useEffect(() => {
        const fetchUserData = async () => {
            const token = Cookies.get('token');
            if (!token) {
                router.push('/authpage'); // Redirect to login if no token is found
                return;
            }
        }
        fetchUserData()
    },
        [router]
    )
//   const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('tournamentName', tournamentName);
    formData.append('sportType', sportType);
    formData.append('tournamentDate', tournamentDate);
    if (logo) {
      formData.append('logo', logo);
    }
    formData.append('playerBaseCoin', playerBaseCoin.toString());
    formData.append('perTeamCoin', perTeamCoin.toString());

    // try {
    //   await axios.post('/api/update-tournament', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });
    //   router.push('/previous-page'); // replace with your previous page path
    // } catch (error) {
    //   console.error('Error updating tournament:', error);
    // }
  };

  const handleCancel = () => {
    // router.push('/previous-page'); // replace with your previous page path
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-200 p-8 rounded-lg shadow-lg w-96">
      <div className="flex justify-center items-center pt-5 mb-10">
        <MoviingBorderButton borderRadius="1rem"
        className="bg-white hover:bg-black hover:text-white transition transition-colors duration-500 font-bold text-xl text-black border-2 border-neutral-200"
        >Update Tournament
        </MoviingBorderButton>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 md:font-bold">Tournament Name:</label>
            <input
              type="text"
              className="w-full p-2 border-2 rounded"
              value={tournamentName}
              onChange={(e) => setTournamentName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 md:font-bold">Sports Type:</label>
            <select
              className="w-full p-2 border-2 rounded"
              value={sportType}
              onChange={(e) => setSportType(e.target.value)}
              required
            >
              <option value="" disabled>Select type</option>
              <option value="Football">Football</option>
              <option value="Basketball">Cricket</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 md:font-bold">Tournament Date:</label>
            <input
              type="date"
              className="w-full p-2 border-2 rounded"
              value={tournamentDate}
              onChange={(e) => setTournamentDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 md:font-bold">Logo:</label>
            <input
              type="file"
              className="w-full p-2 border-2 rounded"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 md:font-bold">Player Base Coin:</label>
            <input
              type="number"
              className="w-full p-2 border-2 rounded"
              value={playerBaseCoin}
              onChange={(e) => setPlayerBaseCoin(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 md:font-bold">Per Team Coin:</label>
            <input
              type="number"
              className="w-full p-2 border-2 rounded"
              value={perTeamCoin}
              onChange={(e) => setPerTeamCoin(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded md:font-bold"
            >
              Update
            </button>
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded md:font-bold"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTournament;
