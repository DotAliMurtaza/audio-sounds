import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showTagline = false,
  className = '',
}) => {
  const sizeMap = {
    sm: { icon: 'w-6 h-6', text: 'text-base', spacing: 'tracking-[0.18em]' },
    md: { icon: 'w-8 h-8', text: 'text-lg', spacing: 'tracking-[0.2em]' },
    lg: { icon: 'w-12 h-12', text: 'text-2xl', spacing: 'tracking-[0.22em]' },
    xl: { icon: 'w-20 h-20', text: 'text-3xl md:text-4xl', spacing: 'tracking-[0.25em]' },
  };

  const current = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Precision Audio Frequency Emblem: Interconnected A & M Monogram Soundwave */}
      <div className={`relative flex items-center justify-center shrink-0 ${current.icon}`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_2px_12px_rgba(212,175,55,0.25)]"
        >
          <defs>
            <linearGradient id="amGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5E0A0" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#997A15" />
            </linearGradient>
            <linearGradient id="amTitaniumGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2A2C35" />
              <stop offset="100%" stopColor="#8E929E" />
            </linearGradient>
            <radialGradient id="amAuraGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Acoustic Resonance Rings */}
          <circle cx="50" cy="50" r="46" stroke="url(#amTitaniumGrad)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
          <circle cx="50" cy="50" r="38" stroke="url(#amGoldGrad)" strokeWidth="1.2" opacity="0.6" />

          {/* Central Glow Field */}
          <circle cx="50" cy="50" r="30" fill="url(#amAuraGlow)" />

          {/* Geometric "AM" Acoustic Sound Bridge */}
          {/* Left Apex (A) */}
          <path
            d="M26 72L42 26C43 23.5 46 23.5 47 26L55 48"
            stroke="url(#amGoldGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Right Crests (M) */}
          <path
            d="M45 48L54 70C55 72 58 72 59 70L74 26"
            stroke="url(#amGoldGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Audio Waveform Bridge (Crossbar) */}
          <path
            d="M32 57H52"
            stroke="url(#amGoldGrad)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Sonic Pulse Node */}
          <circle cx="50" cy="50" r="3.5" fill="#FFF2BD" />
        </svg>
      </div>

      {/* Typographic Wordmark */}
      <div className="flex flex-col">
        <span className={`font-display font-bold text-white uppercase ${current.text} ${current.spacing} leading-none`}>
          ALI <span className="text-[#D4AF37] font-semibold">MURTAZA</span>
        </span>
        {showTagline && (
          <span className="text-[10px] uppercase tracking-[0.35em] text-zinc-400 mt-1 font-medium">
            Acoustic Engineering
          </span>
        )}
      </div>
    </div>
  );
};
