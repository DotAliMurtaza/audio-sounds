import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { Search, Heart, ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { ProductCategory } from '../types';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onSelectCategory: (category: ProductCategory | 'All') => void;
  onReplayIntro: () => void;
  activeCategory: ProductCategory | 'All';
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onSelectCategory,
  onReplayIntro,
  activeCategory,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; cat?: ProductCategory | 'All'; href?: string }[] = [
    { label: 'All Products', cat: 'All' },
    { label: 'Earbuds', cat: 'Earbuds' },
    { label: 'Handsfree', cat: 'Handsfree' },
    { label: 'Headphones', cat: 'Headphones' },
    { label: 'Sound Lab', href: '#sound-lab' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#08090D]/90 backdrop-blur-md border-b border-white/5 py-3 shadow-2xl'
            : 'bg-transparent border-b border-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Zone 1: Single Brand element */}
          <button
            onClick={() => onSelectCategory('All')}
            className="flex items-center text-left focus:outline-none group cursor-pointer"
            aria-label="ALI MURTAZA Home"
          >
            <BrandLogo size="md" />
          </button>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-300">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  if (item.cat) {
                    onSelectCategory(item.cat);
                    const el = document.getElementById('catalog');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  } else if (item.href) {
                    const el = document.querySelector(item.href);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`relative py-1 transition-colors hover:text-white cursor-pointer whitespace-nowrap ${
                  item.cat && activeCategory === item.cat ? 'text-amber-400 font-semibold' : ''
                }`}
              >
                {item.label}
                {item.cat && activeCategory === item.cat && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-amber-400 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Zone 3: Primary interactive controls & drawers */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Cinematic Intro Replay Button */}
            <button
              onClick={onReplayIntro}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-zinc-400 hover:text-amber-300 hover:bg-white/5 rounded-md transition-colors"
              title="Experience cinematic brand opening animation again"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="whitespace-nowrap">Intro</span>
            </button>

            {/* Instant Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-black bg-amber-400 rounded-full font-mono">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-500/20 to-amber-600/10 hover:from-amber-500/30 hover:to-amber-600/20 border border-amber-500/30 text-amber-300 rounded-lg transition-all cursor-pointer shadow-sm group"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-black bg-amber-400 rounded-full font-mono">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold tracking-wide hidden sm:inline">Bag</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden bg-black/80 backdrop-blur-xl pt-24 px-6 flex flex-col justify-between pb-8">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Audio Categories</p>
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (item.cat) {
                    onSelectCategory(item.cat);
                    const el = document.getElementById('catalog');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  } else if (item.href) {
                    const el = document.querySelector(item.href);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="text-left py-3 text-lg font-medium text-zinc-200 border-b border-white/5 hover:text-amber-400 transition-colors"
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onReplayIntro();
              }}
              className="flex items-center gap-2 py-3 text-sm text-amber-400 border-b border-white/5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Watch Cinematic Brand Intro</span>
            </button>
          </div>

          <div className="border-t border-white/10 pt-4 text-xs text-zinc-400 flex justify-between">
            <span>© ALI MURTAZA Audio</span>
            <span>2-Year Warranty Guaranteed</span>
          </div>
        </div>
      )}
    </>
  );
};
