import React from 'react';
import Image from 'next/image';
interface MovieCardProps {
  title: string;
  image: string;
  description: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, image, description }) => {
  return (
    <div>
      <Image src={image} alt={title} width={160} height={0} />
      {/* <h3 className="text-lg font-bold mt-2 text-white">{title}</h3> */}
      {/* <p className="text-sm text-gray-400">{description}</p> */}
    </div>
  );
};

export default MovieCard;
