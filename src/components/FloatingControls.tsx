import { useState, useRef, useEffect } from 'react';
import { Disc, Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function FloatingControls() {
  const { language, setLanguage } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center bg-[var(--color-paper)]/20 backdrop-blur-xl border border-[var(--color-ink)]/10 rounded-full px-1 py-1 shadow-sm hover:shadow-md transition-all duration-500 group">
      <audio ref={audioRef} loop autoPlay src="merry-christmas-mr-lawrence.mp3" />
      
      {/* Language Toggle */}
      <button
        onClick={toggleLanguage}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-[var(--color-ink)]/5 transition-all duration-300"
        title={language === 'en' ? 'Switch to Chinese' : '切换至英文'}
      >
        <Languages className="w-3.5 h-3.5 text-[var(--color-ink)]/30 group-hover:text-[var(--color-ink)]/60 transition-colors" />
        <span className="text-[9px] font-mono font-bold text-[var(--color-ink)]/30 group-hover:text-[var(--color-ink)]/60 uppercase tracking-tighter">
          {language === 'en' ? 'EN' : 'ZH'}
        </span>
      </button>

      {/* Divider */}
      <div className="w-[1px] h-3 bg-[var(--color-ink)]/10 mx-0.5" />

      {/* Music Player */}
      <button
        onClick={togglePlay}
        className={`p-1.5 rounded-full hover:bg-[var(--color-ink)]/5 transition-all duration-300 ${isPlaying ? 'animate-spin-slow' : ''}`}
        style={{ animationDuration: '10s' }}
        title={isPlaying ? "Pause Music" : "Play Music"}
      >
        <Disc className={`w-3.5 h-3.5 transition-colors ${isPlaying ? 'text-blue-500/40' : 'text-[var(--color-ink)]/30 group-hover:text-[var(--color-ink)]/60'}`} />
      </button>
    </div>
  );
}
