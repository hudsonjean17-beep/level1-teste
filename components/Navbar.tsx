import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Sword } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm)}`);
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-red-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0 group">
            <Sword className="h-8 w-8 text-primary group-hover:text-white transition-colors rotate-45" />
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-white uppercase leading-none">
                Level <span className="text-primary">1</span>
              </span>
              <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase leading-none">
                Animes
              </span>
            </div>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative group">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="PROCURAR NO SISTEMA..."
                className="w-full bg-surfaceHighlight text-gray-200 border border-white/5 rounded-sm py-2 pl-4 pr-10 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-gray-600 font-mono text-sm uppercase"
              />
              <button type="submit" className="absolute right-3 top-2.5 text-gray-600 group-hover:text-primary transition-colors">
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-primary focus:outline-none p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-surface border-t border-red-900/20">
          <div className="px-4 pt-2 pb-4 space-y-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="BUSCAR DADOS..."
                className="w-full bg-surfaceHighlight text-white border border-white/10 rounded-none py-3 px-4 focus:outline-none focus:border-primary font-mono text-sm"
              />
            </form>
            <div className="flex flex-col space-y-2 font-mono text-sm uppercase">
              <Link to="/" onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-primary hover:pl-2 transition-all border-l-2 border-transparent hover:border-primary py-2 pl-0">Início</Link>
              <Link to="/?filter=trending" onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-primary hover:pl-2 transition-all border-l-2 border-transparent hover:border-primary py-2 pl-0">Em Alta</Link>
              <Link to="/?filter=new" onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-primary hover:pl-2 transition-all border-l-2 border-transparent hover:border-primary py-2 pl-0">Lançamentos</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};