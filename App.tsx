
import React, { useState, useEffect } from 'react';
import { Moon, Sun, Camera, Search, Music as MusicIcon, LayoutGrid, Github } from 'lucide-react';
import { SAMPLE_PHOTOS } from './constants';
import { Photo } from './types';
import PhotoCard from './components/PhotoCard';
import ImageModal from './components/ImageModal';
import MusicPlayer from './components/MusicPlayer';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Initial theme set
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const filteredPhotos = SAMPLE_PHOTOS.filter(photo => 
    photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    photo.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-32">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-brand-light/80 dark:bg-brand-dark/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-brand-accent p-2 rounded-xl shadow-lg shadow-brand-accent/20">
              <Camera className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
              Lumina <span className="text-brand-accent">Gallery</span>
            </h1>
          </div>

          {/* Search Bar */}
          <div className="relative w-full max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-accent transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by title or artist..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-full py-3 pl-12 pr-6 text-sm focus:ring-2 focus:ring-brand-accent transition-all dark:text-white"
            />
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <a 
              href="#" 
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-full text-sm hover:scale-105 active:scale-95 transition-all"
            >
              <Github size={18} />
              Connect
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 mt-12">
        {/* Gallery Intro */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
             <div className="h-px w-8 bg-brand-accent"></div>
             <span className="text-xs font-bold text-brand-accent uppercase tracking-widest">Experience Curated Visuals</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
            Where Every Image <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-accent to-blue-500 italic">Tells a Unique Story</span>
          </h2>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-900 rounded-lg text-xs font-bold text-slate-500">
               <LayoutGrid size={14} />
               <span>Grid Layout</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-900 rounded-lg text-xs font-bold text-slate-500">
               <MusicIcon size={14} />
               <span>Immersive Audio</span>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredPhotos.map(photo => (
            <PhotoCard 
              key={photo.id} 
              photo={photo} 
              onClick={setSelectedPhoto} 
            />
          ))}
          {filteredPhotos.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <p className="text-slate-500 text-lg">No photos matching your search...</p>
            </div>
          )}
        </div>
      </main>

      {/* Components */}
      <ImageModal 
        photo={selectedPhoto} 
        onClose={() => setSelectedPhoto(null)} 
      />
      <MusicPlayer />
      
      {/* Footer Info */}
      <footer className="max-w-7xl mx-auto px-6 py-12 mt-20 border-t border-slate-200 dark:border-slate-800 text-center">
        <p className="text-slate-500 text-sm mb-2">Powered by Lumina Engine & Gemini Flash-3</p>
        <p className="text-slate-400 text-xs">© 2024 Lumina Creative Lab. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
