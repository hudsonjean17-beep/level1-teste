import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Watch } from './pages/Watch';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-gray-100 font-sans selection:bg-primary selection:text-white flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watch/:id" element={<Watch />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        <footer className="bg-black border-t border-white/5 py-10 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center">
             <div className="flex items-center justify-center space-x-2 mb-4 opacity-50">
                 <div className="h-px w-8 bg-primary"></div>
                 <span className="text-primary font-mono text-xs uppercase tracking-[0.2em]">System Offline</span>
                 <div className="h-px w-8 bg-primary"></div>
             </div>
            <p className="text-gray-600 text-[10px] font-mono uppercase">
              &copy; {new Date().getFullYear()} LEVEL 1 ANIMES. DADOS: ANILIST API.
            </p>
            <p className="text-gray-700 text-[10px] mt-2 max-w-lg mx-auto leading-relaxed uppercase">
              Espelhamento de Mídia base: <span className="text-primary">AnimesOnlineCC</span>. <br/>
              Nenhum arquivo hospedado localmente. Acesso via protocolo de redirecionamento.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;