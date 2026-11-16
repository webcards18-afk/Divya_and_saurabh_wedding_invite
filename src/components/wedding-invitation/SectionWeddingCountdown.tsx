import { useCountdown } from "@/hooks/useCountdown";
import { weddingData } from "@/config/wedding";
import { Sparkles, Heart } from "lucide-react";
import { CountdownScratchCard } from "@/components/wedding-invitation/CountdownScratchCard";

export function SectionWeddingCountdown() {
  const { days, hours, minutes, seconds, isPast } = useCountdown(weddingData.weddingDate);

  return (
    <section
      id="countdown"
      className="relative w-full py-20 px-4 select-none overflow-hidden flex flex-col items-center justify-center text-center"
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, rgba(122, 12, 30, 0.45) 0%, rgba(15, 3, 7, 0.98) 75%), #0c0206",
      }}
    >
      {/* Background Ornate Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#d4af37]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative Golden Top Line */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#d4af37]" />
        <Sparkles className="w-4 h-4 text-[#ffd700] animate-pulse" />
        <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#d4af37]" />
      </div>

      {/* Couple Calligraphy & Auspicious Subtitle */}
      <span className="font-serif text-xs uppercase tracking-[0.3em] text-[#e5c158] font-semibold mb-2">
        Counting Down to the Auspicious Union
      </span>

      <h2 className="font-script text-4xl sm:text-5xl text-[#fff3b0] mb-2 drop-shadow-[0_2px_12px_rgba(212,175,55,0.4)]">
        Divya & Saurabh
      </h2>

      <p className="font-serif text-xs sm:text-sm text-[#e8c07d]/80 uppercase tracking-widest mb-8 max-w-md mx-auto">
        Friday, 11th December 2026 &bull; Imperial Garden by Tivoli, New Delhi
      </p>

      {/* Golden Scratch Card wrapping the Countdown Digits */}
      {isPast ? (
        <div className="p-8 rounded-3xl bg-gradient-to-b from-[#2e0915]/90 to-[#140208]/95 border-2 border-[#d4af37]/60 shadow-2xl max-w-md mx-auto">
          <Heart className="w-10 h-10 text-[#ffd700] mx-auto mb-3 animate-pulse" fill="#ffd700" />
          <p className="font-serif text-2xl sm:text-3xl font-bold text-[#ffd700] tracking-wide uppercase">
            The Wedding Celebrations Have Begun!
          </p>
          <p className="font-body text-xs sm:text-sm text-[#e8c07d]/80 mt-2">
            Blessing the couple with eternal joy, love & togetherness.
          </p>
        </div>
      ) : (
        <CountdownScratchCard>
          <div className="flex items-center justify-center gap-2.5 sm:gap-4 max-w-lg mx-auto py-3 px-3">
            <CountdownCard value={days} label="Days" />
            <Colon />
            <CountdownCard value={hours} label="Hours" />
            <Colon />
            <CountdownCard value={minutes} label="Minutes" />
            <Colon />
            <CountdownCard value={seconds} label="Seconds" />
          </div>
        </CountdownScratchCard>
      )}

      {/* Decorative Bottom Divider */}
      <div className="flex items-center justify-center gap-3 mt-12">
        <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent to-[#d4af37]/60" />
        <span className="text-[#ffd700] text-xs">✦</span>
        <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-l from-transparent to-[#d4af37]/60" />
      </div>
    </section>
  );
}

function CountdownCard({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[62px] sm:min-w-[80px]">
      <div
        className="w-full rounded-2xl py-3.5 sm:py-5 px-2 flex items-center justify-center border border-[#ffd700]/40 transition-transform duration-300 hover:scale-105"
        style={{
          background:
            "linear-gradient(145deg, #2b0b15 0%, #17040b 50%, #2e0915 100%)",
          boxShadow:
            "0 12px 30px rgba(0,0,0,0.8), 0 0 20px rgba(212,175,55,0.15), inset 0 1px 2px rgba(255,240,179,0.3)",
        }}
      >
        <span className="font-serif text-2xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#fff3b0] via-[#ffd700] to-[#d4af37] tabular-nums leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="mt-2.5 font-body text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#e8c07d]/85 font-medium">
        {label}
      </span>
    </div>
  );
}

function Colon() {
  return (
    <span className="font-serif text-xl sm:text-3xl font-bold text-[#ffd700]/70 self-start mt-3.5 sm:mt-5 animate-pulse">
      :
    </span>
  );
}
