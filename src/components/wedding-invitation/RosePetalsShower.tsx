import { useMemo } from "react";

interface RosePetalsShowerProps {
  active?: boolean;
  count?: number;
}

export function RosePetalsShower({ active = true, count = 16 }: RosePetalsShowerProps) {
  const petals = useMemo(() => {
    const list = [];
    const colorSchemes = [
      { id: "p1", stop1: "#880e4f", stop2: "#c2185b", stop3: "#e91e63", stop4: "#ff4081" }, // exact user reference
      { id: "p2", stop1: "#590d22", stop2: "#a4133c", stop3: "#c9184a", stop4: "#ff758f" },
      { id: "p3", stop1: "#7209b7", stop2: "#b5179e", stop3: "#f72585", stop4: "#ff8fa3" },
      { id: "p4", stop1: "#800f2f", stop2: "#d90429", stop3: "#ef233c", stop4: "#ff758f" },
    ];

    for (let i = 0; i < count; i++) {
      const scheme = colorSchemes[i % colorSchemes.length];
      const left = `${Math.random() * 98}%`;
      const width = Math.floor(18 + Math.random() * 16); // 18px to 34px
      const height = Math.floor(width * 0.65);
      const fallDuration = `${7 + Math.random() * 6}s`; // 7s to 13s for gentle drifting
      const delay = `${(i % 16) * 0.6 + Math.random() * 1.2}s`; // gentle, staggered wave of subtle petals
      const drift = `${(Math.random() - 0.5) * 140}px`;
      const spin = `${(Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 360)}deg`;
      const flutterDuration = `${2.5 + Math.random() * 2.5}s`;
      const initialTilt = `${-20 + Math.random() * 40}deg`;

      list.push({
        id: i,
        scheme,
        left,
        width,
        height,
        fallDuration,
        delay,
        drift,
        spin,
        flutterDuration,
        initialTilt,
      });
    }
    return list;
  }, [count]);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden"
      aria-hidden="true"
    >
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal-shower-item"
          style={{
            left: p.left,
            width: `${p.width}px`,
            height: `${p.height}px`,
            "--fall-duration": p.fallDuration,
            "--fall-delay": p.delay,
            "--drift": p.drift,
            "--spin": p.spin,
          } as React.CSSProperties}
        >
          <div
            className="petal-flutter-inner w-full h-full"
            style={{
              "--flutter-duration": p.flutterDuration,
              transform: `rotate(${p.initialTilt})`,
            } as React.CSSProperties}
          >
            <svg
              viewBox="0 0 36 24"
              className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id={`petal-grad-${p.id}`}
                  x1="0%"
                  y1="100%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor={p.scheme.stop1} />
                  <stop offset="35%" stopColor={p.scheme.stop2} />
                  <stop offset="75%" stopColor={p.scheme.stop3} />
                  <stop offset="100%" stopColor={p.scheme.stop4} />
                </linearGradient>
              </defs>
              {/* Curved realistic rose petal matching user reference image */}
              <path
                d="M 3,13 C 6,4 23,2 33,9 C 29,19 14,23 3,13 Z"
                fill={`url(#petal-grad-${p.id})`}
                opacity="0.9"
              />
              {/* Subtle inner petal sheen / ridge */}
              <path
                d="M 7,12 C 12,7 23,6 29,10"
                stroke={p.scheme.stop4}
                strokeWidth="0.6"
                strokeLinecap="round"
                opacity="0.5"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
