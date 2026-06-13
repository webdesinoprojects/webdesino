// Ribbon paths are 2x screen width (2880 units) so they tile seamlessly.
// Each group animates translateX(0 → -1440) looping → wave flows right to left endlessly.
// Different speeds per ribbon give depth.

export default function LandingHeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 560"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id="wg1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#111184" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.12" />
          </linearGradient>
          <linearGradient id="wg2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#111184" stopOpacity="0.09" />
            <stop offset="50%" stopColor="#4f46e5" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#111184" stopOpacity="0.09" />
          </linearGradient>
          <linearGradient id="wg3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6d28d9" stopOpacity="0.07" />
            <stop offset="50%" stopColor="#111184" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.07" />
          </linearGradient>
        </defs>

        {/* Ribbon 1 — upper, flows in 10s */}
        <g>
          <path
            d="
              M 0 65
              C 120 65 240 40 360 40
              C 480 40 600 65 720 65
              C 840 65 960 90 1080 90
              C 1200 90 1320 65 1440 65
              C 1560 65 1680 40 1800 40
              C 1920 40 2040 65 2160 65
              C 2280 65 2400 90 2520 90
              C 2640 90 2760 65 2880 65
              L 2880 118
              C 2760 118 2640 143 2520 143
              C 2400 143 2280 118 2160 118
              C 2040 118 1920 93 1800 93
              C 1680 93 1560 118 1440 118
              C 1320 118 1200 143 1080 143
              C 960 143 840 118 720 118
              C 600 118 480 93 360 93
              C 240 93 120 118 0 118
              Z
            "
            fill="url(#wg1)"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              from="0 0"
              to="-1440 0"
              dur="10s"
              repeatCount="indefinite"
            />
          </path>
        </g>

        {/* Ribbon 2 — center, flows in 14s, offset phase */}
        <g>
          <path
            d="
              M 0 245
              C 120 245 240 215 360 215
              C 480 215 600 245 720 245
              C 840 245 960 275 1080 275
              C 1200 275 1320 245 1440 245
              C 1560 245 1680 215 1800 215
              C 1920 215 2040 245 2160 245
              C 2280 245 2400 275 2520 275
              C 2640 275 2760 245 2880 245
              L 2880 295
              C 2760 295 2640 325 2520 325
              C 2400 325 2280 295 2160 295
              C 2040 295 1920 265 1800 265
              C 1680 265 1560 295 1440 295
              C 1320 295 1200 325 1080 325
              C 960 325 840 295 720 295
              C 600 295 480 265 360 265
              C 240 265 120 295 0 295
              Z
            "
            fill="url(#wg2)"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              from="-480 0"
              to="-1920 0"
              dur="14s"
              repeatCount="indefinite"
            />
          </path>
        </g>

        {/* Ribbon 3 — lower, flows in 18s, offset phase */}
        <g>
          <path
            d="
              M 0 400
              C 120 400 240 375 360 375
              C 480 375 600 400 720 400
              C 840 400 960 425 1080 425
              C 1200 425 1320 400 1440 400
              C 1560 400 1680 375 1800 375
              C 1920 375 2040 400 2160 400
              C 2280 400 2400 425 2520 425
              C 2640 425 2760 400 2880 400
              L 2880 448
              C 2760 448 2640 473 2520 473
              C 2400 473 2280 448 2160 448
              C 2040 448 1920 423 1800 423
              C 1680 423 1560 448 1440 448
              C 1320 448 1200 473 1080 473
              C 960 473 840 448 720 448
              C 600 448 480 423 360 423
              C 240 423 120 448 0 448
              Z
            "
            fill="url(#wg3)"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              from="-960 0"
              to="-2400 0"
              dur="18s"
              repeatCount="indefinite"
            />
          </path>
        </g>

      </svg>
    </div>
  );
}
