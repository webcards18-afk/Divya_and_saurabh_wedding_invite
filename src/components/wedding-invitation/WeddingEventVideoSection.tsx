import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

interface WeddingEventVideoSectionProps {
  id: string;
  videoSrc: string;
  title: string;
  date: string;
  time: string;
  venueName: string;
  venueAddress: string;
  mapUrl: string;
  note?: string;
  badgeColor?: string;
  showScrollDown?: boolean;
}

export function WeddingEventVideoSection({
  id,
  videoSrc,
  venueName,
  mapUrl,
}: WeddingEventVideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasCompletedOnceRef = useRef(false);
  const isIntersectingRef = useRef(false);

  // Lazy loading state: true when within 800px of viewport
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  // 1. Lazy loading observer: attach video source only when approaching viewport (800px lookahead)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const loadObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad(true);
          loadObserver.disconnect();
        }
      },
      { rootMargin: "800px 0px" }
    );

    loadObserver.observe(container);
    return () => loadObserver.disconnect();
  }, []);

  // 2. Playback observer: play when 50% in view, pause when scrolled away
  useEffect(() => {
    const vid = videoRef.current;
    const container = containerRef.current;
    if (!vid || !container || !shouldLoad) return;

    vid.defaultMuted = true;
    vid.muted = true;
    vid.playsInline = true;
    vid.setAttribute("playsinline", "true");
    vid.setAttribute("webkit-playsinline", "true");
    vid.setAttribute("x5-playsinline", "true");

    const playObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          isIntersectingRef.current = true;
          // Only auto-play once. If completed, stay on the final frame
          if (!hasCompletedOnceRef.current) {
            vid.play().catch(() => {});
          }
        } else {
          isIntersectingRef.current = false;
          if (!vid.paused) {
            vid.pause();
          }
        }
      },
      { threshold: 0.5 }
    );

    playObserver.observe(container);

    return () => {
      playObserver.disconnect();
      if (vid && !vid.paused) {
        try {
          vid.pause();
        } catch {
          // ignore
        }
      }
    };
  }, [shouldLoad]);

  const handleVideoEnded = () => {
    hasCompletedOnceRef.current = true;
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleTimeUpdate = () => {
    const vid = videoRef.current;
    if (!vid || hasCompletedOnceRef.current) return;
    if (vid.duration && !isNaN(vid.duration) && vid.duration > 1) {
      if (vid.currentTime >= vid.duration - 0.15) {
        handleVideoEnded();
      }
    }
  };

  return (
    <section
      id={id}
      ref={containerRef}
      className="relative w-full h-[100svh] min-h-[100svh] bg-[#0c0306] flex items-center justify-center select-none overflow-hidden"
      style={{ overflowAnchor: "none" }}
    >
      {/* Edge-to-edge mobile container: fills mobile viewport cleanly */}
      <div className="relative w-full h-full max-w-[480px] sm:max-w-[540px] flex items-center justify-center overflow-hidden bg-black shadow-2xl">
        {/* Elegant loading placeholder while video buffers */}
        {!isVideoReady && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d0307] z-10">
            <Loader2 className="w-8 h-8 text-[#d4af37] animate-spin opacity-60 mb-2" />
            <span className="font-serif text-xs tracking-widest text-[#ffd700]/70 uppercase">
              Loading Celebrations...
            </span>
          </div>
        )}

        {shouldLoad && (
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            playsInline
            webkit-playsinline="true"
            x5-playsinline="true"
            preload="auto"
            onLoadedData={() => setIsVideoReady(true)}
            onCanPlay={() => setIsVideoReady(true)}
            onEnded={handleVideoEnded}
            onTimeUpdate={handleTimeUpdate}
            className={`w-full h-full object-cover block mx-auto pointer-events-none transition-opacity duration-500 ${
              isVideoReady ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* "Map" Button — Bottom Right */}
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-6 right-5 z-20 px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-[#d4af37]/80 text-[#ffd700] hover:bg-[#d4af37]/20 hover:border-[#fff0b3] hover:scale-105 active:scale-95 transition-all shadow-[0_4px_15px_rgba(0,0,0,0.8)] font-serif text-xs font-bold tracking-widest uppercase flex items-center justify-center cursor-pointer select-none"
          aria-label={`View Map: ${venueName}`}
          title={`View Map: ${venueName}`}
        >
          Map
        </a>
      </div>
    </section>
  );
}
