import { useState, useRef, useEffect } from "react";
import { clips } from "@/config/wedding";
import { Sparkles, ChevronDown } from "lucide-react";

interface SectionOneIntroProps {
  onOpen?: () => void;
  onFinish?: () => void;
}

export function SectionOneIntro({ onOpen, onFinish }: SectionOneIntroProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [isVideoFinished, setIsVideoFinished] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });

    if (videoRef.current) {
      const vid = videoRef.current;
      vid.defaultMuted = true;
      vid.muted = true;
      vid.playsInline = true;
      vid.setAttribute("playsinline", "true");
      vid.setAttribute("webkit-playsinline", "true");
      vid.setAttribute("x5-playsinline", "true");
    }
  }, []);

  // When scrolled away, pause 1-vid to save GPU resources
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting && !vid.paused) {
          vid.pause();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(vid);
    return () => observer.disconnect();
  }, []);

  if (!clips.one) return null;

  const handleOpenInvitation = () => {
    setHasStarted(true);
    onOpen?.();

    // 1. Start background music immediately within user tap event
    const bgAudio = document.getElementById("wedding-bg-music") as HTMLAudioElement | null;
    if (bgAudio) {
      bgAudio.volume = 0.85;
      bgAudio.play().catch((err) => {
        console.warn("Background music play failed:", err);
      });
    }

    // 2. Play 1-vid strictly MUTED and ONLY ONCE
    if (videoRef.current) {
      const vid = videoRef.current;
      vid.currentTime = 0;
      vid.defaultMuted = true;
      vid.muted = true;
      vid.play().catch((err) => {
        console.warn("Video 1 playback error:", err);
      });
    }
  };

  const handleVideoEnded = () => {
    if (isVideoFinished) return;
    setIsVideoFinished(true);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onFinish?.();
  };

  const handleTimeUpdate = () => {
    const vid = videoRef.current;
    if (!vid || isVideoFinished) return;
    if (vid.duration && !isNaN(vid.duration) && vid.duration > 1) {
      if (vid.currentTime >= vid.duration - 0.15) {
        handleVideoEnded();
      }
    }
  };

  return (
    <section
      id="home"
      className="relative w-full h-[100svh] min-h-[100svh] bg-[#0d0407] flex items-center justify-center select-none overflow-hidden"
      style={{ overflowAnchor: "none" }}
    >
      {/* Edge-to-edge mobile container: fills mobile screen maintaining original aspect ratio */}
      <div className="relative w-full h-full max-w-[480px] sm:max-w-[540px] flex items-center justify-center overflow-hidden bg-black">
        <video
          ref={videoRef}
          src={clips.one.src}
          muted
          playsInline
          webkit-playsinline="true"
          x5-playsinline="true"
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnded}
          className="w-full h-full object-cover block pointer-events-none"
        />

        {/* Tap to Open Button directly over 1-vid (without dark modal card) */}
        <div
          className={`absolute inset-0 flex items-center justify-center px-6 z-20 transition-all duration-700 ${
            hasStarted ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100 pointer-events-auto"
          }`}
        >
          {/* Tap to Open Button in Warm Sandstone with Rose Petal Pink Letters */}
          <button
            onClick={handleOpenInvitation}
            className="group relative w-auto py-3.5 sm:py-4 px-8 sm:px-10 rounded-full border-[1.5px] border-[#fff5db] shadow-[0_12px_40px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer select-none"
            style={{
              background: "linear-gradient(180deg, #dca950 0%, #c6933c 52%, #aa7728 100%)",
            }}
          >
            <span className="font-serif text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#8e0d42] drop-shadow-[0_1px_0_rgba(255,235,180,0.4)] whitespace-nowrap">
              Tap to Open
            </span>
          </button>
        </div>

        {/* Scroll Down Hint shown once 1-vid finishes — informs guest they can scroll down */}
        {isVideoFinished && (
          <div className="absolute bottom-6 inset-x-0 z-30 flex flex-col items-center text-white animate-bounce pointer-events-none transition-all duration-700">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] text-white">
              Scroll Down
            </span>
            <ChevronDown className="w-5 h-5 text-white mt-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]" />
          </div>
        )}
      </div>
    </section>
  );
}
