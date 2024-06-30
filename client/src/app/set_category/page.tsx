// pages/set_categories.tsx

"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MoviingBorderButton } from "@/components/ui/SCmoving-border";
import Cookies from 'js-cookie';

interface Player {
  name: string;
  reg_no: string;
  tournament_id: number;
  sport_type: string;
  position: string;
  category: string;
}

interface SetCategoriesProps {
  searchParams: {
    tournament: any;
  };
}


const categories = ['Platinum', 'Gold', 'Silver', 'Bronze'];

const SetCategoriesPage: React.FC<SetCategoriesProps> = ({ searchParams }: {
  searchParams: {
    tournament: any;
  }
}) => {
  const router = useRouter();
  const [players, setPlayers] = useState<Player[]>([]);
  const [tournamentId, setTournamentId] = useState<number>(1); // Assuming a tournament ID for now

  useEffect(() => {
    const fetchPlayers = async () => {
      const token = Cookies.get('token');
      if (!token) {
        router.push('/authpage'); // Redirect to login if no token is found
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/home/players/${searchParams.tournament}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch players');
        }

        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
  }, [router, tournamentId]);

  const handleCategoryChange = (index: number, newCategory: string) => {
    const updatedPlayers = players.map((player, i) =>
      i === index ? { ...player, category: newCategory } : player
    );
    setPlayers(updatedPlayers);
  };

  const handleSave = async () => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/authpage'); // Redirect to login if no token is found
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/home/players/categories', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ players })
      });

      if (!response.ok) {
        throw new Error('Failed to save categories');
      }

      const data = await response.json();
      console.log('Categories saved successfully:', data);
      alert('Categories saved successfully');
    } catch (error) {
      console.error('Error saving categories:', error);
      alert('Error saving categories');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1>this is tournament no {searchParams.tournament}</h1>
      <div className="flex justify-center items-center pt-5 mt-5">
        <MoviingBorderButton borderRadius="1rem"
          className="bg-white hover:bg-black hover:text-white transition transition-colors duration-500 font-bold text-xl text-black border-2 border-neutral-200">
          Set Category
        </MoviingBorderButton>
      </div>
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg mt-5">
        <table className="w-full table-auto mb-5">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Sport</th>
              <th className="px-4 py-2">Position</th>
              <th className="px-4 py-2">Category</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={index} className="text-center">
                <td className="border-2 px-4 py-2">{player.name}</td>
                <td className="border-2 px-4 py-2">{player.sport_type}</td>
                <td className="border-2 px-4 py-2">{player.position}</td>
                <td className="border-2 px-4 py-2">
                  <select
                    className="bg-gray-200 p-2 rounded"
                    value={player.category}
                    onChange={(e) => handleCategoryChange(index, e.target.value)}
                  >
                    <option value="" disabled>Select Category</option>
                    {categories.map((category, i) => (
                      <option key={i} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center">
          <MoviingBorderButton borderRadius="1rem"
            className="bg-white hover:bg-black hover:text-white transition transition-colors duration-500 font-bold text-xl text-black border-2 border-neutral-200"
            onClick={handleSave}>
            Save
          </MoviingBorderButton>
        </div>
      </div>
    </div>
  );
};

export default SetCategoriesPage;
