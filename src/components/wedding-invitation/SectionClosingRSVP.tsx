import { useEffect, useRef } from "react";
import { weddingData } from "@/config/wedding";
import { Phone, MessageCircle, Heart, Sparkles } from "lucide-react";

export function SectionClosingRSVP() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasCompletedOnceRef = useRef(false);
  const isIntersectingRef = useRef(false);
  const { closing } = weddingData;

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
          // Play once only
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
      id="rsvp"
      className="relative w-full min-h-[100dvh] bg-[#070e24] flex flex-col items-center justify-between select-none overflow-hidden"
    >
      {/* 7-vid.mp4 Background Player — plays once, strictly muted */}
      <div className="relative w-full h-[100dvh] min-h-[100dvh] max-w-[480px] sm:max-w-[540px] flex items-center justify-center overflow-hidden bg-black shadow-2xl">
        <video
          ref={videoRef}
          src={closing.videoSrc}
          muted
          playsInline
          webkit-playsinline="true"
          x5-playsinline="true"
          preload="metadata"
          onEnded={handleVideoEnded}
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full object-cover block mx-auto"
        />

        {/* Bottom Floating Interactive RSVP Card */}
        <div className="absolute bottom-5 inset-x-3 sm:inset-x-5 z-20 flex flex-col items-center gap-2 pointer-events-auto">
          <div className="w-full max-w-[420px] p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#0c183d]/95 via-[#08112e]/98 to-[#040817]/98 backdrop-blur-xl border-2 border-[#d4af37]/70 shadow-[0_15px_40px_rgba(0,0,0,0.9)] flex flex-col items-center text-center">
            {/* Header */}
            <span className="font-serif text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#e5c158] font-semibold mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
              R.S.V.P. &bull; {closing.rsvpSide}
              <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
            </span>

            <p className="font-serif italic text-xs text-white/70 mb-3">
              With Best Compliments
            </p>

            {/* Contacts with Direct Call & WhatsApp Buttons */}
            <div className="w-full flex flex-col gap-2">
              {closing.contacts.map((contact, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="text-left min-w-0">
                    <p className="font-serif font-bold text-xs sm:text-sm text-[#ffd700] truncate">
                      {contact.name}
                    </p>
                    <p className="font-body text-[11px] text-white/80">
                      {contact.phone}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* Call Button */}
                    <a
                      href={`tel:${contact.rawPhone}`}
                      className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md active:scale-95"
                      aria-label={`Call ${contact.name}`}
                      title={`Call ${contact.name}`}
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>

                    {/* WhatsApp Button */}
                    <a
                      href={`https://wa.me/91${contact.rawPhone}?text=Warmest%20congratulations%20on%20Divya%20%26%20Saurabh%27s%20Wedding!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white transition-all shadow-md active:scale-95"
                      aria-label={`WhatsApp ${contact.name}`}
                      title={`WhatsApp ${contact.name}`}
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Royal Wedding Footer */}
      <footer className="w-full py-10 px-4 bg-[#040817] border-t border-[#d4af37]/30 flex flex-col items-center justify-center text-center">
        <Heart className="w-6 h-6 text-[#d4af37] animate-pulse mb-3" fill="#d4af37" />
        <h3 className="font-script text-3xl sm:text-4xl text-[#fff3b0] mb-1">
          Divya & Saurabh
        </h3>
        <p className="font-serif text-xs uppercase tracking-[0.25em] text-[#e8c07d]/80 mb-4">
          With Love & Blessings from Arora & Banga Families
        </p>

        <div className="w-16 h-[1px] bg-[#d4af37]/40 mb-4" />

        <p className="text-[11px] text-[#e8c07d]/60 font-body tracking-wider">
          Created with love by @prashantharts
        </p>
      </footer>
    </section>
  );
}
