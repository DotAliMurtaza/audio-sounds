import React from 'react';
import { ProductCategory } from '../types';
import { ArrowUpRight, Headphones, Radio, Volume2 } from 'lucide-react';

interface CategoryShowcaseProps {
  onSelectCategory: (category: ProductCategory) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ onSelectCategory }) => {
  const categories: {
    title: ProductCategory;
    subtitle: string;
    description: string;
    image: string;
    icon: React.ReactNode;
    subtypes: string[];
    count: number;
  }[] = [
    {
      title: 'Earbuds',
      subtitle: 'True Wireless & In-Ear Isolation',
      description: 'Featherweight beryllium drivers, adaptive noise cancellation, and all-day wireless charging cases.',
      image: '/src/assets/images/product_earbuds_tws_pro_1791442463927.jpg',
      icon: <Radio className="w-5 h-5 text-amber-400" />,
      subtypes: ['Wireless', 'TWS Hybrid', 'Beryllium Pro', 'Active Noise Cancelling', 'Gaming 28ms'],
      count: 5,
    },
    {
      title: 'Handsfree',
      subtitle: 'Audiophile Wired & Sport Neckband',
      description: 'Reinforced Kevlar braided cords, dual dynamic-armature hybrids, and broadcast-grade inline microphones.',
      image: '/src/assets/images/product_handsfree_braided_1791442476894.jpg',
      icon: <Volume2 className="w-5 h-5 text-amber-400" />,
      subtypes: ['Kevlar Wired', 'Bluetooth Neckband', 'Titanium Dual-Driver IEM'],
      count: 3,
    },
    {
      title: 'Headphones',
      subtitle: 'Over-Ear Reference & Studio Master',
      description: 'Hand-tuned 50mm titanium transducers, 60-hour endurance, memory foam leather cups, and -48dB silence.',
      image: '/src/assets/images/product_headphones_studio_1791442487376.jpg',
      icon: <Headphones className="w-5 h-5 text-amber-400" />,
      subtypes: ['Reference Over-Ear', 'Studio ANC', 'Spatial Gaming 7.1', 'Minimalist Wireless'],
      count: 5,
    },
  ];

  return (
    <section className="py-16 bg-[#090A0E] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
              Acoustic Architecture
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Curated Audio Disciplines
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-sm text-zinc-400 max-w-md">
            Engineered exclusively for pristine sonic reproduction. Select a discipline to explore technical specifications and acoustic response curves.
          </p>
        </div>

        {/* 3-Column Discipline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat) => (
            <div
              key={cat.title}
              onClick={() => onSelectCategory(cat.title)}
              className="group relative bg-[#111216] border border-white/10 hover:border-amber-500/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              {/* Top Bar inside card */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-zinc-900 border border-white/5">
                    {cat.icon}
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                    {cat.count} Models
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-amber-400 group-hover:text-black flex items-center justify-center text-zinc-400 transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Product Category Visual */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-zinc-950 mb-5">
                <img
                  src={cat.image}
                  alt={cat.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-xs text-amber-300 font-mono">
                  {cat.subtitle}
                </div>
              </div>

              {/* Card Meta & Subcategories */}
              <div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">
                  {cat.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4">
                  {cat.description}
                </p>

                {/* Subtypes metadata (Clean, unboxed text per constitution) */}
                <div className="pt-3 border-t border-white/5 text-xs text-zinc-300 flex flex-wrap gap-x-2 gap-y-1">
                  {cat.subtypes.map((sub, i) => (
                    <React.Fragment key={sub}>
                      <span>{sub}</span>
                      {i < cat.subtypes.length - 1 && <span className="text-zinc-400">·</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
