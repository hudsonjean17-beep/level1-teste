import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAnimeDetails } from '../services/anilist';
import { Anime } from '../types';
import { Loader2, Play, Info, Calendar, Monitor, Layers, Activity, ExternalLink, AlertTriangle, Terminal } from 'lucide-react';

export const Watch: React.FC = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentEp, setCurrentEp] = useState(1);
  const [slug, setSlug] = useState('');
  const [manualOverride, setManualOverride] = useState(false);

  // Função para converter título em slug padrão da animesonlinecc
  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, "") // Remove acentos
      .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
      .trim()
      .replace(/\s+/g, '-'); // Troca espaços por hífens
  };

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      setLoading(true);
      const data = await fetchAnimeDetails(parseInt(id));
      setAnime(data);
      
      if (data) {
        // Tenta usar o título romaji por padrão, fallback para inglês
        const titleToUse = data.title.romaji || data.title.english || '';
        setSlug(createSlug(titleToUse));
      }
      
      setLoading(false);
    };
    load();
  }, [id]);

  // Constroi a URL baseada no padrão: animesonlinecc.to/episodio/slug-episodio-X
  const sourceUrl = `https://animesonlinecc.to/episodio/${slug}-episodio-${currentEp}`;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <span className="font-mono text-xs text-primary animate-pulse">RASTREANDO DADOS NO SERVIDOR...</span>
      </div>
    );
  }

  if (!anime) return <div className="text-center mt-20 font-mono text-red-500">ERRO CRÍTICO: DADOS INEXISTENTES.</div>;

  const totalEpisodes = anime.episodes || 24; 
  const episodeList = Array.from({ length: totalEpisodes }, (_, i) => i + 1);

  return (
    <div className="pt-20 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      
      {/* Player Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-4">
          
          {/* Aviso de Espelhamento */}
          <div className="bg-red-900/10 border border-primary/20 p-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-mono text-primary uppercase">
                    Conexão Espelho: AnimesOnlineCC
                </span>
            </div>
            <button 
                onClick={() => setManualOverride(!manualOverride)}
                className="text-[10px] font-mono text-gray-400 hover:text-white underline"
            >
                {manualOverride ? 'OCULTAR CONSOLE' : 'CORRIGIR LINK'}
            </button>
          </div>

          {/* Console de Override Manual (Estilo Hacker) */}
          {manualOverride && (
              <div className="bg-black border border-primary/50 p-4 space-y-2 animate-in slide-in-from-top-2">
                  <label className="text-[10px] font-mono text-primary uppercase block">
                      SYSTEM OVERRIDE // SLUG TARGET
                  </label>
                  <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="flex-1 bg-surfaceHighlight border border-white/10 text-white font-mono text-xs p-2 focus:border-primary focus:outline-none"
                        placeholder="ex: solo-leveling-2-temporada"
                      />
                      <div className="flex items-center justify-center px-3 bg-white/5 border border-white/10 text-xs font-mono text-gray-500">
                          -episodio-{currentEp}
                      </div>
                  </div>
                  <p className="text-[10px] text-gray-500 font-mono">
                      * Se o vídeo não carregar, o nome do anime na fonte pode ser diferente. Ajuste acima.
                  </p>
              </div>
          )}

          <div className="relative border-2 border-surfaceHighlight bg-black shadow-[0_0_30px_rgba(220,38,38,0.1)] group">
             {/* "System" Header on Player */}
             <div className="bg-surfaceHighlight px-4 py-1 flex justify-between items-center border-b border-white/5">
                <div className="flex items-center space-x-2">
                   <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                   <span className="text-[10px] font-mono text-gray-400 uppercase truncate max-w-[200px]">
                       PROXY: {slug}
                   </span>
                </div>
                <a 
                    href={sourceUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[10px] font-mono text-primary hover:text-white transition-colors"
                >
                    ABRIR FONTE <ExternalLink className="w-3 h-3" />
                </a>
             </div>

            <div className="aspect-video bg-black relative overflow-hidden">
              {/* Iframe de Espelhamento */}
              {/* Nota: Muitos sites usam X-Frame-Options que impedem o carregamento aqui.
                  Se falhar, o usuário usa o botão "Abrir Fonte". */}
              <iframe
                className="w-full h-full"
                src={sourceUrl} 
                title="Mirror"
                allowFullScreen
                sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-presentation"
              ></iframe>

              {/* Overlay caso o iframe seja bloqueado pelo navegador (comum em espelhamento) */}
              <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <AlertTriangle className="w-8 h-8 text-primary mb-2" />
                  <p className="text-white font-mono text-xs uppercase mb-2">Se o vídeo não carregar:</p>
                  <a 
                    href={sourceUrl}
                    target="_blank"
                    rel="noreferrer" 
                    className="pointer-events-auto px-4 py-2 bg-primary hover:bg-red-700 text-white font-bold font-mono text-xs uppercase"
                  >
                      Acessar Link do Sistema
                  </a>
              </div>
            </div>
          </div>

          <div className="bg-surface p-4 border-l-2 border-primary">
            <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight italic">
            {anime.title.romaji || anime.title.english}
            </h1>
            <div className="flex items-center space-x-2 mt-2">
                <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] font-mono border border-primary/30">
                LVL {currentEp}
                </span>
                <span className="text-gray-500 text-xs font-mono uppercase">Target: AnimesOnlineCC</span>
            </div>
          </div>
          
          <div className="bg-surface p-6 border border-white/5 space-y-4">
             <h3 className="font-bold text-lg flex items-center gap-2 uppercase text-gray-200">
               <Info className="w-5 h-5 text-primary" /> Informações da Missão
             </h3>
             <div 
               className="text-gray-400 text-sm leading-relaxed"
               dangerouslySetInnerHTML={{ __html: anime.description || "Sem dados disponíveis." }}
             />
             
             <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-4 border-t border-white/5">
                <div className="p-3 bg-black border border-white/5">
                  <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-3 h-3 text-primary" />
                      <div className="text-[10px] text-gray-500 font-mono uppercase">Ano</div>
                  </div>
                  <div className="font-bold text-sm">{anime.seasonYear}</div>
                </div>
                <div className="p-3 bg-black border border-white/5">
                  <div className="flex items-center gap-2 mb-1">
                      <Monitor className="w-3 h-3 text-primary" />
                      <div className="text-[10px] text-gray-500 font-mono uppercase">Tipo</div>
                  </div>
                  <div className="font-bold text-sm">{anime.format}</div>
                </div>
                <div className="p-3 bg-black border border-white/5">
                  <div className="flex items-center gap-2 mb-1">
                      <Layers className="w-3 h-3 text-primary" />
                      <div className="text-[10px] text-gray-500 font-mono uppercase">Eps</div>
                  </div>
                  <div className="font-bold text-sm">{anime.episodes || '?'}</div>
                </div>
                <div className="p-3 bg-black border border-white/5">
                  <div className="flex items-center gap-2 mb-1">
                      <Activity className="w-3 h-3 text-primary" />
                      <div className="text-[10px] text-gray-500 font-mono uppercase">Status</div>
                  </div>
                  <div className="font-bold text-sm">{anime.status}</div>
                </div>
             </div>
          </div>
        </div>

        {/* Sidebar - Episode List */}
        <div className="lg:col-span-1">
          <div className="bg-surface border border-white/5 sticky top-24 h-[calc(100vh-8rem)] flex flex-col">
            <div className="p-4 border-b border-primary/20 bg-gradient-to-r from-primary/10 to-transparent">
              <h2 className="font-black text-white uppercase italic tracking-wider">Log de Missões</h2>
              <p className="text-[10px] font-mono text-primary mt-1">TOTAL: {totalEpisodes} REGISTROS</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-0 custom-scrollbar">
              {episodeList.map((ep) => (
                <button
                  key={ep}
                  onClick={() => setCurrentEp(ep)}
                  className={`w-full flex items-center px-4 py-4 border-b border-white/5 transition-all group relative overflow-hidden ${
                    currentEp === ep 
                      ? 'bg-white/5 text-white' 
                      : 'hover:bg-white/5 text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {/* Active Indicator Line */}
                  {currentEp === ep && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                  )}

                  <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center border font-mono text-sm font-bold mr-3 ${
                      currentEp === ep ? 'border-primary text-primary' : 'border-white/10 text-gray-600'
                  }`}>
                    {ep.toString().padStart(2, '0')}
                  </div>
                  <div className="text-left flex-1">
                    <div className={`text-xs font-mono uppercase ${currentEp === ep ? 'text-primary' : ''}`}>
                      Episódio {ep}
                    </div>
                  </div>
                  {currentEp === ep ? (
                    <Activity className="ml-auto w-4 h-4 text-primary animate-pulse" />
                  ) : (
                    <Play className="ml-auto w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};