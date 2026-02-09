
import React, { useEffect, useState } from 'react';
import { X, Sparkles, Loader2, Share2, Download, Heart } from 'lucide-react';
import { Photo, AIAnalysis } from '../types';
import { analyzeImageVibe } from '../services/geminiService';

interface ImageModalProps {
  photo: Photo | null;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ photo, onClose }) => {
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (photo) {
      setLoading(true);
      setAnalysis(null);
      analyzeImageVibe(photo.url, photo.title).then(res => {
        setAnalysis(res);
        setLoading(false);
      });
      // Lock scroll
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [photo]);

  if (!photo) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-sm animate-in fade-in duration-300">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 text-white/50 hover:text-white bg-white/10 rounded-full transition-all hover:scale-110"
      >
        <X size={24} />
      </button>

      <div className="grid lg:grid-cols-2 w-full max-w-7xl h-full lg:h-auto max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl">
        {/* Left: Image Container */}
        <div className="relative h-[40vh] lg:h-full bg-black flex items-center justify-center overflow-hidden">
          <img 
            src={photo.url} 
            alt={photo.title}
            className="max-w-full max-h-full object-contain"
          />
          <div className="absolute bottom-6 left-6 flex gap-3">
            <button 
              onClick={() => setLiked(!liked)}
              className={`p-3 rounded-full backdrop-blur-md transition-all ${liked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/40'}`}
            >
              <Heart size={20} fill={liked ? "currentColor" : "none"} />
            </button>
            <button className="p-3 rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/40 transition-all">
              <Share2 size={20} />
            </button>
            <button className="p-3 rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/40 transition-all">
              <Download size={20} />
            </button>
          </div>
        </div>

        {/* Right: Info Panel */}
        <div className="p-8 lg:p-12 overflow-y-auto flex flex-col">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{photo.title}</h2>
            <p className="text-slate-500 dark:text-slate-400">Captured by <span className="text-brand-accent font-medium">@{photo.author}</span></p>
          </div>

          <div className="space-y-8 flex-1">
            <section className="relative p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-4 text-brand-accent">
                <Sparkles size={18} />
                <h3 className="text-sm font-bold uppercase tracking-widest">AI Vision Insight</h3>
              </div>
              
              {loading ? (
                <div className="flex items-center gap-3 text-slate-400">
                  <Loader2 className="animate-spin" size={18} />
                  <span className="text-sm italic">Gemini is feeling the vibes...</span>
                </div>
              ) : (
                <>
                  <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 italic mb-4 font-light">
                    "{analysis?.story}"
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {analysis?.vibe.split('•').map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-brand-accent/10 text-brand-accent rounded-full text-xs font-semibold">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </section>

            <section>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Resolution</p>
                  <p className="text-slate-900 dark:text-white font-medium">1200 x 800</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Created</p>
                  <p className="text-slate-900 dark:text-white font-medium">Jan 2024</p>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
             <button 
              onClick={onClose}
              className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:opacity-90 transition-opacity"
             >
               Return to Gallery
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
