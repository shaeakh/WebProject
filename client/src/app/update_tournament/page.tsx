"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Input } from "@/components/ui/SCinput";
import { Label } from "@/components/ui/SClabel";
import { cn } from '@/lib/utils';
import { MoviingBorderButton } from '@/components/ui/SCmoving-border';

interface Tournament {
  tournamentName: string;
  sportType: string;
  perTeamCoin: string;
  playerBaseCoin: string;
  tournamentDate: string;
  logoPicUrl: string;
  num_of_player: any;
}

interface UpdateTournamentProps {
  searchParams: {
    tournament: any;
  };
}

const UpdateTournament: React.FC<UpdateTournamentProps> = ({ searchParams }) => {
  const router = useRouter();
  const [tournament, setTournament] = useState<Tournament>({
    tournamentName: "",
    sportType: "",
    perTeamCoin: "",
    playerBaseCoin: "",
    tournamentDate: "",
    logoPicUrl: "",
    num_of_player: null
  });

  const [newTournamentLogo, setNewTournamentLogo] = useState<File | null>(null);

  useEffect(() => {
    const fetchTournamentData = async () => {
      const token = Cookies.get('token');
      if (!token) {
        router.push('/authpage'); // Redirect to login if no token is found
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/home/tournament-details/${searchParams.tournament}`, {
          method: 'GET',
          credentials: 'include', // Include cookies in the request
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch tournament data');
        }

        const data = await response.json();
        setTournament({
          tournamentName: data.tournament.tournament_name,
          sportType: data.tournament.sport_type,
          perTeamCoin: data.tournament.per_team_coin,
          playerBaseCoin: data.tournament.player_base_coin,
          tournamentDate: data.tournament.tournament_date,
          logoPicUrl: data.tournament.tournament_logo_url,
          num_of_player: data.tournament.num_of_player
        });

      } catch (error) {
        console.error('Error fetching tournament data:', error);
      }
    };

    fetchTournamentData();
  }, [router, searchParams.tournament]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = Cookies.get('token');
    if (!token) {
      router.push('/authpage'); // Redirect to login if no token is found
      return;
    }

    const formData = new FormData();
    formData.append('tournamentName', tournament.tournamentName);
    formData.append('sportType', tournament.sportType);
    formData.append('tournamentDate', tournament.tournamentDate);
    formData.append('perTeamCoin', tournament.perTeamCoin);
    formData.append('playerBaseCoin', tournament.playerBaseCoin);
    formData.append('num_of_player', tournament.num_of_player);
    if (newTournamentLogo) {
      formData.append('logoPicUrl', newTournamentLogo);
    }

    try {
      const response = await fetch(`http://localhost:5000/api/home/update-tournament/${searchParams.tournament}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to update tournament');
      }

      const data = await response.json();
      alert('Tournament updated successfully');
      router.push(`/tournament/${searchParams.tournament}`);

    } catch (error) {
      console.error('Error updating tournament:', error);
    }
  };

  const handleTournamentLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewTournamentLogo(e.target.files[0]);
    }
  };

  return (
    <div className='w-screen flex'>
      <div className='w-1/3 flex flex-col h-screen justify-center bg-gray-400 bg-opacity-50'>
        <div className='flex justify-center'>
          <div className='w-full h-full justify-center flex items-center'>
            <div className='w-8/12 lg:h-56 md:h-40 sm:h-24 overflow-hidden rounded-lg flex justify-center border-2 border-black'>
              <img className='object-cover h-full w-full' src={tournament.logoPicUrl} alt={tournament.tournamentName} />
            </div>
          </div>
        </div>
        <div className='flex flex-col items-start justify-center m-5'>
          <p className='font-mono font-bold text-2xl'>{tournament.tournamentName}</p>
          <p className='font-mono text-lg'>Sport Type: {tournament.sportType}</p>
          <p className='font-mono text-lg'>Tournament Date: {tournament.tournamentDate}</p>
          <p className='font-mono text-lg'>Per Team Coins: {tournament.perTeamCoin}</p>
          <p className='font-mono text-lg'>Player Base Coin: {tournament.playerBaseCoin}</p>
          <p className='font-mono text-lg'>Players per team : {tournament.num_of_player}</p>
        </div>
      </div>
      <div className='w-5/6 flex flex-col justify-center items-center'>
        <div className='w-1/3 p-4'>
          <div className="flex justify-center items-center pt-5 mt-5">
            <MoviingBorderButton borderRadius="1rem"
              className="bg-white hover:bg-black hover:text-white transition transition-colors duration-500 font-bold text-xl text-black border-2 border-neutral-200">
              Tournament Update
            </MoviingBorderButton>
          </div>
          <form className="my-8" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="tournamentName">Update Tournament Name</Label>
              <Input
                id="tournamentName"
                placeholder="Tournament Name"
                type="text"
                value={tournament.tournamentName}
                onChange={(e) => setTournament({ ...tournament, tournamentName: e.target.value })}
              />
            </LabelInputContainer>
            <div className='flex justify-between gap-4'>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="sportType">Update Sport Type</Label>
                <select
                  id="sportType"
                  value={tournament.sportType}
                  onChange={(e) => setTournament({ ...tournament, sportType: e.target.value })}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Sport Type</option>
                  <option value="Football">Football</option>
                  <option value="Cricket">Cricket</option>
                </select>
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="tournamentDate">Update Tournament Date</Label>
                <Input
                  id="tournamentDate"
                  type="date"
                  value={tournament.tournamentDate.split('T')[0]} // Format the date to 'YYYY-MM-DD'
                  onChange={(e) => setTournament({ ...tournament, tournamentDate: e.target.value })}
                />
              </LabelInputContainer>
            </div>
            <div className='flex justify-between gap-4'>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="perTeamCoin">Update Per Team Coin</Label>
                <Input
                  id="perTeamCoin"
                  placeholder="Enter Per Team Coin"
                  type="text"
                  value={tournament.perTeamCoin}
                  onChange={(e) => setTournament({ ...tournament, perTeamCoin: e.target.value })}
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="playerBaseCoin">Update Player Base Coin</Label>
                <Input
                  id="playerBaseCoin"
                  placeholder="Enter Player Base Coin"
                  type="text"
                  value={tournament.playerBaseCoin}
                  onChange={(e) => setTournament({ ...tournament, playerBaseCoin: e.target.value })}
                />
              </LabelInputContainer>
            </div>

            <div className='flex justify-between gap-4'>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="profile-pic">Update Tournament Logo</Label>
                <Input id="profile-pic" type="file" accept="image/*" onChange={handleTournamentLogoChange} />
              </LabelInputContainer>

              <LabelInputContainer className="mb-4">
                <Label htmlFor="num_of_player">Number of player per team</Label>
                <Input
                  id="num_of_player"
                  placeholder="Number of player"
                  type="number"
                  value={tournament.num_of_player}
                  onChange={(e) => setTournament({ ...tournament, num_of_player: e.target.value })}
                />
              </LabelInputContainer>
            </div>
            <hr className='mb-4' style={{ border: '1px solid #ddd', width: '100%' }} />
            <div className="flex justify-center w-full mb-4">
              <button type="submit" className="px-8 w-full py-2 rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-white">
                Update Tournament
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default UpdateTournament;
