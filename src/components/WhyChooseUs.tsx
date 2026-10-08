import React from 'react';
import { BRAND_PILLARS } from '../data/products';

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-20 bg-[#090A0E] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
              Engineering Principles
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Why Choose ALI MURTAZA
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md">
            Built from scratch for audiophiles, producers, and discerning daily listeners.
            No gimmicks, no cheap plastics, no exaggerated marketing claims.
          </p>
        </div>

        {/* 4 Brand Pillars with clean typography and editorial index */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {BRAND_PILLARS.map((pillar, idx) => (
            <div
              key={pillar.id}
              className="relative p-6 bg-[#111216] border border-white/5 hover:border-amber-500/30 rounded-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Natural editorial numbering per constitution (01, 02, etc.) */}
                <div className="text-xs font-mono text-amber-400/80 mb-4 font-semibold">
                  0{idx + 1}.
                </div>

                <h3 className="text-lg font-semibold text-white mb-2 font-display">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-zinc-300">
                Audited Standard
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
