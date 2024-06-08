

"use client";

import React, { useState } from 'react';
// import axios from 'axios';
import { MoviingBorderButton } from "@/components/ui/SCmoving-border";

interface Player {
  name: string;
  sport: string;
  position: string;
  category: string;
}

const initialPlayers: Player[] = [
  { name: 'Farzine', sport: 'Football', position: 'Goal Keeper', category: '' },
  { name: 'Emran', sport: 'Football', position: 'Defender', category: '' },
  { name: 'Gilman', sport: 'Football', position: 'Midfielder', category: '' },
  { name: 'Meraj', sport: 'Football', position: 'Forward', category: '' },
  { name: 'Hasin', sport: 'Football', position: 'Midfielder', category: '' },
  { name: 'Niloy', sport: 'Football', position: 'Defender', category: '' },
  { name: 'Arnob', sport: 'Football', position: 'Forward', category: '' },
];

const categories = ['Platinum', 'Gold', 'Silver', 'Bronze'];

const PlayersPage: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);

  const handleCategoryChange = (index: number, newCategory: string) => {
    const updatedPlayers = players.map((player, i) =>
      i === index ? { ...player, category: newCategory } : player
    );
    setPlayers(updatedPlayers);
  };

//   const handleSave = async () => {
//     try {
//       const response = await axios.post('/api/save-categories', { players });
//       console.log('Categories saved successfully:', response.data);
//     } catch (error) {
//       console.error('Error saving categories:', error);
//     }
//   };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center items-center pt-5 mt-5">
        <MoviingBorderButton borderRadius="1rem"
        className="bg-white hover:bg-black hover:text-white transition transition-colors duration-500 font-bold text-xl text-black border-2 border-neutral-200"
        >Set Category
        </MoviingBorderButton>
    </div>
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg mt-5">
        <table className="w-full table-auto">
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
                <td className="border-2 px-4 py-2">{player.sport}</td>
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
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        //   onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default PlayersPage;
