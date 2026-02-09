
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Music } from 'lucide-react';
import { PLAYLIST } from '../constants';
import { Track } from '../types';

const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = PLAYLIST[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skipTrack = (direction: 'forward' | 'backward') => {
    let nextIndex = currentTrackIndex;
    if (direction === 'forward') {
      nextIndex = (currentTrackIndex + 1) % PLAYLIST.length;
    } else {
      nextIndex = (currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    }
    setCurrentTrackIndex(nextIndex);
    setIsPlaying(true);
    // Auto-play the next track after a small delay to ensure source is updated
    setTimeout(() => {
      if (audioRef.current) audioRef.current.play();
    }, 100);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-lg">
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-800 shadow-2xl rounded-2xl p-4 flex items-center gap-4 transition-all hover:bg-white dark:hover:bg-slate-900">
        <audio
          ref={audioRef}
          src={currentTrack.url}
          onEnded={() => skipTrack('forward')}
        />
        
        <div className="relative group shrink-0">
          <img 
            src={currentTrack.cover} 
            alt={currentTrack.title} 
            className={`w-12 h-12 rounded-lg object-cover shadow-lg ${isPlaying ? 'animate-pulse' : ''}`}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
             <Music className="text-white w-4 h-4" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate">
            {currentTrack.title}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
            {currentTrack.artist}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => skipTrack('backward')}
            className="p-1 hover:text-brand-accent transition-colors text-slate-600 dark:text-slate-300"
          >
            <SkipBack size={18} fill="currentColor" />
          </button>
          
          <button 
            onClick={togglePlay}
            className="w-10 h-10 bg-brand-accent text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform active:scale-95 shadow-md"
          >
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} className="ml-0.5" fill="currentColor" />}
          </button>

          <button 
            onClick={() => skipTrack('forward')}
            className="p-1 hover:text-brand-accent transition-colors text-slate-600 dark:text-slate-300"
          >
            <SkipForward size={18} fill="currentColor" />
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 ml-2">
          <Volume2 size={16} className="text-slate-400" />
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-20 accent-brand-accent h-1.5 rounded-lg appearance-none bg-slate-200 dark:bg-slate-700 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
