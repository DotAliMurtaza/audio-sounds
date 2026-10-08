import React from 'react';
import { REVIEWS } from '../data/products';
import { Star, CheckCircle } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  return (
    <section className="py-20 bg-[#07080B] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
              Verified Audiophile Community
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Acoustic Audition Reports
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-sm font-semibold text-white font-mono tabular-nums">4.9 / 5.0</span>
            <span className="text-xs text-zinc-400">across 1,200+ auditions</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#101115] border border-white/5 rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                {/* Rating & Verified Tag */}
                <div className="flex items-center justify-between mb-3 text-xs">
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  {rev.verifiedPurchase && (
                    <span className="flex items-center gap-1 text-[11px] text-zinc-400 font-mono">
                      <CheckCircle className="w-3 h-3 text-emerald-400" />
                      <span>Verified Owner</span>
                    </span>
                  )}
                </div>

                {/* Product Name (Unboxed text) */}
                <div className="text-xs font-mono text-zinc-400 mb-2 truncate">
                  {rev.productName}
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold text-white mb-2 leading-snug">
                  &ldquo;{rev.title}&rdquo;
                </h3>

                {/* Body Comment */}
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  {rev.comment}
                </p>
              </div>

              {/* Author & Adjacency Proof */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="font-medium text-zinc-200">{rev.author}</span>
                <span className="text-zinc-400 font-mono text-[11px]">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
