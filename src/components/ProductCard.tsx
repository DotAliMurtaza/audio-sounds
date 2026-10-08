import React from 'react';
import { Product } from '../types';
import { Star, Heart, ShoppingBag, Eye, Zap } from 'lucide-react';
import { playHapticSound } from '../utils/audio';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  isWishlisted: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  onViewDetails,
  isWishlisted,
}) => {
  return (
    <div className="group relative bg-[#111216] border border-white/5 hover:border-amber-500/40 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.6)] flex flex-col justify-between">
      
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#181920] mb-4 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Single subtle tag if present (No pill badge spam) */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-mono uppercase tracking-wider text-amber-300 border border-white/10">
            {product.badge}
          </div>
        )}

        {/* Wishlist Floating Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            playHapticSound();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer ${
            isWishlisted
              ? 'bg-amber-500 text-black shadow-md'
              : 'bg-black/60 text-zinc-300 hover:text-white hover:bg-black/90'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Hover Overlay Button */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
          <button
            onClick={() => onViewDetails(product)}
            className="flex-1 py-2 bg-black/85 hover:bg-black text-white text-xs font-medium rounded-lg backdrop-blur-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-white/10"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>View Specs</span>
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1">
        {/* Unboxed Metadata: Subcategory & Rating */}
        <div className="flex items-center justify-between text-xs text-zinc-400 mb-1.5 font-mono">
          <span>{product.subcategory}</span>
          <div className="flex items-center gap-1 text-amber-400">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="font-semibold tabular-nums">{product.rating.toFixed(1)}</span>
            <span className="text-zinc-500 tabular-nums">({product.reviewCount})</span>
          </div>
        </div>

        {/* Product Title */}
        <h3
          onClick={() => onViewDetails(product)}
          className="text-base font-semibold text-white group-hover:text-amber-300 transition-colors cursor-pointer line-clamp-1 mb-1"
        >
          {product.name}
        </h3>

        {/* Tagline / Micro-desc */}
        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-3">
          {product.tagline}
        </p>

        {/* Spec Highlights (Unboxed metadata with typographic dots) */}
        <div className="text-[11px] text-zinc-300 font-mono mb-4 flex items-center gap-1.5 truncate">
          <span>{product.specs.driver.split(' ')[0]}</span>
          <span>·</span>
          <span>{product.specs.battery.split(' ')[0]} Bat</span>
          {product.specs.anc && (
            <>
              <span>·</span>
              <span className="text-amber-400/90">{product.specs.anc.split(' ')[0]}</span>
            </>
          )}
        </div>

        {/* Price & Action Module */}
        <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between gap-2">
          {/* Price */}
          <div className="flex flex-col">
            <span className="text-lg font-bold text-white font-mono tabular-nums leading-none">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-zinc-400 line-through font-mono tabular-nums mt-0.5">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Action Buttons: Add to Cart & Buy Now */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                playHapticSound();
                onAddToCart(product);
              }}
              className="p-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white border border-white/5 transition-colors cursor-pointer"
              title="Add to Cart"
              aria-label="Add to cart"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
            </button>
            <button
              onClick={() => {
                playHapticSound();
                onBuyNow(product);
              }}
              className="px-3 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shadow-sm"
            >
              Buy Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
