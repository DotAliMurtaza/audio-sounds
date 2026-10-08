import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, ArrowRight, ShieldCheck, ShoppingBag, Sparkles } from 'lucide-react';
import { playHapticSound } from '../utils/audio';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  onExploreProducts: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onExploreProducts,
}) => {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 150;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const discountAmount = (subtotal * discountPercent) / 100;
  const finalSubtotal = subtotal - discountAmount;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'SOUND10' || promoCode.trim().toUpperCase() === 'ALIMURTAZA') {
      setDiscountPercent(10);
      setPromoSuccess('10% VIP Audio discount applied!');
      setPromoError('');
    } else {
      setPromoError('Invalid coupon. Try "SOUND10"');
      setPromoSuccess('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-fade-in">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Slide-over Drawer */}
      <div className="relative z-10 w-full max-w-md bg-[#0F1015] border-l border-white/10 h-full flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h3 className="font-display font-bold text-lg text-white">Your Audio Bag</h3>
            <span className="text-xs font-mono text-zinc-400">({items.reduce((s, i) => s + i.quantity, 0)})</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="px-5 py-3 bg-zinc-900/60 border-b border-white/5">
          <div className="flex justify-between text-xs mb-1.5 font-mono">
            {remainingForFreeShipping > 0 ? (
              <span className="text-zinc-300">
                Add <span className="text-amber-400 font-bold">${remainingForFreeShipping.toFixed(2)}</span> for Complimentary Express Shipping
              </span>
            ) : (
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>You unlocked Complimentary Express Shipping!</span>
              </span>
            )}
          </div>
          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-500"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-white/5">
          {items.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-600 mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-white font-medium text-base mb-1">Your bag is empty</p>
              <p className="text-zinc-400 text-xs max-w-xs mb-6">
                Discover our precision earbuds, wired handsfree, or master headphones.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onExploreProducts();
                }}
                className="px-5 py-2.5 bg-amber-400 text-black font-semibold text-xs rounded-xl hover:bg-amber-300 transition-colors"
              >
                Shop Audio Catalog
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id + item.selectedColor} className="py-4 flex gap-4">
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-xl bg-zinc-900 overflow-hidden shrink-0 border border-white/5">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-semibold text-white line-clamp-1">{item.product.name}</h4>
                      <span className="text-[11px] text-zinc-400 font-mono">Color: {item.selectedColor}</span>
                    </div>
                    <span className="text-sm font-bold text-white font-mono tabular-nums">
                      ${item.product.price * item.quantity}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Stepper */}
                    <div className="flex items-center border border-white/10 rounded-lg bg-zinc-900 px-2 py-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="px-1.5 text-zinc-400 hover:text-white cursor-pointer text-xs"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-mono font-bold text-white tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="px-1.5 text-zinc-400 hover:text-white cursor-pointer text-xs"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-zinc-500 hover:text-red-400 p-1 transition-colors cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {items.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-[#0C0D11] flex flex-col gap-3">
            {/* Promo code form */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                placeholder="Promo code (e.g. SOUND10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 px-3 py-1.5 bg-zinc-900 border border-white/10 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-mono uppercase"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-xs text-white rounded-lg font-medium cursor-pointer"
              >
                Apply
              </button>
            </form>
            {promoSuccess && <span className="text-[11px] text-emerald-400 font-mono">{promoSuccess}</span>}
            {promoError && <span className="text-[11px] text-red-400 font-mono">{promoError}</span>}

            {/* Calculations */}
            <div className="space-y-1.5 pt-2 text-xs font-mono">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span className="text-white tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-amber-400">
                  <span>VIP Audio Discount (10%)</span>
                  <span className="tabular-nums">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-400">
                <span>Standard Delivery</span>
                <span>{remainingForFreeShipping === 0 ? 'FREE' : '$15.00'}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/5">
                <span>Estimated Total</span>
                <span className="text-amber-300 font-mono tabular-nums">
                  ${(finalSubtotal + (remainingForFreeShipping === 0 ? 0 : 15)).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => {
                playHapticSound();
                onProceedToCheckout();
              }}
              className="w-full mt-2 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-400 font-mono pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Encrypted 256-Bit Checkout · 2-Year Official Warranty</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
