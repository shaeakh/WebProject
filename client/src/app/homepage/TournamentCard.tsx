import React from 'react';

interface TournamentCardProps {
  tournament_name: string;
  role: string;
  tournament_logo_url: string; 
}

const TournamentCard: React.FC<TournamentCardProps> = ({ tournament_name, role, tournament_logo_url }) => {
  const truncateString = (str: string): string => {
    return str.length > 33 ? str.slice(0, 33) + "..." : str;
  };
  return (
    <div
      className='border-2 border-black rounded-lg hover:font-bold'
      style={{
        backgroundImage: `url(${tournament_logo_url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '150px', // Adjust height as needed
        width: '250px'
      }}
    >
      <div className='h-full flex flex-col justify-end rounded-lg'>
          <div className='h-min bg-black rounded-lg bg-opacity-50'>
            <p className='font-mono text-xl text-white mx-2 mt-2'>{truncateString(tournament_name)}</p>
            <p className='font-mono text-lg text-white mx-2 mb-2'>{role}</p>
          </div>
        </div>
    </div>
  );
};

export default TournamentCard;
