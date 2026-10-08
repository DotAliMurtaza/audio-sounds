import React, { useEffect, useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { playBrandChime } from '../utils/audio';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

interface BrandIntroProps {
  onComplete: () => void;
}

export const BrandIntro: React.FC<BrandIntroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'ignite' | 'resonant' | 'reveal' | 'fadeout'>('ignite');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [bars] = useState(() => Array.from({ length: 32 }, (_, i) => i));

  useEffect(() => {
    // Phase 1: ignite soundwave
    const t1 = setTimeout(() => {
      setPhase('resonant');
      if (soundEnabled) {
        playBrandChime();
      }
    }, 400);

    // Phase 2: acoustic crest & brand monogram reveal
    const t2 = setTimeout(() => {
      setPhase('reveal');
    }, 1500);

    // Phase 3: dissolve into main store
    const t3 = setTimeout(() => {
      setPhase('fadeout');
    }, 3100);

    // Completion callback
    const t4 = setTimeout(() => {
      onComplete();
    }, 3600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete, soundEnabled]);

  const handleSkip = () => {
    setPhase('fadeout');
    setTimeout(onComplete, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07080B] text-white transition-opacity duration-700 select-none overflow-hidden ${
        phase === 'fadeout' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Ambient Dark Soundfield */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1A1B22_0%,#08090C_70%,#040507_100%)]" />

      {/* Acoustic Frequency Concentric Ripple Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={`absolute rounded-full border border-amber-500/20 transition-all duration-1000 ease-out ${
            phase !== 'ignite' ? 'w-[750px] h-[750px] opacity-10 scale-100' : 'w-0 h-0 opacity-0 scale-50'
          }`}
        />
        <div
          className={`absolute rounded-full border border-[#D4AF37]/30 transition-all duration-1000 delay-150 ease-out ${
            phase !== 'ignite' ? 'w-[520px] h-[520px] opacity-25 scale-100' : 'w-0 h-0 opacity-0 scale-50'
          }`}
        />
        <div
          className={`absolute rounded-full border border-[#D4AF37]/40 transition-all duration-1000 delay-300 ease-out ${
            phase !== 'ignite' ? 'w-[320px] h-[320px] opacity-40 scale-100' : 'w-0 h-0 opacity-0 scale-50'
          }`}
        />
      </div>

      {/* Controls: Skip & Audio */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-4">
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
          title={soundEnabled ? 'Mute intro chime' : 'Enable intro sound'}
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-amber-400" /> : <VolumeX className="w-3.5 h-3.5 text-zinc-400" />}
          <span>{soundEnabled ? 'Audio On' : 'Silent'}</span>
        </button>

        <button
          onClick={handleSkip}
          className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-zinc-200 tracking-wider font-medium transition-all"
        >
          Skip Intro
        </button>
      </div>

      {/* Central Brand Reveal Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Glowing Monogram & Sound Ripple */}
        <div
          className={`transition-all duration-1000 ease-out transform ${
            phase === 'ignite'
              ? 'scale-75 opacity-0'
              : phase === 'resonant'
              ? 'scale-110 opacity-90'
              : 'scale-100 opacity-100'
          }`}
        >
          <BrandLogo size="xl" showTagline={false} />
        </div>

        {/* Cinematic Subtitle & Frequency Tag */}
        <div
          className={`mt-6 flex flex-col items-center gap-2 transition-all duration-700 delay-300 ${
            phase === 'reveal' || phase === 'fadeout' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-xs uppercase tracking-[0.4em] text-zinc-400 font-medium">
            Earbuds · Handsfree · Headphones
          </p>
          <div className="flex items-center gap-2 text-[11px] text-amber-400/90 tracking-[0.25em] font-mono uppercase mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            <span>Harmonic Acoustic Architecture · 5Hz - 50kHz</span>
          </div>
        </div>

        {/* Real-time Dynamic Acoustic Equalizer Waveform Bars */}
        <div className="mt-10 flex items-center justify-center gap-1 h-12 w-80">
          {bars.map((bar) => {
            const centerDistance = Math.abs(bar - 16);
            const heightFactor = Math.max(0.15, 1 - centerDistance / 18);
            return (
              <div
                key={bar}
                className="w-1 bg-gradient-to-t from-amber-500/30 via-[#D4AF37] to-amber-200 rounded-full transition-all duration-300"
                style={{
                  height:
                    phase === 'ignite'
                      ? '4px'
                      : phase === 'resonant'
                      ? `${Math.sin(bar * 0.4 + Date.now()) * 20 + 28 * heightFactor}px`
                      : `${Math.sin(bar * 0.6) * 14 + 18 * heightFactor}px`,
                  opacity: phase === 'ignite' ? 0.2 : 0.85,
                }}
              />
            );
          })}
        </div>

        {/* Status Line */}
        <div className="mt-8 text-[11px] text-zinc-400 tracking-widest uppercase font-mono">
          {phase === 'ignite' && 'Initializing Acoustic Drivers...'}
          {phase === 'resonant' && 'Harmonizing Master Chamber...'}
          {phase === 'reveal' && 'Welcome to ALI MURTAZA'}
          {phase === 'fadeout' && 'Entering Soundstage...'}
        </div>
      </div>
    </div>
  );
};
