import { useEffect, useRef } from "react";

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

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    vid.defaultMuted = true;
    vid.muted = true;
    vid.playsInline = true;
    vid.setAttribute("playsinline", "true");
    vid.setAttribute("webkit-playsinline", "true");
    vid.setAttribute("x5-playsinline", "true");

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          isIntersectingRef.current = true;
          // Only play once. If already completed, stay paused on the final frame
          if (!hasCompletedOnceRef.current) {
            vid.play().catch(() => {
              // Fallback touch / scroll trigger
              const onTouch = () => {
                if (isIntersectingRef.current && !hasCompletedOnceRef.current && vid.paused) {
                  vid.play().catch(() => {});
                }
              };
              window.addEventListener("touchstart", onTouch, { once: true, passive: true });
              window.addEventListener("scroll", onTouch, { once: true, passive: true });
            });
          }
        } else {
          isIntersectingRef.current = false;
          // Pause when outside viewport to save GPU resources
          if (!vid.paused) {
            vid.pause();
          }
        }
      },
      { threshold: 0.25, rootMargin: "100px 0px" }
    );

    observer.observe(vid);

    return () => {
      observer.disconnect();
      if (vid && !vid.paused) {
        try {
          vid.pause();
        } catch {
          // ignore
        }
      }
    };
  }, []);

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
      className="relative w-full h-[100dvh] min-h-[100dvh] bg-[#0c0306] flex items-center justify-center select-none overflow-hidden"
    >
      {/* Edge-to-edge mobile container: fills mobile viewport cleanly */}
      <div className="relative w-full h-full max-w-[480px] sm:max-w-[540px] flex items-center justify-center overflow-hidden bg-black shadow-2xl">
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          webkit-playsinline="true"
          x5-playsinline="true"
          preload="metadata"
          onEnded={handleVideoEnded}
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full object-cover block mx-auto"
        />

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
