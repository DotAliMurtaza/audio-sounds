import React from 'react';
import { ArrowRight, Volume2, ShieldCheck, Zap } from 'lucide-react';
import { playBrandChime } from '../utils/audio';

interface HeroSectionProps {
  onShopNow: () => void;
  onExploreSoundLab: () => void;
  onViewProduct: (productId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onShopNow,
  onExploreSoundLab,
  onViewProduct,
}) => {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden pt-8 pb-16">
      {/* Background Lighting Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-zinc-800/20 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column: Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Editorial Kicker */}
            <div className="flex items-center gap-2 text-xs text-amber-400/90 font-mono tracking-widest uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>ALI MURTAZA Flagship Audio Series</span>
              <span aria-hidden="true" className="text-zinc-600">/</span>
              <span className="text-zinc-400">Gen-V Transducers</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.08] max-w-2xl">
              Sound in its <br />
              <span className="bg-gradient-to-r from-amber-200 via-[#D4AF37] to-amber-500 bg-clip-text text-transparent">
                purest, uncompromised
              </span>{' '}
              form.
            </h1>

            {/* Description */}
            <p className="mt-5 text-base sm:text-lg text-zinc-300 leading-relaxed max-w-xl">
              Engineered with custom biocellulose diaphragms and aerospace metallurgy.
              Experience master-tape clarity across reference earbuds, precision handsfree,
              and over-ear wireless headphones.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onShopNow}
                className="flex items-center gap-3 px-7 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-sm rounded-xl shadow-[0_4px_24px_rgba(212,175,55,0.3)] hover:shadow-[0_6px_30px_rgba(212,175,55,0.45)] transition-all cursor-pointer whitespace-nowrap group"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  playBrandChime();
                  onExploreSoundLab();
                }}
                className="flex items-center gap-2.5 px-6 py-3.5 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-white font-medium text-sm rounded-xl border border-white/10 hover:border-amber-500/40 transition-all cursor-pointer whitespace-nowrap backdrop-blur-sm"
              >
                <Volume2 className="w-4 h-4 text-amber-400" />
                <span>Test Sound Profile</span>
              </button>
            </div>

            {/* Quantitative Proof Strip */}
            <div className="mt-12 pt-8 border-t border-white/10 w-full grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-white tabular-nums">
                  5<span className="text-amber-400 text-base font-normal">Hz</span> - 50<span className="text-amber-400 text-base font-normal">kHz</span>
                </div>
                <div className="text-xs text-zinc-400 mt-1">Hi-Res Frequency Range</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-white tabular-nums">
                  -48<span className="text-amber-400 text-base font-normal">dB</span>
                </div>
                <div className="text-xs text-zinc-400 mt-1">Hybrid Studio ANC</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-white tabular-nums">
                  60<span className="text-amber-400 text-base font-normal">h</span>
                </div>
                <div className="text-xs text-zinc-400 mt-1">Extended Battery Life</div>
              </div>
            </div>
          </div>

          {/* Right Hero Column: Large Visual Showcase */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Ambient Backing Glow Ring */}
            <div className="absolute w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] rounded-full border border-amber-500/20 bg-gradient-to-tr from-amber-500/5 to-transparent animate-pulse" />
            <div className="absolute w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] rounded-full border border-zinc-700/40" />

            {/* Product Card Showcase */}
            <div className="relative z-10 w-full max-w-md bg-[#121318]/90 border border-white/10 rounded-2xl p-4 sm:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl group transition-all duration-300 hover:border-amber-500/40">
              
              {/* Product Visual Container with Fallback */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#181920] flex items-center justify-center">
                <img
                  src="/src/assets/images/hero_flagship_headphones_1791442451041.jpg"
                  alt="ALI MURTAZA Flagship Reference Over-Ear Headphones"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    // Graceful fallback for resilient rendering
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />

                {/* Sound signature badge */}
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1 rounded-md text-[11px] font-mono text-amber-300">
                  Master Tuning 0.08% THD
                </div>
              </div>

              {/* Product Meta */}
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <span className="text-xs text-amber-400 uppercase tracking-widest font-mono">Flagship Reference</span>
                  <h2 className="text-lg font-semibold text-white mt-0.5">Murtaza Reference Over-Ear</h2>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-white tabular-nums">$349</div>
                  <div className="text-xs text-zinc-400 line-through tabular-nums">$429</div>
                </div>
              </div>

              {/* Quick specs pill-free bar */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-zinc-300">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" /> 60h Playback
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> 2-Yr Warranty
                </span>
                <button
                  onClick={() => onViewProduct('headphones-murtaza-reference')}
                  className="text-amber-400 hover:text-amber-300 font-medium hover:underline text-xs"
                >
                  View Details →
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
