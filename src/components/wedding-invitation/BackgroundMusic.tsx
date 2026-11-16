import { useEffect, useRef, useState } from "react";
import { VolumeX } from "lucide-react";

interface BackgroundMusicProps {
  hasStarted: boolean;
}

export function BackgroundMusic({ hasStarted }: BackgroundMusicProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  // When guest taps "Tap to Open Invitation", start background music
  useEffect(() => {
    if (hasStarted && audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.volume = 0.85;
        audioRef.current.play().catch((err) => {
          console.warn("Background music autoplay waiting for user interaction:", err);
        });
      }
    }
  }, [hasStarted]);

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.volume = 0.85;
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      {/* Background audio track — loops continuously across the entire invitation */}
      <audio
        ref={audioRef}
        id="wedding-bg-music"
        src="/music.mp3"
        loop
        preload="auto"
        playsInline
      />

      {/* Floating Royal Gold Music Controller (Top-Left) */}
      <button
        onClick={toggleMusic}
        className={`fixed top-5 left-5 z-50 py-2 px-3 rounded-full bg-gradient-to-r from-[#1c0810]/95 via-[#260a15]/95 to-[#15040b]/95 backdrop-blur-md border border-[#d4af37]/70 text-[#ffd700] hover:border-[#fff0b3] hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_8px_25px_rgba(0,0,0,0.85)] flex items-center gap-2 cursor-pointer select-none ${
          hasStarted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
        aria-label={isPlaying ? "Pause Wedding Music" : "Play Wedding Music"}
        title={isPlaying ? "Pause Music" : "Play Music"}
      >
        {isPlaying ? (
          <>
            <div className="flex items-end gap-[3px] h-4 w-4 justify-center">
              <span className="w-[3px] bg-[#ffd700] rounded-full animate-music-bar-1" />
              <span className="w-[3px] bg-[#ffd700] rounded-full animate-music-bar-2" />
              <span className="w-[3px] bg-[#ffd700] rounded-full animate-music-bar-3" />
            </div>
            <span className="font-serif text-[11px] uppercase tracking-wider text-[#fff0c7] hidden sm:inline">
              Music
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-white/70" />
            <span className="font-serif text-[11px] uppercase tracking-wider text-white/70 hidden sm:inline">
              Muted
            </span>
          </>
        )}
      </button>
    </>
  );
}
