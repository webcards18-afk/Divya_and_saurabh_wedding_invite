import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";

interface CountdownScratchCardProps {
  onRevealed?: () => void;
  children: React.ReactNode;
}

// ── Party Blast Confetti & Scatter Animation ──────────────────────────────
const CONFETTI_COLORS = [
  "#ff4d88", // vibrant pink
  "#00a86b", // emerald green
  "#ffd700", // radiant gold
  "#fb8500", // warm orange
  "#ffffff", // pure white
  "#e63946", // festive crimson
  "#f72585", // deep rose
  "#10b981", // bright green
  "#ffb703", // bright yellow
  "#ff7b00", // tangerine
  "#ff8fa3", // soft pink
  "#fff8e7", // warm cream
];

interface ScatterPiece {
  id: number;
  tx: number;
  ty: number;
  grav: number;
  delay: number;
  duration: number;
  color: string;
  width: number;
  height: number;
  rotation: number;
  shape: "rect" | "diamond" | "circle" | "oval" | "ribbon";
}

function usePartyBlastParticles(count = 115) {
  return useMemo(() => {
    const shapes: Array<"rect" | "diamond" | "circle" | "oval" | "ribbon"> = [
      "rect", "diamond", "circle", "oval", "ribbon",
    ];

    return Array.from({ length: count }, (_, i) => {
      // 360-degree radial explosion in all directions
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.45;
      const distance = 90 + Math.random() * 260; // scatter distance
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      const grav = 30 + Math.random() * 80; // gentle gravity drop
      const delay = Math.random() * 80; // instant burst
      const duration = 2400 + Math.random() * 1000; // 2.4s - 3.4s (slower, graceful float)
      const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length] ?? "#ffd700";
      const shape = shapes[i % shapes.length];

      let width = 6;
      let height = 10;
      if (shape === "rect") {
        width = 5 + Math.random() * 5;
        height = 9 + Math.random() * 7;
      } else if (shape === "diamond") {
        width = 8 + Math.random() * 4;
        height = width;
      } else if (shape === "circle") {
        width = 6 + Math.random() * 4;
        height = width;
      } else if (shape === "oval") {
        width = 6 + Math.random() * 3;
        height = 10 + Math.random() * 5;
      } else if (shape === "ribbon") {
        width = 4 + Math.random() * 2;
        height = 13 + Math.random() * 8;
      }

      return {
        id: i,
        tx,
        ty,
        grav,
        delay,
        duration,
        color,
        width,
        height,
        rotation: Math.random() * 800 - 400,
        shape,
      };
    });
  }, [count]);
}

