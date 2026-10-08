import React, { useState, useEffect } from 'react';
import { Product, ProductCategory, CartItem, OrderDetails } from './types';
import { PRODUCTS } from './data/products';
import { BrandIntro } from './components/BrandIntro';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoryShowcase } from './components/CategoryShowcase';
import { CollectionSpotlight } from './components/CollectionSpotlight';
import { ProductGrid } from './components/ProductGrid';
import { AcousticSimulator } from './components/AcousticSimulator';
import { AudioBanner } from './components/AudioBanner';
import { WhyChooseUs } from './components/WhyChooseUs';
import { CustomerReviews } from './components/CustomerReviews';
import { ContactSection } from './components/ContactSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';

export default function App() {
  // Brand Intro opening state
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return !sessionStorage.getItem('am_intro_seen');
  });

  // Client-side local storage state for Cart & Wishlist
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('am_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    try {
      const saved = localStorage.getItem('am_wishlist');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Active Category & Filters
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync Cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('am_cart', JSON.stringify(cart));
    } catch {
      // Ignore storage errors
    }
  }, [cart]);

  // Sync Wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('am_wishlist', JSON.stringify(Array.from(wishlistIds)));
    } catch {
      // Ignore storage errors
    }
  }, [wishlistIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem('am_intro_seen', 'true');
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity = 1, selectedColor?: string) => {
    const color = selectedColor || product.colors[0]?.name || 'Standard';
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === color
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      }
      return [...prev, { product, quantity, selectedColor: color }];
    });
    showToast(`Added ${product.name} to bag`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from bag');
  };

  // Buy Now Handler (Immediate Checkout)
  const handleBuyNow = (product: Product, selectedColor?: string) => {
    handleAddToCart(product, 1, selectedColor);
    setSelectedProduct(null);
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
        showToast(`Removed from saved collection`);
      } else {
        next.add(product.id);
        showToast(`Saved ${product.name} to collection`);
      }
      return next;
    });
  };

  const handleRemoveFromWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      next.delete(product.id);
      return next;
    });
    showToast('Removed from collection');
  };

  // Order Placement Success
  const handleOrderSuccess = (order: OrderDetails) => {
    try {
      const pastOrders = JSON.parse(localStorage.getItem('am_orders') || '[]');
      localStorage.setItem('am_orders', JSON.stringify([order, ...pastOrders]));
    } catch {
      // Ignore storage errors
    }
    setCart([]);
  };

  // Scroll Helpers
  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSoundLab = () => {
    const el = document.getElementById('sound-lab');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.has(p.id));

  return (
    <div className="min-h-screen bg-[#08090D] text-zinc-100 flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-300">
      
      {/* 1. Cinematic Brand Opening Animation */}
      {showIntro && <BrandIntro onComplete={handleIntroComplete} />}

      {/* Floating Action Feedback Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 bg-zinc-900 border border-amber-500/50 text-white text-xs font-mono rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 2. Top Navigation Bar */}
      <Navbar
        cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)}
        wishlistCount={wishlistIds.size}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSearchQuery('');
        }}
        onReplayIntro={handleReplayIntro}
        activeCategory={activeCategory}
      />

      {/* Main Store Content */}
      <main className="flex-1">
        {/* 3. Hero Section */}
        <HeroSection
          onShopNow={scrollToCatalog}
          onExploreSoundLab={scrollToSoundLab}
          onViewProduct={(id) => {
            const prod = PRODUCTS.find((p) => p.id === id);
            if (prod) setSelectedProduct(prod);
          }}
        />

        {/* 4. Curated Disciplines Showcase (Earbuds, Handsfree, Headphones) */}
        <CategoryShowcase
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            setSearchQuery('');
            scrollToCatalog();
          }}
        />

        {/* 5. Collection Spotlight (Best Sellers, New Arrivals, Spotlights) */}
        <CollectionSpotlight
          products={PRODUCTS}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          onBuyNow={handleBuyNow}
          onToggleWishlist={handleToggleWishlist}
          onViewDetails={(p) => setSelectedProduct(p)}
          wishlistIds={wishlistIds}
        />

        {/* 6. Complete Product Catalog Grid with Filters & Sorting */}
        <ProductGrid
          products={PRODUCTS}
          activeCategory={activeCategory}
          onSelectCategory={(cat) => setActiveCategory(cat)}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          onBuyNow={handleBuyNow}
          onToggleWishlist={handleToggleWishlist}
          onViewDetails={(p) => setSelectedProduct(p)}
          wishlistIds={wishlistIds}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
        />

        {/* 7. Interactive Acoustic Simulator Test Room */}
        <AcousticSimulator />

        {/* 8. Premium Audio Engineering Banner (Exploded Macro Driver) */}
        <AudioBanner
          onExploreHeadphones={() => {
            setActiveCategory('Headphones');
            scrollToCatalog();
          }}
        />

        {/* 9. Why Choose ALI MURTAZA (4 Pillars) */}
        <WhyChooseUs />

        {/* 10. Verified Customer Reviews & Audition Reports */}
        <CustomerReviews />

        {/* 11. Contact & Acoustic Concierge Consultation */}
        <ContactSection />
      </main>

      {/* 11. Professional Footer & VIP Sound Club */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollToCatalog();
        }}
        onExploreSoundLab={scrollToSoundLab}
      />

      {/* ================= MODALS & DRAWERS ================= */}

      {/* Product Detail Modal (PDP) */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedProduct ? wishlistIds.has(selectedProduct.id) : false}
      />

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
        onExploreProducts={() => {
          scrollToCatalog();
        }}
      />

      {/* Wishlist Slide-Over Drawer */}
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={(p) => {
          handleAddToCart(p, 1);
          handleRemoveFromWishlist(p);
        }}
      />

      {/* Instant Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Full Checkout Modal & Receipt Screen */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cart}
        onOrderSuccess={handleOrderSuccess}
      />

    </div>
  );
}
