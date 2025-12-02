import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchTrendingAnime, searchAnime } from '../services/anilist';
import { Anime } from '../types';
import { AnimeCard } from '../components/AnimeCard';
import { Loader2, Flame, Search as SearchIcon, AlertCircle } from 'lucide-react';

export const Home: React.FC = () => {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      let data: Anime[] = [];
      
      if (searchTerm) {
        data = await searchAnime(searchTerm);
      } else {
        data = await fetchTrendingAnime();
      }
      
      setAnimes(data);
      setLoading(false);
    };

    loadData();
  }, [searchTerm]);

  const featuredAnime = !searchTerm && animes.length > 0 ? animes[0] : null;
  const displayList = !searchTerm && animes.length > 0 ? animes.slice(1) : animes;

  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Hero Section (Only shows on home, not search) */}
      {featuredAnime && (
        <div className="relative h-[65vh] w-full overflow-hidden border-b border-primary/20">
          <div className="absolute inset-0">
            <img
              src={featuredAnime.bannerImage || featuredAnime.coverImage.extraLarge}
              alt="Banner"
              className="w-full h-full object-cover opacity-60"
            />
            {/* Dark Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
          </div>
          
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-16 flex flex-col items-start max-w-5xl">
            <span className="px-2 py-1 bg-red-900/50 border border-red-500/30 text-red-400 text-[10px] font-mono uppercase tracking-widest mb-4 animate-pulse-slow">
              System Alert: Rank S Detected
            </span>
            <h1 className="text-4xl md:text-7xl font-black text-white mb-4 leading-tight uppercase tracking-tighter italic">
              {featuredAnime.title.english || featuredAnime.title.romaji}
            </h1>
            <div className="flex flex-wrap gap-2 mb-8">
              {featuredAnime.genres.slice(0, 3).map(g => (
                <span key={g} className="text-xs font-mono text-gray-300 border border-white/20 px-2 py-1 uppercase hover:bg-white/10 hover:border-white/50 transition-colors">
                  {g}
                </span>
              ))}
            </div>
            <a 
              href={`#/watch/${featuredAnime.id}`}
              className="group px-8 py-3 bg-primary hover:bg-red-700 text-white font-bold uppercase tracking-widest transition-all clip-path-slant flex items-center space-x-3 glow-red"
              style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
            >
              <Flame className="w-5 h-5" />
              <span>Iniciar Missão</span>
            </a>
          </div>
        </div>
      )}

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex items-center space-x-3 mb-8 border-l-4 border-primary pl-4">
          {searchTerm ? (
            <>
              <SearchIcon className="text-primary h-6 w-6" />
              <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Resultados: "{searchTerm}"</h2>
            </>
          ) : (
            <>
              <Flame className="text-primary h-6 w-6" />
              <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Missões em Alta</h2>
            </>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center h-64 space-y-4">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
            <p className="font-mono text-xs text-primary/70 animate-pulse">CARREGANDO DADOS DO SISTEMA...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {displayList.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        )}

        {!loading && displayList.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500 border border-white/5 rounded-lg bg-surface">
            <AlertCircle className="h-10 w-10 mb-4 text-red-900" />
            <span className="font-mono uppercase text-sm">Dados não encontrados no servidor.</span>
          </div>
        )}
      </div>
    </div>
  );
};