function PartyBombExplosion({ show }: { show: boolean }) {
  const pieces = usePartyBlastParticles(120);

  if (!show) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-50 overflow-visible"
    >
      {/* Golden Expanding Shockwave ring */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 0,
          height: 0,
          border: "3px solid rgba(255, 215, 0, 0.85)",
          boxShadow: "0 0 30px rgba(255, 215, 0, 0.6)",
          animation: "party-shockwave 0.75s ease-out forwards",
        }}
      />

      {/* Radiant Center Flash */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: 45,
          height: 45,
          background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,215,0,0.7) 50%, transparent 80%)",
          animation: "party-center-flash 0.55s ease-out forwards",
        }}
      />

      {/* Confetti particles scattering in all directions and disappearing */}
      {pieces.map((p) => {
        let shapeStyle: React.CSSProperties = {};
        if (p.shape === "circle") {
          shapeStyle = { borderRadius: "50%" };
        } else if (p.shape === "oval") {
          shapeStyle = { borderRadius: "50%" };
        } else if (p.shape === "diamond") {
          shapeStyle = { clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" };
        } else {
          shapeStyle = { borderRadius: "1px" };
        }

        return (
          <div
            key={p.id}
            className="absolute left-1/2 top-1/2"
            style={{
              width: `${p.width}px`,
              height: `${p.height}px`,
              backgroundColor: p.color,
              opacity: 0,
              animation: `scatter-confetti ${p.duration}ms cubic-bezier(0.16, 0.7, 0.3, 1) ${p.delay}ms forwards`,
              ["--tx" as string]: `${p.tx}px`,
              ["--ty" as string]: `${p.ty}px`,
              ["--grav" as string]: `${p.grav}px`,
              ["--rot" as string]: `${p.rotation}deg`,
              ...shapeStyle,
            }}
          />
        );
      })}

      <style>{`
        @keyframes party-shockwave {
          0% { width: 0; height: 0; opacity: 1; }
          100% { width: 480px; height: 480px; opacity: 0; border-width: 1px; }
        }
        @keyframes party-center-flash {
          0% { transform: translate(-50%, -50%) scale(0.4); opacity: 1; }
          40% { transform: translate(-50%, -50%) scale(3); opacity: 0.85; }
          100% { transform: translate(-50%, -50%) scale(5); opacity: 0; }
        }
        @keyframes scatter-confetti {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) rotate(0deg) rotateX(0deg) rotateY(0deg) scale(0);
            opacity: 1;
          }
          18% {
            transform: translate(-50%, -50%) translate(calc(var(--tx) * 0.45), calc(var(--ty) * 0.45)) rotate(calc(var(--rot) * 0.35)) rotateX(120deg) rotateY(180deg) scale(1.15);
            opacity: 1;
          }
          65% {
            opacity: 0.95;
          }
          85% {
            opacity: 0.55;
          }
          100% {
            transform: translate(-50%, -50%) translate(var(--tx), calc(var(--ty) + var(--grav))) rotate(var(--rot)) rotateX(360deg) rotateY(720deg) scale(0.25);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

// ── Countdown Golden Scratch Card Component ──────────────────────────────
export function CountdownScratchCard({ onRevealed, children }: CountdownScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const isDrawingRef = useRef(false);
  const hasScratchedRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const strokeCountRef = useRef(0);
  const hasInitializedRef = useRef(false);

  // Trigger full celebration and reveal 100% of the countdown
  const revealCard = useCallback(() => {
    if (isRevealed) return;
    setIsRevealed(true);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    onRevealed?.();
  }, [isRevealed, onRevealed]);

  // Paint the royal gold foil texture on canvas once
  const initCanvas = useCallback(() => {
    if (hasInitializedRef.current && hasScratchedRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const cssWidth = Math.floor(rect.width);
    const cssHeight = Math.floor(rect.height);
    if (cssWidth === 0 || cssHeight === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.floor(cssWidth * dpr);
    const h = Math.floor(cssHeight * dpr);

    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = "source-over";

    // 1. Rich metallic gold base gradient
    const goldGrad = ctx.createLinearGradient(0, 0, w, h);
    goldGrad.addColorStop(0.0, "#caa24d");
    goldGrad.addColorStop(0.18, "#f0d58e");
    goldGrad.addColorStop(0.38, "#ffd700");
    goldGrad.addColorStop(0.58, "#c49a38");
    goldGrad.addColorStop(0.82, "#fbe7a1");
    goldGrad.addColorStop(1.0, "#996d19");
    ctx.fillStyle = goldGrad;

    const radius = Math.floor(22 * dpr);
    ctx.beginPath();
    ctx.roundRect(0, 0, w, h, radius);
    ctx.fill();

    // 2. Ornate diagonal shimmer highlights
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(0, 0, w, h, radius);
    ctx.clip();

    ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
    ctx.lineWidth = 2.5 * dpr;
    const step = 20 * dpr;
    for (let i = -h; i < w + h; i += step) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + h, h);
      ctx.stroke();
    }

    // 3. Inner Ornate Dashed Gold Border
    ctx.strokeStyle = "rgba(75, 45, 10, 0.6)";
    ctx.lineWidth = 1.8 * dpr;
    ctx.setLineDash([6 * dpr, 4 * dpr]);
    const inset = 10 * dpr;
    ctx.strokeRect(inset, inset, w - inset * 2, h - inset * 2);
    ctx.restore();

    // 4. Center Glow
    const cx = w / 2;
    const cy = h / 2;
    const radGrad = ctx.createRadialGradient(cx, cy, 10 * dpr, cx, cy, Math.min(w, h) * 0.5);
    radGrad.addColorStop(0, "rgba(255, 255, 255, 0.45)");
    radGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = radGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, Math.min(w, h) * 0.5, 0, Math.PI * 2);
    ctx.fill();

    // 5. Foil Typography
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillStyle = "#3a2003";
    ctx.font = `bold ${Math.floor(13 * dpr)}px serif`;
    ctx.fillText("✦  ✦  ✦", cx, cy - 28 * dpr);

    ctx.font = `bold ${Math.floor(15 * dpr)}px 'Jost', sans-serif`;
    ctx.fillStyle = "#261301";
    ctx.fillText("SCRATCH TO REVEAL", cx, cy - 8 * dpr);

    ctx.font = `bold ${Math.floor(11 * dpr)}px 'Jost', sans-serif`;
    ctx.fillStyle = "#5c3708";
    ctx.fillText("WEDDING COUNTDOWN", cx, cy + 12 * dpr);

    ctx.font = `italic ${Math.floor(11 * dpr)}px 'Cormorant Garamond', Georgia, serif`;
    ctx.fillStyle = "#3e2405";
    ctx.fillText("✨ Rub or Tap to Reveal ✨", cx, cy + 30 * dpr);
    ctx.restore();

    hasInitializedRef.current = true;
  }, []);

  useEffect(() => {
    initCanvas();
    const handleResize = () => {
      if (!isRevealed && !hasScratchedRef.current) initCanvas();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [initCanvas, isRevealed]);

  // Erases gold foil under touch/mouse in real time
  const scratchAt = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const canvasX = (clientX - rect.left) * scaleX;
    const canvasY = (clientY - rect.top) * scaleY;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();

    // Extra broad, silky smooth brush radius
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const radius = Math.floor(Math.max(50 * dpr, canvas.height * 0.4));

    if (lastPosRef.current) {
      ctx.lineWidth = radius * 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
      ctx.lineTo(canvasX, canvasY);
      ctx.stroke();
    } else {
      ctx.arc(canvasX, canvasY, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    lastPosRef.current = { x: canvasX, y: canvasY };
    hasScratchedRef.current = true;
    strokeCountRef.current++;

    // As soon as the user has scratched 3-4 moves, or after a couple swipes, reveal immediately!
    if (strokeCountRef.current >= 4) {
      revealCard();
    }
  }, [isRevealed, revealCard]);

  // Pointer event handlers on the canvas
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isRevealed) return;
    isDrawingRef.current = true;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    lastPosRef.current = null;
    scratchAt(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || isRevealed) return;
    scratchAt(e.clientX, e.clientY);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = false;
    lastPosRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    // On release, if they touched or scratched at all, reveal immediately!
    if (hasScratchedRef.current && !isRevealed) {
      revealCard();
    }
  };

  // Click / Tap handler
  const handleClick = () => {
    if (!isRevealed) {
      revealCard();
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className="relative w-full max-w-[480px] mx-auto select-none overflow-visible rounded-3xl cursor-pointer"
    >
      {/* 1. Underlying Countdown Content */}
      <div
        className={`w-full transition-all duration-700 ${
          isRevealed ? "opacity-100 scale-100" : "opacity-90 scale-[0.98]"
        }`}
      >
        {children}
      </div>

      {/* 2. Golden Scratch Card Foil Canvas Overlay */}
      <div
        className={`absolute inset-0 z-20 transition-all duration-500 ${
          isRevealed ? "opacity-0 pointer-events-none scale-95" : "opacity-100 pointer-events-auto scale-100"
        }`}
        style={{ touchAction: "none" }}
      >
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="w-full h-full cursor-crosshair rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.85)] border-2 border-[#ffd700]/70 block"
          style={{ touchAction: "none" }}
        />
      </div>

      {/* 3. 🎉 Party Blast Explosion on Reveal */}
      <PartyBombExplosion show={isRevealed} />
    </div>
  );
}
