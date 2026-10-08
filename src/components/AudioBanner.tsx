import React from 'react';
import { ArrowRight, Cpu, Layers, Disc3 } from 'lucide-react';

interface AudioBannerProps {
  onExploreHeadphones: () => void;
}

export const AudioBanner: React.FC<AudioBannerProps> = ({ onExploreHeadphones }) => {
  return (
    <section className="py-20 relative overflow-hidden bg-[#07080B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0E1015] shadow-2xl">
          {/* Background Macro Engineering Image */}
          <div className="absolute inset-0">
            <img
              src="/src/assets/images/banner_acoustic_engineering_1791442498455.jpg"
              alt="ALI MURTAZA Titanium Acoustic Driver Engineering"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-40 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#07080B] via-[#07080B]/90 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-transparent to-transparent" />
          </div>

          {/* Foreground Engineering Story */}
          <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-2xl">
            {/* Tagline */}
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-4">
              <Disc3 className="w-4 h-4 animate-spin [animation-duration:8s]" />
              <span>Acoustic Transducer Metallurgy</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-[1.1]">
              Titanium Diaphragms. <br />
              <span className="text-amber-400">Zero Micro-Distortion.</span>
            </h2>

            {/* Body */}
            <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed">
              Every driver inside ALI MURTAZA headphones and earbuds is vacuum-deposited with an ultra-thin
              titanium biocellulose layer. This delivers the stiffness needed to eliminate cone breakup at 40kHz,
              paired with the damping required to render deep sub-bass without harmonic muddiness.
            </p>

            {/* Spec Columns */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>Diaphragm</span>
                </div>
                <div className="text-base sm:text-lg font-bold text-white font-mono mt-0.5">
                  50mm Biocellulose
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                  <Cpu className="w-3.5 h-3.5 text-amber-400" />
                  <span>Acoustic DAC</span>
                </div>
                <div className="text-base sm:text-lg font-bold text-white font-mono mt-0.5">
                  32-Bit / 384kHz
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <div className="text-xs text-zinc-400">Acoustic Shield</div>
                <div className="text-base sm:text-lg font-bold text-white font-mono mt-0.5">
                  -48dB Silence
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="mt-8">
              <button
                onClick={onExploreHeadphones}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white text-black hover:bg-zinc-200 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg group"
              >
                <span>Discover Reference Series</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
