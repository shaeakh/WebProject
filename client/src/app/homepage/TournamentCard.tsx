import React from 'react';

interface TournamentCardProps {
  title: string;
  date: string;
  backgroundImage: string;
  link: string;
}

const TournamentCard: React.FC<TournamentCardProps> = ({ title, date, backgroundImage, link }) => {
  return (
    <div
      className='border-2 border-black rounded-lg hover:font-bold'
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '150px', // Adjust height as needed
        width: '250px'
      }}
    >
      <a href={link}>
        <div className='h-full flex flex-col justify-end rounded-lg'>
          <div className='h-min bg-black rounded-lg bg-opacity-50'>
            <p className='font-mono text-2xl text-white mx-2 mt-2'>{title}</p>
            <p className='font-mono text-lg text-white mx-2 mb-2'>{date}</p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default TournamentCard;
