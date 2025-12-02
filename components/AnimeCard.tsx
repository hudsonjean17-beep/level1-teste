import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Star } from 'lucide-react';
import { Anime } from '../types';

interface AnimeCardProps {
  anime: Anime;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
  const title = anime.title.english || anime.title.romaji;
  
  return (
    <Link to={`/watch/${anime.id}`} className="group relative block w-full">
      <div className="relative aspect-[2/3] overflow-hidden bg-surfaceHighlight border border-white/5 group-hover:border-primary/50 transition-colors">
        <img
          src={anime.coverImage.large}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
        />
        
        {/* Hover Overlay - Red Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <div className="flex items-center space-x-2 text-white font-mono uppercase tracking-widest text-xs font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <Play className="h-4 w-4 fill-white" />
            <span>Iniciar</span>
          </div>
        </div>

        {/* Score Badge */}
        {anime.averageScore && (
          <div className="absolute top-0 right-0 bg-primary text-black font-bold font-mono text-xs px-2 py-1">
            LVL {anime.averageScore}
          </div>
        )}
        
        {/* Episodes Badge */}
        {anime.episodes && (
          <div className="absolute top-0 left-0 bg-black/80 backdrop-blur-sm px-2 py-1 border-b border-r border-white/10">
            <span className="text-[10px] font-mono text-gray-300">EP {anime.episodes}</span>
          </div>
        )}
      </div>

      <div className="mt-3">
        <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-primary transition-colors uppercase tracking-tight">
          {title}
        </h3>
        <p className="text-[10px] text-gray-500 font-mono mt-1 uppercase">
          {anime.format} • {anime.seasonYear || 'UNK'}
        </p>
      </div>
    </Link>
  );
};