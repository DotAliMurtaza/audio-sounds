import React from 'react';
import { Product } from '../types';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { playHapticSound } from '../utils/audio';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md bg-[#0F1015] border-l border-white/10 h-full flex flex-col shadow-2xl">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-amber-400 fill-current" />
            <h3 className="font-display font-bold text-lg text-white">Saved Audio Collection</h3>
            <span className="text-xs font-mono text-zinc-400">({wishlistProducts.length})</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 divide-y divide-white/5">
          {wishlistProducts.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-600 mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <p className="text-white font-medium text-base mb-1">Your wishlist is empty</p>
              <p className="text-zinc-400 text-xs max-w-xs">
                Tap the heart on any earbuds, handsfree, or headphones to save for later.
              </p>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div key={product.id} className="py-4 flex gap-4">
                <div className="w-20 h-20 rounded-xl bg-zinc-900 overflow-hidden shrink-0 border border-white/5">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-white line-clamp-1">{product.name}</h4>
                    <span className="text-[11px] text-zinc-400 font-mono">{product.subcategory}</span>
                    <div className="text-sm font-bold text-amber-300 font-mono mt-1">
                      ${product.price}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => {
                        playHapticSound();
                        onAddToCart(product);
                      }}
                      className="flex-1 py-1.5 px-3 bg-amber-400 hover:bg-amber-300 text-black text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                    <button
                      onClick={() => onRemoveFromWishlist(product)}
                      className="p-1.5 text-zinc-500 hover:text-red-400 rounded-lg cursor-pointer transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
