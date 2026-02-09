
import React from 'react';
import { Photo } from '../types';
import { Maximize2, Sparkles } from 'lucide-react';

interface PhotoCardProps {
  photo: Photo;
  onClick: (photo: Photo) => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onClick }) => {
  return (
    <div 
      className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-slate-200 dark:bg-slate-800 transition-all hover:shadow-2xl hover:-translate-y-1"
      onClick={() => onClick(photo)}
    >
      <img 
        src={photo.url} 
        alt={photo.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles size={14} className="text-brand-accent animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest text-brand-accent font-bold">AI Enhanced</span>
        </div>
        <h3 className="text-lg font-bold text-white truncate">{photo.title}</h3>
        <p className="text-sm text-slate-300 truncate mb-4">by {photo.author}</p>
        
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2 text-xs font-semibold text-white bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full hover:bg-white/30 transition-colors">
            <Maximize2 size={14} />
            View Story
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;
