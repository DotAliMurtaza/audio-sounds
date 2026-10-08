import React, { useState } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Sparkles, Flame, Headphones, Radio, Volume2 } from 'lucide-react';

interface CollectionSpotlightProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  wishlistIds: Set<string>;
}

export const CollectionSpotlight: React.FC<CollectionSpotlightProps> = ({
  products,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  onViewDetails,
  wishlistIds,
}) => {
  const [activeTab, setActiveTab] = useState<'bestsellers' | 'new' | 'earbuds' | 'headphones' | 'handsfree'>('bestsellers');

  const displayedProducts = products.filter((p) => {
    if (activeTab === 'bestsellers') return Boolean(p.isBestSeller);
    if (activeTab === 'new') return Boolean(p.isNewArrival);
    if (activeTab === 'earbuds') return p.category === 'Earbuds';
    if (activeTab === 'headphones') return p.category === 'Headphones';
    if (activeTab === 'handsfree') return p.category === 'Handsfree';
    return true;
  }).slice(0, 4);

  const tabs: {
    id: 'bestsellers' | 'new' | 'earbuds' | 'headphones' | 'handsfree';
    label: string;
    icon: React.ReactNode;
  }[] = [
    { id: 'bestsellers', label: 'Best Sellers', icon: <Flame className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'new', label: 'New Arrivals', icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'earbuds', label: 'Earbuds Collection', icon: <Radio className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'headphones', label: 'Headphones Collection', icon: <Headphones className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'handsfree', label: 'Handsfree Collection', icon: <Volume2 className="w-3.5 h-3.5 text-amber-400" /> },
  ];

  return (
    <section className="py-16 bg-[#08090D] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
              Featured Spotlights
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Acoustic Benchmarks
            </h2>
          </div>

          {/* Segmented Tab Selectors */}
          <div className="flex items-center gap-1.5 p-1 bg-zinc-900 border border-white/5 rounded-xl overflow-x-auto max-w-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white/10 text-amber-300 shadow-sm border border-amber-500/40'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 4-Item Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
              onToggleWishlist={onToggleWishlist}
              onViewDetails={onViewDetails}
              isWishlisted={wishlistIds.has(product.id)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
