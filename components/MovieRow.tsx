import React, { useRef, useEffect } from 'react';
import MovieCard from './MovieCard';

interface MovieRowProps {
  title: string;
  movies: { title: string; image: string; description: string }[];
  isFocused: boolean;
  selectedIndex: number;
}

const MovieRow: React.FC<MovieRowProps> = ({
  title,
  movies,
  isFocused,
  selectedIndex,
}) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const movieRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (isFocused && rowRef.current) {
      rowRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused && movieRefs.current[selectedIndex]) {
      movieRefs.current[selectedIndex]?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
      });
    }
  }, [isFocused, selectedIndex]);

  return (
    <div ref={rowRef} className=''>
      <h2 className='sticky top-0 bg-black/35 text-2xl font-bold text-white'>
        {title}
      </h2>
      <div className='no-scrollbar flex overflow-x-auto'>
        {movies.map((movie, index) => (
          <div
            key={index}
            ref={(el) => (movieRefs.current[index] = el)}
            className={`mr-2 ${isFocused && index === selectedIndex ? 'border-4 border-red-500' : ''}`}
          >
            <MovieCard
              title={movie.title}
              image={movie.image}
              description={movie.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
