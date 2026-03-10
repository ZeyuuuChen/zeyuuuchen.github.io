import { useState, useRef, useEffect } from 'react';
import { Disc } from 'lucide-react';

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Attempt to autoplay when component mounts
    if (audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Autoplay started successfully
            setIsPlaying(true);
          })
          .catch((error) => {
            // Autoplay was prevented by the browser
            console.log("Autoplay prevented by browser policy:", error);
            setIsPlaying(false);
          });
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

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Background music: Merry Christmas Mr. Lawrence by Ryuichi Sakamoto */}
      {/* Note: Using a placeholder piano track as we cannot host copyrighted music directly. User needs to upload their own file or we use a public domain piano track. */}
      <audio ref={audioRef} loop autoPlay src="/merry-christmas-mr-lawrence.mp3" />
      <button
        onClick={togglePlay}
        className={`p-3 rounded-full bg-[var(--color-bg)] border border-[var(--color-ink)]/20 shadow-lg hover:scale-110 transition-transform duration-300 ${isPlaying ? 'animate-spin-slow' : ''}`}
        style={{ animationDuration: '4s' }}
        title="Play Merry Christmas Mr. Lawrence"
      >
        <Disc className="w-6 h-6 text-[var(--color-ink)]" />
      </button>
    </div>
  );
}
