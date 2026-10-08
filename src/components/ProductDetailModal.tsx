import React, { useState } from 'react';
import { Product } from '../types';
import { X, Star, Heart, ShoppingBag, ShieldCheck, Zap, Volume2, Check } from 'lucide-react';
import { playHapticSound, playAcousticSample } from '../utils/audio';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, selectedColor: string) => void;
  onBuyNow: (product: Product, selectedColor: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Standard');
  const [addedToast, setAddedToast] = useState(false);

  const handleAdd = () => {
    playHapticSound();
    onAddToCart(product, quantity, selectedColor);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleBuy = () => {
    playHapticSound();
    onBuyNow(product, selectedColor);
  };

  const testSound = () => {
    let mode: 'studio' | 'bass' | 'spatial' | 'vocal' = 'studio';
    if (product.soundProfile === 'Deep Bass') mode = 'bass';
    if (product.soundProfile === 'Spatial Clarity') mode = 'spatial';
    if (product.soundProfile === 'Warm Audiophile') mode = 'studio';
    playAcousticSample(mode);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div className="relative z-10 w-full max-w-4xl bg-[#111217] border border-white/10 rounded-3xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.9)] my-8 max-h-[90vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black text-zinc-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Visual Showcase & Gallery */}
        <div className="md:w-1/2 p-6 sm:p-8 bg-[#0C0D12] flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/5">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#181920] flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            {product.badge && (
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded text-xs font-mono uppercase tracking-wider text-amber-300 border border-white/10">
                {product.badge}
              </div>
            )}
          </div>

          {/* Sound Profile Quick Preview */}
          <div className="mt-6 p-4 rounded-xl bg-zinc-900/60 border border-white/5 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono uppercase text-zinc-400 block">Tuned Acoustic Profile</span>
              <span className="text-sm font-semibold text-white">{product.soundProfile}</span>
            </div>
            <button
              onClick={testSound}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 text-xs font-medium rounded-lg border border-amber-400/20 transition-colors cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Audition EQ</span>
            </button>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col overflow-y-auto">
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2 font-mono">
            <span>{product.category} / {product.subcategory}</span>
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-semibold tabular-nums">{product.rating.toFixed(1)}</span>
              <span className="text-zinc-500 tabular-nums">({product.reviewCount} reviews)</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight mb-2">
            {product.name}
          </h2>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-3xl font-bold text-white font-mono tabular-nums">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-zinc-400 line-through font-mono tabular-nums">
                ${product.originalPrice}
              </span>
            )}
            <span className="text-xs text-emerald-400 font-mono">In Stock · Ready to Ship</span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Color Selector */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2.5">
              <span>Finish: <strong className="text-white font-sans">{selectedColor}</strong></span>
            </div>
            <div className="flex items-center gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-all ${
                    selectedColor === c.name
                      ? 'border-amber-400 bg-amber-400/10 text-white font-semibold'
                      : 'border-white/10 bg-zinc-900/50 text-zinc-400 hover:border-white/30'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/40"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div className="mb-6 p-4 rounded-xl bg-zinc-900/40 border border-white/5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-3">
              Acoustic Specifications
            </h4>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs">
              <div>
                <span className="text-zinc-500 block">Driver</span>
                <span className="text-zinc-200 font-mono font-medium">{product.specs.driver}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Frequency</span>
                <span className="text-zinc-200 font-mono font-medium">{product.specs.frequency}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Battery / Power</span>
                <span className="text-zinc-200 font-mono font-medium">{product.specs.battery}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Connectivity</span>
                <span className="text-zinc-200 font-mono font-medium">{product.specs.connectivity}</span>
              </div>
              {product.specs.anc && (
                <div>
                  <span className="text-zinc-500 block">Active Noise Cancel</span>
                  <span className="text-amber-300 font-mono font-medium">{product.specs.anc}</span>
                </div>
              )}
              {product.specs.latency && (
                <div>
                  <span className="text-zinc-500 block">Low Latency</span>
                  <span className="text-amber-300 font-mono font-medium">{product.specs.latency}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quantity and Actions Module */}
          <div className="mt-auto pt-4 border-t border-white/10 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-white/10 rounded-xl bg-zinc-900 px-2 py-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 py-1 text-zinc-400 hover:text-white cursor-pointer text-sm font-bold"
                >
                  -
                </button>
                <span className="px-3 text-sm font-mono font-bold text-white tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 py-1 text-zinc-400 hover:text-white cursor-pointer text-sm font-bold"
                >
                  +
                </button>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  isWishlisted
                    ? 'bg-amber-500 border-amber-500 text-black'
                    : 'border-white/10 bg-zinc-900 text-zinc-300 hover:text-white'
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>

              {/* Add to Cart */}
              <button
                onClick={handleAdd}
                className="flex-1 py-3 px-4 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold uppercase tracking-wider rounded-xl border border-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {addedToast ? <Check className="w-4 h-4 text-emerald-400" /> : <ShoppingBag className="w-4 h-4 text-amber-400" />}
                <span>{addedToast ? 'Added to Bag!' : 'Add to Bag'}</span>
              </button>
            </div>

            {/* Buy Now Primary CTA */}
            <button
              onClick={handleBuy}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              <span>Instant Buy Now (${product.price * quantity})</span>
            </button>

            {/* Guarantee note */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-400 font-mono pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>2-Year Comprehensive Warranty · 30-Day Audition Return</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
