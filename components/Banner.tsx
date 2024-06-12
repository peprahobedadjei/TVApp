import React, { useEffect, useRef } from 'react';
import MovieRow from './MovieRow';
import { useTVControls } from '../hook/useTVControls';
import Image from 'next/image';

const moviesRow1 = [
  { title: 'Movie 1', image: 'poster1.jpg', description: 'test' },
  { title: 'Movie 2', image: 'poster1.jpg', description: 'test' },
  { title: 'Movie 3', image: 'poster1.jpg', description: 'test' },
  { title: 'Movie 4', image: 'poster1.jpg', description: 'test' },
  { title: 'Movie 5', image: 'poster1.jpg', description: 'test' },
  { title: 'Movie 6', image: 'poster1.jpg', description: 'test' },
];

const moviesRow2 = [
  { title: 'Movie 7', image: 'poster1.jpg', description: 'test' },
  { title: 'Movie 8', image: 'poster1.jpg', description: 'test' },
  { title: 'Movie 9', image: 'poster1.jpg', description: 'test' },
  { title: 'Movie 10', image: 'poster1.jpg', description: 'test' },
  { title: 'Movie 11', image: 'poster1.jpg', description: 'test' },
  { title: 'Movie 12', image: 'poster1.jpg', description: 'test' },
];

const Banner = () => {
  const colCounts = [4, 2, moviesRow1.length, moviesRow2.length]; // Number of items per row
  const rowCount = colCounts.length; // Including the featured section row
  const { selectedRow, selectedIndex } = useTVControls(
    rowCount,
    colCounts,
    true
  );
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedRow === 0 && sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [selectedRow]);
  return (
    <>
      <header className=' flex h-16 items-center justify-between p-4 text-white'>
        <div
          className={`flex items-center space-x-4 ${selectedRow === 0 && selectedIndex === 0 ? 'border-4 border-red-500' : ''} `}
        >
          <Image
            src='https://media.revidd.tv/avatar1.svg'
            alt='Profile Icon'
            className='h-8 w-8 rounded-full'
            width={0}
            height={0}
          />
          <span>Peprah Obed Adjei</span>
        </div>
        <div className='flex-grow text-center'>
          <Image
            src='/logo.png'
            alt='Logo'
            className='inline-block h-10'
            width={100}
            height={0}
          />
        </div>
        <nav className='flex space-x-4'>
          <a
            href='#'
            className={` ${selectedRow === 0 && selectedIndex === 1 ? 'border-4 border-red-500' : ''}`}
          >
            Movies
          </a>
          <a
            href='#'
            className={` ${selectedRow === 0 && selectedIndex === 2 ? 'border-4 border-red-500' : ''}`}
          >
            Series
          </a>
          <a
            href='#'
            className={` ${selectedRow === 0 && selectedIndex === 3 ? 'border-4 border-red-500' : ''}`}
          >
            Channels
          </a>
        </nav>
      </header>
      <div className='relative h-[calc(100vh-4rem)] flex-grow bg-black text-white'>
        <Image
          width={0}
          height={0}
          src='11.jpg'
          alt='Banner'
          className='h-full w-full object-cover opacity-50'
        />
        <div className='absolute left-0 top-0 h-full w-full bg-gradient-to-r from-black via-black/60 to-transparent'>
          <div className='absolute left-0 top-0 flex h-full w-full flex-col justify-center space-y-4 p-8'>
            <div className='mb-4'>
              <h1 className='text-4xl font-bold'>Test Movie Poster</h1>
              <div className='my-2 flex items-center space-x-2'>
                <span className='rounded bg-green-500 px-2 text-black'>
                  New
                </span>
                <span>2023</span>
                <span>16+</span>
                <span>1h 26m</span>
                <span>Dolby Vision</span>
                <span>5.1</span>
              </div>
              <p className='max-w-xl'>
                In his own words, the burglar behind the 2010 robbery of the
                Paris Museum of Modern Art tells how he pulled off the biggest
                art heist in French history.
              </p>
              <div className='mt-4 flex space-x-4'>
                <button
                  className={`rounded bg-white px-4 py-2 text-black ${selectedRow === 1 && selectedIndex === 0 ? 'border-4 border-red-500' : ''}`}
                  onClick={() => alert('Play button clicked')}
                >
                  Play
                </button>
                <button
                  className={`rounded bg-gray-700 px-4 py-2 text-white ${selectedRow === 1 && selectedIndex === 1 ? 'border-4 border-red-500' : ''}`}
                  onClick={() => alert('Details button clicked')}
                >
                  Details
                </button>
              </div>
            </div>
            <div className='custom-scrollbar h-96 overflow-y-scroll'>
              <div className='rounded-md'>
                <MovieRow
                  title='Only on Wi-flix'
                  movies={moviesRow1}
                  isFocused={selectedRow === 2}
                  selectedIndex={selectedIndex}
                />
              </div>
              <div className='mt-4 rounded-md p-4'>
                <MovieRow
                  title='Added Just Now'
                  movies={moviesRow2}
                  isFocused={selectedRow === 3}
                  selectedIndex={selectedIndex}
                />
              </div>
              {/* Add more rows as needed */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
